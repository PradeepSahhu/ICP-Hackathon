import React, { useState } from 'react';
import { 
  ArrowRight, User, Briefcase, List, Heart, DollarSign, 
  Calendar, Globe, Award, TrendingUp, ChevronRight, Star, 
  ExternalLink, Info, ArrowLeft, Search, Bell, Menu
} from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDonationDetails, setShowDonationDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data
  const userData = {
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    joinDate: "December 2024",
    avatar: "/api/placeholder/100/100",
    totalDonated: "₹42,500",
    holdingsValue: "₹1,28,750",
    watchlistCount: 12
  };

  const userHoldings = [
    { id: 1, name: "Reliance Industries", symbol: "RELIANCE", shares: 15, avgPrice: 2420, currentPrice: 2580, change: 6.61 },
    { id: 2, name: "Tata Consultancy Services", symbol: "TCS", shares: 8, avgPrice: 3340, currentPrice: 3215, change: -3.74 },
    { id: 3, name: "HDFC Bank", symbol: "HDFCBANK", shares: 20, avgPrice: 1560, currentPrice: 1645, change: 5.45 },
    { id: 4, name: "Infosys", symbol: "INFY", shares: 12, avgPrice: 1880, currentPrice: 1925, change: 2.39 }
  ];

  const userWatchlist = [
    { id: 1, name: "ITC Limited", symbol: "ITC", price: 448.75, change: 1.23 },
    { id: 2, name: "Bharti Airtel", symbol: "BHARTIARTL", price: 1089.50, change: -0.67 },
    { id: 3, name: "Adani Ports", symbol: "ADANIPORTS", price: 892.30, change: 3.45 },
    { id: 4, name: "Larsen & Toubro", symbol: "LT", price: 3247.80, change: 0.89 }
  ];

  const userDonations = [
    { 
      id: 1, 
      ngoName: "Clean Water Initiative", 
      campaignName: "Clean Water for Rural Maharashtra",
      amount: "₹15,000", 
      date: "Jan 15, 2025",
      status: "Active",
      approvalRate: 92,
      totalRaised: "₹12.8L",
      description: "Providing clean drinking water to over 50 villages in drought-affected areas of Maharashtra.",
      endDate: "Apr 30, 2025",
      location: "Maharashtra, India",
      ngoRank: 2,
      category: "Water & Sanitation",
      banner: "/api/placeholder/800/200"
    },
    { 
      id: 2, 
      ngoName: "Educate India", 
      campaignName: "Digital Classrooms for Rural Schools",
      amount: "₹10,000", 
      date: "Dec 10, 2024",
      status: "Active",
      approvalRate: 87,
      totalRaised: "₹8.4L",
      description: "Equipping 25 rural schools with digital learning tools to bridge the educational divide.",
      endDate: "Mar 15, 2025",
      location: "Various locations, India",
      ngoRank: 4,
      category: "Education",
      banner: "/api/placeholder/800/200"
    },
    { 
      id: 3, 
      ngoName: "Green Earth Foundation", 
      campaignName: "Urban Reforestation Project",
      amount: "₹7,500", 
      date: "Feb 28, 2025",
      status: "Active",
      approvalRate: 95,
      totalRaised: "₹5.2L",
      description: "Planting 10,000 trees across urban centers to increase green cover and combat pollution.",
      endDate: "May 31, 2025",
      location: "Delhi NCR, India",
      ngoRank: 3,
      category: "Environment",
      banner: "/api/placeholder/800/200"
    },
    { 
      id: 4, 
      ngoName: "Healthcare for All", 
      campaignName: "Mobile Medical Vans for Remote Villages",
      amount: "₹10,000", 
      date: "Nov 5, 2024",
      status: "Completed",
      approvalRate: 98,
      totalRaised: "₹15L",
      description: "Providing essential healthcare services to remote villages through mobile medical units.",
      endDate: "Jan 31, 2025",
      location: "Rajasthan, India",
      ngoRank: 1,
      category: "Healthcare",
      banner: "/api/placeholder/800/200"
    }
  ];

  // UI Components
  const Logo = () => (
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
  );

  const ProfileCard = () => (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 mb-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <img src={userData.avatar} alt={userData.name} className="w-20 h-20 rounded-full mr-6 object-cover border-4 border-indigo-500/30" />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-1 shadow-lg">
              <Star size={14} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">{userData.name}</h2>
            <p className="text-gray-300">{userData.email}</p>
            <div className="flex items-center mt-1 text-xs text-gray-400">
              <Calendar size={12} className="mr-1" />
              Member since {userData.joinDate}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium">
            Edit Profile
          </button>
          <button className="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-colors text-sm font-medium">
            Settings
          </button>
        </div>
      </div>
    </div>
  );

  const Stats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-indigo-500/20 p-5 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 shadow-lg group">
        <div className="flex items-start justify-between">
          <div className="bg-indigo-500/20 rounded-xl w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
            <DollarSign size={20} className="text-indigo-400" />
          </div>
          <div className="bg-white/10 rounded-lg px-2 py-1 text-xs text-white">+12.4% ↑</div>
        </div>
        <div className="mt-4">
          <div className="text-gray-400 text-sm mb-1">Total Donated</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            {userData.totalDonated}
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/20 p-5 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 shadow-lg group">
        <div className="flex items-start justify-between">
          <div className="bg-purple-500/20 rounded-xl w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Briefcase size={20} className="text-purple-400" />
          </div>
          <div className="bg-white/10 rounded-lg px-2 py-1 text-xs text-white">+8.7% ↑</div>
        </div>
        <div className="mt-4">
          <div className="text-gray-400 text-sm mb-1">Portfolio Value</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            {userData.holdingsValue}
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-md border border-blue-500/20 p-5 hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300 shadow-lg group">
        <div className="flex items-start justify-between">
          <div className="bg-blue-500/20 rounded-xl w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Star size={20} className="text-blue-400" />
          </div>
          <div className="bg-white/10 rounded-lg px-2 py-1 text-xs text-white">+3 ↑</div>
        </div>
        <div className="mt-4">
          <div className="text-gray-400 text-sm mb-1">Watchlist Items</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            {userData.watchlistCount}
          </div>
        </div>
      </div>
    </div>
  );

  const TabsNavigation = () => (
    <div className="flex mb-8 overflow-x-auto hide-scrollbar">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 flex space-x-1 mx-auto">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeTab === 'overview' 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
            : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('holdings')}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeTab === 'holdings' 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
            : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
        >
          Holdings
        </button>
        <button 
          onClick={() => setActiveTab('watchlist')}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeTab === 'watchlist' 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
            : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
        >
          Watchlist
        </button>
        <button 
          onClick={() => { 
            setActiveTab('donations');
            setShowDonationDetails(false);
            setSelectedCampaign(null);
          }}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeTab === 'donations' 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
            : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
        >
          Donations
        </button>
      </div>
    </div>
  );

  const Holdings = () => (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Current Holdings</h3>
        <button className="text-xs text-indigo-400 flex items-center hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg">
          View All <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-white/10">
              <th className="pb-3 text-left">Stock</th>
              <th className="pb-3 text-right">Shares</th>
              <th className="pb-3 text-right">Avg. Price</th>
              <th className="pb-3 text-right">Current</th>
              <th className="pb-3 text-right">Change</th>
              <th className="pb-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {userHoldings.map(stock => (
              <tr key={stock.id} className="text-sm border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{stock.symbol}</span>
                    <span className="text-xs text-gray-400">{stock.name}</span>
                  </div>
                </td>
                <td className="py-4 text-right text-gray-300">{stock.shares}</td>
                <td className="py-4 text-right text-gray-300">₹{stock.avgPrice}</td>
                <td className="py-4 text-right text-gray-300">₹{stock.currentPrice}</td>
                <td className={`py-4 text-right ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <div className="flex items-center justify-end">
                    {stock.change >= 0 ? 
                      <div className="bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center">
                        <span>+{stock.change}%</span>
                        <ArrowRight size={12} className="ml-1 rotate-45" />
                      </div> : 
                      <div className="bg-rose-500/10 px-2 py-0.5 rounded-full flex items-center">
                        <span>{stock.change}%</span>
                        <ArrowRight size={12} className="ml-1 rotate-135" />
                      </div>
                    }
                  </div>
                </td>
                <td className="py-4 text-right font-medium text-white">
                  ₹{(stock.shares * stock.currentPrice).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all duration-300">
          Add New Stock
        </button>
      </div>
    </div>
  );

  const Watchlist = () => (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Your Watchlist</h3>
        <button className="text-xs text-indigo-400 flex items-center hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg">
          View All <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userWatchlist.map(stock => (
          <div key={stock.id} className="p-4 border border-white/10 rounded-xl hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 shadow-lg group">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-white flex items-center">
                  {stock.symbol}
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-indigo-400 hover:text-indigo-300">
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">₹{stock.price}</div>
                <div className={`text-xs mt-1 ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <div className={`inline-block px-2 py-0.5 rounded-full ${stock.change >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full py-3 rounded-xl border border-dashed border-indigo-400/30 text-sm text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center">
        <Star size={16} className="mr-2" /> Add to Watchlist
      </button>
    </div>
  );

  const DonationHistory = () => (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Your Donations</h3>
        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white font-medium border border-indigo-500/20">
          Total: {userData.totalDonated}
        </div>
      </div>
      
      <div className="space-y-4">
        {userDonations.map(donation => (
          <div 
            key={donation.id} 
            className="p-5 border border-white/10 rounded-xl hover:border-indigo-500/30 hover:bg-white/5 transition-all cursor-pointer shadow-lg group"
            onClick={() => {
              setSelectedCampaign(donation);
              setShowDonationDetails(true);
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <div className="font-medium text-white text-lg">{donation.campaignName}</div>
                <div className="text-sm text-gray-400 mb-2">by {donation.ngoName}</div>
                <div className="flex items-center text-xs text-gray-400 space-x-3">
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {donation.date}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    donation.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 
                    'bg-gray-500/20 text-gray-400 border border-gray-500/20'
                  }`}>
                    {donation.status}
                  </span>
                </div>
              </div>
              <div className="md:text-right">
                <div className="font-bold text-2xl bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  {donation.amount}
                </div>
                <div className="text-xs text-gray-400 mt-1 flex items-center md:justify-end">
                  <div className="w-full max-w-36 bg-white/10 rounded-full h-1.5 mr-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" 
                      style={{ width: `${donation.approvalRate}%` }}
                    ></div>
                  </div>
                  Approval Rate: {donation.approvalRate}%
                </div>
              </div>
              <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={20} className="text-indigo-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-500/20 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
          Discover More Campaigns
        </button>
      </div>
    </div>
  );

  const CampaignDetails = () => {
    if (!selectedCampaign) return null;
    
    return (
      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-0 overflow-hidden shadow-xl">
        {/* Banner */}
        <div className="relative h-48 overflow-hidden">
          <img src={selectedCampaign.banner} alt={selectedCampaign.campaignName} className="w-full h-full object-cover" />
          <button 
            onClick={() => setShowDonationDetails(false)}
            className="absolute top-4 left-4 bg-black/40 backdrop-blur-md rounded-full p-2 hover:bg-black/60 transition-all z-10"
          >
            <ArrowLeft size={16} className="text-white" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs mb-2 backdrop-blur-md border border-indigo-500/30">
              {selectedCampaign.category}
            </div>
            <h2 className="text-2xl font-bold text-white">{selectedCampaign.campaignName}</h2>
            <p className="text-gray-300 text-sm flex items-center">
              by <span className="font-medium text-indigo-300 ml-1">{selectedCampaign.ngoName}</span>
            </p>
          </div>
        </div>
        
        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center mb-2">
                <Award className="text-indigo-400 mr-2" size={16} />
                <div className="text-xs text-gray-400">NGO Rank</div>
              </div>
              <div className="text-xl font-medium text-white">#{selectedCampaign.ngoRank}</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center mb-2">
                <DollarSign className="text-emerald-400 mr-2" size={16} />
                <div className="text-xs text-gray-400">Total Raised</div>
              </div>
              <div className="text-xl font-medium text-white">{selectedCampaign.totalRaised}</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center mb-2">
                <Calendar className="text-purple-400 mr-2" size={16} />
                <div className="text-xs text-gray-400">End Date</div>
              </div>
              <div className="text-xl font-medium text-white">{selectedCampaign.endDate}</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center mb-2">
                <Globe className="text-blue-400 mr-2" size={16} />
                <div className="text-xs text-gray-400">Location</div>
              </div>
              <div className="text-xl font-medium text-white">{selectedCampaign.location}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Campaign Description</h3>
            <p className="text-gray-300 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/10">
              {selectedCampaign.description}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Your Contribution</h3>
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-5 border border-indigo-500/20">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="text-sm text-gray-400 mb-1">Amount Donated</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                    {selectedCampaign.amount}
                  </div>
                </div>
                <div className="h-16 w-px bg-white/10 hidden md:block"></div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Date</div>
                  <div className="text-lg text-white flex items-center">
                    <Calendar size={16} className="mr-2 text-purple-400" />
                    {selectedCampaign.date}
                  </div>
                </div>
                <div className="h-16 w-px bg-white/10 hidden md:block"></div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Status</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedCampaign.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 
                    'bg-gray-500/20 text-gray-400 border border-gray-500/20'
                  }`}>
                    {selectedCampaign.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
              Donate Again
            </button>
            <button className="flex-1 py-3 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-colors">
              View NGO Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OverviewContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Recent Activities</h3>
            <button className="text-xs text-indigo-400 flex items-center hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg">
              View All <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all">
              <div className="flex items-center">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-3">
                  <DollarSign size={16} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-white">Donation Made</div>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="text-xs text-gray-400">You donated ₹7,500 to Urban Reforestation Project</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all">
              <div className="flex items-center">
                <div className="bg-indigo-500/20 rounded-full p-2 mr-3">
                  <Briefcase size={16} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-white">Stock Purchased</div>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                  <div className="text-xs text-gray-400">You bought 5 shares of Reliance Industries at ₹2580</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all">
              <div className="flex items-center">
                <div className="bg-purple-500/20 rounded-full p-2 mr-3">
                  <Star size={16} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-white">Watchlist Updated</div>
                    <span className="text-xs text-gray-400">2 weeks ago</span>
                  </div>
                  <div className="text-xs text-gray-400">You added Larsen & Toubro to your watchlist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Recommended Campaigns</h3>
            <button className="text-xs text-indigo-400 flex items-center hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg">
              View All <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all group">
              <div className="flex items-center">
                <img src="/api/placeholder/60/60" alt="Campaign" className="w-12 h-12 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">Renewable Energy for Rural Schools</div>
                  <div className="text-xs text-gray-400">by Sustainable Future Foundation</div>
                  <div className="mt-2 flex items-center">
                    <div className="w-full max-w-32 bg-white/10 rounded-full h-1.5 mr-2">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-xs text-gray-400">78% funded</span>
                  </div>
                </div>
                <button className="ml-2 p-2 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all group">
              <div className="flex items-center">
                <img src="/api/placeholder/60/60" alt="Campaign" className="w-12 h-12 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">Food Security Initiative</div>
                  <div className="text-xs text-gray-400">by Food for All Trust</div>
                  <div className="mt-2 flex items-center">
                    <div className="w-full max-w-32 bg-white/10 rounded-full h-1.5 mr-2">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-xs text-gray-400">45% funded</span>
                  </div>
                </div>
                <button className="ml-2 p-2 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all group">
              <div className="flex items-center">
                <img src="/api/placeholder/60/60" alt="Campaign" className="w-12 h-12 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">Women Empowerment Project</div>
                  <div className="text-xs text-gray-400">by Rise Together Foundation</div>
                  <div className="mt-2 flex items-center">
                    <div className="w-full max-w-32 bg-white/10 rounded-full h-1.5 mr-2">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs text-gray-400">65% funded</span>
                  </div>
                </div>
                <button className="ml-2 p-2 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-md border border-indigo-500/20 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to make a difference?</h3>
            <p className="text-gray-300 text-sm max-w-md">Discover campaigns aligned with your values and track your impact journey all in one place.</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
              Explore Campaigns
            </button>
            <button className="px-5 py-3 rounded-xl border border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Top Navigation
  const TopNavigation = () => (
    <div className="bg-white/5 backdrop-blur-md border-b border-white/10 py-3 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
        <Logo />
      </div>
      
      <div className="hidden md:flex items-center space-x-1">
        <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
          Dashboard
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
          Explore
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
          Portfolio
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
          NGOs
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            <Search size={20} />
          </button>
        </div>
        <div className="relative">
          <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            <Bell size={20} />
          </button>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
            3
          </div>
        </div>
        <div className="relative">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-white hover:bg-indigo-500/30 transition-colors">
            AS
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile menu
  const MobileMenu = () => (
    mobileMenuOpen && (
      <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="bg-gray-900 w-3/4 h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <button 
              className="text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          
          <div className="space-y-1">
            <button className="w-full px-4 py-3 rounded-lg text-white text-left bg-indigo-500/20 border border-indigo-500/30">
              Dashboard
            </button>
            <button className="w-full px-4 py-3 rounded-lg text-gray-300 text-left hover:bg-white/5">
              Explore
            </button>
            <button className="w-full px-4 py-3 rounded-lg text-gray-300 text-left hover:bg-white/5">
              Portfolio
            </button>
            <button className="w-full px-4 py-3 rounded-lg text-gray-300 text-left hover:bg-white/5">
              NGOs
            </button>
          </div>
          
          <div className="border-t border-white/10 mt-6 pt-6">
            <div className="flex items-center mb-4">
              <img src={userData.avatar} alt={userData.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="text-white font-medium">{userData.name}</div>
                <div className="text-gray-400 text-xs">{userData.email}</div>
              </div>
            </div>
            
            <button className="w-full px-4 py-3 rounded-lg text-gray-300 text-left hover:bg-white/5 flex items-center">
              <User size={18} className="mr-3" /> Profile
            </button>
            <button className="w-full px-4 py-3 rounded-lg text-gray-300 text-left hover:bg-white/5 flex items-center">
              <Info size={18} className="mr-3" /> Settings
            </button>
            <button className="w-full mt-10 px-4 py-3 rounded-lg text-rose-400 text-left hover:bg-rose-500/10 flex items-center">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950">
      <TopNavigation />
      <MobileMenu />
      
      <main className="container mx-auto px-4 py-8">
        <ProfileCard />
        <Stats />
        <TabsNavigation />
        
        {activeTab === 'overview' && !showDonationDetails && <OverviewContent />}
        {activeTab === 'holdings' && !showDonationDetails && <Holdings />}
        {activeTab === 'watchlist' && !showDonationDetails && <Watchlist />}
        {activeTab === 'donations' && !showDonationDetails && <DonationHistory />}
        {showDonationDetails && <CampaignDetails />}
      </main>
      
      <footer className="border-t border-white/10 py-6 bg-black/20 backdrop-blur-md mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400 text-sm">
            © 2025 Yogdaan | Social Investment Platform
          </div>
          <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;