import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import './DataTable.css';

export const DataTable = () => {
  const { parsedData } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!parsedData || parsedData.length === 0) {
    return null;
  }

  const columns = Object.keys(parsedData[0]);
  const totalPages = Math.ceil(parsedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = parsedData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <motion.div
      className="data-table-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="table-header">
        <h2>Data Preview</h2>
        <p>Showing {startIndex + 1} - {Math.min(endIndex, parsedData.length)} of {parsedData.length} rows</p>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <motion.th
                  key={column}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {column}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.03 }}
              >
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column}`}>
                    {row[column] !== null && row[column] !== undefined 
                      ? String(row[column]) 
                      : '-'}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <motion.button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pagination-button"
          >
            <FiChevronLeft />
          </motion.button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <motion.button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pagination-button"
          >
            <FiChevronRight />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
