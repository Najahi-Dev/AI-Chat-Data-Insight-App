import { motion } from 'framer-motion';
import './Loader.css';

export const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader-spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export const InlineLoader = () => {
  return (
    <div className="inline-loader">
      <motion.div
        className="dot"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="dot"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className="dot"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </div>
  );
};

export const ProgressLoader = ({ progress = 0 }) => {
  return (
    <div className="progress-loader">
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="progress-text">{Math.round(progress)}%</p>
    </div>
  );
};
