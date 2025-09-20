import type { ImageProps } from "@/types/image"

const Image = ({ url, loading = undefined, alt = "" }: ImageProps) => {
  const cloudinary = import.meta.env.VITE_CLOUDINARY_URL;

  const small = `${cloudinary}f_auto/q_auto/c_scale,w_300/${url}`;
  const medium = `${cloudinary}f_auto/q_auto/c_scale,w_768/${url}`;
  const large = `${cloudinary}f_auto/q_auto/c_scale,w_1280/${url}`;

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
