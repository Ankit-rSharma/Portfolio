import type { FC } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { TabProvider } from './context/TabContext';
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
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TabProvider>
        <PortfolioRenderer />
      </TabProvider>
    </ThemeProvider>
  );
}

export default App;
