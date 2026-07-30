import type { ImgHTMLAttributes } from "react";

/**
 * Renders an optimized, responsive <img>.
 * Optimized product assets ship as `/products-opt/<name>.webp` (1200px) with a
 * `<name>@600.webp` companion, so we can hand the browser a real srcset.
 */
export function SmartImage({
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; priority?: boolean }) {
  const optimized = src.startsWith("/products-opt/") && src.endsWith(".webp");
  const srcSet = optimized
    ? `${src.replace(/\.webp$/, "@600.webp")} 600w, ${src} 1200w`
    : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
