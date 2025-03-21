import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, BarChart2, Menu, X, User, Award, 
  Search, Heart, Filter, ArrowUpRight, TrendingUp, 
  AlertCircle, DollarSign, ArrowDown, BarChart, 
  PieChart, RefreshCw, Sliders, ChevronDown, Plus, 
  Minus, Info
} from 'lucide-react';

const YogdaanInvestmentPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('1m');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showRiskInfo, setShowRiskInfo] = useState(false);
  
  // Mock data for the charts and displays
  const portfolioData = {
    totalInvested: 5250,
    totalReturns: 873,
    returnPercentage: 16.63,
    socialImpact: 89
  };
  
  const performanceData = {
    '1w': [
      { date: 'Mon', value: 5100 },
      { date: 'Tue', value: 5150 },
      { date: 'Wed', value: 5120 },
      { date: 'Thu', value: 5200 },
      { date: 'Fri', value: 5230 },
      { date: 'Sat', value: 5240 },
      { date: 'Sun', value: 5250 }
    ],
    '1m': [
      { date: 'Week 1', value: 4900 },
      { date: 'Week 2', value: 5000 },
      { date: 'Week 3', value: 5120 },
      { date: 'Week 4', value: 5250 }
    ],
    '3m': [
      { date: 'Jan', value: 4700 },
      { date: 'Feb', value: 4950 },
      { date: 'Mar', value: 5250 }
    ],
    '1y': [
      { date: 'Q1', value: 4500 },
      { date: 'Q2', value: 4800 },
      { date: 'Q3', value: 5050 },
      { date: 'Q4', value: 5250 }
    ],
  };
  
  const allocationData = [
    { category: 'Education', percentage: 35 },
    { category: 'Clean Water', percentage: 25 },
    { category: 'Healthcare', percentage: 20 },
    { category: 'Food Security', percentage: 15 },
    { category: 'Others', percentage: 5 }
  ];
  
  const marketTrends = [
    { category: 'Education', change: 12.4 },
    { category: 'Healthcare', change: 8.7 },
    { category: 'Environment', change: 15.2 },
    { category: 'Clean Water', change: 6.5 },
    { category: 'Food Security', change: -2.3 }
  ];
  
  const topCampaigns = [
    { name: 'Solar Schools', ngo: 'EduLight Foundation', performance: 18.7 },
    { name: 'Clean Rivers Initiative', ngo: 'Aqua Trust', performance: 14.3 },
    { name: 'Rural Healthcare', ngo: 'MediReach', performance: 12.5 }
  ];
  
  const investmentOpportunities = [
    {
      id: 1,
      name: 'School Development Fund',
      ngo: 'EduLight Foundation',
      category: 'Education',
      expectedReturn: 14.2,
      risk: 'Low',
      socialImpact: 'High',
      raisedAmount: 45800,
      targetAmount: 75000,
      description: 'Build and equip 5 new schools in underserved communities',
      minInvestment: 100
    },
    {
      id: 2,
      name: 'Clean Water Access',
      ngo: 'Aqua Trust',
      category: 'Clean Water',
      expectedReturn: 12.7,
      risk: 'Medium',
      socialImpact: 'Very High',
      raisedAmount: 32500,
      targetAmount: 50000,
      description: 'Install water purification systems in 20 villages',
      minInvestment: 50
    },
    {
      id: 3,
      name: 'Medical Supplies Drive',
      ngo: 'MediReach',
      category: 'Healthcare',
      expectedReturn: 16.1,
      risk: 'Medium',
      socialImpact: 'High',
      raisedAmount: 28900,
      targetAmount: 40000,
      description: 'Provide essential medical supplies to 15 rural clinics',
      minInvestment: 75
    },
    {
      id: 4,
      name: 'Sustainable Farming',
      ngo: 'Green Harvest',
      category: 'Food Security',
      expectedReturn: 18.4,
      risk: 'High',
      socialImpact: 'Medium',
      raisedAmount: 15600,
      targetAmount: 60000,
      description: 'Implement sustainable farming techniques to increase crop yield',
      minInvestment: 100
    },
    {
      id: 5,
      name: 'Wildlife Conservation',
      ngo: 'Nature Forward',
      category: 'Environment',
      expectedReturn: 10.2,
      risk: 'Low',
      socialImpact: 'High',
      raisedAmount: 18700,
      targetAmount: 35000,
      description: 'Protect endangered species and their habitats',
      minInvestment: 50
    }
  ];
  
  const portfolioHoldings = [
    {
      id: 1,
      name: 'Clean Energy Fund',
      ngo: 'GreenPower',
      investedAmount: 1500,
      currentValue: 1725,
      returnPercentage: 15,
      category: 'Environment'
    },
    {
      id: 2,
      name: 'Education for All',
      ngo: 'EduLight Foundation',
      investedAmount: 2000,
      currentValue: 2360,
      returnPercentage: 18,
      category: 'Education'
    },
    {
      id: 3,
      name: 'Medical Outreach',
      ngo: 'MediReach',
      investedAmount: 1750,
      currentValue: 1890,
      returnPercentage: 8,
      category: 'Healthcare'
    }
  ];
  
  // Filter investments based on category
  const filteredInvestments = categoryFilter === 'all' 
    ? investmentOpportunities 
    : investmentOpportunities.filter(inv => inv.category.toLowerCase() === categoryFilter.toLowerCase());
  
  // Component for render performance chart
  const PerformanceChart = ({ data }) => {
    const chartData = performanceData[timeRange];
    const chartHeight = 200;
    const chartWidth = 600;
    const xStep = chartWidth / (chartData.length - 1);
    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    // Function to convert data point to SVG coordinate
    const getY = value => {
      return chartHeight - ((value - minValue) / valueRange) * chartHeight;
    };
    
    // Create path data for line
    let pathD = '';
    chartData.forEach((d, i) => {
      const x = i * xStep;
      const y = getY(d.value);
      pathD += (i === 0 ? 'M' : 'L') + `${x},${y}`;
    });
    
    // Create path data for area under line
    let areaPathD = pathD + `L${(chartData.length - 1) * xStep},${chartHeight}L0,${chartHeight}Z`;
    
    return (
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
        {/* Gradient for area */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5e35b1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5e35b1" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area under the line */}
        <path d={areaPathD} fill="url(#areaGradient)" />
        
        {/* The line itself */}
        <path d={pathD} fill="none" stroke="#5e35b1" strokeWidth="3" />
        
        {/* Dots at each data point */}
        {chartData.map((d, i) => (
          <circle 
            key={i} 
            cx={i * xStep} 
            cy={getY(d.value)} 
            r="4" 
            fill="#5e35b1"
          />
        ))}
      </svg>
    );
  };
  
  // Allocation chart component
  const AllocationChart = () => {
    const size = 150;
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;
    
    let startAngle = 0;
    const segments = allocationData.map((item, index) => {
      const angle = (item.percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Calculate arc path
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      // Generate colors
      const colors = ['#5e35b1', '#7e57c2', '#9575cd', '#b39ddb', '#d1c4e9'];
      
      const segment = (
        <path 
          key={index}
          d={pathData}
          fill={colors[index % colors.length]}
        />
      );
      
      startAngle = endAngle;
      return segment;
    });
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments}
      </svg>
    );
  };
  
  // Button component
  const Button = ({ children, className, variant = "primary", icon }) => {
    const baseClasses = "rounded-full font-medium transition-all duration-300 shadow-lg flex items-center justify-center";
    
    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
      outline: "border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10",
      secondary: "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20"
    };
    
    return (
      <button className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </button>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 text-white">
      {/* Navigation */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/">
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
          </a>
          
          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="/ngo-rankings" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center group">
              <Award className="mr-1" size={16} />
              <span>NGOs Rankings</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400 mt-0.5"></span>
            </a>
            <a href="/trading" className="text-purple-400 hover:text-purple-400 transition-colors flex items-center group">
              <LineChart className="mr-1" size={16} />
              <span>Investment</span>
              <span className="block max-w-full transition-all duration-500 h-0.5 bg-purple-400 mt-0.5"></span>
            </a>
            <a href="/compaign" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center group">
              <BarChart2 className="mr-1" size={16} />
              <span>Campaign</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400 mt-0.5"></span>
            </a>
          </div>
          
          {/* Search and Profile - right aligned */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search investments..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none text-white w-48 transition-all duration-300 focus:w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative">
              <button 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User size={18} />
              </button>
              
              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-md p-2 border border-white/10 shadow-lg z-50">
                  <div className="py-2 px-4 border-b border-white/10">
                    <div className="font-medium text-white">Guest User</div>
                    <div className="text-xs text-gray-400">guest@example.com</div>
                  </div>
                  <div className="py-1">
                    <a href="/user-profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">My Donations</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Current Holdings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Watchlist</a>
                  </div>
                  <div className="py-1 border-t border-white/10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Log Out</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-slate-800/95 backdrop-blur-md p-4 z-50 border-b border-white/10">
            <div className="flex flex-col space-y-4 p-2">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search investments..."
                  className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
                <Award className="mr-2" size={18} />
                NGOs Rankings
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-400 transition-colors py-2 flex items-center">
                <LineChart className="mr-2" size={18} />
                Investment
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
      
      {/* Page Header */}
      <div className="container mx-auto px-6 pt-8 pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Investment Dashboard</h1>
          <Button className="px-6 py-2.5 text-sm" variant="primary">
            Start New Investment
          </Button>
        </div>
        
        {/* Page tabs */}
        <div className="flex border-b border-white/10 mt-8">
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'opportunities' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('opportunities')}
          >
            Investment Opportunities
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'portfolio' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio Management
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Investment Performance */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Investment Performance</h2>
                <div className="flex space-x-2">
                  {['1w', '1m', '3m', '1y'].map((range) => (
                    <button 
                      key={range}
                      className={`px-3 py-1 text-xs rounded-full ${timeRange === range ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="h-56 relative overflow-hidden">
                    <PerformanceChart data={performanceData[timeRange]} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Total Invested</div>
                    <div className="text-2xl font-bold text-white">${portfolioData.totalInvested}</div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Total Returns</div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-white">${portfolioData.totalReturns}</div>
                      <div className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        {portfolioData.returnPercentage}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Social Impact Score</div>
                    <div className="text-2xl font-bold text-white">{portfolioData.socialImpact}</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                        style={{ width: `${portfolioData.socialImpact}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Market Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Investment Allocation</h2>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AllocationChart />
                  </div>
                  
                  <div className="ml-8">
                    <div className="space-y-3">
                      {allocationData.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#5e35b1', '#7e57c2', '#9575cd', '#b39ddb', '#d1c4e9'][index % 5] }}></div>
                          <div className="ml-3 text-sm text-gray-300">{item.category}</div>
                          <div className="ml-auto text-sm font-medium text-white">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Current Market Trends</h2>
                
                <div className="space-y-4">
                  {marketTrends.map((trend, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-40 text-sm text-gray-300">{trend.category}</div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${trend.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.abs(trend.change) * 5}%` }}
                        ></div>
                      </div>
                      <div className={`ml-4 text-sm font-medium ${trend.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.change > 0 && '+'}
                        {trend.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Top Performing Campaigns */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Top Performing Campaigns</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 text-gray-400 text-sm font-medium">Campaign</th>
                      <th className="text-left py-3 text-gray-400 text-sm font-medium">NGO</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-medium">Performance</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCampaigns.map((campaign, index) => (
                      <tr key={index} className="border-t border-white/5">
                        <td className="py-4 text-white">{campaign.name}</td>
                        <td className="py-4 text-gray-300">{campaign.ngo}</td>
                        <td className="py-4 text-right">
                          <span className="text-green-400 font-medium">+{campaign.performance}%</span>
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="secondary" className="px-4 py-1.5 text-xs">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Investment Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-8">
            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${categoryFilter === 'all' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800/30 text-gray-300 border border-white/10 hover:border-white/30'}`}
                  onClick={() => setCategoryFilter('all')}
                >
                  All Categories
                </button>
                {['Education', 'Healthcare', 'Environment', 'Clean Water', 'Food Security'].map((category) => (
                  <button 
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm ${categoryFilter === category.toLowerCase() ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800/30 text-gray-300 border border-white/10 hover:border-white/30'}`}
                    onClick={() => setCategoryFilter(category.toLowerCase())}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-300 bg-slate-800/30 border border-white/10 px-4 py-2 rounded-full text-sm hover:border-white/30">
  <Filter size={16} className="mr-2" />
  More Filters
</button>
              </div>
            </div>
            
            {/* Investment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestments.map((investment) => (
                <div key={investment.id} className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                          {investment.category}
                        </span>
                        <h3 className="text-lg font-medium text-white mt-3">{investment.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{investment.ngo}</p>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <Heart size={20} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-300 mt-4">{investment.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Raised: ${investment.raisedAmount.toLocaleString()}</span>
                        <span>${investment.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(investment.raisedAmount / investment.targetAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-5">
                      <div className="text-center">
                        <div className="text-xs text-gray-400">Return</div>
                        <div className="text-green-400 font-medium">{investment.expectedReturn}%</div>
                      </div>
                      <div className="text-center relative group">
                        <div className="text-xs text-gray-400 flex items-center justify-center">
                          Risk <Info size={12} className="ml-1 cursor-pointer" onClick={() => setShowRiskInfo(!showRiskInfo)} />
                        </div>
                        <div className="text-white font-medium">{investment.risk}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">Impact</div>
                        <div className="text-white font-medium">{investment.socialImpact}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex border-t border-white/10">
                    <div className="flex-1 py-3 px-6 text-center border-r border-white/10">
                      <div className="text-sm font-medium text-white">${investment.minInvestment}</div>
                      <div className="text-xs text-gray-400">Min. Investment</div>
                    </div>
                    <div className="flex-1">
                      <Button variant="primary" className="w-full py-3 px-6 rounded-none">
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Portfolio Management Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="text-gray-400 text-sm mb-1">Total Portfolio Value</div>
                <div className="text-2xl font-bold text-white">${portfolioData.totalInvested + portfolioData.totalReturns}</div>
                <div className="flex items-center mt-1">
                  <div className="text-green-400 text-sm flex items-center">
                    <ArrowUpRight size={14} className="mr-1" />
                    {portfolioData.returnPercentage}%
                  </div>
                  <div className="text-gray-400 text-xs ml-2">Since inception</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="text-gray-400 text-sm mb-1">Active Investments</div>
                <div className="text-2xl font-bold text-white">{portfolioHoldings.length}</div>
                <div className="text-gray-400 text-xs mt-1">Across {allocationData.length} categories</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="text-gray-400 text-sm mb-1">Social Impact Score</div>
                <div className="text-2xl font-bold text-white">{portfolioData.socialImpact}</div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                    style={{ width: `${portfolioData.socialImpact}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Current Holdings</h2>
                <Button variant="outline" className="px-4 py-2 text-sm">
                  <RefreshCw size={14} className="mr-2" />
                  Refresh Data
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 text-gray-400 text-sm font-medium">Project Name</th>
                      <th className="text-left py-3 text-gray-400 text-sm font-medium">NGO</th>
                      <th className="text-left py-3 text-gray-400 text-sm font-medium">Category</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-medium">Invested</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-medium">Current Value</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-medium">Return %</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioHoldings.map((holding) => (
                      <tr key={holding.id} className="border-t border-white/5">
                        <td className="py-4 text-white">{holding.name}</td>
                        <td className="py-4 text-gray-300">{holding.ngo}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                            {holding.category}
                          </span>
                        </td>
                        <td className="py-4 text-right text-gray-300">${holding.investedAmount}</td>
                        <td className="py-4 text-right text-white">${holding.currentValue}</td>
                        <td className="py-4 text-right">
                          <span className="text-green-400 font-medium">+{holding.returnPercentage}%</span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button className="p-2 text-gray-400 hover:text-white bg-slate-700/30 rounded-lg">
                              <Plus size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white bg-slate-700/30 rounded-lg">
                              <Minus size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white bg-slate-700/30 rounded-lg">
                              <Sliders size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recommended Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 rounded-lg p-4 flex">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <BarChart className="text-purple-400" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-white">Diversify Portfolio</h3>
                    <p className="text-sm text-gray-300 mt-1">Your portfolio is weighted heavily toward Education. Consider investing in Healthcare to balance risk.</p>
                  </div>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4 flex">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <PieChart className="text-green-400" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-white">Reinvest Returns</h3>
                    <p className="text-sm text-gray-300 mt-1">Reinvesting your $873 returns could increase your social impact score by up to 12 points.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
            </div>
            
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="text-gray-400 text-sm">Invest in Change. Impact Lives.</div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Risk Info Modal */}
      {showRiskInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/10 rounded-xl p-6 max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-white">Understanding Risk Levels</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowRiskInfo(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="text-sm text-gray-300 space-y-4">
              <p><strong className="text-white">Low Risk:</strong> Established projects with proven track records and stable returns. Less volatile but may offer lower returns.</p>
              <p><strong className="text-white">Medium Risk:</strong> Growing projects with good potential but some uncertainty. Balanced risk-reward profile.</p>
              <p><strong className="text-white">High Risk:</strong> New or experimental projects with significant potential but higher uncertainty. May offer higher returns but with increased volatility.</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                variant="primary" 
                className="px-4 py-2 text-sm"
                onClick={() => setShowRiskInfo(false)}
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogdaanInvestmentPage;