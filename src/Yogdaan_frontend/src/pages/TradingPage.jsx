import React, { useState, useEffect } from 'react';
import { 
  Search, User, Globe, Menu, X, TrendingUp, BarChart2, Award,
  DollarSign, ArrowUpRight, ArrowDownRight, Star, StarOff, 
  Percent, Clock, Briefcase, ChevronRight, Activity, Eye, 
  PieChart, ArrowUp, ArrowDown, ChevronDown, Info
} from 'lucide-react';

const YogdaanTradingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mostTraded');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [stocks, setStocks] = useState({
    mostTraded: [],
    indices: [],
    watchlist: []
  });
  
  // Mock data for demonstration
  useEffect(() => {
    // Fetch data would go here in a real application
    setStocks({
      mostTraded: [
        { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 187.42, change: 2.34, changePercent: 1.26, volume: '42.3M', favorite: false, sector: 'Technology', performance: [65, 59, 80, 81, 56, 55, 40, 70, 75, 77] },
        { id: 2, symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.17, change: -5.83, changePercent: -2.32, volume: '38.7M', favorite: true, sector: 'Automotive', performance: [70, 55, 40, 65, 75, 80, 82, 68, 54, 40] },
        { id: 3, symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.80, change: 3.21, changePercent: 0.78, volume: '25.1M', favorite: false, sector: 'Technology', performance: [45, 52, 60, 65, 72, 78, 85, 82, 75, 80] },
        { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 1.15, changePercent: 0.65, volume: '23.8M', favorite: true, sector: 'Retail', performance: [50, 55, 62, 68, 72, 75, 68, 72, 80, 78] },
        { id: 5, symbol: 'NVDA', name: 'NVIDIA Corp.', price: 927.54, change: 12.37, changePercent: 1.35, volume: '22.5M', favorite: false, sector: 'Technology', performance: [40, 55, 70, 85, 90, 95, 92, 88, 95, 98] },
        { id: 6, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 165.78, change: -0.92, changePercent: -0.55, volume: '18.3M', favorite: false, sector: 'Technology', performance: [60, 65, 68, 72, 75, 73, 70, 68, 72, 70] },
        { id: 7, symbol: 'META', name: 'Meta Platforms', price: 485.39, change: 7.24, changePercent: 1.51, volume: '16.9M', favorite: true, sector: 'Technology', performance: [55, 60, 65, 62, 58, 65, 72, 78, 85, 88] },
        { id: 8, symbol: 'JPM', name: 'JPMorgan Chase', price: 198.52, change: 1.34, changePercent: 0.68, volume: '12.5M', favorite: false, sector: 'Finance', performance: [58, 62, 65, 68, 72, 75, 72, 70, 73, 75] },
      ],
      indices: [
        { id: 101, symbol: 'DJI', name: 'Dow Jones Industrial', price: 39285.17, change: 185.34, changePercent: 0.47, marketCap: '13.2T', performance: [65, 68, 70, 72, 75, 73, 75, 78, 76, 78] },
        { id: 102, symbol: 'SPX', name: 'S&P 500', price: 5267.84, change: 32.93, changePercent: 0.63, marketCap: '41.8T', performance: [60, 63, 65, 68, 72, 70, 72, 75, 73, 75] },
        { id: 103, symbol: 'COMP', name: 'NASDAQ Composite', price: 16742.39, change: 188.12, changePercent: 1.14, marketCap: '23.5T', performance: [55, 60, 65, 70, 75, 78, 80, 82, 80, 85] },
        { id: 104, symbol: 'RUT', name: 'Russell 2000', price: 2043.47, change: -9.32, changePercent: -0.45, marketCap: '2.8T', performance: [62, 60, 58, 55, 52, 55, 58, 56, 53, 50] },
        { id: 105, symbol: 'VIX', name: 'CBOE Volatility Index', price: 14.82, change: -0.73, changePercent: -4.69, marketCap: 'N/A', performance: [45, 42, 38, 35, 30, 32, 35, 30, 25, 22] },
      ],
      watchlist: [
        { id: 3, symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.80, change: 3.21, changePercent: 0.78, volume: '25.1M', favorite: true, sector: 'Technology', performance: [45, 52, 60, 65, 72, 78, 85, 82, 75, 80] },
        { id: 7, symbol: 'META', name: 'Meta Platforms', price: 485.39, change: 7.24, changePercent: 1.51, volume: '16.9M', favorite: true, sector: 'Technology', performance: [55, 60, 65, 62, 58, 65, 72, 78, 85, 88] },
        { id: 2, symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.17, change: -5.83, changePercent: -2.32, volume: '38.7M', favorite: true, sector: 'Automotive', performance: [70, 55, 40, 65, 75, 80, 82, 68, 54, 40] },
        { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 1.15, changePercent: 0.65, volume: '23.8M', favorite: true, sector: 'Retail', performance: [50, 55, 62, 68, 72, 75, 68, 72, 80, 78] },
      ]
    });
  }, []);

  const toggleFavorite = (id, tab) => {
    setStocks(prevStocks => {
      const updatedStocks = { ...prevStocks };
      
      // Update in the active tab
      updatedStocks[tab] = updatedStocks[tab].map(stock => 
        stock.id === id ? { ...stock, favorite: !stock.favorite } : stock
      );
      
      // If it's not the watchlist tab, we need to update the watchlist as well
      if (tab !== 'watchlist') {
        const stock = updatedStocks[tab].find(s => s.id === id);
        
        if (stock.favorite) {
          // Add to watchlist if it doesn't exist
          if (!updatedStocks.watchlist.some(s => s.id === id)) {
            updatedStocks.watchlist.push(stock);
          }
        } else {
          // Remove from watchlist
          updatedStocks.watchlist = updatedStocks.watchlist.filter(s => s.id !== id);
        }
      } else {
        // If it's in the watchlist, we need to update the stock in its original list
        const allStocks = [...updatedStocks.mostTraded, ...updatedStocks.indices];
        allStocks.forEach(stock => {
          if (stock.id === id) {
            stock.favorite = false;
          }
        });
        
        // Remove from watchlist
        updatedStocks.watchlist = updatedStocks.watchlist.filter(s => s.id !== id);
      }
      
      return updatedStocks;
    });
  };

  const Button = ({ children, className, variant = "primary", onClick }) => {
    const baseClasses = "rounded-xl font-medium transition-all duration-300 shadow-lg flex items-center justify-center";
    
    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
      outline: "border border-purple-500 text-purple-500 hover:bg-purple-500/10",
      secondary: "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20",
      ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white"
    };
    
    return (
      <button 
        className={`${baseClasses} ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  // Mini chart component using SVG
  const MiniChart = ({ data, height = 40 }) => {
    if (!data || data.length === 0) return null;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    // Create points for SVG polyline
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    // Determine if trend is positive (last value > first value)
    const isPositive = data[data.length - 1] > data[0];
    const strokeColor = isPositive ? "#10b981" : "#ef4444";
    
    return (
      <svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const StockCard = ({ stock, tab }) => {
    const isPositive = stock.change >= 0;
    
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 p-5 group">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${isPositive ? 'bg-green-900/20' : 'bg-red-900/20'} flex items-center justify-center mr-2`}>
                {isPositive ? (
                  <ArrowUp size={14} className="text-green-500" />
                ) : (
                  <ArrowDown size={14} className="text-red-500" />
                )}
              </div>
              <span className="text-lg font-bold text-white">{stock.symbol}</span>
              <button 
                className="ml-2 text-gray-400 hover:text-yellow-400 transition-colors"
                onClick={() => toggleFavorite(stock.id, tab)}
              >
                {stock.favorite ? (
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star size={16} />
                )}
              </button>
              {stock.sector && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300">{stock.sector}</span>
              )}
            </div>
            <div className="text-sm text-gray-400 mt-1">{stock.name}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? (
                <ArrowUpRight size={14} className="mr-1" />
              ) : (
                <ArrowDownRight size={14} className="mr-1" />
              )}
              <span>${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        
        {/* Chart section */}
        <div className="h-12 my-4">
          <MiniChart data={stock.performance} />
        </div>
        
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center space-x-3">
            {stock.volume && (
              <div className="flex items-center text-xs bg-white/5 px-2 py-1 rounded-md">
                <Clock size={12} className="mr-1 text-gray-400" />
                <span className="text-gray-300">Vol: {stock.volume}</span>
              </div>
            )}
            {stock.marketCap && (
              <div className="flex items-center text-xs bg-white/5 px-2 py-1 rounded-md">
                <Briefcase size={12} className="mr-1 text-gray-400" />
                <span className="text-gray-300">Cap: {stock.marketCap}</span>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" className="p-2">
              <Info size={16} />
            </Button>
            <Button variant="primary" className="px-4 py-2 text-sm">Trade</Button>
          </div>
        </div>
        
        {/* Hover overlay with more options */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-indigo-900/80 rounded-xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none">
          <div className="p-6 text-center space-y-4 pointer-events-auto">
            <h3 className="text-xl font-bold text-white">{stock.name}</h3>
            <p className="text-gray-300">View detailed analytics and trading options</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="secondary" className="p-3">
                <Eye size={16} />
              </Button>
              <Button className="px-6 py-3">Trade Now</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TabButton = ({ active, label, icon, onClick, count }) => {
    const Icon = icon;
    return (
      <button
        className={`px-5 py-3 rounded-xl flex items-center text-sm font-medium transition-all duration-300 ${
          active 
            ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white shadow-lg shadow-purple-900/30' 
            : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
        }`}
        onClick={onClick}
      >
        <Icon size={18} className="mr-2" />
        {label}
        {count && (
          <span className="ml-2 bg-white/20 text-white px-2 rounded-full text-xs">{count}</span>
        )}
      </button>
    );
  };

  // Filter components for stocks
  const FilterDropdown = () => {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'gainers', label: 'Top Gainers' },
      { id: 'losers', label: 'Top Losers' },
      { id: 'volume', label: 'High Volume' },
      { id: 'technology', label: 'Technology' },
      { id: 'finance', label: 'Finance' }
    ];
    
    return (
      <div className="relative">
        <Button 
          variant="secondary" 
          className="px-4 py-2 text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filter: {filters.find(f => f.id === activeFilter).label}</span>
          <ChevronDown size={14} className="ml-2" />
        </Button>
        
        {showFilters && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl border border-white/10 shadow-lg shadow-black/30 z-50">
            <div className="p-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeFilter === filter.id 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setShowFilters(false);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Market trends component
  const MarketTrends = () => {
    const trends = [
      { label: 'Crypto Markets', value: '+2.34%', isPositive: true },
      { label: 'Global Markets', value: '+0.82%', isPositive: true },
      { label: 'Bond Yields', value: '-0.12%', isPositive: false },
      { label: 'Oil Futures', value: '+1.56%', isPositive: true }
    ];
    
    return (
      <div className="flex space-x-4 overflow-x-auto pb-2 mb-8">
        {trends.map((trend, index) => (
          <div 
            key={index} 
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 px-4 py-3 flex items-center space-x-2 whitespace-nowrap"
          >
            <span className="text-gray-400 text-sm">{trend.label}:</span>
            <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
              {trend.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
          </div>
          
          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <Award className="mr-1" size={16} />
              NGOs Rankings
            </a>
            <a href="#" className="text-purple-400 transition-colors flex items-center relative px-2 py-1 rounded-lg bg-purple-500/10">
              <TrendingUp className="mr-1" size={16} />
              Trade
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <BarChart2 className="mr-1" size={16} />
              Campaign
            </a>
          </div>
          
          {/* Search and Profile - right aligned */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-56"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all cursor-pointer hover:bg-purple-500/10">
              <User size={18} />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-slate-800/95 backdrop-blur-md p-4 z-50 border-b border-white/10">
            <div className="flex flex-col space-y-4 p-2">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
                <Award className="mr-2" size={18} />
                NGOs Rankings
              </a>
              <a href="#" className="text-purple-400 transition-colors py-2 flex items-center">
                <TrendingUp className="mr-2" size={18} />
                Trade
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
                <BarChart2 className="mr-2" size={18} />
                Campaign
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
                <User className="mr-2" size={18} />
                Profile
              </a>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">Market Trading</h1>
            <p className="text-gray-400">Buy and sell stocks while supporting charitable causes</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <FilterDropdown />
            <Button className="px-6 py-2 text-sm">
              <Activity size={16} className="mr-2" />
              New Trade
            </Button>
          </div>
        </div>
        
        {/* Market Trends Slider */}
        <MarketTrends />
        
        {/* Market Overview */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
              <DollarSign size={24} className="text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Trading Volume</div>
              <div className="text-2xl font-bold text-white">$4.28B</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight size={12} className="mr-1" />
                <span>8.2% from yesterday</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
              <PieChart size={24} className="text-purple-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Market Sentiment</div>
              <div className="text-2xl font-bold text-white">Bullish</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight size={12} className="mr-1" />
                <span>65% buyers today</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
              <Briefcase size={24} className="text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Your Balance</div>
              <div className="text-2xl font-bold text-white">$12,842.50</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight size={12} className="mr-1" />
                <span>$842.35 today</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-md rounded-xl border border-purple-500/30 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
              <Award size={24} className="text-indigo-400" />
            </div>
            <div>
              <div className="text-sm text-indigo-300 mb-1">Social Impact</div>
              <div className="text-2xl font-bold text-white">$1,285.75</div>
              <div className="text-xs text-indigo-300 mt-1">
                10% of your trades donated
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <TabButton 
            active={activeTab === 'mostTraded'} 
            label="Most Traded" 
            icon={TrendingUp}
            onClick={() => setActiveTab('mostTraded')}
            />
            <TabButton 
              active={activeTab === 'indices'} 
              label="Indices" 
              icon={Globe}
              onClick={() => setActiveTab('indices')}
            />
            <TabButton 
              active={activeTab === 'watchlist'} 
              label="Watchlist" 
              icon={Star}
              count={stocks.watchlist.length}
              onClick={() => setActiveTab('watchlist')}
            />
          </div>
          
          {/* Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 relative">
            {stocks[activeTab].map(stock => (
              <StockCard key={stock.id} stock={stock} tab={activeTab} />
            ))}
            
            {stocks[activeTab].length === 0 && (
              <div className="col-span-full py-16 text-center">
                <div className="bg-white/5 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Star size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No stocks in your watchlist</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Add stocks to your watchlist by clicking the star icon on any stock card
                </p>
                <Button 
                  variant="primary" 
                  className="px-6 py-3 mx-auto"
                  onClick={() => setActiveTab('mostTraded')}
                >
                  Browse Top Stocks
                </Button>
              </div>
            )}
          </div>
          
          {/* Featured Section */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Social Impact Investing</h2>
              <Button variant="outline" className="px-4 py-2 text-sm">
                Learn More
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Percent size={24} className="text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">10% Impact</h3>
                <p className="text-gray-400 mb-4">10% of trading fees are automatically donated to verified NGOs</p>
                <Button variant="outline" className="w-full py-2 mt-2">
                  View Statistics
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <Award size={24} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">NGO Partners</h3>
                <p className="text-gray-400 mb-4">Choose from verified non-profits to support with your trading activity</p>
                <Button variant="outline" className="w-full py-2 mt-2">
                  Browse NGOs
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <TrendingUp size={24} className="text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Impact Portfolios</h3>
                <p className="text-gray-400 mb-4">Curated stock portfolios aligned with sustainable development goals</p>
                <Button variant="outline" className="w-full py-2 mt-2">
                  Explore Portfolios
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-white/5 py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-6 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
              </div>
              
              <div className="flex space-x-8 mb-6 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Markets</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Impact</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Support</a>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 3.47v-.23C21.77 2.3 21.47 2 20.54 2h-16C3.31 2 3 2.3 3 3.47v.23l9 5.29 10-5.53v.01z" />
                    <path d="M13 10.54L3 5.03v13.94C3 19.91 3.3 20 4.24 20h15.52c.94 0 1.24-.09 1.24-1.03V5.03l-8 5.51z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12 1.57 1.57 0 1 1 0 3.12Zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
              © 2025 Yogdaan Trading Platform. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default YogdaanTradingPage;