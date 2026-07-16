'use client';

import React, { useState, useEffect } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { fetchSkills, Skill } from "@/services/api";

export function SkillsTab() {
  const { adminCreateSkill, adminUpdateSkill, adminDeleteSkill } = useAdminApi();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", category: "", level: 3, order: 0 });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => fetchSkills().then(setSkills);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: "", category: "", level: 3, order: 0 });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (s: Skill) => {
    setForm({ name: s.name, category: s.category, level: s.level, order: s.order });
    setEditId(s.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId !== null) {
        await adminUpdateSkill(editId, form);
      } else {
        await adminCreateSkill(form);
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
    if (!confirm("このスキルを削除しますか？")) return;
    try {
      await adminDeleteSkill(id);
      await load();
    } catch {
      alert("スキルの削除に失敗しました。");
    }
  };

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">スキル管理</h3>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          ＋ 新規追加
        </button>
      </div>

      {showForm && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 space-y-4">
          <h4 className="font-bold text-gray-700">{editId ? "スキルを編集" : "新規スキルを追加"}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">スキル名</label>
              <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">カテゴリ</label>
              <input type="text" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="例: Frontend, Backend" list="category-list"
                className="w-full border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition" />
              <datalist id="category-list">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">レベル (1〜5)</label>
              <input type="number" min={1} max={5} value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: Number(e.target.value) }))}
                className="w-full border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">表示順</label>
              <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                className="w-full border border-orange-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 transition" />
            </div>
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
        {skills.map((s) => (
          <div key={s.id} className="bg-white border border-orange-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 text-sm">{s.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-2 py-0.5">{s.category}</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i <= s.level ? "bg-orange-400" : "bg-gray-100 border border-gray-200"}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(s)} className="text-xs bg-orange-100 text-orange-600 font-semibold px-3 py-1.5 rounded-full hover:bg-orange-200 transition cursor-pointer">編集</button>
              <button onClick={() => handleDelete(s.id)} className="text-xs bg-red-50 text-red-400 font-semibold px-3 py-1.5 rounded-full hover:bg-red-100 transition cursor-pointer">削除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
