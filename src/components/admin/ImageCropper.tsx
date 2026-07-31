import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { uploadImage } from "@/contentFunctions";
import { useMutation } from "@tanstack/react-query";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

interface Point {
  x: number;
  y: number;
}
interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ImageCropperProps {
  onUploadComplete: (url: string) => void;
  aspectRatio?: number; // e.g. 16/9 or 1
  currentImageUrl?: string;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export default function ImageCropper({ onUploadComplete, aspectRatio = 16 / 9, currentImageUrl }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc(reader.result?.toString() || null)
      );
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<string | null> => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return null;

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      return canvas.toDataURL("image/jpeg");
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const uploadMutation = useMutation({
    mutationFn: async ({ base64Data, filename }: { base64Data: string; filename: string }) => {
      return uploadImage({ data: { base64Data, filename } });
    },
    onSuccess: (res) => {
      if (res.success && res.url) {
        toast.success("Image uploaded successfully");
        onUploadComplete(res.url);
        setImageSrc(null); // reset UI
      } else {
        toast.error("Upload failed");
      }
    },
    onError: () => {
      toast.error("An error occurred during upload");
    }
  });

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedImageBase64 = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImageBase64) {
      uploadMutation.mutate({ base64Data: croppedImageBase64, filename: fileName });
    }
  };

  return (
    <div className="w-full">
      {!imageSrc ? (
        <div className="flex flex-col items-start gap-4">
          {currentImageUrl && (
            <div className="relative w-32 rounded-lg border border-white/10 overflow-hidden aspect-video bg-black/50">
              <img src={currentImageUrl} alt="Current" className="w-full h-full object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <UploadCloud size={16} />
            {currentImageUrl ? "Replace Image" : "Upload Image"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative h-64 w-full bg-black/50 rounded-lg overflow-hidden border border-white/10">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground w-12">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-label="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-gold"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleUpload}
              disabled={uploadMutation.isPending}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-gold-light disabled:opacity-50"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </>
              ) : (
                "Crop & Save"
              )}
            </button>
            <button
              onClick={() => setImageSrc(null)}
              disabled={uploadMutation.isPending}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
