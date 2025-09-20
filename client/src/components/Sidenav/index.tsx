import { NavLink } from "react-router-dom";

import modules from "@/src/data/cms/modules.json";

import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";
import useDevice from "@/src/hooks/useDevice";

const Sidenav = () => {
  const { isDesktop } = useDevice();
  const { sidenav, pageId, toggleSidenav } = useSidenavContext();

  const handleClick = () => {
    toggleSidenav();
  };

  return (
    <>
      <nav
        className={`${styles.sidenav} border-color-1 bg-2`}
        data-toggle={sidenav}
      >
        <NavLink to="/">
          <h2 className={`${styles.sidenav__title} border-color-1`}>
            Como criar uma playlist temática no Spotify
          </h2>
        </NavLink>

        <ul className={`${styles["sidenav__level-1"]}`}>
          {modules.map(({ module, link, topics, id }) => (
            <li
              className={styles.sidenav__module}
              key={link}
              data-active={pageId === id ? "true" : "false"}
            >
              <NavLink to={link}>{module}</NavLink>

              <ul className={`${styles["sidenav__level-2"]} border-color-1`}>
                {topics.map(({ title, hash, id: id_ }) => (
                  <li
                    className={styles.sidenav__topic}
                    key={hash}
                    data-active={pageId === id_ ? "true" : "false"}
                  >
                    <NavLink to={`${link}#/${hash}`}>{title}</NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className={styles.sidenav__module}>
            <NavLink to="/exame">Checkpoint - Exame</NavLink>

            <ul className={`${styles["sidenav__level-2"]} border-color-1`}>
              <li
                className={styles.sidenav__topic}
                data-active={pageId === "exame" ? "true" : "false"}
              >
                <NavLink to="/exame">Exame</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
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
