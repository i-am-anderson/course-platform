export type TopicProps = {
  topic: string;
  link: string;
};

export type ModuleProps = {
  module: string;
  link: string;
  topics: TopicProps[];
};

export type NavigationProps =
  | ""
  | "#/1-1-apresentacao"
  | "#/1-2-o-que-e-o-spotify"
  | "#/1-3-resumo-introducao"
  | "#/2-1-apresentacao"
  | "#/2-2-configuracao-do-usuario"
  | "#/2-3-preferencias"
  | "#/2-4-resumo-configuracoes"
  | "#/3-1-apresentacao"
  | "#/3-2-playlist"
  | "#/3-3-resumo-playlist";
