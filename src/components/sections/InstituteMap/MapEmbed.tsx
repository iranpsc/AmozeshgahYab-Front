"use client";

import { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

type Props = {
  title: string;
  latitude: number;
  longitude: number;
};

export default function MapEmbed({ title, latitude, longitude }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="flex h-48 w-full flex-col items-center justify-center gap-2 bg-surface text-muted-foreground transition-colors hover:text-primary"
      >
        <FaMapMarkedAlt size={28} />
        <span className="text-xs font-bold cursor-pointer">برای نمایش موقعیت مکانی کیلیک کنید </span>
      </button>
    );
  }

  return (
    <iframe
      title={title}
      src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=fa&z=15&output=embed`}
      className="h-48 w-full"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
