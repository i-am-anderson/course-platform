export type ImageProps = {
  url: string;
  loading: "lazy" | "eager" | undefined;
  alt: string;
  title?: string;
};