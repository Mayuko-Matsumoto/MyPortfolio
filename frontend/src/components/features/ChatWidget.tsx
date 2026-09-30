'use client';

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const { messages, isSending, sendMessage, clearChat } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが届いたら最下部までスクロール
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    const textToSend = inputText;
    setInputText("");
    await sendMessage(textToSend);
  };

  const handleQuickQuestion = async (question: string) => {
    if (isSending) return;
    await sendMessage(question);
  };

  const quickQuestions = [
    "経歴を教えて！",
    "得意なスキルは？",
    "コッチーってどんなアプリ？",
    "制作実績を教えて！",
    "将来のビジョンは？",
    "MBTIは？",
    "趣味は？"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* フローティングボタン (開閉用) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#1B2A5E] text-[#EBE78B] flex items-center justify-center border-2 border-[#EBE78B] shadow-[4px_4px_0px_0px_#EBE78B] hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
        aria-label="チャットを開く"
      >
        {isOpen ? (
          <span className="text-xl font-bold select-none">✕</span>
        ) : (
          <span className="text-2xl select-none">💬</span>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* チャットウィンドウ */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[340px] sm:w-[380px] h-[520px] max-h-[75vh] bg-white border-2 border-[#1B2A5E] rounded-3xl shadow-[8px_8px_0px_0px_#1B2A5E] overflow-hidden flex flex-col z-50">
          {/* ヘッダー */}
          <div className="bg-[#1B2A5E] text-white p-4 flex items-center justify-between border-b-2 border-[#1B2A5E]">
            <div className="flex items-center gap-2">
              <span className="text-lg select-none">💅</span>
              <div>
                <h3 className="font-extrabold text-sm tracking-wide leading-none">ギャルアシスタント こゅまちゃむ</h3>
                <span className="text-[9px] text-[#EBE78B] font-bold tracking-widest mt-0.5 block uppercase">
                  Powered by OpenAI & Mastra
                </span>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-[10px] font-black border border-[#EBE78B]/50 hover:bg-white/10 text-[#EBE78B] px-2 py-0.5 rounded-full transition-all cursor-pointer"
            >
              リセット
            </button>
          </div>

          {/* 会話表示エリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-orange-50/10">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-full bg-[#1B2A5E] text-[#EBE78B] text-[10px] flex items-center justify-center font-bold flex-shrink-0 select-none">
                      こ
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs font-medium leading-relaxed ${
                      isBot
                        ? "bg-[#EBE78B]/20 text-[#1B2A5E] border-2 border-[#1B2A5E]/20 rounded-tl-none shadow-sm"
                        : "bg-[#1B2A5E] text-white rounded-tr-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            {isSending && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1B2A5E] text-[#EBE78B] text-[10px] flex items-center justify-center font-bold flex-shrink-0 select-none animate-pulse">
                  こ
                </div>
                <div className="bg-[#EBE78B]/20 text-[#1B2A5E] border-2 border-[#1B2A5E]/20 rounded-2xl rounded-tl-none px-3.5 py-2 text-xs font-bold flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#1B2A5E] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#1B2A5E] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#1B2A5E] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* クイック質問タグ */}
          <div className="px-4 py-2 bg-gray-50 border-t border-[#1B2A5E]/10 flex flex-wrap gap-1.5 overflow-x-auto select-none">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleQuickQuestion(q)}
                disabled={isSending}
                className="text-[9px] font-extrabold px-2.5 py-1 border border-[#1B2A5E] rounded-full bg-white hover:bg-[#EBE78B]/10 active:bg-orange-50 text-[#1B2A5E] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* メッセージ入力フォーム */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t-2 border-[#1B2A5E] flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isSending}
              placeholder="こゅまに質問してな☆"
              className="flex-1 border-2 border-[#1B2A5E] rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 bg-gray-50/50 focus:outline-none focus:bg-white transition-all disabled:opacity-75"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="px-4 border-2 border-[#1B2A5E] bg-[#1B2A5E] text-white rounded-xl text-xs font-bold hover:bg-[#1B2A5E]/90 disabled:opacity-50 disabled:bg-gray-200 disabled:border-gray-200 transition-all cursor-pointer select-none"
            >
              送信
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
