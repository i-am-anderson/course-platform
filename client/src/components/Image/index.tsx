import type { ImageProps } from "@/types/image";
import placeholder from "/placeholder.png";

const Image = ({
  url,
  loading = "lazy",
  fetchpriority = "high",
  alt = "",
  title,
}: ImageProps) => {
  const cloudinary = import.meta.env.VITE_CLOUDINARY_URL;

  // Padrões de imagem via Cloudinary
  const small = `${cloudinary}f_auto/q_auto/c_scale,w_480${url}`;
  const medium = `${cloudinary}f_auto/q_auto/c_scale,w_991${url}`;
  const large = `${cloudinary}f_auto/q_auto/c_scale,w_1280${url}`;

  return (
    <picture>
      <source media="(min-width: 992px)" srcSet={large} />
      <source media="(min-width: 481px)" srcSet={medium} />
      <img
        src={small}
        loading={loading}
        fetchPriority={fetchpriority}
        alt={alt}
        title={title || alt}
        style={{ width: "100%", height: "auto" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = placeholder;
        }}
      />
    </picture>
  );
};

export default Image;
