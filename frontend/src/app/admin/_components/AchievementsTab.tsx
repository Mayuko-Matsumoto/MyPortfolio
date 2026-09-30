'use client';

import React, { useState, useEffect } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { fetchAchievements, getImageUrl, Achievement } from "@/services/api";
import { ImageUploader } from "./ImageUploader";

export function AchievementsTab() {
  const { adminCreateAchievement, adminUpdateAchievement, adminDeleteAchievement, adminUploadImage } = useAdminApi();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", tech_stack: "", image_id: undefined as number | undefined, order: 0 });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => fetchAchievements().then(setAchievements);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", tech_stack: "", image_id: undefined, order: 0 });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (ach: Achievement) => {
    setForm({ title: ach.title, description: ach.description, tech_stack: ach.tech_stack, image_id: ach.image_id, order: ach.order });
    setEditId(ach.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId !== null) {
        await adminUpdateAchievement(editId, form);
      } else {
        await adminCreateAchievement(form);
      }
      await load();
      resetForm();
    } catch {
      alert("保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この実績を削除しますか？")) return;
    try {
      await adminDeleteAchievement(id);
      await load();
    } catch {
      alert("実績の削除に失敗しました。");
    }
  };

  // 実績の画像URLを柔軟に解決するヘルパー
  const resolveAchievementImage = (title: string, imageId?: number, imageUrl?: string) => {
    if (imageId) return getImageUrl(`/api/images/${imageId}`);
    if (imageUrl) return getImageUrl(imageUrl);
    if (title.includes("ContextSwitch") || title.includes("コッチー")) return "/contextswitch-1.png";
    if (title.includes("問い合わせ") || title.includes("みらい賃貸")) return "/inquiry-ai-image.jpg";
    if (title.includes("推し活")) return "/oshikatsu-image.jpg";
    if (title.includes("認証機能付き") || title.includes("ポートフォリオ")) return "/portfolio-image.png";
    return undefined;
  };

  const imageUrl = resolveAchievementImage(form.title, form.image_id);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">実績管理</h3>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          ＋ 新規追加
        </button>
      </div>

      {showForm && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 space-y-4">
          <h4 className="font-bold text-gray-700">{editId ? "実績を編集" : "新規実績を追加"}</h4>
          <ImageUploader
            currentImageUrl={imageUrl}
            onUploaded={(id) => setForm((f) => ({ ...f, image_id: id }))}
            uploadFn={adminUploadImage}
          />
          {(["title", "description", "tech_stack"] as const).map((key) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 capitalize">{key}</label>
              {key === "description" ? (
                <textarea rows={3} value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition resize-none" />
              ) : (
                <input type="text" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition" />
              )}
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">表示順 (order)</label>
            <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              className="w-24 border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving}
              className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-bold px-6 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
              {saving ? "保存中..." : "保存"}
            </button>
            <button onClick={resetForm} className="text-gray-400 text-sm hover:text-gray-600 cursor-pointer">キャンセル</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {achievements.map((ach) => {
          const imgSrc = resolveAchievementImage(ach.title, ach.image_id, ach.image_url);

          return (
            <div key={ach.id} className="bg-white border border-orange-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition">
              {imgSrc && (
                <img src={imgSrc} alt={ach.title} className="w-16 h-16 rounded-xl object-cover border border-orange-100" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm truncate">{ach.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{ach.tech_stack}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(ach)} className="text-xs bg-orange-100 text-orange-600 font-semibold px-3 py-1.5 rounded-full hover:bg-orange-200 transition cursor-pointer">編集</button>
                <button onClick={() => handleDelete(ach.id)} className="text-xs bg-red-50 text-red-400 font-semibold px-3 py-1.5 rounded-full hover:bg-red-100 transition cursor-pointer">削除</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
