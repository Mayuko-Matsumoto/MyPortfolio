import React from "react";
import { Profile, getImageUrl } from "@/services/api";

interface ProfileSectionProps {
  profile: Profile | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  if (!profile) return null;

  const avatarSrc = profile.avatar_url 
    ? getImageUrl(profile.avatar_url) 
    : "/my-image.png";

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
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-2xl font-black tracking-wide">松本 麻由子</h2>
              {/* 背景透過のスタイリッシュな GitHub ねこアイコン */}
              <a
                href="https://github.com/Mayuko-Matsumoto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub @Mayuko-Matsumoto"
                className="text-[#1B2A5E] hover:text-[#1B2A5E]/70 transition-all cursor-pointer p-1 rounded-full hover:scale-115 active:scale-95 inline-flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
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
