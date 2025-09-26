import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import type { OptionsProps } from "@/types/data";
import { ChevronDown } from "lucide-react";

type Props = {
  name: string;
  options: OptionsProps[];
  setNotice: React.Dispatch<React.SetStateAction<string | null>>;
  disabled?: boolean;
};

type SelectPtops = {
  text: string;
  id: number;
};

const Combobox = ({ name, options, setNotice, disabled }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [handle, setHandle] = useState<OptionsProps[]>([...options]);
  const [select, setSelect] = useState<SelectPtops>({ text: "", id: -1 });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);

    const filtered = options.filter(({ text }) =>
      text.toLowerCase().includes(searchTerm),
    );

    setHandle(filtered);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    setSelect({
      text: e.target.dataset.name ?? "",
      id: Number(e.target.value),
    });

    handleClick();
  };

  // Reset
  const handleClick = () => {
    setOpen((prev) => !prev);
    setSearch("");
    setHandle([...options]);
    setNotice(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // Combobox
    <div className={styles.combobox} ref={ref}>
      {/* Display */}
      <span
        className={styles.combobox__display}
        onClick={handleClick}
        data-open={open}
      >
        {select.text ? select.text : "Escolha..."}

        <ChevronDown width={20} />
      </span>

      {/* Hidden */}
      <input
        type="hidden"
        value={select.id ? select.id : -1}
        id="combobox-hidden"
        name="combobox-hidden"
        data-input="combobox"
      />

      {/* Menu Suspenso */}
      <div className={`${styles.combobox__menu}`} data-open={open}>
        {/* Busca */}
        <input
          type="search"
          placeholder="Busque..."
          onChange={(e) => handleChange(e)}
          id="combobox-search"
          name="combobox-search"
          className={styles.combobox__search}
          value={search}
        />

        {/* Lista */}
        <ul className={`${styles.combobox__list}`}>
          {handle.map(({ id, text }) => (
            <li className={styles.combobox__item} data-value={id} key={id}>
              <input
                type="radio"
                name={name}
                value={id}
                id={name + id.toString()}
                data-name={text}
                onChange={(e) => handleSelect(e)}
                className={styles.combobox__input}
                disabled={disabled}
              />
              <label
                htmlFor={name + id.toString()}
                className={styles.combobox__label}
                data-selected={Number(id) === Number(select.id)}
              >
                {text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Combobox;
