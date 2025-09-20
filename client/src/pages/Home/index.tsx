import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";

const Home = () => {
  const { changePageId } = useSidenavContext();

  useEffect(() => {
    changePageId("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.home}`}>
      <h1>HOME</h1>
    </div>
  );
};

export default Home;
