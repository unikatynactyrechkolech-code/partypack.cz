import Image from "next/image";
import media from "@/lib/media.json";
import { R2_BASE } from "@/lib/site";

type Dim = { w: number; h: number };
const table = media as Record<string, Dim>;

export function imgSrc(key: string) {
  return `${R2_BASE}/${key}.webp`;
}

export function imgDims(key: string): Dim {
  return table[key] ?? { w: 1600, h: 1200 };
}

type Props = {
  k: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
};

export function Img({ k, alt, className, sizes, priority, fill, quality }: Props) {
  if (fill) {
    return (
      <Image
        src={imgSrc(k)}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        priority={priority}
        quality={quality}
      />
    );
  }
  const { w, h } = imgDims(k);
  return (
    <Image
      src={imgSrc(k)}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      className={className}
      priority={priority}
      quality={quality}
    />
  );
}
