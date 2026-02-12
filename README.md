# AI Chat + Data Insight App (Advanced)

A fully-featured React application that allows users to upload CSV files, visualize data, and interact with their data using AI-powered insights.

## 🌟 Features

### Core Functionality
- **📤 CSV File Upload** - Drag-and-drop or click to upload CSV files
- **📊 Data Parsing** - Automatic parsing using Papa Parse library
- **👀 Table Preview** - Paginated table view with smooth animations
- **📈 Data Summary** - Comprehensive statistics and column insights
- **💬 AI Chat Interface** - Ask questions about your data and get AI-powered answers
- **🤖 AI Insights** - OpenAI integration for intelligent data analysis

### Advanced UX Features
- **✨ Loader Animations** - Beautiful loading states throughout the app
- **🎬 Page Animations** - Smooth transitions using Framer Motion
- **🌈 Animated Background** - Dynamic gradient orbs for visual appeal
- **📱 Responsive Design** - Works seamlessly on all device sizes
- **⚠️ Error Handling** - Comprehensive error handling with user feedback
- **🎨 Modern UI** - Glass morphism effects and gradient designs

## 🛠️ Technologies Used

- **React 19** - Latest version with modern hooks
- **Vite** - Fast build tool and development server
- **Framer Motion** - Powerful animation library
- **Papa Parse** - CSV parsing library
- **OpenAI API** - AI-powered data insights
- **React Icons** - Icon library
- **Context API** - State management
- **Custom Hooks** - Reusable logic

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Najahi-Dev/AI-Chat-Data-Insight-App.git
cd AI-Chat-Data-Insight-App
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure OpenAI API:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. **Upload a CSV File**
   - Click the upload area or drag and drop a CSV file
   - Maximum file size: 10MB
   - Supported format: .csv

2. **View Data Summary**
   - Automatically generated statistics
   - Column-wise analysis
   - Numeric column insights (min, max, average)

3. **Browse Data**
   - Paginated table view
   - Navigate through pages
   - View all columns and rows

4. **Ask Questions**
   - Type questions about your data
   - Get AI-powered insights
   - Works even without OpenAI API (simulated responses)

## 🎨 Features Highlights

### State Management
- **Context API** for global state
- **Custom hooks** for reusable logic
- **Complex state management** for chat and data

### Animations
- **Framer Motion** for smooth transitions
- **Page animations** on component mount
- **Animated background** with moving gradients
- **Loader animations** for loading states

### Error Handling
- File validation
- CSV parsing errors
- API error handling
- User-friendly error messages

## 📁 Project Structure

```
src/
├── animations/        # Animation components
│   └── Animations.jsx
├── components/        # React components
│   ├── ChatInterface.jsx
│   ├── DataSummary.jsx
│   ├── DataTable.jsx
│   ├── FileUpload.jsx
│   └── Loader.jsx
├── context/          # Context providers
│   ├── ChatContext.jsx
│   └── DataContext.jsx
├── hooks/            # Custom hooks
│   └── useFileUpload.js
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## 🔑 OpenAI API Key (Optional)

The app works without an OpenAI API key using simulated responses. To enable full AI capabilities:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Copy `.env.example` to `.env`
3. Add your API key: `VITE_OPENAI_API_KEY=your_key_here`

## 🧪 Sample Data

A sample CSV file (`sample-data.csv`) is included for testing. It contains employee data with:
- Name
- Age
- Department
- Salary
- Years of Experience

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Learning Outcomes

This project demonstrates:
- ✅ File upload handling
- ✅ Third-party library integration (Papa Parse, Framer Motion, OpenAI)
- ✅ API integration
- ✅ Custom React hooks
- ✅ Context API for state management
- ✅ Complex state management
- ✅ Error handling
- ✅ Real-world UX patterns
- ✅ Advanced animations
- ✅ Modern React patterns

## 🙏 Acknowledgments

- Built with React and Vite
- UI animations powered by Framer Motion
- CSV parsing by Papa Parse
- AI capabilities by OpenAI
- Icons by React Icons
