'use client';

import { useEffect, useState } from "react";
import {
  fetchProfile,
  fetchAchievements,
  fetchSkills,
  Profile,
  Achievement,
  Skill,
} from "@/services/api";

export function usePortfolio() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [profData, achData, skillData] = await Promise.all([
          fetchProfile(),
          fetchAchievements(),
          fetchSkills(),
        ]);
        setProfile(profData);
        // order順にソートして格納
        setAchievements(achData.sort((a, b) => a.order - b.order));
        setSkills(skillData.sort((a, b) => a.order - b.order));
      } catch (err: any) {
        console.error("Failed to load portfolio data:", err);
        setError("データの読み込みに失敗しました。");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { profile, achievements, skills, loading, error };
}
