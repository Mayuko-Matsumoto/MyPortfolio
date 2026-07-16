import React, { useState } from "react";
import { useInquiry } from "@/hooks/useInquiry";

export const InquiryForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { sendInquiry, isSubmitting, isSuccess, error } = useInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    await sendInquiry({ name, email, message });
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="text-[#1B2A5E] space-y-4">
      <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase block text-center mb-1">
        Ticket Gate / Contact
      </span>

      {isSuccess ? (
        <div className="border-2 border-dashed border-[#1B2A5E]/50 rounded-2xl p-6 bg-white/90 text-center space-y-3">
          <span className="text-3xl block select-none">🎟️</span>
          <h4 className="font-extrabold text-sm">チケットがもぎられました！</h4>
          <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
            お問合せ（半券の送信）を受け付けました。<br />内容を確認し、ご連絡いたします！
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 border-2 border-[#1B2A5E] rounded-full bg-white text-[10px] font-extrabold hover:bg-orange-50/50 transition-all cursor-pointer"
          >
            もう一度もぎる
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          {error && (
            <div className="border-2 border-red-500 rounded-2xl p-3 bg-red-50 text-xs text-red-600 font-bold">
              {error}
            </div>
          )}

          <div className="space-y-3.5">
            <div>
              <label htmlFor="inquiry-name" className="block text-[10px] font-extrabold text-[#1B2A5E] mb-1">
                お名前 (NAME)
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border-2 border-[#1B2A5E] bg-white/80 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none sm:text-xs transition-all"
                placeholder="山田 太郎"
              />
            </div>

            <div>
              <label htmlFor="inquiry-email" className="block text-[10px] font-extrabold text-[#1B2A5E] mb-1">
                メールアドレス (EMAIL)
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-[#1B2A5E] bg-white/80 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none sm:text-xs transition-all"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label htmlFor="inquiry-message" className="block text-[10px] font-extrabold text-[#1B2A5E] mb-1">
                メッセージ (MESSAGE)
              </label>
              <textarea
                id="inquiry-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border-2 border-[#1B2A5E] bg-white/80 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none sm:text-xs transition-all resize-none"
                placeholder="メッセージを入力"
              />
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 border-2 border-[#1B2A5E] bg-[#1B2A5E] hover:bg-[#1B2A5E]/90 text-white rounded-full text-xs font-bold tracking-widest transition-all disabled:bg-gray-400 disabled:border-gray-400 shadow-sm cursor-pointer select-none"
            >
              {isSubmitting ? "もぎり中..." : "チケットをもぎる (送信)"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
