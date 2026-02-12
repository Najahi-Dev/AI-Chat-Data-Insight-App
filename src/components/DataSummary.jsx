import { motion } from 'framer-motion';
import { FiBarChart2, FiDatabase, FiColumns } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import './DataSummary.css';

export const DataSummary = () => {
  const { summary } = useData();

  if (!summary) {
    return null;
  }

  return (
    <motion.div
      className="data-summary-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2>Data Summary</h2>

      <div className="summary-stats">
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">
            <FiDatabase />
          </div>
          <div className="stat-content">
            <h3>{summary.rowCount.toLocaleString()}</h3>
            <p>Total Rows</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">
            <FiColumns />
          </div>
          <div className="stat-content">
            <h3>{summary.columnCount}</h3>
            <p>Columns</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">
            <FiBarChart2 />
          </div>
          <div className="stat-content">
            <h3>
              {summary.columns.filter((col) => col.type === 'numeric').length}
            </h3>
            <p>Numeric Columns</p>
          </div>
        </motion.div>
      </div>

      <div className="columns-details">
        <h3>Column Details</h3>
        <div className="columns-grid">
          {summary.columns.map((column, index) => (
            <motion.div
              key={column.name}
              className="column-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="column-header">
                <h4>{column.name}</h4>
                <span className={`column-type ${column.type}`}>
                  {column.type}
                </span>
              </div>
              
              <div className="column-stats">
                <div className="stat-row">
                  <span className="stat-label">Values:</span>
                  <span className="stat-value">{column.count.toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Unique:</span>
                  <span className="stat-value">{column.unique.toLocaleString()}</span>
                </div>
                
                {column.type === 'numeric' && (
                  <>
                    <div className="stat-row">
                      <span className="stat-label">Min:</span>
                      <span className="stat-value">{column.min.toLocaleString()}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Max:</span>
                      <span className="stat-value">{column.max.toLocaleString()}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Average:</span>
                      <span className="stat-value">{column.avg.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
