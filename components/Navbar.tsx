"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NotificationItem {
  id: string;
  message: string;
  timestamp: string;
}

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  // 🌓 THEME STATE ENGINE
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // 1. Load dynamic theme setting on system mount
    const savedTheme = localStorage.getItem("loop_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const savedUser = localStorage.getItem("loop_user");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { console.error(e); }
    }

    const loadNotifications = () => {
      const savedLogs = localStorage.getItem("loop_notifications");
      if (savedLogs) {
        try {
          const parsed = JSON.parse(savedLogs);
          setNotifications(parsed);
          const unreadStatus = localStorage.getItem("loop_has_unread") === "true";
          setHasUnread(unreadStatus);
        } catch (e) { console.error(e); }
      }
    };
    loadNotifications();

    const handleAuthChange = () => {
      const activeUser = localStorage.getItem("loop_user");
      setUser(activeUser ? JSON.parse(activeUser) : null);
    };
    const handleNewFeedback = () => loadNotifications();

    window.addEventListener("local-auth-update", handleAuthChange);
    window.addEventListener("new-feedback-received", handleNewFeedback);
    return () => {
      window.removeEventListener("local-auth-update", handleAuthChange);
      window.removeEventListener("new-feedback-received", handleNewFeedback);
    };
  }, []);

  // 🌓 TOGGLE THEME CORE FUNCTION
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("loop_theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("loop_theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("loop_user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 px-6 py-4 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
          Project LOOP
        </span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700/50">
          v1.0
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all">
            Home
          </Link>
          {!user && (
            <>
              <Link href="/login" className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all">
                Login
              </Link>
              <Link href="/register" className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all">
                Register
              </Link>
            </>
          )}
          <Link href="/dashboard" className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all">
            Dashboard
          </Link>
          <Link href="/feedback" className="ml-2 text-xs font-mono uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100 px-3.5 py-1.5 rounded-lg font-medium border border-zinc-200 dark:border-zinc-700/50 transition-all">
            Feedback
          </Link>
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

        {/* 🌓 THEME SWITCH SWITCH CONTROL BUTTON */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl border bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all"
        >
          {isDarkMode ? (
            /* Sun Icon for Light Mode conversion pointer */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V23M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M21 12h-2.25m-13.5 0H3m16.35-6.72l-1.59 1.59M6.41 17.59l-1.59 1.59M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" />
            </svg>
          ) : (
            /* Moon Icon for Dark Mode recovery parameter */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
            </svg>
          )}
        </button>

        {/* 🔔 NOTIFICATION BELL */}
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-xl border transition-all ${showNotifications ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" : "bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-900 text-zinc-500 dark:text-zinc-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
            {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-zinc-950/95 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-2xl z-50">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
                <span className="text-[10px] font-mono text-zinc-400">System Alerts</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {notifications.length === 0 ? <div className="text-center py-4 text-[11px] font-mono text-zinc-400">// No logs</div> : notifications.map((log) => (<div key={log.id} className="p-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-lg text-xs font-mono"><p className="text-zinc-700 dark:text-zinc-300">{log.message}</p></div>))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Info Display */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-3.5 pr-2 py-1.5 rounded-xl">
              <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 hidden md:inline">{user.name}</span>
              <button onClick={handleDisconnect} className="text-[10px] font-mono uppercase bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 px-2 py-1 rounded-md">Logout</button>
            </div>
          ) : (
            <div className="items-center gap-1.5 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-900 px-3 py-1.5 rounded-full hidden md:flex"><span className="w-1.5 h-1.5 bg-zinc-400 rounded-full" /><span className="text-[9px] font-mono text-zinc-400">// GUEST</span></div>
          )}
        </div>
      </div>
    </nav>
  );
}