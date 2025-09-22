import ToggleTheme from "@/src/components/ToggleTheme";
import Hamburguer from "@/src/components/Hamburguer";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={`${styles.header} bg-1 border-color-1`}>
      {/* Abre e fecha a Sidenav */}
      <div className={`${styles.header__left}`}>
        <Hamburguer />
      </div>

      {/* Altera o tema */}
      <div className={`${styles.header__right}`}>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
