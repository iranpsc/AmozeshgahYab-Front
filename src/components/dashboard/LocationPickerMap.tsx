"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// آیکون پیش‌فرض لیفلت با bundlerهایی مثل Next/Turbopack مسیر عکس‌ها رو درست
// resolve نمی‌کنه (مشکل معروف leaflet+webpack) — برای همین از CDN خودِ لیفلت
// می‌گیریمش، ساده‌ترین راه بدون نیاز به کپی‌کردن فایل تو public/.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/** مرکز پیش‌فرض روی تهران، وقتی هنوز مختصاتی انتخاب نشده */
const DEFAULT_CENTER: [number, number] = [35.6892, 51.389];
const DEFAULT_ZOOM = 12;
const SELECTED_ZOOM = 15;

type Props = {
  latitude: number | null;
  longitude: number | null;
  onChange?: (lat: number, lng: number) => void;
  /** وقتی true باشه، فقط نمایشه — نه کلیک نه درگ‌کردن مارکر */
  readOnly?: boolean;
};

/** کلیک روی هر نقطه‌ی نقشه = همون‌جا به‌عنوان مختصات انتخاب می‌شه */
function ClickHandler({ onChange }: { onChange: NonNullable<Props["onChange"]> }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/** وقتی مقدار latitude/longitude از بیرون (مثلاً دکمه‌ی «دریافت موقعیت من» یا
 * تایپ دستی تو اینپوت) عوض بشه، نقشه هم خودش رو با یه پرش نرم به همون نقطه ببره */
function RecenterOnChange({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.setView([latitude, longitude], map.getZoom());
    }
  }, [latitude, longitude, map]);

  return null;
}

export default function LocationPickerMap({
  latitude,
  longitude,
  onChange,
  readOnly = false,
}: Props) {
  const hasPosition = latitude !== null && longitude !== null;
  const center: [number, number] = hasPosition
    ? [latitude, longitude]
    : DEFAULT_CENTER;

  return (
    <div className="h-70 xl:h-100 w-full overflow-hidden rounded-xl border border-input">
      <MapContainer
        center={center}
        zoom={hasPosition ? SELECTED_ZOOM : DEFAULT_ZOOM}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!readOnly && onChange && <ClickHandler onChange={onChange} />}
        <RecenterOnChange latitude={latitude} longitude={longitude} />

        {hasPosition && (
          <Marker
            position={[latitude, longitude]}
            draggable={!readOnly}
            eventHandlers={
              readOnly
                ? undefined
                : {
                    dragend: (e) => {
                      const pos = e.target.getLatLng();
                      onChange?.(pos.lat, pos.lng);
                    },
                  }
            }
          />
        )}
      </MapContainer>
    </div>
  );
}
