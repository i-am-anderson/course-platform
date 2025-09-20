import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";
import Image from "@/src/components/Image";

const Home = () => {
  const { changePageId } = useSidenavContext();

  useEffect(() => {
    changePageId("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.home}`}>
      <div className={`${styles.home__wrapper}`}>
        <div className={`${styles.home__head}`}>
          <h1 className={`${styles.home__title}`}>
            Como criar uma playlist temática no Spotify
          </h1>
        </div>

        <div className={`${styles.home__body}`}>
          <p className={`${styles.home__paragraph}`}>
            "Oi, Shad, você está on-line?" "Claro que estou!" Quantos de nós
            ainda verificam se estamos ou não on-line? Esperamos que nossos
            dispositivos, telefones celulares, tablets, notebooks e computadores
            desktop estejam sempre conectados à Internet global. Usamos essa
            rede para interagir com amigos, fazer compras, compartilhar fotos e
            experiências e aprender. internet se tornou uma parte tão importante
            da vida cotidiana que quase a tomamos como certa.
          </p>

          <p className={`${styles.home__paragraph}`}>
            Normalmente, quando as pessoas usam o termo internet, elas não estão
            se referindo às conexões físicas no mundo real. Na verdade, eles
            tendem a pensar nisso como um conjunto de conexões. É o "lugar" onde
            as pessoas vão para encontrar ou compartilhar informações.
          </p>

          <Image url="/v1758288559/placeholder_sflq1m.jpg" alt="Alternative Text" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Home;
