export type ImageProps = {
  small: string;
  medium: string;
  large: string;
  loading: "lazy" | "eager" | undefined;
  alt: string;
};