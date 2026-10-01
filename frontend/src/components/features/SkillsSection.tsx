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
    tools: "TOOLS",
    tool: "TOOL"
  };

  return (
    <div className="space-y-4 text-[#1B2A5E]">
      <div className="border-t-2 border-dashed border-[#1B2A5E]/30 pt-6">
        <span className="text-[9px] font-black tracking-widest text-[#1B2A5E]/60 uppercase block mb-3">
          Skills / Areas
        </span>

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

        {/* チケットの注釈（NOTES）風・極小レベルガイド */}
        <div className="text-[9px] font-mono text-[#1B2A5E]/60 text-right mt-2.5 tracking-tight">
          * LEVEL: ★5 得意・強み(AI/RAG) / ★4 実務自走可 / ★3 基礎理解
        </div>
      </div>
    </div>
  );
};
