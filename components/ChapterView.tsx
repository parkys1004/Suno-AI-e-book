import React from 'react';
import { Chapter } from '../types';
import { PlayCircle, CheckCircle2, Music4 } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  isAppendix?: boolean;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, isAppendix = false }) => {
  // Helper to detect bold markdown-style **text** and render it
  const renderText = (text: string) => {
    // Split by newlines first to handle paragraph breaks in the input string
    return text.split('\n\n').map((paragraph, pIdx) => {
      const parts = paragraph.split(/(\*\*.*?\*\*|`.*?`)/g);
      
      const renderedParts = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-extrabold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-1 rounded transition-colors">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400 font-mono text-sm border border-slate-200 dark:border-slate-600 transition-colors">{part.slice(1, -1)}</code>;
        }
        return part;
      });

      // Wrap each paragraph in a span or div if there are multiple paragraphs
      return (
        <span key={pIdx} className="block mb-4 last:mb-0">
          {renderedParts}
        </span>
      );
    });
  };

  return (
    <div id={chapter.id} className="min-h-[50vh] py-12 px-6 lg:px-10 scroll-mt-20">
      {/* Chapter Header */}
      <div className={`mb-12 pb-6 border-b border-slate-200 dark:border-slate-700 transition-colors ${isAppendix ? 'border-amber-200/50 dark:border-amber-900/30' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
           {isAppendix ? (
             <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm transition-colors">
               Special Section
             </span>
           ) : (
             <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-sm border border-indigo-100 dark:border-indigo-800 transition-colors">
               Chapter
             </span>
           )}
        </div>
        <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4 leading-tight break-keep transition-colors">
          {chapter.title}
        </h2>
        {chapter.subTitle && (
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed break-keep transition-colors">{chapter.subTitle}</p>
        )}
      </div>

      {/* Chapter Content */}
      <div className="space-y-16">
        {chapter.content.map((section, idx) => (
          <div key={idx} id={section.id} className="group scroll-mt-32">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3 transition-colors">
              <span className="w-1.5 h-8 rounded-full bg-indigo-500 block" />
              {section.title}
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {section.items.map((item, i) => (
                <div key={i} className="relative bg-white dark:bg-slate-800 p-6 lg:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-900/10 transition-all duration-300">
                  {/* Decorative Icon for specific contexts */}
                  {(item.includes("Free Plan") || item.includes("Pro Plan")) && (
                    <div className="absolute top-6 right-6 text-emerald-500 dark:text-emerald-400 opacity-20 hidden md:block">
                      <CheckCircle2 size={32} />
                    </div>
                  )}
                  {(item.includes("GMIV") || item.includes("Mumble")) && (
                    <div className="absolute top-6 right-6 text-indigo-500 dark:text-indigo-400 opacity-20 hidden md:block">
                      <Music4 size={32} />
                    </div>
                  )}

                  <div className="text-slate-700 dark:text-slate-300 leading-8 text-lg text-justify break-keep transition-colors">
                    {renderText(item)}
                  </div>

                  {/* Visual enhancement for Examples inside text */}
                  {item.includes('예시:') && (
                    <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 flex items-start gap-3 transition-colors">
                      <PlayCircle size={20} className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="text-base font-medium">Example Tip</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};