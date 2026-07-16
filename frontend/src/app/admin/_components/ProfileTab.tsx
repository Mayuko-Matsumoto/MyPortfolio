'use client';

import React, { useState, useEffect } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { fetchProfile, getImageUrl, Profile } from "@/services/api";
import { ImageUploader } from "./ImageUploader";

export function ProfileTab() {
  const { adminUpdateProfile, adminUploadImage } = useAdminApi();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [avatarImageId, setAvatarImageId] = useState<number | undefined>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchProfile().then((p) => {
      setProfile(p);
      setTitle(p.title);
      setBio(p.bio);
      setAvatarImageId(p.avatar_image_id);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminUpdateProfile({ title, bio, avatar_image_id: avatarImageId });
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <div className="text-center text-gray-400 py-12 animate-pulse">読み込み中...</div>;

  const avatarUrl = avatarImageId ? getImageUrl(`/api/images/${avatarImageId}`) : undefined;

  return (
    <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-sm space-y-6 max-w-2xl">
      <h3 className="text-xl font-bold text-gray-800">プロフィール編集</h3>
      <div className="flex items-center gap-6">
        <ImageUploader
          currentImageUrl={avatarUrl}
          onUploaded={setAvatarImageId}
          uploadFn={adminUploadImage}
        />
        <div className="flex-1 space-y-1">
          <p className="text-xs text-gray-400">名前（固定）</p>
          <p className="text-lg font-bold text-gray-700">松本 麻由子</p>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">肩書き（title）</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-orange-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">自己紹介文（bio）</label>
        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-orange-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition resize-none"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold text-sm tracking-wide hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
      >
        {saving ? "保存中..." : saved ? "✅ 保存しました！" : "保存する"}
      </button>
    </div>
  );
}
