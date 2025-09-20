type ParagraphContentProps = {
  id: string;
  type: "paragraph";
  text: string;
};

type ImageContentProps = {
  id: string;
  type: "image";
  src: string;
  alt: string;
};

type ContentBlockProps = ParagraphContentProps | ImageContentProps;

export interface TopicProps {
  id: string;
  title: string;
  hash: string;
  description: string;
  coverImage: string;
  content: ContentBlockProps[];
}

export interface ModuleProps {
  id: string;
  module: string;
  link: string;
  topics: TopicProps[];
}
