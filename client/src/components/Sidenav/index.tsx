import { NavLink } from "react-router-dom";

import modules from "@/src/data/cms/modules.json";

import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";
import useDevice from "@/src/hooks/useDevice";

const Sidenav = () => {
  const { isDesktop } = useDevice();
  const { sidenav, pageId, toggleSidenav } = useSidenavContext();

  // handleClick aciona um estado global via contexto
  const handleClick = () => {
    toggleSidenav();
  };

  return (
    <>
      <nav
        className={`${styles.sidenav} border-color-1 bg-2`}
        data-toggle={sidenav}
      >
        {/* Topo da Sidenav */}
        <h1 className={`${styles.sidenav__title} border-color-1`}>
          <NavLink to="/" onClick={() => !isDesktop && handleClick()}>
            Como criar uma playlist temática no Spotify
          </NavLink>
        </h1>

        {/* Lista de Módulos e Tópicos */}
        <ul className={`${styles["sidenav__level-1"]}`}>
          {modules.map(({ module, link, topics, id }) => (
            <li
              className={styles.sidenav__module}
              key={link}
              data-active={pageId === id ? "true" : "false"}
            >
              <h3 className={`${styles.sidenav__subtitle}`}>
                <NavLink to={link} onClick={() => !isDesktop && handleClick()}>
                  {module}
                </NavLink>
              </h3>
              <ul className={`${styles["sidenav__level-2"]} border-color-1`}>
                {topics.map(({ title, hash, id: id_ }) => (
                  <li
                    className={styles.sidenav__topic}
                    key={hash}
                    data-active={pageId === id_ ? "true" : "false"}
                  >
                    <NavLink
                      to={`${link}#/${hash}`}
                      onClick={() => !isDesktop && handleClick()}
                    >
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Exame */}
          <li className={styles.sidenav__module}>
            <h3 className={`${styles.sidenav__subtitle}`}>
              <NavLink to="/exame" onClick={() => !isDesktop && handleClick()}>
                Checkpoint - Exame
              </NavLink>
            </h3>

            <ul className={`${styles["sidenav__level-2"]} border-color-1`}>
              <li
                className={styles.sidenav__topic}
                data-active={pageId === "exame" ? "true" : "false"}
              >
                <NavLink
                  to="/exame"
                  onClick={() => !isDesktop && handleClick()}
                >
                  Exame
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Overlay - Apenas em dispositivos móveis */}
      {!isDesktop && (
        <div
          className={styles.sidenav__overlay}
          data-toggle={sidenav}
          onClick={handleClick}
        ></div>
      )}
    </>
  );
};

export default Sidenav;
