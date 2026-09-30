const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar_url?: string;
  avatar_image_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  image_url?: string;
  image_id?: number;
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  order: number;
}

export interface InquiryInput {
  name: string;
  email: string;
  message: string;
}

export interface InquiryResponse extends InquiryInput {
  id: number;
  created_at: string;
}

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${API_BASE_URL}/api/profile`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function fetchAchievements(): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE_URL}/api/achievements`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch achievements");
  return res.json();
}

export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE_URL}/api/skills`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function submitInquiry(data: InquiryInput): Promise<InquiryResponse> {
  const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit inquiry");
  return res.json();
}

// 画像の完全なURLを取得するヘルパー関数
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("/")) {
    return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
  }
  return path;
}

export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Failed to send chat message");
  const data = await res.json();
  return data.reply;
}

// ===== 管理者用 API =====

export async function uploadImage(file: File): Promise<{ id: number; filename: string }> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE_URL}/api/images`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}

export async function updateProfile(data: { title: string; bio: string; avatar_image_id?: number }): Promise<Profile> {
  const res = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

export async function createAchievement(data: Omit<Achievement, "id" | "image_url">): Promise<Achievement> {
  const res = await fetch(`${API_BASE_URL}/api/achievements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create achievement");
  return res.json();
}

export async function updateAchievement(id: number, data: Omit<Achievement, "id" | "image_url">): Promise<Achievement> {
  const res = await fetch(`${API_BASE_URL}/api/achievements/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update achievement");
  return res.json();
}

export async function deleteAchievement(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/achievements/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete achievement");
}

export async function createSkill(data: Omit<Skill, "id">): Promise<Skill> {
  const res = await fetch(`${API_BASE_URL}/api/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create skill");
  return res.json();
}

export async function updateSkill(id: number, data: Omit<Skill, "id">): Promise<Skill> {
  const res = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update skill");
  return res.json();
}

export async function deleteSkill(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete skill");
}

