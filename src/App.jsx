import { DataProvider } from './context/DataContext';
import { ChatProvider } from './context/ChatContext';
import { AnimatedBackground, FadeIn } from './animations/Animations';
import { FileUpload } from './components/FileUpload';
import { DataTable } from './components/DataTable';
import { DataSummary } from './components/DataSummary';
import { ChatInterface } from './components/ChatInterface';
import { useData } from './context/DataContext';
import './App.css';

function AppContent() {
  const { parsedData, fileName } = useData();

  return (
    <div className="app">
      <AnimatedBackground />
      
      <div className="app-container">
        <FadeIn>
          <header className="app-header">
            <h1>🤖 AI Chat + Data Insight</h1>
            <p>Upload, analyze, and chat with your data using AI</p>
          </header>
        </FadeIn>

        <FadeIn delay={0.1}>
          <FileUpload />
        </FadeIn>

        {parsedData && (
          <>
            <FadeIn delay={0.2}>
              <div className="file-name-badge">
                📊 Analyzing: <strong>{fileName}</strong>
              </div>
            </FadeIn>

            <DataSummary />
            <DataTable />
            <ChatInterface />
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </DataProvider>
  );
}

export default App;
