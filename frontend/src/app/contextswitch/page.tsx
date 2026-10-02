import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'ContextSwitch（コッチー）詳細プレゼンテーション LP | まゆこポートフォリオ',
  description: 'AIの記憶混ざりを防ぐ思考整理特化型チャットアプリ「ContextSwitch（コッチー）」の卒業発表プレゼン再現ページ。SimpleMem×Hindsight独自記憶構造、実ユーザー21名検証、gpt-5.5 vs mini比較データ等を掲載。',
};

export default function ContextSwitchLP() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-[#EBE78B] selection:text-[#1B2A5E]">
      
      {/* 簡易ナビゲーションヘッダー */}
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black text-[#EBE78B] border border-[#EBE78B]/40 rounded-full px-4 py-1.5 hover:bg-[#EBE78B] hover:text-[#1B2A5E] transition-all duration-200 select-none shadow-[2px_2px_0px_0px_#EBE78B]"
        >
          <span>←</span>
          <span>PORTFOLIO TICKET に戻る</span>
        </Link>
        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase hidden sm:inline-block">
          GRADUATION PRESENTATION ARCHIVE
        </span>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-16 space-y-16 sm:space-y-24">
        
        {/* --- HERO SECTION --- */}
        <section className="space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBE78B]/10 border border-[#EBE78B]/30 text-[#EBE78B] text-xs font-black tracking-widest uppercase">
            <span>✨ 卒業発表会 プレゼンテーション再現</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            ContextSwitch <span className="text-[#EBE78B]">（コッチー）</span>
          </h1>

          <p className="text-base sm:text-xl font-bold text-slate-300 leading-relaxed max-w-2xl">
            AIの「記憶混ざり」をゼロに。<br className="hidden sm:inline" />
            客観記憶抽出<span className="text-[#EBE78B]">「SimpleMem」</span>× ベクトル連想<span className="text-[#EBE78B]">「Hindsight」</span>による思考整理特化型チャット
          </p>

          {/* ビジュアルカード */}
          <div className="mt-8 rounded-3xl border-2 border-slate-700 bg-slate-900/80 p-3 sm:p-4 shadow-2xl relative overflow-hidden group">
            <img
              src="/contextswitch/cochi_PR.png"
              alt="ContextSwitch (コッチー) PRビジュアル"
              className="w-full h-auto rounded-2xl object-cover shadow-md"
            />
          </div>
        </section>

        {/* --- 01. PRESENTATION TALK: 開発背景と問題意識 --- */}
        <section className="space-y-6 bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#EBE78B] text-[#1B2A5E] font-black flex items-center justify-center text-sm">
              01
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">開発背景：なぜ既存のAIチャットでは駄目なのか？</h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-medium">
            <blockquote className="p-4 bg-slate-800/80 rounded-2xl border-l-4 border-[#EBE78B] text-slate-200 italic font-normal">
              🗣️ <strong>発表スライドより：</strong><br />
              「ChatGPTなどの生成AIを使っていて、『長文のやり取りを続けると前話した設定を忘れる』『別の相談をしたのに直前の会話のニュアンスが混ざってしまう』という経験はありませんか？コッチーは、ブラックボックスになりがちなAIのコンテキストを、ユーザー自身が完全に切り替え・管理できるアプリです。」
            </blockquote>
            
            <p>
              従来のAIチャットでは、1つのスレッドで会話を長く続けるとトークン数が爆発し、重要でない過去の愚痴や雑談までプロンプトに含まれるため、AIの回答精度が徐々に低下します。
            </p>
            <p>
              コッチーは**「部屋（テーマ）ごとの記憶切り分け」**と**「自動前提抽出（SimpleMem）」**により、何ターン会話を重ねても常にクリアで的外れのない対話を実現しました。
            </p>
          </div>
        </section>

        {/* --- 02. CORE ARCHITECTURE --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#EBE78B] text-[#1B2A5E] font-black flex items-center justify-center text-sm">
              02
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">独自AI記憶構造（Core Architecture）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SimpleMem */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg hover:border-[#EBE78B]/50 transition-all">
              <div className="flex items-center gap-2 text-[#EBE78B] font-black text-lg">
                <span>🧠</span>
                <h3>SimpleMem (シンプルメモ)</h3>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">短期キャッシュ ＆ 自動前提抽出</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                会話ログはまず <strong>Upstash Redis</strong> に超高速キャッシュ。相談が完了した瞬間、軽量AIモデルが「ユーザーの譲れない価値観や固定前提」のみを箇所書きで客観抽出して要約。トークン爆発を防ぎます。
              </p>
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-2">
                <img src="/contextswitch/kioku_tyuusyutu.png" alt="SimpleMem 記憶抽出画面" className="w-full h-auto rounded-lg" />
              </div>
            </div>

            {/* Hindsight */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg hover:border-[#EBE78B]/50 transition-all">
              <div className="flex items-center gap-2 text-[#EBE78B] font-black text-lg">
                <span>🔍</span>
                <h3>Hindsight (ハインドサイト)</h3>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">長期記憶 ＆ pgvector 連想検索</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                要約された前提記憶を <strong>Supabase (pgvector)</strong> に保存。新しい相談が届いた瞬間、過去の記憶から「関連性の高い文脈」をミリ秒単位で検索し、AIの思考プロンプトに動的インジェクションします。
              </p>
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-2">
                <img src="/contextswitch/kioku_image.jpg" alt="Hindsight 記憶連想イメージ" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* --- 03. PROMPT ENGINEERING & EXPERIMENTS --- */}
        <section className="space-y-6 bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#EBE78B] text-[#1B2A5E] font-black flex items-center justify-center text-sm">
              03
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">プロンプト・エンジニアリングの軌跡</h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-medium">
            <h3 className="font-extrabold text-white text-base sm:text-lg text-[#EBE78B]">
              💡 思考（thinking）と返答（reply）の分離（JSON Mode）
            </h3>
            <p>
              生モデルのAIは「親切心」から過剰なアドバイスを羅列しがち（怒涛の36文アドバイスおばさん化現象）。<br />
              これを防ぐため、内部で一度**「ユーザーの現在の時系列と感情の仮説的推察（thinking）」**を言語化させてから返答を出力させるJSON Modeを導入。文数を5〜6文に抑制し、エモくスマートな共感トーンを実現しました。
            </p>

            {/* 実証比較データ */}
            <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3">
              <h4 className="font-black text-xs sm:text-sm text-slate-200 uppercase tracking-widest">
                📊 モデル比較検証 (gpt-5.5 vs gpt-5-mini)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-xl space-y-1">
                  <span className="font-extrabold text-red-400">gpt-5-mini (軽量モデル)</span>
                  <p className="text-slate-300">
                    Few-shotの表面だけを真似し「どう感じてる？話してみて？」と原因を特定しようと理屈っぽく質問攻めにしてしまう。
                  </p>
                </div>
                <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1">
                  <span className="font-extrabold text-emerald-400">gpt-5.5 (フラッグシップ)</span>
                  <p className="text-slate-300">
                    「それ地味にへこむやつだよね」「『なんで今撮った？』ってなるよね」と、同じ目線で圧倒的共感を提供。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 04. TRACTION & REAL USER VALIDATION --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#EBE78B] text-[#1B2A5E] font-black flex items-center justify-center text-sm">
              04
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">実ユーザー21名によるクローズドテスト実証</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-4 shadow-xl">
            <blockquote className="p-4 bg-slate-800/60 rounded-2xl border-l-4 border-[#EBE78B] text-slate-200 italic font-normal text-sm sm:text-base">
              🗣️ <strong>発表スライドより：</strong><br />
              「お盆休みに体験版を一般公開し、21人のユーザーで実証を行いました。その中で『17歳で妊娠してしまい不安』という切実な相談が届きました。周囲にすぐ言えない孤独の中で、コッチーが感情を受け止め、制度や安心材料を整理することができました。誰にも言えない悩みを最初に吐き出せる『セーフティネット』としての手応えを得ました。」
            </blockquote>
          </div>
        </section>

        {/* --- 05. TECH STACK SUMMARY --- */}
        <section className="space-y-6 bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#EBE78B] text-[#1B2A5E] font-black flex items-center justify-center text-sm">
              05
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">採用技術スタック一覧</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Frontend', val: 'Next.js 16 (App Router), Tailwind CSS v4' },
              { label: 'Backend API', val: 'Hono (RPC), TypeScript' },
              { label: 'Vector DB', val: 'Supabase (pgvector)' },
              { label: 'Cache / Memory', val: 'Upstash Redis' },
              { label: 'ORM & DB', val: 'Drizzle ORM, PostgreSQL' },
              { label: 'AI Model', val: 'OpenAI API (gpt-5.5 / mini / nano)' },
              { label: 'Payment', val: 'Stripe (Pro Plan 500円/月)' },
              { label: 'Testing', val: 'Vitest, Zod validation' },
              { label: 'DevOps', val: 'Docker, Vercel, Git' },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="font-extrabold text-[#EBE78B] block">{item.label}</span>
                <span className="text-slate-300 font-medium leading-tight block">{item.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- BACK BUTTON / FOOTER --- */}
        <section className="text-center pt-8 border-t border-slate-800 space-y-6">
          <p className="text-sm font-bold text-slate-400">
            Ms.Engineer コーディングブートキャンプ 卒業発表会 完遂作品
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#1B2A5E] bg-[#EBE78B] rounded-full px-8 py-3.5 hover:scale-105 active:scale-95 transition-all duration-200 shadow-[4px_4px_0px_0px_#ffffff]"
            >
              <span>← ポートフォリオ（トップページ）へ戻る</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
