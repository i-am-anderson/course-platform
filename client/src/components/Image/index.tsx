import { LazyLoadImage } from "react-lazy-load-image-component";
import type { ImageProps } from "@/types/image";
import placeholder from "/placeholder.png";

const Image = ({ url, loading = undefined, fetchpriority = "high", alt = "", title }: ImageProps) => {
  const cloudinary = import.meta.env.VITE_CLOUDINARY_URL;

  // Padrões de imagem via Cloudinary
  const small = `${cloudinary}f_auto/q_auto/c_scale,w_480/${url}`;
  const medium = `${cloudinary}f_auto/q_auto/c_scale,w_991/${url}`;
  const large = `${cloudinary}f_auto/q_auto/c_scale,w_1280/${url}`;

  return (
    <LazyLoadImage
      src={small}
      srcSet={`${small} 480w, ${medium} 991w, ${large} 1280w`}
      sizes="(max-width: 480px) 100vw, (max-width: 991px) 100vw, 1280px"
      placeholderSrc={placeholder}
      effect="blur"
      fetchPriority={fetchpriority} 
      loading={loading}
      alt={alt}
      title={title || alt}
    />
  );
};

export default Image;
