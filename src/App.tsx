import type { FC } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import TerminalLayout from './layouts/TerminalLayout';
import CanvasLayout from './layouts/CanvasLayout';
import MinimalDocLayout from './layouts/MinimalDocLayout';

const PortfolioRenderer: FC = () => {
  const { layoutTheme } = useTheme();

  return (
    <>
      {layoutTheme === 'terminal' && <TerminalLayout />}
      {layoutTheme === 'canvas' && <CanvasLayout />}
      {layoutTheme === 'minimal' && <MinimalDocLayout />}
      <ThemeSwitcher />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <PortfolioRenderer />
    </ThemeProvider>
  );
}

export default App;
