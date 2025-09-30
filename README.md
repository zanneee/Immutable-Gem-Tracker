# 💎 Gem Tracker

A modern web application for tracking Immutable gem rewards and earnings. Built with Next.js, TypeScript, and Chart.js.

## 🌐 Live Demo

**Try it now:** [https://immutable-gem-tracker.vercel.app/](https://immutable-gem-tracker.vercel.app/)

> 💡 **Quick Test**: Use wallet address `0x15553803adf64a7584100ec3e2E4522256631954` to see the app in action with real data!

## ✨ Features

- **📊 Interactive Dashboard** - View total gems, transactions, games played, and earnings breakdown
- **📈 Visual Analytics** - Stacked bar chart showing daily earning trends (last 30 days)
- **🔍 Advanced Multi-Select Filtering** - Filter by multiple games, rule IDs, date ranges, and transaction types
- **📋 Sortable Data Table** - Click any column header to sort; paginated view with customizable page sizes
- **🎮 Game Analytics** - Track unique games played and earnings per game
- **🔄 Column Sorting** - Sort by date, game name, gems earned, quest type, and more
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **⚡ Real-time Data** - Fetches live data from Immutable API with robust error handling
- **🛡️ Error Recovery** - Automatic retry logic and user-friendly error messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/zanneee/Immutable-Gem-Tracker.git
cd Immutable-Gem-Tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser (or the port shown in your terminal)

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Chart.js](https://www.chartjs.org/)** - Interactive charts and graphs
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - React wrapper for Chart.js

## 📖 Usage

1. **Enter Wallet Address** - Input any Ethereum wallet address (0x...)
2. **View Overview** - See total gems, transactions, games played, and on-chain/off-chain breakdown
3. **Analyze Trends** - Use the interactive chart to visualize daily earning patterns
4. **Advanced Filtering** - Use multi-select dropdowns to filter by:
   - **Multiple Games** - Select from 49+ unique games
   - **Multiple Rule IDs** - Choose from hundreds of quest types
   - **Date Range** - Filter by specific time periods
   - **Transaction Type** - On-chain vs off-chain
5. **Sort & Analyze** - Click any column header to sort data by date, game, gems earned, etc.
6. **Browse Transactions** - Navigate through paginated results (10/50/100/All per page)

## 🏗️ Project Structure

```
├── components/          # Reusable UI components (MultiSelect, EarningsTable, etc.)
├── constants/          # Centralized configuration and constants
├── hooks/              # Custom React hooks (useSort, useFilters, etc.)
├── pages/              # Next.js pages and API routes
├── types/              # TypeScript type definitions
└── utils/              # Utility functions (filtering, sorting, data processing)
```

## 🔧 API Integration

The application integrates with the Immutable API:
```
GET https://api.immutable.com/v1/rewards/gems/{wallet}/latest_earnings
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.