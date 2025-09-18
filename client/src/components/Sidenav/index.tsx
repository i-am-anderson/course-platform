import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import modules from "@/src/configs/modules.json" with { type: "json" }; // tipagem importação por IA (substituido o assert por with)

const Sidenav = () => {
  return (
    <nav className={`${styles.sidenav} bg-3`}>
      <ul>
        {modules.map(({ module, link, topics }) => (
          <li className={styles.module} key={link}>
            <span><NavLink to={link}>{module}</NavLink></span>
            <ul>
              {topics.map(({topic, link: link_})=>(
                <li className={styles.topic} key={link_}><NavLink to={link_}>{topic}</NavLink></li>
              ))}
            </ul>
          </li>
          
        ))}
      </ul>
    </nav>
  );
};

export default Sidenav;
