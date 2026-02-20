import React from 'react';
import { Lightbulb, Moon, Sun, Music, Book, Disc, ShoppingBag, Crown, Sparkles } from 'lucide-react';
import { BOOK_DATA } from '../constants';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeId, 
  onNavigate, 
  isMobileOpen, 
  closeMobileMenu,
  isDarkMode,
  toggleTheme
}) => {
  const handleNavClick = (id: string) => {
    onNavigate(id);
    closeMobileMenu();
  };

  const baseClasses = `
    fixed inset-y-0 left-0 z-40 w-80 glass-panel border-r border-slate-200/50 dark:border-slate-800/50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
    lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none
  `;
  
  const mobileClasses = isMobileOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <div className={`${baseClasses} ${mobileClasses}`}>
      {/* Header Area */}
      <div className="p-8 border-b border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Music size={20} />
            </div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            AI MUSIC <br/><span className="text-indigo-600 dark:text-indigo-400">BUSINESS</span>
            </h1>
        </div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2 pl-1">
          SUNO AI MASTER GUIDE 2026
        </p>
      </div>
      
      {/* Navigation Area */}
      <nav className="flex-1 p-6 space-y-12 overflow-y-auto custom-scrollbar hover:scroll-auto">
        {/* Main Chapters */}
        {BOOK_DATA.chapters.map((chapter, idx) => (
          <div key={chapter.id} className="space-y-4">
            {/* Top Level Chapter Title */}
            <button
              onClick={() => handleNavClick(chapter.id)}
              className={`w-full text-left group transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-2">
                 <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border ${
                     activeId === chapter.id 
                     ? 'bg-indigo-600 border-indigo-600 text-white' 
                     : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                 } transition-colors`}>
                    {idx + 1}
                 </span>
                 <span className={`text-sm font-bold uppercase tracking-widest ${
                   activeId === chapter.id 
                   ? 'text-indigo-600 dark:text-indigo-400' 
                   : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {chapter.title.split(':')[0]}
                </span>
              </div>
              <div className={`pl-12 text-lg font-bold transition-colors duration-300 ${
                  activeId === chapter.id 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}>
                  {chapter.title.split(':')[1] || chapter.title}
              </div>
            </button>
            
            {/* Sub Sections */}
            <div className="ml-4 pl-8 border-l border-slate-200 dark:border-slate-800 space-y-2">
              {chapter.content.map((subItem) => {
                const isActive = activeId === (subItem.id || chapter.id);
                return (
                  <button
                    key={subItem.id || subItem.title}
                    onClick={() => handleNavClick(subItem.id || chapter.id)}
                    className={`w-full text-left py-2.5 px-4 rounded-lg flex items-center text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 translate-x-1 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="leading-tight">{subItem.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Appendix */}
        <div className="pt-8 border-t border-dashed border-slate-200 dark:border-slate-800/50">
           <div className="space-y-4">
            <button
              onClick={() => handleNavClick(BOOK_DATA.appendix.id)}
              className={`w-full text-left flex items-center group transition-all px-5 py-4 rounded-xl border ${
                activeId === BOOK_DATA.appendix.id
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50' 
                  : 'bg-slate-50 dark:bg-slate-800/30 border-transparent hover:border-amber-200 dark:hover:border-amber-900'
              }`}
            >
              <Lightbulb size={24} className={`mr-4 ${
                activeId === BOOK_DATA.appendix.id ? 'text-amber-500' : 'text-slate-400 group-hover:text-amber-500'
              }`} />
              <div>
                  <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      activeId === BOOK_DATA.appendix.id ? 'text-amber-600 dark:text-amber-500' : 'text-slate-400'
                  }`}>Bonus</span>
                  <span className={`block text-lg font-bold ${
                    activeId === BOOK_DATA.appendix.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    {BOOK_DATA.appendix.title}
                  </span>
              </div>
            </button>
            
             <div className="pl-2 space-y-2">
              {BOOK_DATA.appendix.content.map((subItem) => {
                 const isActive = activeId === (subItem.id || BOOK_DATA.appendix.id);
                 const isDeluxe = subItem.title.includes("DELUXE");

                 if (isDeluxe) {
                    return (
                        <button
                            key={subItem.id || subItem.title}
                            onClick={() => handleNavClick(subItem.id || BOOK_DATA.appendix.id)}
                            className={`w-full text-left py-3.5 px-5 mt-4 rounded-xl flex items-center text-sm font-bold transition-all duration-300 border relative overflow-hidden group shadow-md ${
                            isActive
                                ? 'bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/20 border-amber-300 dark:border-amber-600 text-amber-900 dark:text-amber-200 shadow-amber-500/20'
                                : 'bg-gradient-to-r from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-900 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/10'
                            }`}
                        >
                             {/* Shine Effect */}
                             <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out`}></div>
                            
                            <Crown size={16} className={`mr-3 flex-shrink-0 ${isActive ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-amber-500'}`} fill={isActive ? "currentColor" : "none"} />
                            <span className="relative z-10 break-keep leading-tight">{subItem.title}</span>
                        </button>
                    )
                 }

                 return (
                  <button
                    key={subItem.id || subItem.title}
                    onClick={() => handleNavClick(subItem.id || BOOK_DATA.appendix.id)}
                    className={`w-full text-left py-2.5 px-4 rounded-lg flex items-center text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-900/10'
                        : 'text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-300'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isActive ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                    {subItem.title}
                  </button>
                 );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer / Theme Toggle */}
      <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        
        {/* Kmong Button (Desktop Only - Hidden on Mobile) */}
        <a
          href="https://kmong.com/self-marketing/730531/ZQh4nXZpK5"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center justify-center gap-2 w-full py-3 mb-4 rounded-xl bg-[#ffd400] text-slate-900 font-bold shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:-translate-y-0.5 transition-all duration-300 group"
        >
          <ShoppingBag size={18} className="text-slate-900" />
          <span>크몽 전자책 구매</span>
        </a>

        <button
          onClick={toggleTheme}
          className="relative w-full overflow-hidden flex items-center justify-between p-1 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors duration-300"
          aria-label="Toggle Dark Mode"
        >
          <div className={`absolute left-1 top-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white dark:bg-slate-700 rounded-full shadow-sm transition-transform duration-300 ${isDarkMode ? 'translate-x-full' : 'translate-x-0'}`}></div>
          
          <div className={`relative z-10 w-1/2 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-colors ${!isDarkMode ? 'text-slate-800' : 'text-slate-500'}`}>
            <Sun size={14} /> Light
          </div>
          <div className={`relative z-10 w-1/2 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
            <Moon size={14} /> Dark
          </div>
        </button>
      </div>
    </div>
  );
};