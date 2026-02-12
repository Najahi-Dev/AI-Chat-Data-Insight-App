import { createContext, useContext, useState, useCallback } from 'react';
import OpenAI from 'openai';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (userMessage, dataContext) => {
    setLoading(true);
    setError(null);

    // Add user message
    const userMsg = { role: 'user', content: userMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        // Simulate AI response when no API key is available
        const simulatedResponse = generateSimulatedResponse(userMessage, dataContext);
        const aiMsg = {
          role: 'assistant',
          content: simulatedResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
        return;
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      // Build context from data
      let contextPrompt = '';
      if (dataContext?.summary) {
        contextPrompt = `You are analyzing a CSV dataset with the following characteristics:\n`;
        contextPrompt += `- Total rows: ${dataContext.summary.rowCount}\n`;
        contextPrompt += `- Total columns: ${dataContext.summary.columnCount}\n`;
        contextPrompt += `- Columns:\n`;
        dataContext.summary.columns.forEach((col) => {
          contextPrompt += `  * ${col.name} (${col.type}): ${col.count} values, ${col.unique} unique\n`;
          if (col.type === 'numeric') {
            contextPrompt += `    - Min: ${col.min}, Max: ${col.max}, Avg: ${col.avg.toFixed(2)}\n`;
          }
        });
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful data analyst assistant. ${contextPrompt}`,
          },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
      });

      const aiMsg = {
        role: 'assistant',
        content: response.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError('Failed to get AI response: ' + err.message);
      const errorMsg = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const value = {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Simulated AI responses when no API key is available
function generateSimulatedResponse(question, dataContext) {
  if (!dataContext?.summary) {
    return "Please upload a CSV file first so I can analyze your data and answer questions about it.";
  }

  const { summary } = dataContext;
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('how many') || lowerQuestion.includes('count')) {
    return `Based on the uploaded data:\n- Total rows: ${summary.rowCount}\n- Total columns: ${summary.columnCount}\n- Column names: ${summary.columns.map(c => c.name).join(', ')}`;
  }

  if (lowerQuestion.includes('columns') || lowerQuestion.includes('fields')) {
    return `The dataset has ${summary.columnCount} columns:\n${summary.columns.map(c => `- ${c.name} (${c.type})`).join('\n')}`;
  }

  if (lowerQuestion.includes('summary') || lowerQuestion.includes('overview')) {
    let response = `Dataset Overview:\n- ${summary.rowCount} rows and ${summary.columnCount} columns\n\nColumn Details:\n`;
    summary.columns.forEach(col => {
      response += `\n${col.name}:\n`;
      response += `  - Type: ${col.type}\n`;
      response += `  - Unique values: ${col.unique}\n`;
      if (col.type === 'numeric') {
        response += `  - Range: ${col.min} to ${col.max}\n`;
        response += `  - Average: ${col.avg.toFixed(2)}\n`;
      }
    });
    return response;
  }

  const numericColumns = summary.columns.filter(c => c.type === 'numeric');
  if (numericColumns.length > 0) {
    const col = numericColumns[0];
    return `I've analyzed your data. Here's an insight:\n\nThe "${col.name}" column contains numeric data ranging from ${col.min} to ${col.max}, with an average value of ${col.avg.toFixed(2)}.\n\n${summary.rowCount} total records with ${summary.columnCount} different attributes.\n\nNote: Configure your OpenAI API key in .env file for more advanced AI insights.`;
  }

  return `Your dataset contains ${summary.rowCount} rows and ${summary.columnCount} columns. The columns include: ${summary.columns.map(c => c.name).join(', ')}.\n\nNote: Configure your OpenAI API key in .env file for more advanced AI insights.`;
}
