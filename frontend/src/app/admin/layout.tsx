'use client';

import React from "react";
import { notFound } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, logout } = useAuth();

  // 認証情報の読み込み中はローディングスピナーを表示
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50/20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-400 border-t-transparent"></div>
      </div>
    );
  }

  // 未ログインユーザーがアクセスしてきた場合は 404 エラーを返却して隠蔽する
  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-orange-50/10 flex flex-col">
      {/* シンプルなヘッダー */}
      <header className="bg-white border-b border-orange-100/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">ポートフォリオ管理画面</h1>
        <button
          onClick={logout}
          className="text-sm font-semibold text-gray-500 hover:text-orange-500 transition-all cursor-pointer"
        >
          ログアウト
        </button>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
