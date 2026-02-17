import React, { useState } from 'react';
import { Chapter } from '../types';
import { PlayCircle, CheckCircle2, Music4, Copy, Check } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  isAppendix?: boolean;
}

// Component to handle code blocks with copy functionality
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 group">
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white backdrop-blur-md transition-all border border-white/10"
          title="Copy prompt"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-slate-900 rounded-lg p-5 pt-10 overflow-x-auto border border-slate-700 shadow-inner">
        <pre className="text-sm font-mono text-indigo-300 leading-relaxed whitespace-pre-wrap break-all">
          {code.trim()}
        </pre>
      </div>
    </div>
  );
};

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, isAppendix = false }) => {
  
  // Advanced rendering for text with support for code blocks (```code```)
  const renderItemContent = (text: string) => {
    // Regex to split by code blocks: ``` content ```
    // The capture group includes the backticks to identify the separator
    const codeBlockRegex = /(```[\s\S]*?```)/g;
    const parts = text.split(codeBlockRegex);

    return parts.map((part, index) => {
      // If it is a code block
      if (part.startsWith('```') && part.endsWith('```')) {
        // Remove the backticks and optional language identifier (e.g. ```text)
        const content = part.replace(/^```[a-z]*\n?|```$/g, '');
        return <CodeBlock key={`code-${index}`} code={content} />;
      }

      // Standard text processing (bold, inline code, newlines)
      return (
        <div key={`text-${index}`} className="mb-4 last:mb-0">
          {part.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="mb-6 last:mb-0">
              {paragraph.split(/(\*\*.*?\*\*|`.*?`)/g).map((subPart, subIdx) => {
                if (subPart.startsWith('**') && subPart.endsWith('**')) {
                  return (
                    <strong key={subIdx} className="font-extrabold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-1 rounded transition-colors">
                      {subPart.slice(2, -2)}
                    </strong>
                  );
                }
                if (subPart.startsWith('`') && subPart.endsWith('`')) {
                  return (
                    <code key={subIdx} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400 font-mono text-sm border border-slate-200 dark:border-slate-600 transition-colors">
                      {subPart.slice(1, -1)}
                    </code>
                  );
                }
                return subPart;
              })}
            </p>
          ))}
        </div>
      );
    });
  };

  return (
    <div id={chapter.id} className="min-h-[50vh] py-16 px-4 md:px-8 lg:px-12 scroll-mt-20">
      {/* Chapter Header */}
      <div className={`mb-16 pb-8 border-b border-slate-200 dark:border-slate-800 transition-colors ${isAppendix ? 'border-amber-200/50 dark:border-amber-900/30' : ''}`}>
        <div className="flex items-center gap-3 mb-6">
           {isAppendix ? (
             <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest shadow-sm transition-colors">
               Special Section
             </span>
           ) : (
             <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-sm border border-indigo-100 dark:border-indigo-800 transition-colors">
               Chapter
             </span>
           )}
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6 leading-tight break-keep transition-colors">
          {chapter.title}
        </h2>
        {chapter.subTitle && (
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed break-keep transition-colors border-l-4 border-slate-300 dark:border-slate-700 pl-6">
            {chapter.subTitle}
          </p>
        )}
      </div>

      {/* Chapter Content */}
      <div className="space-y-20">
        {chapter.content.map((section, idx) => (
          <div key={idx} id={section.id} className="group scroll-mt-32">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 flex items-center gap-4 transition-colors">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600 block shadow-lg shadow-indigo-500/30" />
              {section.title}
            </h3>
            
            <div className="grid grid-cols-1 gap-8">
              {section.items.map((item, i) => (
                <div key={i} className="relative bg-white dark:bg-slate-900/50 p-6 md:p-8 lg:p-10 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none dark:hover:bg-slate-900 transition-all duration-300">
                  {/* Decorative Icon for specific contexts */}
                  {(item.includes("Free Plan") || item.includes("Pro Plan")) && (
                    <div className="absolute top-8 right-8 text-emerald-500 dark:text-emerald-400 opacity-10 hidden lg:block">
                      <CheckCircle2 size={40} />
                    </div>
                  )}
                  {(item.includes("GMIV") || item.includes("Mumble")) && (
                    <div className="absolute top-8 right-8 text-indigo-500 dark:text-indigo-400 opacity-10 hidden lg:block">
                      <Music4 size={40} />
                    </div>
                  )}

                  <div className="text-slate-700 dark:text-slate-300 leading-9 text-lg text-justify break-keep tracking-wide transition-colors">
                    {renderItemContent(item)}
                  </div>

                  {/* Visual enhancement for Examples inside text (Legacy support for '예시:') */}
                  {item.includes('예시:') && (
                    <div className="mt-6 p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-indigo-800 dark:text-indigo-200 flex items-start gap-4 transition-colors">
                      <PlayCircle size={24} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                         <span className="text-sm font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block mb-1">Practical Tip</span>
                         <span className="text-base font-medium opacity-90">내용을 확인하고 직접 적용해보세요.</span>
                      </div>
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