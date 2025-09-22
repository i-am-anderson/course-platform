import useSidebarContext from "@/src/contexts/SidenavContext";
import styles from "./styles.module.scss";

const Hamburguer = () => {
  const { toggleSidenav, sidenav } = useSidebarContext();

  const handleClick = () => {
    toggleSidenav();
  };

  return (
    <button
      onClick={handleClick}
      className={styles.hamburguer}
      data-toggle={sidenav}
    >
      <span className={`${styles.hamburguer__first} bg-2 `}></span>
      <span className={`${styles.hamburguer__second} bg-2 `}></span>
      <span className={`${styles.hamburguer__third} bg-2 `}></span>
    </button>
  );
};

export default Hamburguer;
