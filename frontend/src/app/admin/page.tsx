'use client';

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProfileTab } from "./_components/ProfileTab";
import { AchievementsTab } from "./_components/AchievementsTab";
import { SkillsTab } from "./_components/SkillsTab";

type Tab = "profile" | "achievements" | "skills";

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: "profile", label: "プロフィール", emoji: "👤" },
    { id: "achievements", label: "実績", emoji: "🏆" },
    { id: "skills", label: "スキル", emoji: "⚡" },
  ];

  return (
    <div className="space-y-6">
      {/* ウェルカムバナー */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl px-6 py-5 text-white shadow-md">
        <p className="text-sm opacity-80">ようこそ</p>
        <p className="text-xl font-bold">{user?.email} 🎫</p>
        <p className="text-xs opacity-70 mt-1">トップページのコンテンツを管理・更新できます</p>
      </div>

      {/* タブナビゲーション */}
      <div className="flex gap-2 p-1.5 bg-orange-50 rounded-2xl border border-orange-100 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-white text-orange-500 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div>
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "skills" && <SkillsTab />}
      </div>
    </div>
  );
}
