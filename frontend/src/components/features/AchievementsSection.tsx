'use client';

import React from "react";
import { Achievement, getImageUrl } from "@/services/api";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  if (achievements.length === 0) return null;

  return (
    <div className="space-y-4 text-[#1B2A5E]">
      <div className="border-t-2 border-dashed border-[#1B2A5E]/30 pt-6">
        <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase block mb-3">
          Achievements / Projects
        </span>
        
        <div className="space-y-4">
          {achievements.map((ach, index) => {
            const getAchievementFallback = (title: string) => {
              if (title.includes("ContextSwitch") || title.includes("コッチー")) return "/contextswitch-1.png";
              if (title.includes("問い合わせ") || title.includes("みらい賃貸")) return "/toiawase-app.png";
              if (title.includes("推し活")) return "/oshikatsu-app.png";
              return "/portfolio-app.png";
            };

            const fallbackSrc = getAchievementFallback(ach.title);
            const imgSrc = ach.image_url ? getImageUrl(ach.image_url) : fallbackSrc;

            return (
              <div 
                key={ach.id} 
                className="border-2 border-[#1B2A5E] rounded-2xl p-4 bg-white/80 backdrop-blur-sm shadow-[4px_4px_0px_0px_#1B2A5E] flex flex-col sm:flex-row gap-4 items-center relative overflow-hidden"
              >
                {/* ミニチケット用の切り欠き (デザインの細部へのこだわり) */}
                <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-[#EBE78B] border-r-2 border-[#1B2A5E] transform -translate-y-1/2 z-10"></div>
                <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-[#EBE78B] border-l-2 border-[#1B2A5E] transform -translate-y-1/2 z-10"></div>

                <div className="relative w-full sm:w-28 aspect-video sm:aspect-square rounded-xl overflow-hidden border-2 border-[#1B2A5E] bg-white flex-shrink-0 shadow-sm">
                  <img
                    src={imgSrc}
                    alt={ach.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackSrc) {
                        target.src = fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-2 w-full text-left">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-sm sm:text-base">{ach.title}</h4>
                    <span className="text-[9px] font-black px-2 py-0.5 border border-[#1B2A5E] rounded-full bg-white select-none">
                      #0{index + 1}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-600 font-medium">
                    {ach.description}
                  </p>
                  
                  {/* 技術バッジ */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ach.tech_stack.split(",").map((tech) => (
                      <span
                        key={tech.trim()}
                        className="text-[9px] font-extrabold px-2 py-0.5 border border-[#1B2A5E]/50 rounded-full bg-[#DDD7A4]/20 tracking-wider leading-none"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
