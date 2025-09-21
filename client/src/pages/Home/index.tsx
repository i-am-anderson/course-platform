import { useEffect } from "react";
import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";
import Image from "@/src/components/Image";

const Home = () => {
  const { changePageId } = useSidenavContext();

  useEffect(() => {
    changePageId("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.home}`}>
      <div className={`${styles.home__head}`}>
        <h1 className={`${styles.home__title}`}>
          Como criar uma playlist temática no Spotify
        </h1>
      </div>

      <div className={`${styles.home__body}`}>
        <p className={`${styles.home__paragraph}`}>
          Criar uma boa playlist vai muito além de juntar músicas aleatórias.
          Uma playlist temática é como uma trilha sonora feita sob medida para
          momentos, sentimentos ou situações específicas. Ao longo deste
          minicurso, você vai aprender passo a passo como transformar suas
          ideias musicais em playlists únicas, envolventes e cheias de
          personalidade.
        </p>

        <Image
          url="/v1758483459/spotify-4334152_1280_zgza0q.jpg"
          alt="Imagem de uma pessoa com fones de ouvido sorrindo e curtindo música"
          loading="lazy"
        />

        <h2 className={`${styles.home__subtitle}`}>O que você vai aprender</h2>

        <p className={`${styles.home__paragraph}`}>
          Neste curso, você terá acesso a um conteúdo prático e direto, dividido
          em módulos que vão guiá-lo do básico até técnicas mais avançadas de
          curadoria:
        </p>

        <ul className={`${styles.home__list}`}>
          <li className={`${styles.home__item}`}>
            Entender o que é uma playlist temática e por que ela é diferente de
            uma simples seleção de músicas.
          </li>
          <li className={`${styles.home__item}`}>
            Definir objetivos claros para sua playlist, seja para treinar,
            estudar, relaxar, festejar ou até expressar sua identidade.
          </li>
          <li className={`${styles.home__item}`}>
            Explorar as ferramentas do Spotify, aprendendo como criar, editar e
            personalizar suas playlists.
          </li>
          <li className={`${styles.home__item}`}>
            Planejar suas seleções musicais, escolhendo temas, pesquisando
            músicas, equilibrando novidades e sucessos.
          </li>
          <li className={`${styles.home__item}`}>
            Organizar e dar estilo à sua playlist, trabalhando ordem das
            músicas, capa, nome e descrição criativos.
          </li>
        </ul>

        <Image
          url="/v1758483463/woman-5841479_1280_ginlv6.jpg"
          alt="Imagem de uma tela de computador mostrando várias playlists organizadas com capas criativas"
          loading="lazy"
        />

        <h2 className={`${styles.home__subtitle}`}>
          O que você pode esperar do curso
        </h2>

        <p className={`${styles.home__paragraph}`}>
          Este minicurso foi pensado para ser prático, leve e inspirador. Não é
          necessário ter conhecimento musical técnico: basta gostar de música e
          ter curiosidade para explorar novas formas de criar. Ao final, você
          será capaz de montar playlists que não só reúnem músicas, mas que
          também contam histórias, criam atmosferas e se tornam experiências
          marcantes para quem escuta.
        </p>

        <p className={`${styles.home__paragraph}`}>
          Além disso, você vai perceber que criar playlists pode ser uma forma
          de expressão pessoal e até uma maneira de se conectar com outras
          pessoas. Seja para amigos, seguidores ou para o público em geral, suas
          playlists podem transmitir sentimentos, energias e mensagens de forma
          única.
        </p>

        <Image
          url="/v1758483459/smartphone-1119314_1280_fpffhf.jpg"
          alt="Imagem de amigos em uma festa ouvindo música e se divertindo juntos"
          loading="lazy"
        />

        <h2 className={`${styles.home__subtitle}`}>Para quem é este curso?</h2>

        <p className={`${styles.home__paragraph}`}>Este curso é ideal para:</p>

        <ul className={`${styles.home__list}`}>
          <li className={`${styles.home__item}`}>
            Quem ama música e quer aprender a organizar melhor suas playlists.
          </li>
          <li className={`${styles.home__item}`}>
            Pessoas que desejam usar playlists como forma de expressão pessoal.
          </li>
          <li className={`${styles.home__item}`}>
            Criadores de conteúdo, influenciadores ou marcas que buscam
            playlists como parte de sua identidade e comunicação.
          </li>
          <li className={`${styles.home__item}`}>
            Qualquer pessoa que queira transformar simples listas de músicas em
            experiências sonoras completas.
          </li>
        </ul>

        <Image
          url="/v1758483455/headphones-6159058_1280_b7vwfl.jpg"
          alt="Imagem de alguém escrevendo ideias em um caderno enquanto ouve música no notebook"
          loading="lazy"
        />

        <h2 className={`${styles.home__subtitle}`}>Resultado esperado</h2>

        <p className={`${styles.home__paragraph}`}>
          Ao concluir este minicurso, você terá não apenas o conhecimento, mas
          também a prática necessária para criar playlists temáticas cativantes.
          Vai aprender a unir criatividade, técnica e estratégia, resultando em
          seleções musicais que prendem a atenção do ouvinte do começo ao fim.
        </p>

        <p className={`${styles.home__paragraph}`}>
          Este é o primeiro passo para deixar de lado playlists aleatórias e
          começar a criar verdadeiras trilhas sonoras para momentos da vida.
        </p>
      </div>
    </div>
  );
};

export default Home;
