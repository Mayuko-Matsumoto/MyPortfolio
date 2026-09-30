import React from "react";
import { ProfileSection } from "@/components/features/ProfileSection";
import { SkillsSection } from "@/components/features/SkillsSection";
import { AchievementsSection } from "@/components/features/AchievementsSection";
import { InquiryForm } from "@/components/features/InquiryForm";
import { ChatWidget } from "@/components/features/ChatWidget";
import Link from "next/link";
import { Profile, Achievement, Skill } from "@/services/api";

// デフォルトのフォールバックデータ（サーバー通信エラー時でも美しく表示するための安全設計）
const fallbackProfile: Profile = {
  id: 1,
  name: "まゆこ",
  title: "Ms.Engineerのコーディングブートキャンプ修了 / Webエンジニア志望",
  bio: "これまでの広告営業やテクニカルサポートなどの顧客折衝経験で培ったヒアリング力・課題整理力と、個人・チーム開発で培った自走力を武器に、要件定義からモダンなフルスタック開発（Next.js / FastAPI / Go / Hono）、AIエージェント実装（Mastra / pgvector）までを自走して完遂します。",
  avatar_url: "/my-image.png",
  avatar_image_id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const fallbackAchievements: Achievement[] = [
  {
    id: 1,
    title: "ContextSwitch（コッチー）",
    description: "ユーザーの悩み（友人・恋愛・就活等）ごとにAIの記憶をカテゴリ分離し、文脈誤爆を防ぐ思考整理特化型AIチャットアプリ。実ユーザー21名による5日間のクローズドテスト運用を見据え、徹底したインフラ0円運用と高推論性能を両立したハイブリッドAI構成で構築。",
    tech_stack: "Next.js 16, TypeScript, Tailwind CSS v4, Hono, Supabase (pgvector), Drizzle ORM, Upstash Redis, Docker, OpenAI API, Stripe, Zod, Vitest",
    image_url: "/contextswitch-1.png",
    image_id: 1,
    order: 1,
  },
  {
    id: 2,
    title: "問い合わせ対応AIエージェントアプリ",
    description: "不動産仲介業の問い合わせ対応を迅速化・品質平準化するため、能動的ヒアリングによる要件定義から、Mastraを用いたAI制御ロジックまでを一貫して構築した実務特化型Webアプリ。PIIマスキングやリスク判定ロジックを実装。",
    tech_stack: "Next.js (App Router), TypeScript, Tailwind CSS, Mastra (AI Agent), OpenAI API, Prisma, SQLite, Firebase, Docker, Git",
    image_url: "/inquiry-ai-image.jpg",
    image_id: 2,
    order: 2,
  },
  {
    id: 3,
    title: "推し活支援アプリ",
    description: "推し活のイベントや予算管理を効率化し、推しカラー対応カレンダーやAI自動登録でファンのモチベーションを高めるWebアプリ。チーム開発にてGo (Gin) と GORM による高速なREST APIと厳格なエラーハンドリングを実装。",
    tech_stack: "Go (Gin), GORM, PostgreSQL, Next.js, React, TypeScript, Tailwind CSS, Redis, Docker, Git",
    image_url: "/oshikatsu-image.jpg",
    image_id: 3,
    order: 3,
  },
  {
    id: 4,
    title: "認証機能付きポートフォリオサイト",
    description: "Firebase Authenticationを用いたセキュアな認可チェックと、RAG自己紹介チャットボットを搭載したフルスタック・モノレポ構成のポートフォリオサイト（本作）。",
    tech_stack: "Next.js, FastAPI, Mastra, PostgreSQL, SQLAlchemy, Alembic, Docker, AWS, Firebase",
    image_url: "/portfolio-image.png",
    image_id: 4,
    order: 4,
  },
];

const fallbackSkills: Skill[] = [
  { id: 1, name: "HTML/CSS", category: "frontend", level: 4, order: 1 },
  { id: 2, name: "JavaScript", category: "frontend", level: 4, order: 2 },
  { id: 3, name: "TypeScript", category: "frontend", level: 4, order: 3 },
  { id: 4, name: "React", category: "frontend", level: 4, order: 4 },
  { id: 5, name: "Next.js", category: "frontend", level: 4, order: 5 },
  { id: 6, name: "TailwindCSS", category: "frontend", level: 4, order: 6 },
  { id: 7, name: "Python (FastAPI)", category: "backend", level: 3, order: 7 },
  { id: 8, name: "Go (Gin)", category: "backend", level: 3, order: 8 },
  { id: 9, name: "Node.js / Hono", category: "backend", level: 4, order: 9 },
  { id: 10, name: "PostgreSQL", category: "backend", level: 4, order: 10 },
  { id: 11, name: "Supabase (pgvector)", category: "backend", level: 4, order: 11 },
  { id: 12, name: "Prisma / Drizzle", category: "backend", level: 4, order: 12 },
  { id: 13, name: "Docker", category: "tool", level: 3, order: 13 },
  { id: 14, name: "AWS / Cloudflare", category: "tool", level: 3, order: 14 },
  { id: 15, name: "GitHub", category: "tool", level: 4, order: 15 },
  { id: 16, name: "Mastra (AI Agent)", category: "tool", level: 4, order: 16 },
  { id: 17, name: "OpenAI API / RAG", category: "tool", level: 5, order: 17 },
  { id: 18, name: "Firebase", category: "tool", level: 4, order: 18 },
];

async function getPortfolioData() {
  const backendUrl = process.env.INTERNAL_API_URL || "http://backend:8000/api";
  try {
    const [profRes, achRes, skillRes] = await Promise.all([
      fetch(`${backendUrl}/profile`, { next: { revalidate: 30 }, signal: AbortSignal.timeout(3000) }),
      fetch(`${backendUrl}/achievements`, { next: { revalidate: 30 }, signal: AbortSignal.timeout(3000) }),
      fetch(`${backendUrl}/skills`, { next: { revalidate: 30 }, signal: AbortSignal.timeout(3000) }),
    ]);

    const profile: Profile = profRes.ok ? await profRes.json() : fallbackProfile;
    const achievements: Achievement[] = achRes.ok ? await achRes.json() : fallbackAchievements;
    const skills: Skill[] = skillRes.ok ? await skillRes.json() : fallbackSkills;

    return {
      profile: profile || fallbackProfile,
      achievements: (achievements.length > 0 ? achievements : fallbackAchievements).sort((a, b) => a.order - b.order),
      skills: (skills.length > 0 ? skills : fallbackSkills).sort((a, b) => a.order - b.order),
    };
  } catch (e) {
    console.error("Server-side fetch fallback used:", e);
    return {
      profile: fallbackProfile,
      achievements: fallbackAchievements,
      skills: fallbackSkills,
    };
  }
}

export default async function Home() {
  const { profile, achievements, skills } = await getPortfolioData();

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
