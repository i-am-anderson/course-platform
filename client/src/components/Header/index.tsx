import ToggleTheme from "@/src/components/ToggleTheme";

import styles from "./styles.module.scss";
import Hamburguer from "../Hamburguer";

const Header = () => {
  return (
    <header className={`${styles.header} bg-1 border-color-1`}>
      <div>
        <Hamburguer />
      </div>
      <div>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
