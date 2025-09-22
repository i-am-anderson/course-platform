export type ImageProps = {
  url: string;
  loading: "lazy" | "eager" | undefined;
  fetchpriority?: "high" | "low"
  alt: string;
  title?: string;
};