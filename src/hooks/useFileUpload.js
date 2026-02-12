import { useState, useCallback } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = useCallback((file) => {
    if (!file) {
      setError('No file selected');
      return false;
    }

    const validTypes = ['text/csv', 'application/vnd.ms-excel'];
    const validExtensions = ['.csv'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));

    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      setError('Please upload a CSV file');
      return false;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }

    setError(null);
    return true;
  }, []);

  const handleFileSelect = useCallback((selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      return true;
    }
    return false;
  }, [validateFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  return {
    file,
    isDragging,
    error,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    resetFile,
  };
};
