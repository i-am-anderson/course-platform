import type { ImageProps } from "@/types/image"

const Image = ({ small, medium, large, loading = undefined, alt = "" }: ImageProps) => {
  return (
    <img
      src={small}
      srcSet={`${small} 500w, ${medium} 1000w, ${large} 1500w`}
      sizes="(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px"
      loading={loading}
      alt={alt}
    />
  );
};

export default Image;
