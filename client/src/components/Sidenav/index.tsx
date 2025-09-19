import { NavLink } from "react-router-dom";

import modules from "@/src/configs/modules.json" with { type: "json" }; // tipagem importação por IA (substituido o assert por with)

import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";

const Sidenav = () => {
    const { sidenav } = useSidenavContext();

  return (
    <nav className={`${styles.sidenav}`} data-toggle={sidenav}>
      <ul className={`${styles['sidenav__level-1']}`}>
        {modules.map(({ module, link, topics }) => (
          <li className={styles.sidenav__module} key={link}>
            <span><NavLink to={link}>{module}</NavLink></span>
            <ul className={`${styles['sidenav__level-2']}`}>
              {topics.map(({topic, link: link_})=>(
                <li className={styles.sidenav__topic} key={link_} ><NavLink to={link_} data-disabled={true}>{topic}</NavLink></li>
              ))}
            </ul>
          </li>
          
        ))}
      </ul>
    </nav>
  );
};

export default Sidenav;
