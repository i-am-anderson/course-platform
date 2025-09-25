import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import type { OptionsProps } from "@/types/data";

type Props = {
  name: string;
  options: OptionsProps[];
};

const Combobox = ({ name, options }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [handle, setHandle] = useState<OptionsProps[]>([...options]);
  const [select, setSelect] = useState({ text: "", id: "" });
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
    setSelect({
      text: e.target.dataset.name ?? "",
      id: e.target.value,
    });

    handleClick();
  };

  // Reset
  const handleClick = () => {
    setOpen((prev) => !prev);
    setSearch("");
    setHandle([...options]);
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
      {/* Label */}
      <label
        htmlFor="combobox"
        className={styles.combobox__display}
        onClick={handleClick}
      >
        {select.text ? select.text : "Escolha..."}
      </label>

      {/* Hidden */}
      <input
        type="hidden"
        value={select.id}
        id="combobox"
        name="combobox"
        data-input="combobox"
      />

      {/* Menu Suspenso */}
      <div
        className={`${
          open ? styles["combobox__menu--open"] : styles.combobox__menu
        }`}
      >
        {/* Busca */}
        <input
          type="search"
          placeholder="Busque..."
          onChange={(e) => handleChange(e)}
          className={styles.combobox__search}
          value={search}
        />

        {/* Lista */}
        <ul>
          {handle.map(({ id, text }) => (
            <li className={styles.combobox__item} data-value={id} key={id}>
              <label
                htmlFor={name + id.toString()}
                className={styles.combobox__label}
              >
                <input
                  type="radio"
                  name={name}
                  value={id}
                  id={name + id.toString()}
                  data-name={text}
                  onChange={(e) => handleSelect(e)}
                  className={styles.combobox__input}
                />
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
