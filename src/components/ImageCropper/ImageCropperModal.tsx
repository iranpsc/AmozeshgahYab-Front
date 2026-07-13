"use client";

import { useCallback, useState } from "react";
import Cropper, {
  Area,
  Point,
} from "react-easy-crop";

import cropImage from "./cropImage";
import Button from "@/components/form/Button";

interface Props {
  open: boolean;

  image: string | null;

  aspect: number;

  width: number;

  height: number;

  cropShape?: "rect" | "round";

  title: string;
outputType?: "png" | "jpeg";
  onClose: () => void;

  onComplete: (file: File) => void;
}

export default function ImageCropperModal({
  open,
  image,
  aspect,
  width,
  height,
  cropShape = "rect",
  title,
  outputType = "jpeg",
  onClose,
  onComplete,
}: Props) {
  const [crop, setCrop] =
    useState<Point>({
      x: 0,
      y: 0,
    });

  const [zoom, setZoom] =
    useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area>();

  const onCropComplete = useCallback(
    (
      _: Area,
      croppedAreaPixels: Area
    ) => {
      setCroppedAreaPixels(
        croppedAreaPixels
      );
    },
    []
  );

  async function handleSave() {
    if (
      !image ||
      !croppedAreaPixels
    )
      return;

    const file = await cropImage(
  image,
  croppedAreaPixels,
  width,
  height,
  outputType
); 

    onComplete(file);

    onClose();
  }

  if (!open || !image)
    return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">

      <div className="flex h-[90vh] w-[90vw] max-w-5xl flex-col rounded-2xl bg-white">

        <div className="border-b p-5 text-xl font-bold">
          {title}
        </div>

        <div className="relative flex-1 bg-neutral-900">

          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={
              onCropComplete
            }
          />

        </div>

        <div className="space-y-5 p-5">

          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) =>
              setZoom(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />

          <div className="flex justify-end gap-3">

            <Button
              type="button"
              onClick={onClose}
            >
              انصراف
            </Button>

            <Button
              type="button"
              onClick={handleSave}
            >
              ذخیره
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}