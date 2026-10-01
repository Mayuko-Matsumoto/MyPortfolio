import React from "react";
import { Skill } from "@/services/api";

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (skills.length === 0) return null;

  // カテゴリごとにスキルをグループ化
  const categories: { [key: string]: Skill[] } = {};
  skills.forEach((skill) => {
    const cat = skill.category.toLowerCase();
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(skill);
  });

  const categoryLabelMap: { [key: string]: string } = {
    frontend: "FRONTEND",
    backend: "BACKEND",
    database: "DATABASE",
    tools: "TOOLS"
  };

  return (
    <div className="space-y-4 text-[#1B2A5E]">
      <div className="border-t-2 border-dashed border-[#1B2A5E]/30 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 gap-2">
          <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase">
            Skills / Areas
          </span>
          {/* 星評価の凡例（基準） */}
          <div className="text-[10px] font-medium text-[#1B2A5E]/90 bg-white/70 backdrop-blur-sm border border-[#1B2A5E]/20 px-3 py-1.5 rounded-xl shadow-sm flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-extrabold text-[#1B2A5E]">★基準:</span>
            <span><strong className="font-bold text-[#1B2A5E]">★5</strong> 得意・強み(RAG/AI実装等)</span>
            <span><strong className="font-bold text-[#1B2A5E]">★4</strong> 実務開発で自走可</span>
            <span><strong className="font-bold text-[#1B2A5E]">★3</strong> 基礎理解・キャッチアップ中</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(categories).map(([catKey, skillList]) => (
            <div 
              key={catKey} 
              className="border-2 border-[#1B2A5E] rounded-2xl p-4 bg-white/80 backdrop-blur-sm shadow-[4px_4px_0px_0px_#1B2A5E] relative pt-6"
            >
              <h5 className="absolute -top-3 left-4 bg-white border-2 border-[#1B2A5E] text-[#1B2A5E] px-3 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider">
                {categoryLabelMap[catKey] || catKey.toUpperCase()}
              </h5>
              
              <ul className="space-y-2">
                {skillList.map((skill) => (
                  <li key={skill.id} className="flex items-center justify-between text-[#1B2A5E] text-xs">
                    <span className="font-bold">{skill.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] select-none ${
                            idx < skill.level ? "text-[#1B2A5E]" : "text-gray-200"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
