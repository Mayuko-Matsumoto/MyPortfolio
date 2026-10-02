import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'ContextSwitch（コッチー）プロダクト詳細 & 採用技術ドキュメント | まゆこポートフォリオ',
  description: 'AIの記憶混ざりを防ぐ思考整理特化型チャット「ContextSwitch（コッチー）」の公式解説ページ。SimpleMem×Hindsight独自記憶構造、実ユーザー21名検証データ、実機デモ動画等を掲載。',
};

export default function ContextSwitchLP() {
  const sections = [
    {
      id: 1,
      slideNumber: "01",
      title: "概要 & コンセプト (Concept)",
      subtitle: "AIの前提記憶とコンテキスト切り替えを自律制御する思考整理チャット",
      image: "/contextswitch/slides/contextswitch-1.png",
      alt: "スライド 01: 表紙 ContextSwitch",
      description: "ContextSwitch（コッチー）は、対話の中で生じる「前提条件」をAIが自動抽出し、悩みや相談テーマごとに会話のコンテキストを切り替えて管理できる思考整理特化型チャットアプリケーションです。",
      video: null,
    },
    {
      id: 2,
      slideNumber: "02",
      title: "課題と背景 (Problem & Market)",
      subtitle: "10代〜20代のAI相談需要と「記憶混ざり・暴走」の課題",
      image: "/contextswitch/slides/contextswitch-2.png",
      alt: "スライド 02: 課題と背景",
      description: "内閣府の調査によると10代女性の52.4%、20代の約4割がAIを相談相手に活用しています。しかし、単一スレッドで対話を継続すると過去の文脈や設定が混ざり、的外れな回答や記憶の暴走が発生します。毎回前提プロンプトを入力する手間を排除し、テーマごとに記憶をクリアに分離・管理する仕組みを構築しました。",
      video: null,
    },
    {
      id: 3,
      slideNumber: "03",
      title: "コア機能 & UI体験 (Solution & Features)",
      subtitle: "前提の自動記憶 ＆ ユーザー自身による完全コントロール",
      image: "/contextswitch/slides/contextswitch-3.png",
      alt: "スライド 03: コア機能とUI体験",
      description: "相談内容に応じた「部屋」を選択してチャットを開始。「相談を完了✨」をタップするだけで、AIが対話ログからユーザーの固定前提や状況を自動で箇条書き抽出しカルテ保存。次回相談時にはその記憶を自動インジェクションするため説明の手間がかかりません。保存された記憶はユーザー自身がいつでも閲覧・編集・削除可能です。",
      video: null,
    },
    {
      id: 4,
      slideNumber: "04",
      title: "デモンストレーション (Demonstration)",
      subtitle: "コンテキスト分離 / キオク編集 / ProプランとStripe決済",
      image: null,
      alt: "スライド 04: デモンストレーション動画",
      description: "「家族」部屋で親との比較に関する悩みを相談し、対話完了時にAIが「母親に比較された」という前提を自動抽出。別の「恋愛」部屋へ遷移しても過去の文脈は干渉しません。Stripe決済連携によるProプラン（月額500円）では、鍵がかかった過去の相談アーカイブを自由に振り返ることができます。",
      video: "/contextswitch/slides/0825.mp4",
    },
    {
      id: 5,
      slideNumber: "05",
      title: "独自AI記憶構造 (Core Architecture)",
      subtitle: "SimpleMem (短期キャッシュ・要約) × Hindsight (長期記憶・pgvector連想)",
      image: "/contextswitch/slides/contextswitch-5.png",
      alt: "スライド 05: Core Architecture 2つの記憶システム",
      description: "対話ログをそのまま全件送信するとトークン数が爆発し精度が低下します。ContextSwitchではUpstash Redisによる短期キャッシュから要約を客観抽出する「SimpleMem」と、Supabase (pgvector) から関連記憶をミリ秒単位で検索・プロンプト注入する「Hindsight」の2段階記憶構造を独自構築しました。",
      video: null,
    },
    {
      id: 6,
      slideNumber: "06",
      title: "採用技術構成 & ロジック (Tech Stack & Optimization)",
      subtitle: "3つのAIモデルとデータベースを適材適所で組みあわせたモノレポ",
      image: "/contextswitch/slides/contextswitch-6.png",
      alt: "スライド 06: 技術構成 & 実運用ガード",
      description: "メインの対話生成には高品質モデル、裏側の要約処理には軽量モデルを採用し、品質とコストを最適化。Supabase pgvector と Hono (RPC) バックエンドによりミリ秒単位の超高速レスポンスを実現しています。",
      video: null,
    },
    {
      id: 7,
      slideNumber: "07",
      title: "実ユーザー21名検証データ (Traction & Validation)",
      subtitle: "お盆休み体験版リリースと「17才妊娠相談」でのセーフティネット体験",
      image: "/contextswitch/slides/contextswitch-7.png",
      alt: "スライド 07: 実証データ",
      description: "実運用テスト中、「17歳で妊娠し将来が不安」という切実な相談が寄せられました。周囲に言えない孤立した環境下で、コッチーが感情を受け止めつつ制度や事実を整理。日常の思考整理ツールに留まらず、誰にも言えない悩みを最初に吐き出せるセーフティネットとしての実効性を実証しました。",
      video: null,
    },
    {
      id: 8,
      slideNumber: "08",
      title: "モデル比較検証 (Tech Insights: gpt-5.5 vs mini)",
      subtitle: "対話品質の差 (共感 vs 質問攻め) とプロンプトインジェクション防衛戦記",
      image: "/contextswitch/slides/contextswitch-8.png",
      alt: "スライド 08: モデル比較検証データ",
      description: "実データを用いたモデル比較において、軽量モデル(mini)は原因を問いただす理屈っぽい質問攻めになりがちなのに対し、フラッグシップ(5.5)はユーザーと同じ目線で自然な共感を提供。プロンプトインジェクション攻撃に対しても、思考分離(thinking)により内部情報を漏洩させずキャラクターを守り抜く防衛ロジックを実証しました。",
      video: null,
    },
    {
      id: 9,
      slideNumber: "09",
      title: "本家ChatGPT(チャッピー)対話対比 (Learning & Challenge)",
      subtitle: "全8ターン対比：文章量過多の回避とセーフティガードの学び",
      image: "/contextswitch/slides/contextswitch-9.png",
      alt: "スライド 09: 本家ChatGPT比較と今後の課題",
      description: "本家ChatGPTは平均683文字の長文回答となり、不安を抱えるユーザーには読む負担が大きい傾向が判明。コッチーはLINE感覚の短文共感（平均120文字）で寄り添う一方、人命・医療の危機的局面においては安全な専門窓口へ誘導するセーフティガードの強化が今後の開発テーマとなりました。",
      video: null,
    },
    {
      id: 10,
      slideNumber: "10",
      title: "マネタイズ & Proプラン (Business Model & Scalability)",
      subtitle: "Freemiumモデル (記憶3件) ＆ Stripe Proプラン ＋ B2B展開のアイディア考察",
      image: "/contextswitch/slides/contextswitch-10.png",
      alt: "スライド 10: ビジネスモデル",
      description: "無料プラン（記憶3件）に加え、Stripe決済連携のProプラン（月額500円）を用意。ただしB2C課金のみではコスト面で厳しい側面もあり、持続可能な運用のアイディアとしてB2Bへの展開の可能性も模索しています。",
      video: null,
      details: (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5 pt-2">
          <span className="font-extrabold text-[#EBE78B] text-sm block">💡 B2Bマネタイズの可能性についての考察</span>
          <p className="text-slate-300 leading-relaxed font-medium">
            B2C単体では収益化が難しい側面があるため、プライバシー保護とオプトイン（同意）取得を大前提として、お悩み相談から得られる感情傾向などのマクロデータを、教育機関や若年層向け企業に匿名データとして提供するモデルなどもひとつのアイディアとして考えています。
          </p>
        </div>
      ),
    },
    {
      id: 11,
      slideNumber: "11",
      title: "展望 & コンテキスト制御の未来 (Vision)",
      subtitle: "誰もがAIを安全に乗りこなせる世界を目指して",
      image: "/contextswitch/slides/contextswitch-11.png",
      alt: "スライド 11: 展望 Vision",
      description: "コンテキストの自律制御技術を、将来的にシニア向けサポートや地方中小企業のアシスタントへと展開。誰もがAIの文脈混ざりに悩まされることなく、安全かつストレスフリーにAIを乗りこなせる社会の実現を目指します。",
      video: null,
    },
  ];

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
          PRODUCT ARCHITECTURE & SPECIFICATION
        </span>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-16 space-y-12 sm:space-y-16">
        
        {/* --- HERO HEADER --- */}
        <section className="space-y-4 text-center sm:text-left border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBE78B]/10 border border-[#EBE78B]/30 text-[#EBE78B] text-xs font-black tracking-widest uppercase">
            <span>✨ ContextSwitch (コッチー) 技術詳細 & 公式プレゼンスライド</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            ContextSwitch <span className="text-[#EBE78B]">（コッチー）</span>
          </h1>

          <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed max-w-3xl">
            AIの前提記憶とコンテキスト切り替えを自律制御する思考整理チャット「ContextSwitch（コッチー）」の公式発表スライド全11枚と、技術アーキテクチャ、実証検証データを収録した技術解説ドキュメントです。
          </p>
        </section>

        {/* --- SECTIONS LIST (全11スライド完全掲載) --- */}
        <div className="space-y-12 sm:space-y-16">
          {sections.map((section) => (
            <section
              key={section.id}
              className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
            >
              {/* セクションヘッダー */}
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <span className="w-8 h-8 rounded-full bg-[#EBE78B] text-[#1B2A5E] font-black flex items-center justify-center text-sm shrink-0">
                  {section.slideNumber}
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">
                    {section.subtitle}
                  </p>
                </div>
              </div>

              {/* 静止画スライド画像 (section.image がある場合のみ表示) */}
              {section.image && (
                <div className="rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-950 p-2 shadow-2xl relative">
                  <img
                    src={section.image}
                    alt={section.alt}
                    className="w-full h-auto rounded-xl object-contain mx-auto shadow-md"
                  />
                </div>
              )}

              {/* 04 デモンストレーション動画プレイヤー (iPhoneフレーム付きメインビジュアル) */}
              {section.video && (
                <div className="space-y-3">
                  <div className="relative max-w-sm mx-auto border-4 border-slate-700 bg-slate-950 rounded-[2.5rem] p-2 shadow-2xl overflow-hidden">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-10 pointer-events-none"></div>
                    <video
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto rounded-[2rem] border border-slate-800"
                    >
                      <source src={section.video} type="video/mp4" />
                      お使いのブラウザは動画再生に対応していません。
                    </video>
                  </div>
                </div>
              )}

              {/* 解説テキスト */}
              <div className="space-y-2 pt-1">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                  {section.description}
                </p>
              </div>

              {/* 詳細補足ドロワー */}
              {section.details && (
                <div className="pt-2">
                  {section.details}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* --- BACK BUTTON / FOOTER --- */}
        <section className="text-center pt-8 border-t border-slate-800 space-y-6">
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
