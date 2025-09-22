import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import type { ModuleProps } from "@/types/modules";
import styles from "./styles.module.scss";
import modules from "@/src/data/cms/modules.json";
import Image from "@/src/components/Image";
import useSidenavContext from "@/src/contexts/SidenavContext";

const Module = () => {
  const { pathname, hash: hash_ } = useLocation();
  const { changePageId } = useSidenavContext();
  const [data, setData] = useState<ModuleProps | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função que rola a página para o topo (hash)
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToTop();

    // Filtra a o caminho da URL
    const selectedData = modules.filter(
      ({ link }) => link === pathname,
    ) as ModuleProps[];

    // Se não existir dados reseta os estados
    if (selectedData.length === 0) {
      setData(null);
      changePageId("");
      return;
    }

    // Verifica o hash da página (renderiza Tópico)
    if (hash_) {
      // Retorna os dados de acordo com o hash da página
      const selectedTopic = selectedData[0]?.topics.filter(
        ({ hash }: { hash: string }) => hash === hash_.replace("#/", ""),
      );

      // Se não encontrar os dados do Tópico, retorna o Módulo
      if (selectedTopic.length === 0) {
        setData(selectedData[0]);
        changePageId(selectedData[0].id);
      } else {
        // Se encontrar os dados do Tópico, coloca no estado
        setData({ ...selectedData[0], topics: selectedTopic });
        changePageId(selectedTopic[0].id);
      }

      return;
    }

    // Renderiza Módulo (não tem hash)
    setData(selectedData[0]);
    changePageId(selectedData[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash_]);

  if (data === null) return <></>;
  return (
    <div className={`${styles.module}`} ref={scrollRef}>
      <div className={`${styles.module__wrapper}`}>
        <div className={`${styles.module__head}`}>
          <h1 className={`${styles.module__title}`}>{data?.module}</h1>
        </div>

        {/* Módulos */}
        {!hash_ && (
          <div className={`${styles.module__body}`}>
            <Image
              url={data?.coverImage}
              alt={data?.module ?? ""}
              loading="lazy"
            />
            <p className={`${styles.module__paragraph}`}>{data?.description}</p>
          </div>
        )}

        {/* Tópicos */}
        {hash_ && (
          <div className={`${styles.module__body}`}>
            {/* Introdução ao Tópico */}
            <h3 className={`${styles.module__subtitle}`}>
              {data?.topics[0]?.title}
            </h3>
            <hr></hr>

            {/* Conteúdo do Tópico */}
            {data?.topics[0].content.map((item) => {
              // Parágrafo
              if (item?.type === "paragraph")
                return (
                  <p className={`${styles.module__paragraph}`} key={item?.id}>
                    {item.text}
                  </p>
                );
              // Imagem
              if (item?.type === "image")
                return (
                  <Image
                    url={item?.src}
                    alt={item?.alt ?? ""}
                    loading="lazy"
                    key={item?.id}
                  />
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;
