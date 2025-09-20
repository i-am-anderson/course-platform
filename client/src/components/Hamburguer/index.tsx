import React, { useState } from 'react'
import useSidebarContext from "@/src/contexts/SidenavContext"
import styles from "./styles.module.scss"

const Hamburguer = () => {
  const [click, setClick] = useState(false)
  const { toggleSidenav } = useSidebarContext();

  const handleClick = ()=>{
    setClick(!click)
    toggleSidenav()
  }

  return (
    <button onClick={handleClick} className={styles.hamburguer} data-click={click}>
      <span className={`${styles.hamburguer__first} bg-2 `}></span>
      <span className={`${styles.hamburguer__second} bg-2 `}></span>
      <span className={`${styles.hamburguer__third} bg-2 `}></span>
    </button>
  )
}

export default Hamburguer