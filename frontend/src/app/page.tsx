'use client';

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { ProfileSection } from "@/components/features/ProfileSection";
import { SkillsSection } from "@/components/features/SkillsSection";
import { AchievementsSection } from "@/components/features/AchievementsSection";
import { InquiryForm } from "@/components/features/InquiryForm";
import { ChatWidget } from "@/components/features/ChatWidget";
import Link from "next/link";

export default function Home() {
  const { profile, achievements, skills, loading, error } = usePortfolio();

  // ローディング画面 (チケット発券スタイル)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#222222] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#EBE78B] border-2 border-[#1B2A5E] p-8 rounded-3xl shadow-[6px_6px_0px_0px_#1B2A5E] text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1B2A5E] border-t-transparent mx-auto"></div>
          <p className="text-sm font-bold text-[#1B2A5E] tracking-wider">チケットを発券中...</p>
        </div>
      </div>
    );
  }

  // エラー画面 (発券エラースタイル)
  if (error) {
    return (
      <div className="min-h-screen bg-[#222222] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#EBE78B] border-2 border-[#1B2A5E] p-8 rounded-3xl shadow-[6px_6px_0px_0px_#1B2A5E] text-center space-y-4">
          <span className="text-4xl block select-none">⚠️</span>
          <p className="text-sm font-bold text-[#1B2A5E]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border-2 border-[#1B2A5E] rounded-full bg-white text-xs font-extrabold hover:bg-orange-50/50 text-[#1B2A5E] transition-all cursor-pointer"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#222222] py-12 px-4 flex flex-col items-center justify-start font-sans">
      
      {/* 簡易ナビゲーションヘッダー */}
      <header className="w-full max-w-lg mb-6 flex justify-between items-center text-[10px] font-black tracking-widest text-[#EBE78B]/70 select-none">
        <span>FUTURE RECOVERY / PORTFOLIO TICKET</span>
        <Link
          href="/login"
          className="border border-[#EBE78B]/40 rounded-full px-3 py-1 hover:bg-white/10 hover:text-[#EBE78B] transition-all"
        >
          LOGIN
        </Link>
      </header>

      {/* チケット全体のコンテナ (もぎりミシン目がある) */}
      <div className="w-full max-w-lg bg-[#EBE78B] rounded-[2.5rem] border-2 border-[#1B2A5E] shadow-[8px_8px_0px_0px_#1B2A5E] relative overflow-hidden flex flex-col text-[#1B2A5E]">
        
        {/* 左右の切り欠き（チケットパンチ穴） - ミシン目の位置に完全一致 */}
        <div className="absolute top-[75%] -left-4 w-8 h-8 rounded-full bg-[#222222] border-r-2 border-[#1B2A5E] z-20"></div>
        <div className="absolute top-[75%] -right-4 w-8 h-8 rounded-full bg-[#222222] border-l-2 border-[#1B2A5E] z-20"></div>

        {/* 背景の幾何学アートレイヤー (細かいギザギザのみに統一) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <div className="absolute inset-0 bg-zigzag-pattern"></div>
        </div>

        {/* --- チケット上部（本券部分） --- */}
        <div className="p-6 sm:p-8 relative z-10 space-y-8 flex-1">
          {/* プロフィールセクション */}
          <ProfileSection profile={profile} />

          {/* 実績セクション */}
          <AchievementsSection achievements={achievements} />

          {/* スキルセクション */}
          <SkillsSection skills={skills} />
        </div>

        {/* --- ミシン目 (もぎり線) --- */}
        <div className="relative z-10 flex items-center justify-between px-1 bg-[#DDD7A4]/15">
          <div className="w-full border-t-2 border-dashed border-[#1B2A5E]/40 my-0.5"></div>
        </div>

        {/* --- チケット下部（半券部分：お問合せフォーム） --- */}
        <div className="p-6 sm:p-8 relative z-10 bg-[#DDD7A4]/25">
          {/* お問合せセクション */}
          <InquiryForm />
        </div>

      </div>

      {/* フッター */}
      <footer className="w-full text-center mt-12 text-[#EBE78B]/40 text-xs font-bold select-none tracking-widest">
        © {new Date().getFullYear()} FUTURE RECOVERY / MAYU EXPO2606.
      </footer>

      {/* AIチャットボットウィジェット */}
      <ChatWidget />

    </div>
  );
}
