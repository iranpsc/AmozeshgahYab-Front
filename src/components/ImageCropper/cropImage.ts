import { Area } from "react-easy-crop";

export default async function cropImage(
  imageSrc: string,
  crop: Area,
  width: number,
  height: number,
  type: "png" | "jpeg" = "jpeg"
): Promise<File>  {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    width,
    height
  );

return new Promise((resolve) => {
  const mime =
    type === "png"
      ? "image/png"
      : "image/jpeg";

  const fileName =
    type === "png"
      ? "image.png"
      : "image.jpg";

  canvas.toBlob(
    (blob) => {
      resolve(
        new File([blob!], fileName, {
          type: mime,
        })
      );
    },
    mime,
    type === "jpeg" ? 0.95 : undefined
  );
});
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = url;
  });
}