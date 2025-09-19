import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import type {ModuleProps, NavigationProps, TopicProps} from '@/types/modules'
import styles from "./styles.module.scss"
import modules from "@/src/configs/modules.json" with { type: "json" }; 
import Image from "@/src/components/Image";
import useDevice from "@/src/hooks/useDevice";

const Module = () => {
  // const small = "https://placehold.co/300x200.jpg";
  // const medium = "https://placehold.co/768x400.jpg";
  // const large = "https://placehold.co/1280x600.jpg";

  const small = "https://res.cloudinary.com/dgkpxwcel/image/upload/f_auto/q_auto/c_scale,w_300/v1758288559/placeholder_sflq1m.jpg";
  const medium = "https://res.cloudinary.com/dgkpxwcel/image/upload/f_auto/q_auto/c_scale,w_768/v1758288559/placeholder_sflq1m.jpg";
  const large = "https://res.cloudinary.com/dgkpxwcel/image/upload/f_auto/q_auto/c_scale,w_1280/v1758288559/placeholder_sflq1m.jpg";

  const { pathname, hash } = useLocation()
  const [data, setData] = useState<ModuleProps>()
  const [topic, setTopic] = useState<TopicProps>()
  const [navigation, setNavigation] = useState<NavigationProps>("");

  const {isMobile, isDesktop, isTablet} = useDevice()

  useEffect(()=>{
    const pageData = modules.filter(({link})=>  link === pathname )
    const pageTopic = pageData[0]?.topics.filter(({link})=> link === hash)

    setData(pageData[0])
    setTopic(pageTopic[0])
  },[pathname, hash])

  return (
    <div className={`${styles.module}`}>
      {isMobile && "Mobile"}
      {isTablet && "Tablet"}
      {isDesktop && "Desktop"}

      <div className={`${styles.module__wrapper}`}>
        <div className={`${styles.module__head}`}>
          <h1 className={`${styles.module__title}`}>{data?.module}</h1>
        </div>
        
        <div className={`${styles.module__body}`}>
          <h3 className={`${styles.module__subtitle}`}>{topic?.topic}</h3>

          <p className={`${styles.module__paragraph}`}>"Oi, Shad, você está on-line?" "Claro que estou!" Quantos de nós ainda verificam se estamos ou não on-line? Esperamos que nossos dispositivos, telefones celulares, tablets, notebooks e computadores desktop estejam sempre conectados à Internet global. Usamos essa rede para interagir com amigos, fazer compras, compartilhar fotos e experiências e aprender. internet se tornou uma parte tão importante da vida cotidiana que quase a tomamos como certa.</p>

          <p className={`${styles.module__paragraph}`}>Normalmente, quando as pessoas usam o termo internet, elas não estão se referindo às conexões físicas no mundo real. Na verdade, eles tendem a pensar nisso como um conjunto de conexões. É o "lugar" onde as pessoas vão para encontrar ou compartilhar informações.</p>

          <Image small={small} medium={medium} large={large} loading="lazy" alt="Alternative Text" />

        </div>
      </div>

      <div className={`${styles.module__wrapper}`}>       
        <div className={`${styles.module__body}`}>
          <h3 className={`${styles.module__subtitle}`}>{topic?.topic}</h3>

          <p className={`${styles.module__paragraph}`}>"Oi, Shad, você está on-line?" "Claro que estou!" Quantos de nós ainda verificam se estamos ou não on-line? Esperamos que nossos dispositivos, telefones celulares, tablets, notebooks e computadores desktop estejam sempre conectados à Internet global. Usamos essa rede para interagir com amigos, fazer compras, compartilhar fotos e experiências e aprender. internet se tornou uma parte tão importante da vida cotidiana que quase a tomamos como certa.</p>

          <p className={`${styles.module__paragraph}`}>Normalmente, quando as pessoas usam o termo internet, elas não estão se referindo às conexões físicas no mundo real. Na verdade, eles tendem a pensar nisso como um conjunto de conexões. É o "lugar" onde as pessoas vão para encontrar ou compartilhar informações.</p>

          <Image small={small} medium={medium} large={large} loading="lazy" alt="Alternative Text" />

        </div>
      </div>

      <div className={`${styles.module__wrapper}`}>       
        <div className={`${styles.module__body}`}>
          <h3 className={`${styles.module__subtitle}`}>{topic?.topic}</h3>

          <p className={`${styles.module__paragraph}`}>"Oi, Shad, você está on-line?" "Claro que estou!" Quantos de nós ainda verificam se estamos ou não on-line? Esperamos que nossos dispositivos, telefones celulares, tablets, notebooks e computadores desktop estejam sempre conectados à Internet global. Usamos essa rede para interagir com amigos, fazer compras, compartilhar fotos e experiências e aprender. internet se tornou uma parte tão importante da vida cotidiana que quase a tomamos como certa.</p>

          <p className={`${styles.module__paragraph}`}>Normalmente, quando as pessoas usam o termo internet, elas não estão se referindo às conexões físicas no mundo real. Na verdade, eles tendem a pensar nisso como um conjunto de conexões. É o "lugar" onde as pessoas vão para encontrar ou compartilhar informações.</p>

          <Image small={small} medium={medium} large={large} loading="lazy" alt="Alternative Text" />

        </div>
      </div>
    </div>
  )
}

export default Module