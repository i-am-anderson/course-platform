import { NavLink } from "react-router-dom";

import modules from "@/src/data/cms/modules.json" with { type: "json" }; // tipagem importação por IA (substituido o assert por with)

import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";

const Sidenav = () => {
    const { sidenav, pageId } = useSidenavContext();

  return (
    <nav className={`${styles.sidenav} border-color-1 bg-2`} data-toggle={sidenav}>
      PAGE ID: { pageId }
      <h1 className={`${styles.sidenav__title} border-color-1`}>Como criar uma playlist temática no Spotify</h1>
      <ul className={`${styles['sidenav__level-1']}`}>
        {modules.map(({ module, link, topics, id }) => (
          <li className={styles.sidenav__module} key={link} data-active={pageId === id ? "true" : "false"}>
            <NavLink to={link}>{module}</NavLink>

            <ul className={`${styles['sidenav__level-2']} border-color-1`}>
              {topics.map(({title, hash, id: id_})=>(
                <li className={styles.sidenav__topic} key={hash}  data-active={pageId === id_ ? "true" : "false"} >
                  <NavLink to={`${link}#/${hash}`}>{title}</NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}

          <li className={styles.sidenav__module}>
            <NavLink to="/exame">Checkpoint - Exame</NavLink>
            
            <ul className={`${styles['sidenav__level-2']} border-color-1`}>
                <li className={styles.sidenav__topic}>
                  <NavLink to="/exame">Exame</NavLink>
                </li>
            </ul>
          </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
