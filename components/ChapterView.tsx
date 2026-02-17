import React, { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { PlayCircle, CheckCircle2, Music4, Copy, Check, Terminal, Square, CheckSquare, Gift, Sparkles, Star, Crown, ChevronDown } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  isAppendix?: boolean;
}

// Helper to render inline formatting (bold, code)
const renderInlineText = (text: string) => {
  return text.split(/(\*\*.*?\*\*|`.*?`)/g).map((subPart, subIdx) => {
    // Bold text (**text**)
    if (subPart.startsWith('**') && subPart.endsWith('**')) {
      return (
        <strong key={subIdx} className="font-extrabold text-slate-800 dark:text-slate-100">
          {subPart.slice(2, -2)}
        </strong>
      );
    }
    // Inline code (`text`)
    if (subPart.startsWith('`') && subPart.endsWith('`')) {
      return (
        <code key={subIdx} className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 font-mono text-sm border border-slate-200 dark:border-slate-700 shadow-sm">
          {subPart.slice(1, -1)}
        </code>
      );
    }
    return subPart;
  });
};

// Interactive Code Block Component with Copy Functionality
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 group rounded-xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-slate-900/5 dark:ring-white/10">
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2 border-b border-slate-700">
        <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Terminal size={12} />
                <span>Prompt Editor</span>
            </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Editor Content */}
      <div className="bg-[#0d1117] p-6 overflow-x-auto custom-scrollbar">
        <pre className="text-sm font-mono text-indigo-300 leading-relaxed whitespace-pre-wrap break-all selection:bg-indigo-500/30 selection:text-white">
          {code.trim()}
        </pre>
      </div>
    </div>
  );
};

// Interactive Checklist Component
const InteractiveChecklist: React.FC<{ content: string; storageKey: string }> = ({ content, storageKey }) => {
  const lines = content.split('\n');
  
  // Identify all checkable lines (both main * [ ] and sub - [ ])
  const checkableIndices = lines.map((line, idx) => {
    const trimmed = line.trim();
    return (trimmed.startsWith('* [ ]') || trimmed.startsWith('- [ ]')) ? idx : -1;
  }).filter(idx => idx !== -1);

  const [checkedState, setCheckedState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCheckedState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse checklist state");
      }
    }
  }, [storageKey]);

  const toggleCheck = (lineIndex: number) => {
    const newState = { ...checkedState, [lineIndex]: !checkedState[lineIndex] };
    setCheckedState(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  // Calculate progress
  const totalChecks = checkableIndices.length;
  const checkedCount = checkableIndices.filter(idx => checkedState[idx]).length;
  const progress = totalChecks > 0 ? Math.round((checkedCount / totalChecks) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      {totalChecks > 0 && (
        <div className="mb-8 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-extrabold text-indigo-900 dark:text-indigo-300 tracking-tight">PROGRESS</span>
            <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{progress}% ({checkedCount}/{totalChecks})</span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>
      )}

      {lines.map((line, idx) => {
        const trimmed = line.trim();
        const isMainItem = trimmed.startsWith('* [ ]');
        const isSubItem = trimmed.startsWith('- [ ]');

        if (isMainItem || isSubItem) {
          const text = trimmed.replace(/^(\*|-)\s*\[\s*\]\s*/, '');
          const isChecked = !!checkedState[idx];
          
          return (
            <div 
              key={idx} 
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer group select-none ${
                isSubItem ? 'ml-6 sm:ml-8 pl-4 border-l-2 border-slate-100 dark:border-slate-800' : ''
              } ${
                isChecked 
                  ? 'bg-emerald-50/50 dark:bg-emerald-900/10' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className={`mt-0.5 transition-transform duration-200 ${isChecked ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
                 <div className={`transition-colors ${isChecked ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600 group-hover:text-indigo-400'}`}>
                    {isChecked ? <CheckSquare size={20} fill="currentColor" className="text-white dark:text-slate-900" /> : <Square size={20} />}
                 </div>
              </div>
              
              <span className={`text-[15px] leading-relaxed transition-all duration-300 text-left ${
                isChecked 
                  ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-600' 
                  : 'text-slate-700 dark:text-slate-300'
              } ${isMainItem && !isChecked ? 'font-semibold' : ''}`}>
                {renderInlineText(text)}
              </span>
            </div>
          );
        }

        // Header / Section Title within checklist
        if (trimmed.startsWith('✅')) {
             return (
                 <h4 key={idx} className="mt-10 mb-5 text-lg font-black text-slate-800 dark:text-slate-200 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border-l-4 border-indigo-500 text-left">
                     {renderInlineText(line)}
                 </h4>
             )
        }

        // Standard bullet point
        if (trimmed.startsWith('* ')) {
            return (
                <div key={idx} className="flex gap-3 mb-2 pl-2">
                    <span className="text-indigo-400 mt-1.5">•</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-left">
                        {renderInlineText(line.substring(2))}
                    </p>
                </div>
            )
        }

        // Empty line
        if (!trimmed) return <div key={idx} className="h-2"></div>;

        // Default text
        return (
          <p key={idx} className="mb-2 leading-relaxed text-slate-600 dark:text-slate-400 text-sm text-left">
             {renderInlineText(line)}
          </p>
        );
      })}
    </div>
  );
};

// Deluxe Accordion Item Component
const DeluxeAccordionItem: React.FC<{ item: string; index: number; renderContent: (text: string) => React.ReactNode }> = ({ item, index, renderContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Parse Title and Content
  // Assuming format: "Title\n\nContent" or just "Content"
  const splitIndex = item.indexOf('\n\n');
  const titleText = splitIndex !== -1 ? item.substring(0, splitIndex) : item;
  const contentText = splitIndex !== -1 ? item.substring(splitIndex + 2) : "";

  return (
    <div className="mb-4 rounded-2xl overflow-hidden border border-amber-200 dark:border-amber-800 shadow-md hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 bg-white dark:bg-slate-900 group">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className={`w-full text-left p-5 flex items-center justify-between transition-colors duration-300 ${
            isOpen 
             ? 'bg-gradient-to-r from-amber-100 via-yellow-50 to-white dark:from-amber-900/40 dark:via-yellow-900/20 dark:to-slate-900' 
             : 'bg-white hover:bg-amber-50 dark:bg-slate-900 dark:hover:bg-amber-900/10'
         }`}
       >
          <div className="flex items-center gap-3 pr-4">
             {/* Number Badge */}
             <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border flex-shrink-0 transition-colors ${
                 isOpen ? 'bg-amber-500 border-amber-500 text-white' : 'bg-amber-100 dark:bg-amber-900/50 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 group-hover:border-amber-400'
             }`}>
                {index + 1}
             </span>
             <h4 className={`text-base font-bold leading-tight text-left ${isOpen ? 'text-amber-900 dark:text-amber-100' : 'text-slate-700 dark:text-slate-200 group-hover:text-amber-800 dark:group-hover:text-amber-300'}`}>
                {renderInlineText(titleText)}
             </h4>
          </div>
          <ChevronDown 
            className={`flex-shrink-0 text-amber-500 dark:text-amber-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
            size={20} 
          />
       </button>
       
       <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
         <div className="p-6 pt-2 bg-slate-50/50 dark:bg-slate-900/50 border-t border-amber-100 dark:border-amber-900/30">
            {renderContent(contentText)}
         </div>
       </div>
    </div>
  )
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, isAppendix = false }) => {
  
  // Advanced rendering logic to handle text formatting and code blocks
  const renderContent = (text: string, cardId?: string) => {
    // Check if this card content is a checklist (heuristic: contains "* [ ]")
    if (text.includes('* [ ]') || text.includes('- [ ]')) {
        return <InteractiveChecklist content={text} storageKey={`checklist-${cardId || 'generic'}`} />;
    }

    // Regex matches triple backtick code blocks: ``` content ```
    const codeBlockRegex = /(```[\s\S]*?```)/g;
    const parts = text.split(codeBlockRegex);

    return parts.map((part, index) => {
      // 1. Handle Code Blocks
      if (part.startsWith('```') && part.endsWith('```')) {
        const content = part.replace(/^```[a-z]*\n?|```$/g, '');
        return <CodeBlock key={`code-${index}`} code={content} />;
      }

      // 2. Handle Regular Text (with inline formatting)
      return (
        <div key={`text-${index}`} className="mb-4 last:mb-0">
          {part.split('\n\n').map((paragraph, pIdx) => {
             // Skip empty paragraphs
             if (!paragraph.trim()) return null;

             return (
                <p key={pIdx} className="mb-6 last:mb-0 leading-8 text-lg text-slate-700 dark:text-slate-300 text-left lg:text-justify break-keep whitespace-pre-line">
                  {renderInlineText(paragraph)}
                </p>
             )
          })}
        </div>
      );
    });
  };

  return (
    <div id={chapter.id} className="min-h-[50vh] py-16 px-4 md:px-8 lg:px-12 scroll-mt-20">
      {/* Chapter Header */}
      <div className={`mb-16 pb-10 border-b border-slate-200 dark:border-slate-800 transition-colors ${isAppendix ? 'border-amber-200/50 dark:border-amber-900/30' : ''}`}>
        <div className="flex items-center gap-3 mb-8">
           {isAppendix ? (
             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[11px] font-bold uppercase tracking-widest shadow-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
               Special Section
             </span>
           ) : (
             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-widest shadow-sm border border-indigo-100 dark:border-indigo-800">
               <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
               Chapter
             </span>
           )}
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6 leading-tight break-keep text-left">
          {chapter.title}
        </h2>
        {chapter.subTitle && (
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed break-keep border-l-4 border-slate-200 dark:border-slate-700 pl-6 text-left">
            {chapter.subTitle}
          </p>
        )}
      </div>

      {/* Chapter Content Sections */}
      <div className="space-y-16">
        {chapter.content.map((section, idx) => {
          // Check for special "Deluxe" section to style differently
          const isDeluxe = section.id === "appendix-deluxe";

          if (isDeluxe) {
            // Special Rendering for DELUXE Section: Intro Banner + Accordion List
            const [introItem, ...accordionItems] = section.items;

            return (
                <div key={idx} id={section.id} className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-8">
                         <h3 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-3 text-amber-600 dark:text-amber-400 text-left">
                             {section.title}
                             <Crown className="text-amber-500 animate-pulse" size={28} />
                         </h3>
                    </div>

                    <div className="pl-0 lg:pl-2">
                        {/* 1. Intro Banner Card */}
                        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-100 via-yellow-50 to-white dark:from-amber-950 dark:via-yellow-900/20 dark:to-slate-900 border border-amber-300 dark:border-amber-700 shadow-xl shadow-amber-500/10 mb-10 overflow-hidden group">
                             {/* Decoration */}
                             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-[60px] rounded-full pointer-events-none"></div>
                             <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/10 blur-[40px] rounded-full pointer-events-none"></div>
                             <Sparkles className="absolute top-6 right-6 text-amber-400 animate-pulse" size={24} />

                             <div className="relative z-10 text-left">
                                 <span className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md">Premium Access</span>
                                 <div className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">
                                     {renderContent(introItem)}
                                 </div>
                             </div>
                        </div>

                        {/* 2. Accordion List */}
                        <div className="space-y-2">
                            {accordionItems.map((item, i) => (
                                <DeluxeAccordionItem 
                                    key={i} 
                                    item={item} 
                                    index={i} 
                                    renderContent={(t) => renderContent(t, `${section.id}-acc-${i}`)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )
          }

          // Standard Rendering
          return (
            <div key={idx} id={section.id} className="group scroll-mt-32">
              
              <div className="flex items-start gap-4 mb-8">
                  <div className="hidden lg:flex flex-col items-center gap-1 mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)] bg-indigo-600 dark:bg-indigo-500`}></div>
                      <div className={`w-px h-full min-h-[50px] bg-gradient-to-b to-transparent from-indigo-500/50`}></div>
                  </div>
                  <h3 className={`text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-3 text-slate-800 dark:text-slate-100 text-left`}>
                      {section.title}
                  </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-10 pl-0 lg:pl-6">
                {section.items.map((item, i) => (
                  <div key={i} className={`relative p-6 md:p-10 rounded-3xl border transition-all duration-500 group/card overflow-hidden bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 dark:hover:shadow-none`}>
                    
                    {/* Background Hover Effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10`}></div>

                    {(item.includes("Free Plan") || item.includes("Pro Plan")) && (
                      <div className="absolute top-8 right-8 text-emerald-500 dark:text-emerald-400 opacity-20 hidden lg:block transform group-hover/card:scale-110 transition-transform duration-500">
                        <CheckCircle2 size={48} />
                      </div>
                    )}
                    {(item.includes("GMIV") || item.includes("Mumble")) && (
                      <div className="absolute top-8 right-8 text-indigo-500 dark:text-indigo-400 opacity-20 hidden lg:block transform group-hover/card:scale-110 transition-transform duration-500">
                        <Music4 size={48} />
                      </div>
                    )}

                    {/* Main Text Content */}
                    <div className="relative z-10 text-left">
                      {renderContent(item, `${section.id}-${i}`)}
                    </div>

                    {/* Visual enhancement for 'Practical Tip' */}
                    {item.includes('예시:') && (
                      <div className="mt-8 p-6 bg-indigo-50/80 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex flex-col sm:flex-row items-start gap-5 backdrop-blur-sm text-left">
                        <div className="p-3 bg-white dark:bg-indigo-900 rounded-full shadow-md text-indigo-600 dark:text-indigo-300">
                          <PlayCircle size={24} fill="currentColor" className="text-white dark:text-indigo-900" />
                        </div>
                        <div>
                           <span className="text-xs font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 block mb-2">Practical Tip</span>
                           <p className="text-base font-medium text-indigo-900 dark:text-indigo-100 opacity-90 leading-relaxed whitespace-pre-line">
                              이 예시는 수익화 과정에서 빈번하게 마주치는 상황입니다. 반드시 메모해두세요.
                           </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};