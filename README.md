# 💎 Gem Tracker

A modern web application for tracking Immutable gem rewards and earnings. Built with Next.js, TypeScript, and Chart.js.

![Gem Tracker Screenshot](https://via.placeholder.com/800x400/1f2937/ffffff?text=Gem+Tracker+Dashboard)

## ✨ Features

- **📊 Interactive Dashboard** - View total gems, transactions, and earnings breakdown
- **📈 Visual Analytics** - Stacked bar chart showing daily earning trends (last 30 days)
- **🔍 Advanced Filtering** - Search by rule ID, date range, and transaction type
- **📋 Detailed Table** - Paginated view of all gem earning transactions
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **⚡ Real-time Data** - Fetches live data from Immutable API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gem-tracker.git
cd gem-tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Chart.js](https://www.chartjs.org/)** - Interactive charts and graphs
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - React wrapper for Chart.js

## 📖 Usage

1. **Enter Wallet Address** - Input any Ethereum wallet address (0x...)
2. **View Overview** - See total gems earned, transaction count, and type breakdown
3. **Analyze Trends** - Use the interactive chart to visualize daily earning patterns
4. **Filter Data** - Search by rule ID, date range, or transaction type
5. **Browse Transactions** - Navigate through paginated transaction history

## 🏗️ Project Structure

```
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages and API routes
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
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

## 🙏 Acknowledgments

- [Immutable](https://www.immutable.com/) for providing the gem rewards API
- [Vercel](https://vercel.com/) for hosting and deployment platform