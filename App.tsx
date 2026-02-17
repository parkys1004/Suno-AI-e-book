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
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
    setActiveId(id);
  };

  // Scrollspy logic to update active sidebar item
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100; // Offset
    
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
    <div className="flex bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
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
      <div className="flex-1 w-full lg:w-auto bg-slate-50/30 dark:bg-slate-900">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between lg:hidden transition-colors">
          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate pr-4">
             {BOOK_DATA.title}
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Content Wrapper */}
        <main className="max-w-6xl mx-auto pb-24">
           {/* Cover / Hero Section (Visual Only) */}
           <div className="h-64 lg:h-80 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 flex items-center justify-center p-8 text-center text-white mb-8 lg:rounded-b-[3rem] shadow-xl transition-colors">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-6xl font-black mb-4 tracking-tight leading-tight">{BOOK_DATA.title}</h1>
                <p className="text-lg lg:text-2xl font-light opacity-90 text-indigo-100">{BOOK_DATA.subTitle}</p>
                <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                  Interactive E-Book Guide
                </div>
              </div>
           </div>

           {/* Render Chapters with TOC inserted after the first chapter (Intro) */}
           {BOOK_DATA.chapters.map((chapter, index) => (
             <React.Fragment key={chapter.id}>
               <ChapterView chapter={chapter} />

               {/* Insert TOC between Intro (index 0) and Part 1 (index 1) */}
               {index === 0 && (
                 <div className="py-12 px-6 lg:px-10">
                   <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 dark:border-slate-700 transition-all">
                     <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                       <span>📖</span> 목차 <span className="text-lg font-normal text-slate-400 dark:text-slate-500 ml-2">Table of Contents</span>
                     </h2>
                     
                     <div className="space-y-8">
                       {BOOK_DATA.chapters.map((c) => (
                         <div key={c.id} className="space-y-3">
                           {/* Main Chapter / Part Title */}
                           <button 
                             onClick={() => handleNavigate(c.id)}
                             className="text-left w-full group"
                           >
                              <h3 className={`text-xl font-bold transition-colors ${
                                c.id === 'intro' 
                                  ? 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400' 
                                  : 'text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300'
                              }`}>
                                {c.title}
                              </h3>
                              {c.subTitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.subTitle}</p>}
                           </button>

                           {/* Sub Sections / Chapters */}
                           <div className="grid gap-2 pl-4 border-l-2 border-slate-100 dark:border-slate-700">
                              {c.content.map((sub, idx) => (
                                <button
                                  key={sub.id || idx}
                                  onClick={() => handleNavigate(sub.id || c.id)}
                                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-start group/item transition-all"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover/item:bg-indigo-400 mr-3 flex-shrink-0 transition-colors" />
                                  <span className="text-slate-600 dark:text-slate-400 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 leading-relaxed">
                                    {sub.title}
                                  </span>
                                </button>
                              ))}
                           </div>
                         </div>
                       ))}
                       
                       {/* Appendix */}
                       <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-700 mt-6">
                           <button 
                             onClick={() => handleNavigate(BOOK_DATA.appendix.id)}
                             className="text-left w-full group"
                           >
                              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
                                {BOOK_DATA.appendix.title}
                              </h3>
                              {BOOK_DATA.appendix.subTitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{BOOK_DATA.appendix.subTitle}</p>}
                           </button>

                           <div className="grid gap-2 pl-4 border-l-2 border-amber-100 dark:border-amber-900/30">
                              {BOOK_DATA.appendix.content.map((sub, idx) => (
                                <button
                                  key={sub.id || idx}
                                  onClick={() => handleNavigate(sub.id || BOOK_DATA.appendix.id)}
                                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-start group/item transition-all"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 dark:bg-amber-700 group-hover/item:bg-amber-500 mr-3 flex-shrink-0 transition-colors" />
                                  <span className="text-slate-600 dark:text-slate-400 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 leading-relaxed">
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
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white shadow-xl hover:shadow-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;