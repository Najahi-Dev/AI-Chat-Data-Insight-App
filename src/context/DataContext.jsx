import { createContext, useContext, useState, useCallback } from 'react';
import Papa from 'papaparse';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [csvData, setCsvData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  const parseCSV = useCallback((file) => {
    setLoading(true);
    setError(null);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Error parsing CSV file');
          setLoading(false);
          return;
        }

        setCsvData(file);
        setParsedData(results.data);
        generateSummary(results.data);
        setLoading(false);
      },
      error: (error) => {
        setError('Failed to parse CSV file: ' + error.message);
        setLoading(false);
      },
    });
  }, []);

  const generateSummary = useCallback((data) => {
    if (!data || data.length === 0) {
      setSummary(null);
      return;
    }

    const columns = Object.keys(data[0]);
    const rowCount = data.length;

    const columnStats = columns.map((col) => {
      const values = data.map((row) => row[col]).filter((val) => val != null);
      const uniqueValues = [...new Set(values)];
      const isNumeric = values.every((val) => !isNaN(parseFloat(val)));

      let stats = {
        name: col,
        type: isNumeric ? 'numeric' : 'text',
        count: values.length,
        unique: uniqueValues.length,
      };

      if (isNumeric) {
        const numericValues = values.map((val) => parseFloat(val));
        stats.min = Math.min(...numericValues);
        stats.max = Math.max(...numericValues);
        stats.avg = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
      }

      return stats;
    });

    setSummary({
      rowCount,
      columnCount: columns.length,
      columns: columnStats,
    });
  }, []);

  const resetData = useCallback(() => {
    setCsvData(null);
    setParsedData(null);
    setSummary(null);
    setFileName('');
    setError(null);
  }, []);

  const value = {
    csvData,
    parsedData,
    summary,
    loading,
    error,
    fileName,
    parseCSV,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
