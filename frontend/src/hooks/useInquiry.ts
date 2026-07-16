'use client';

import { useState } from "react";
import { submitInquiry, InquiryInput } from "@/services/api";

export function useInquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendInquiry = async (data: InquiryInput) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);
    try {
      await submitInquiry(data);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Failed to send inquiry:", err);
      setError("お問合せの送信に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { sendInquiry, isSubmitting, isSuccess, error };
}
