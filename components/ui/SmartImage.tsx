import Image from "next/image";

/** Fills its parent (give the parent `relative` + an aspect ratio). Uploaded files are served as-is. */
export function SmartImage({
  src,
  alt,
  className,
  priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.startsWith("/uploads/")}
      className={className ?? "object-cover"}
    />
  );
}
