"use client";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import fallbackImage from "../../public/images/POPCORN TIME.webp";

export const ImageWithFallback = ({ alt, src, ...props }: ImageProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return <Image alt={alt} onError={() => setError(true)} src={error ? fallbackImage : src} {...props} />;
};
