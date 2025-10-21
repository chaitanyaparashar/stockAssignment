# Crypto Tracker - Real-Time Cryptocurrency Price Dashboard

A modern, real-time cryptocurrency tracking application built with React, TypeScript, and Tailwind CSS. Track live prices for Bitcoin, Ethereum, Solana, and Hyperliquid with beautiful UI components and smooth animations.

## Features

- **Real-Time Price Updates**: Automatically fetches and updates cryptocurrency prices every 30 seconds
- **Multi-Crypto Support**: Tracks Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Hyperliquid (HYPE)
- **Beautiful UI Components**: Modern, gradient-based card design with hover effects and animations
- **Price Charts**: Mini sparkline charts showing 24-hour price trends
- **Comprehensive Stats**: Displays market cap, 24h volume, and high/low prices
- **Responsive Design**: Fully responsive layout that works on all devices
- **Live Indicators**: Visual pulse indicators showing real-time data updates
- **Dark Theme**: Sleek dark mode interface optimized for extended viewing

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe code for better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **CoinGecko API** - Real-time cryptocurrency data

## Project Structure

```
stockAssignment/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── CryptoCard.tsx     # Individual crypto card component
│   │   └── PriceChart.tsx     # Mini chart component
│   ├── hooks/
│   │   └── useCryptoData.ts   # Custom hook for fetching crypto data
│   ├── services/
│   │   └── cryptoService.ts   # API service and data formatting
│   ├── types/
│   │   └── crypto.ts          # TypeScript type definitions
│   ├── App.tsx                # Root component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and Tailwind imports
├── public/                    # Static assets
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies

```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stockAssignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality

## Features in Detail

### Real-Time Data Updates

The application automatically fetches cryptocurrency prices from the CoinGecko API every 30 seconds. A visual indicator shows when data is being updated, and the "Last updated" timestamp keeps you informed.

### Crypto Cards

Each cryptocurrency is displayed in a beautifully designed card featuring:
- Current price with proper formatting
- 24-hour price change percentage
- Color-coded trend indicators (green for up, red for down)
- Mini sparkline chart showing recent price movement
- Market cap and trading volume
- 24-hour high and low prices
- Smooth hover animations and transitions

### Responsive Design

The dashboard uses a responsive grid layout:
- 1 column on mobile devices
- 2 columns on tablets
- 4 columns on desktop screens

### API Integration

The app uses the CoinGecko API for cryptocurrency data. If the API is unavailable, it falls back to mock data to ensure the UI remains functional during development.

## Customization

### Adding More Cryptocurrencies

Edit `src/services/cryptoService.ts` and add the CoinGecko ID to the `CRYPTO_IDS` object:

```typescript
const CRYPTO_IDS = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  solana: 'solana',
  hyperliquid: 'hyperliquid',
  // Add more cryptocurrencies here
  cardano: 'cardano',
};
```

### Changing Update Interval

Modify the refresh interval in `src/components/Dashboard.tsx`:

```typescript
const { cryptoData, loading, error, lastUpdated, refresh } = useCryptoData(30000); // 30 seconds
```

### Customizing Theme Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      crypto: {
        dark: '#0f172a',
        darker: '#020617',
        card: '#1e293b',
        accent: '#3b82f6',
      }
    }
  }
}
```

## Performance Optimizations

- Automatic data refresh with cleanup on unmount
- Memoized callbacks to prevent unnecessary re-renders
- Optimized SVG charts for smooth rendering
- Lazy loading and code splitting with Vite
- Efficient state management with React hooks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues

- Hyperliquid may not be available on CoinGecko API (falls back to mock data)
- API rate limits may apply on the free tier of CoinGecko

## Future Enhancements

- [ ] Add search functionality to filter cryptocurrencies
- [ ] Implement price alerts and notifications
- [ ] Add detailed charts with multiple timeframes
- [ ] Portfolio tracking and management
- [ ] Historical data and price comparison
- [ ] Dark/light theme toggle
- [ ] Export data to CSV
- [ ] Integration with additional data sources

## License

MIT

## Acknowledgments

- CoinGecko for providing the free cryptocurrency API
- Tailwind CSS for the amazing utility-first CSS framework
- Lucide for the beautiful icon set