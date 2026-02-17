import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUp, ChevronRight, BookOpen, Sparkles, ChevronDown, ShoppingBag } from 'lucide-react';
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
      // Offset for sticky header/padding
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Only update activeId if it's not the TOC guide itself (to keep sidebar sync logical)
    if (id !== 'toc-guide') {
        setActiveId(id);
    }
  };

  // Scroll logic
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setReadingProgress(progress);

    const scrollPosition = window.scrollY + 150; 
    
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
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500 overflow-x-hidden">
      
      {/* Reading Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-150 ease-out rounded-r-full"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
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
      <div className="w-full lg:pl-80 relative transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between lg:hidden transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">S</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">
               {BOOK_DATA.title}
            </span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <main className="max-w-6xl mx-auto pb-32">
           {/* Amazing Hero Section */}
           <div className="relative min-h-[90vh] flex items-center justify-center p-6 lg:p-12 text-center text-white mb-20 overflow-hidden selection:bg-indigo-500/50 selection:text-white">
              {/* Animated Background - Darker & Deeper for better readability */}
              <div className="absolute inset-0 bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 animate-gradient-x opacity-90"></div>
                  {/* Subtle radial glow to center attention */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]"></div>
              </div>
              
              {/* Floating Orbs - More blurred and subtle */}
              <div className="absolute top-1/4 -left-20 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[120px] animate-float duration-[8000ms]"></div>
              <div className="absolute bottom-1/4 -right-20 w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[140px] animate-float duration-[10000ms] delay-1000"></div>
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

              {/* Main Content Container */}
              <div className="relative z-10 max-w-5xl w-full flex flex-col items-center animate-fade-in-up px-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(139,92,246,0.2)] ring-1 ring-white/10 group hover:bg-white/10 transition-all cursor-default select-none">
                  <Sparkles size={16} className="text-amber-300 animate-pulse" />
                  <span className="text-sm font-bold tracking-[0.2em] text-indigo-100 uppercase group-hover:text-white transition-colors">2026 Revised Edition</span>
                </div>
                
                {/* Main Title - Huge & Clean */}
                <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black mb-8 tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-300 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] select-none">
                  {BOOK_DATA.title}
                </h1>
                
                {/* Divider Line */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full mb-10 opacity-80"></div>
                
                {/* Subtitle - Better Line Height and Contrast */}
                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-200/90 max-w-4xl leading-relaxed mb-14 drop-shadow-lg break-keep">
                  {BOOK_DATA.subTitle}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
                  <button 
                    onClick={() => handleNavigate('intro')}
                    className="group relative w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      지금 정독하기 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button 
                    onClick={() => handleNavigate('toc-guide')}
                    className="group w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-3"
                  >
                    <BookOpen size={20} className="text-indigo-300 group-hover:text-white transition-colors" /> 
                    목차 전체보기
                  </button>
                </div>

                {/* Scroll Hint */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-40 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleNavigate('intro')}>
                    <span className="text-xs uppercase tracking-widest text-white/70">Scroll Down</span>
                    <ChevronDown size={24} className="text-white" />
                </div>
              </div>
           </div>

           {/* Render Chapters with Interactive TOC */}
           {BOOK_DATA.chapters.map((chapter, index) => (
             <React.Fragment key={chapter.id}>
               <ChapterView chapter={chapter} />

               {/* Table of Contents Card (Inserted after Intro) */}
               {index === 0 && (
                 <div id="toc-guide" className="py-12 px-4 md:px-8 lg:px-12 animate-fade-in-up scroll-mt-32" style={{ animationDelay: '0.2s' }}>
                   <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-14 shadow-2xl shadow-indigo-500/10 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden group">
                     {/* Decorative Background Blob */}
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

                     <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-4">
                       <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-2xl shadow-inner">📚</span> 
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                         목차 가이드
                       </span> 
                     </h2>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                       {BOOK_DATA.chapters.slice(1).map((c) => (
                         <div key={c.id} className="space-y-5">
                           <button 
                             onClick={() => handleNavigate(c.id)}
                             className="text-left w-full group/title"
                           >
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30">
                                  Part {c.title.split('부')[0]}
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800"></div>
                              </div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400 transition-colors duration-300">
                                {c.title.split(':')[1]?.trim() || c.title}
                              </h3>
                           </button>

                           <div className="space-y-2">
                              {c.content.map((sub, idx) => (
                                <button
                                  key={sub.id || idx}
                                  onClick={() => handleNavigate(sub.id || c.id)}
                                  className="w-full text-left py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-indigo-100 dark:hover:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-between group/item transition-all duration-300"
                                >
                                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 truncate pr-4">
                                    {sub.title}
                                  </span>
                                  <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover/item:text-indigo-500 transition-colors" />
                                </button>
                              ))}
                           </div>
                         </div>
                       ))}
                       
                       {/* Appendix Column */}
                       <div className="md:col-span-2 pt-8 mt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                           <button 
                             onClick={() => handleNavigate(BOOK_DATA.appendix.id)}
                             className="text-left w-full group/bonus mb-6"
                           >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-1">
                                  <Sparkles size={12} /> Bonus Track
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover/bonus:text-amber-600 dark:group-hover/bonus:text-amber-400 transition-colors">
                                {BOOK_DATA.appendix.title}
                              </h3>
                           </button>

                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {BOOK_DATA.appendix.content.map((sub, idx) => (
                                <button
                                  key={sub.id || idx}
                                  onClick={() => handleNavigate(sub.id || BOOK_DATA.appendix.id)}
                                  className="text-left py-3 px-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/20 border border-amber-100/50 dark:border-amber-900/30 flex items-center group/item transition-all duration-300"
                                >
                                  <div className="w-2 h-2 rounded-full bg-amber-400 group-hover/item:bg-amber-500 mr-3 shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-colors"></div>
                                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold group-hover/item:text-slate-900 dark:group-hover/item:text-white">
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

      {/* Floating Kmong Button (Mobile Only) */}
      <a
        href="https://kmong.com/self-marketing/730531/ZQh4nXZpK5"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-6 lg:hidden z-50 flex items-center gap-2 px-5 py-3 bg-[#ffd400] text-slate-900 rounded-full font-bold shadow-xl shadow-yellow-400/30 hover:scale-105 transition-transform duration-300"
        aria-label="크몽 전자책 구매"
      >
        <ShoppingBag size={20} className="text-slate-900" />
        <span className="text-sm">전자책 구매</span>
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 hover:shadow-indigo-600/50 hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default App;