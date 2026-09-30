import { useState, useCallback } from "react";
import { sendChatMessage } from "@/services/api";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "やっほー！「未来の回収」ポートフォリオへようこそ☆ まゆこむの専属AIギャルアシスタント「こゅまちゃむ」やで〜！まゆこむの経歴やスキル、実績について、こゅまがめっちゃ詳しく推し紹介するからなんでも気軽に聞いてな〜！💅💖",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsSending(true);
      setError(null);

      try {
        const replyText = await sendChatMessage(text);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: replyText || "ごめん、上手く答えられへんかったわ。もう一回聞いてみて！",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        console.error("Chat error:", err);
        setError("通信エラーが発生したわ。Mastraが動いてるか確認してな！");
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          sender: "bot",
          text: "ごめんやで！バックエンドのAIに繋がらへんかったわ。APIキーの設定とか、コンテナが動いてるか確認してみてな！",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsSending(false);
      }
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "チャットリセットしたでー！まゆこむについて知りたいこと、なんでもこゅまに聞いてや☆",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isSending,
    error,
    sendMessage,
    clearChat,
  };
}
