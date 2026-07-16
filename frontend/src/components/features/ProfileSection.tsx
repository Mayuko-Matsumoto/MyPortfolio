import React from "react";
import { Profile, getImageUrl } from "@/services/api";

interface ProfileSectionProps {
  profile: Profile | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  if (!profile) return null;

  const avatarSrc = profile.avatar_url 
    ? getImageUrl(profile.avatar_url) 
    : "/my-photo.jpeg";

  // プロフィール更新日時 (updated_at) からチケットシリアル番号を動的生成
  const getTicketNumber = () => {
    if (!profile.updated_at) return "2026-0601";
    try {
      const date = new Date(profile.updated_at);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}${day}`;
    } catch (e) {
      return "2026-0601";
    }
  };

  return (
    <div className="space-y-6 text-[#1B2A5E]">
      {/* 未来の回収（椎名林檎オマージュ＆まゆこの未来）チケットヘッダー */}
      <div className="flex justify-between items-start border-b-2 border-[#1B2A5E] pb-4 select-none">
        <div className="font-black text-2xl sm:text-3xl tracking-tighter leading-none flex flex-col">
          <span>
            未来<span className="text-xs align-super font-bold">の</span>回収
          </span>
          <span className="text-[9px] font-extrabold tracking-[0.1em] text-[#1B2A5E]/70 mt-1 uppercase">
            FUTURE RECOVERY / MAYU EXPO2606
          </span>
        </div>
        <div className="text-right font-mono text-xs font-bold leading-tight">
          No. {getTicketNumber()}
          <div className="text-[9px] text-[#1B2A5E]/60 mt-1">GENERAL ADMISSION</div>
        </div>
      </div>

      {/* アーティスト情報 (プロフィール) */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pt-2">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#1B2A5E] shadow-[3px_3px_0px_0px_#1B2A5E] flex-shrink-0 bg-white">
          <img
            src={avatarSrc}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-3.5 text-center sm:text-left w-full">
          <div>
            <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase block mb-0.5">Developer</span>
            <h2 className="text-2xl font-black tracking-wide">松本 麻由子</h2>
          </div>
          <div>
            <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase block mb-0.5">Story</span>
            <p className="text-sm font-bold leading-tight">{profile.title}</p>
          </div>
        </div>
      </div>

      {/* 自己紹介文 */}
      <div className="border-2 border-[#1B2A5E] rounded-2xl p-4 sm:p-5 bg-white/80 backdrop-blur-sm shadow-[4px_4px_0px_0px_#1B2A5E]">
        <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase block mb-1">Description</span>
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium text-gray-700">
          {profile.bio}
        </p>
      </div>
    </div>
  );
};
