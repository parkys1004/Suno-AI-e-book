import React from 'react';
import { Lightbulb, Moon, Sun } from 'lucide-react';
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

  // Width increased from w-72 to w-80 for better text fit
  const baseClasses = `
    fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out
    lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col shadow-lg lg:shadow-none
  `;
  
  const mobileClasses = isMobileOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <div className={`${baseClasses} ${mobileClasses}`}>
      {/* Header Area */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight tracking-tight">
          {BOOK_DATA.title}
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {BOOK_DATA.subTitle}
        </p>
      </div>
      
      {/* Navigation Area */}
      <nav className="flex-1 p-5 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Main Chapters */}
        {BOOK_DATA.chapters.map((chapter) => (
          <div key={chapter.id} className="space-y-3">
            {/* Top Level Chapter Title */}
            <button
              onClick={() => handleNavClick(chapter.id)}
              className={`w-full text-left group transition-colors px-2 py-1 -ml-2 rounded-lg ${
                activeId === chapter.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-xs font-black uppercase tracking-widest mb-1 ${
                   activeId === chapter.id 
                   ? 'text-indigo-600 dark:text-indigo-400' 
                   : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {chapter.title.split(':')[0]} {/* Shows "1부", "시작하며" etc */}
                </span>
                <span className={`text-lg font-bold leading-snug ${
                  activeId === chapter.id 
                    ? 'text-indigo-900 dark:text-indigo-100' 
                    : 'text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
                }`}>
                  {chapter.title.split(':')[1] || chapter.title}
                </span>
              </div>
            </button>
            
            {/* Sub Sections (Nested) - Increased font size and padding */}
            <div className="ml-3 pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-2">
              {chapter.content.map((subItem) => {
                const isActive = activeId === (subItem.id || chapter.id);
                return (
                  <button
                    key={subItem.id || subItem.title}
                    onClick={() => handleNavClick(subItem.id || chapter.id)}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-start text-sm font-medium transition-all duration-200 leading-relaxed ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10 translate-x-1'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`mt-2 mr-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                      isActive ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`} />
                    <span>{subItem.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Appendix */}
        <div className="pt-6 mt-6 border-t-2 border-dashed border-slate-100 dark:border-slate-800">
           <div className="space-y-3">
            <button
              onClick={() => handleNavClick(BOOK_DATA.appendix.id)}
              className={`w-full text-left flex items-center group transition-colors px-2 py-1 -ml-2 rounded-lg ${
                activeId === BOOK_DATA.appendix.id
                  ? 'bg-amber-50 dark:bg-amber-900/20' 
                  : 'hover:bg-amber-50/50 dark:hover:bg-amber-900/10'
              }`}
            >
              <Lightbulb size={18} className={`mr-2.5 ${
                activeId === BOOK_DATA.appendix.id ? 'text-amber-600' : 'text-slate-400 group-hover:text-amber-500'
              }`} />
              <span className={`text-lg font-bold ${
                 activeId === BOOK_DATA.appendix.id ? 'text-amber-800 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {BOOK_DATA.appendix.title}
              </span>
            </button>
            
             <div className="ml-3 pl-4 border-l-2 border-amber-100 dark:border-amber-900/20 space-y-2">
              {BOOK_DATA.appendix.content.map((subItem) => {
                 const isActive = activeId === (subItem.id || BOOK_DATA.appendix.id);
                 return (
                  <button
                    key={subItem.id || subItem.title}
                    onClick={() => handleNavClick(subItem.id || BOOK_DATA.appendix.id)}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-start text-sm font-medium transition-all duration-200 leading-relaxed ${
                      isActive
                        ? 'text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-900/10 translate-x-1'
                        : 'text-slate-500 dark:text-slate-400 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                    }`}
                  >
                    <span className={`mt-2 mr-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                       isActive ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`} />
                    <span>{subItem.title}</span>
                  </button>
                 );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer / Theme Toggle */}
      <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <>
              <Sun size={20} className="text-amber-500" />
              <span className="text-base font-bold">Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={20} className="text-indigo-500" />
              <span className="text-base font-bold">Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};