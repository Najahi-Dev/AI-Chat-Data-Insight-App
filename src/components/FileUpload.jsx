import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import { useFileUpload } from '../hooks/useFileUpload';
import { useData } from '../context/DataContext';
import './FileUpload.css';

export const FileUpload = () => {
  const fileInputRef = useRef(null);
  const {
    file,
    isDragging,
    error: uploadError,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    resetFile,
  } = useFileUpload();
  
  const { parseCSV, loading, error: parseError } = useData();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (handleFileSelect(selectedFile)) {
      parseCSV(selectedFile);
    }
  };

  const handleDropFile = (e) => {
    handleDrop(e);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      parseCSV(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    resetFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const error = uploadError || parseError;

  return (
    <motion.div
      className="file-upload-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!file ? (
        <motion.div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDropFile}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <FiUploadCloud className="upload-icon" />
          </motion.div>
          <h3>Upload CSV File</h3>
          <p>Drag and drop your CSV file here or click to browse</p>
          <p className="upload-hint">Maximum file size: 10MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="file-info"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="file-details">
            <FiFile className="file-icon" />
            <div className="file-text">
              <h4>{file.name}</h4>
              <p>{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <motion.button
            className="remove-button"
            onClick={handleRemoveFile}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {loading && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p>Processing your file...</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
