import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUp, ChevronRight } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ChapterView } from './components/ChapterView';
import { BOOK_DATA } from './constants';

const App: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(BOOK_DATA.chapters[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Handle navigation click (scroll to element)
  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Adjust scroll position to account for sticky header on mobile or padding
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveId(id);
  };

  // Scroll logic
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setReadingProgress(progress);

    const scrollPosition = window.scrollY + 150; // Offset
    
    // Check main chapters
    for (const chapter of BOOK_DATA.chapters) {
      const element = document.getElementById(chapter.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveId(chapter.id);
        }
      }
    }

    // Check appendix
    const appendixEl = document.getElementById(BOOK_DATA.appendix.id);
    if (appendixEl && scrollPosition >= appendixEl.offsetTop) {
      setActiveId(BOOK_DATA.appendix.id);
    }

    // Show/Hide Scroll Top button
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Reading Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div 
          className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        activeId={activeId} 
        onNavigate={handleNavigate} 
        isMobileOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full lg:w-auto bg-slate-50/50 dark:bg-slate-950">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between lg:hidden transition-colors">
          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate pr-4">
             {BOOK_DATA.title}
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Content Wrapper */}
        <main className="max-w-5xl mx-auto pb-32">
           {/* Cover / Hero Section */}
           <div className="relative overflow-hidden h-[28rem] lg:h-[34rem] bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-8 text-center text-white mb-12 lg:rounded-b-[4rem] shadow-2xl shadow-indigo-900/20">
              {/* Background Glow Effects */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
              
              <div className="relative max-w-4xl z-10 flex flex-col items-center">
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  2026 Revised Edition
                </span>
                <h1 className="text-4xl lg:text-7xl font-black mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 drop-shadow-sm">
                  {BOOK_DATA.title}
                </h1>
                <p className="text-lg lg:text-2xl font-light text-slate-300 max-w-2xl leading-relaxed">
                  {BOOK_DATA.subTitle}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleNavigate('intro')}
                    className="px-8 py-3.5 bg-white text-indigo-950 rounded-full font-bold text-base hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10"
                  >
                    지금 읽기 시작
                  </button>
                  <button 
                    onClick={() => handleNavigate('part-1')}
                    className="px-8 py-3.5 bg-indigo-600/30 text-white border border-indigo-400/30 rounded-full font-semibold text-base hover:bg-indigo-600/50 backdrop-blur-sm transition-all"
                  >
                    목차 보기
                  </button>
                </div>
              </div>
           </div>

           {/* Render Chapters with TOC inserted after Intro */}
           {BOOK_DATA.chapters.map((chapter, index) => (
             <React.Fragment key={chapter.id}>
               <ChapterView chapter={chapter} />

               {/* Insert TOC (Table of Contents) Card */}
               {index === 0 && (
                 <div className="py-12 px-4 md:px-8 lg:px-12">
                   <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all transform hover:scale-[1.005] duration-500">
                     <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                       <span>📚</span> 
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                         목차
                       </span> 
                       <span className="text-sm font-medium text-slate-400 dark:text-slate-500 ml-auto tracking-wide uppercase">Table of Contents</span>
                     </h2>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                       {BOOK_DATA.chapters.slice(1).map((c) => ( // Skip intro for TOC
                         <div key={c.id} className="space-y-4">
                           <button 
                             onClick={() => handleNavigate(c.id)}
                             className="text-left w-full group"
                           >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Part {c.title.split('부')[0]}</span>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors"></div>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                                {c.title.split(':')[1]?.trim() || c.title}
                              </h3>
                           </button>

                           <div className="space-y-1">
                              {c.content.map((sub, idx) => (
                                <button
                                  key={sub.id || idx}
                                  onClick={() => handleNavigate(sub.id || c.id)}
                                  className="w-full text-left py-2 px-3 -ml-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center group/item transition-all"
                                >
                                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 mr-2 group-hover/item:text-indigo-500 transition-colors" />
                                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 leading-relaxed truncate">
                                    {sub.title}
                                  </span>
                                </button>
                              ))}
                           </div>
                         </div>
                       ))}
                       
                       {/* Appendix Column */}
                       <div className="space-y-4 md:col-span-2 pt-6 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                           <button 
                             onClick={() => handleNavigate(BOOK_DATA.appendix.id)}
                             className="text-left w-full group"
                           >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">Bonus</span>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors"></div>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                                {BOOK_DATA.appendix.title}
                              </h3>
                           </button>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {BOOK_DATA.appendix.content.map((sub, idx) => (
                                <button
                                  key={sub.id || idx}
                                  onClick={() => handleNavigate(sub.id || BOOK_DATA.appendix.id)}
                                  className="w-full text-left py-2 px-3 -ml-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/10 flex items-center group/item transition-all"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 dark:bg-amber-600 group-hover/item:bg-amber-500 mr-3 transition-colors" />
                                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 leading-relaxed">
                                    {sub.title}
                                  </span>
                                </button>
                              ))}
                           </div>
                       </div>
                     </div>

                   </div>
                 </div>
               )}
             </React.Fragment>
           ))}

           {/* Render Appendix */}
           <ChapterView chapter={BOOK_DATA.appendix} isAppendix />
        </main>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white shadow-xl hover:shadow-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default App;