/**
 * 管理者用 API 呼び出しフック。
 * Firebase ID トークンを Authorization: Bearer ヘッダーに自動付与する。
 */
import { useAuth } from "@/context/AuthContext";
import { useCallback } from "react";
import {
  updateProfile,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  createSkill,
  updateSkill,
  deleteSkill,
  uploadImage,
  Profile,
  Achievement,
  Skill,
} from "@/services/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useAdminApi() {
  const { getIdToken } = useAuth();

  /** Authorization ヘッダー付きの fetch ラッパー */
  const authFetch = useCallback(
    async (input: string, init: RequestInit = {}): Promise<Response> => {
      const token = await getIdToken();
      const headers = new Headers(init.headers as HeadersInit);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return fetch(input, { ...init, headers });
    },
    [getIdToken]
  );

  // ---- Profile ----
  const adminUpdateProfile = useCallback(
    async (data: { title: string; bio: string; avatar_image_id?: number }): Promise<Profile> => {
      const res = await authFetch(`${API_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("プロフィールの更新に失敗しました。");
      return res.json();
    },
    [authFetch]
  );

  // ---- Achievements ----
  const adminCreateAchievement = useCallback(
    async (data: Omit<Achievement, "id" | "image_url">): Promise<Achievement> => {
      const res = await authFetch(`${API_BASE_URL}/api/achievements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("実績の作成に失敗しました。");
      return res.json();
    },
    [authFetch]
  );

  const adminUpdateAchievement = useCallback(
    async (id: number, data: Partial<Omit<Achievement, "id" | "image_url">>): Promise<Achievement> => {
      const res = await authFetch(`${API_BASE_URL}/api/achievements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("実績の更新に失敗しました。");
      return res.json();
    },
    [authFetch]
  );

  const adminDeleteAchievement = useCallback(
    async (id: number): Promise<void> => {
      const res = await authFetch(`${API_BASE_URL}/api/achievements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("実績の削除に失敗しました。");
    },
    [authFetch]
  );

  // ---- Skills ----
  const adminCreateSkill = useCallback(
    async (data: Omit<Skill, "id">): Promise<Skill> => {
      const res = await authFetch(`${API_BASE_URL}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("スキルの作成に失敗しました。");
      return res.json();
    },
    [authFetch]
  );

  const adminUpdateSkill = useCallback(
    async (id: number, data: Partial<Omit<Skill, "id">>): Promise<Skill> => {
      const res = await authFetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("スキルの更新に失敗しました。");
      return res.json();
    },
    [authFetch]
  );

  const adminDeleteSkill = useCallback(
    async (id: number): Promise<void> => {
      const res = await authFetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("スキルの削除に失敗しました。");
    },
    [authFetch]
  );

  // ---- Image Upload (認証不要だが統一) ----
  const adminUploadImage = useCallback(
    async (file: File): Promise<{ id: number; filename: string }> => {
      const token = await getIdToken();
      const form = new FormData();
      form.append("file", file);
      const headers = new Headers();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      const res = await fetch(`${API_BASE_URL}/api/images`, {
        method: "POST",
        headers,
        body: form,
      });
      if (!res.ok) throw new Error("画像のアップロードに失敗しました。");
      return res.json();
    },
    [getIdToken]
  );

  return {
    adminUpdateProfile,
    adminCreateAchievement,
    adminUpdateAchievement,
    adminDeleteAchievement,
    adminCreateSkill,
    adminUpdateSkill,
    adminDeleteSkill,
    adminUploadImage,
  };
}
