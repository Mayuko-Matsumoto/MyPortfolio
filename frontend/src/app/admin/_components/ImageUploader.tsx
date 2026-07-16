'use client';

import React, { useState, useEffect, useRef } from "react";

interface ImageUploaderProps {
  currentImageUrl?: string;
  onUploaded: (imageId: number) => void;
  uploadFn: (file: File) => Promise<{ id: number; filename: string }>;
}

export function ImageUploader({
  currentImageUrl,
  onUploaded,
  uploadFn,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 編集対象が切り替わったときにプレビュー画像を同期する
  useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const result = await uploadFn(file);
      onUploaded(result.id);
    } catch {
      alert("画像のアップロードに失敗しました。");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-28 h-28 object-cover rounded-xl border-2 border-orange-200 shadow"
        />
      ) : (
        <div className="w-28 h-28 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50 flex items-center justify-center text-orange-300 text-3xl">
          🖼️
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-xs bg-orange-100 text-orange-600 font-semibold px-4 py-1.5 rounded-full hover:bg-orange-200 transition cursor-pointer disabled:opacity-50"
      >
        {uploading ? "アップロード中..." : "画像を変更"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
