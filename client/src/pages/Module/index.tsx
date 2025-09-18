import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import type {ModuleProps} from '@/types/modules'
import styles from "./styles.module.scss"
import modules from "@/src/configs/modules.json" with { type: "json" }; 

const Module = () => {
    const { pathname, hash } = useLocation()
    const [data, setData] = useState<ModuleProps>()
    
    useEffect(()=>{
    const pageData = modules.filter(({link})=>  link === pathname )
    setData(pageData[0])
  },[pathname, hash])

  return (
    <div className={`${styles.contact}`}>{data?.module}</div>
  )
}

export default Module