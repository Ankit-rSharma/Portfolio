import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type TabState = 'about' | 'projects' | 'contact';

interface TabContextType {
  activeTab: TabState;
  setActiveTab: (tab: TabState) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTabState] = useState<TabState>('about');

  useEffect(() => {
    const savedTab = localStorage.getItem('portfolio-active-tab') as TabState;
    if (savedTab && ['about', 'projects', 'contact'].includes(savedTab)) {
      setActiveTabState(savedTab);
    }
  }, []);

  const setActiveTab = (tab: TabState) => {
    setActiveTabState(tab);
    localStorage.setItem('portfolio-active-tab', tab);
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
