import React, { createContext, useState, useContext, useEffect } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebarExpanded');
    return saved !== null ? JSON.parse(saved) : window.innerWidth > 1024;
  });

  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    localStorage.setItem('sidebarExpanded', JSON.stringify(newState));
  };

  useEffect(() => {
    const handleResize = () => {
      const shouldExpand = window.innerWidth > 1024;
      setIsSidebarExpanded(shouldExpand);
      localStorage.setItem('sidebarExpanded', JSON.stringify(shouldExpand));
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
} 