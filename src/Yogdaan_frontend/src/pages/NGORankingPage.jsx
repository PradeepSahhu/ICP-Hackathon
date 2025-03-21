import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, User, ChevronDown, Star, Shield, Award, Globe, TrendingUp, BarChart2, Menu, X, Heart, DollarSign, Users, Calendar } from 'lucide-react';

const NGORankingPage = () => {
  // Sample data for NGOs with more detailed information
  const topNGOs = [
    { 
      id: 1, 
      name: "Care Foundation", 
      rating: 4.9, 
      verified: true, 
      donationsReceived: "$542,000", 
      image: "/api/placeholder/100/100",
      description: "Providing healthcare services to underserved communities",
      approvalRate: "97%",
      lastActivity: "2 days ago",
      supporters: 3240
    },
    { 
      id: 2, 
      name: "Water for All", 
      rating: 4.8, 
      verified: true, 
      donationsReceived: "$498,000", 
      image: "/api/placeholder/100/100",
      description: "Building wells and water systems in drought-affected regions",
      approvalRate: "95%",
      lastActivity: "1 day ago",
      supporters: 2980
    },
    { 
      id: 3, 
      name: "Global Education", 
      rating: 4.7, 
      verified: true, 
      donationsReceived: "$436,000", 
      image: "/api/placeholder/100/100",
      description: "Providing educational resources to children worldwide",
      approvalRate: "93%",
      lastActivity: "3 days ago",
      supporters: 2645
    },
    { 
      id: 4, 
      name: "Clean Earth", 
      rating: 4.6, 
      verified: true, 
      donationsReceived: "$389,000", 
      image: "/api/placeholder/100/100",
      description: "Environmental cleanup and sustainability initiatives",
      approvalRate: "92%",
      lastActivity: "5 days ago",
      supporters: 2340
    },
    { 
      id: 5, 
      name: "Children First", 
      rating: 4.5, 
      verified: true, 
      donationsReceived: "$352,000", 
      image: "/api/placeholder/100/100",
      description: "Supporting orphaned and vulnerable children",
      approvalRate: "90%",
      lastActivity: "4 days ago",
      supporters: 2105
    },
  ];

  const allNGOs = [
    ...topNGOs,
    { 
      id: 6, 
      name: "Future Leaders", 
      rating: 4.4, 
      verified: true, 
      donationsReceived: "$318,000", 
      image: "/api/placeholder/100/100",
      description: "Youth leadership and entrepreneurship programs",
      approvalRate: "89%",
      lastActivity: "6 days ago",
      supporters: 1920
    },
    { 
      id: 7, 
      name: "Food Security Initiative", 
      rating: 4.3, 
      verified: true, 
      donationsReceived: "$296,000", 
      image: "/api/placeholder/100/100",
      description: "Tackling hunger through sustainable agriculture",
      approvalRate: "87%",
      lastActivity: "7 days ago",
      supporters: 1785
    },
    { 
      id: 8, 
      name: "Medical Aid", 
      rating: 4.2, 
      verified: false, 
      donationsReceived: "$274,000", 
      image: "/api/placeholder/100/100",
      description: "Emergency medical services in crisis zones",
      approvalRate: "85%",
      lastActivity: "9 days ago",
      supporters: 1650
    },
    { 
      id: 9, 
      name: "Shelter Network", 
      rating: 4.1, 
      verified: true, 
      donationsReceived: "$245,000", 
      image: "/api/placeholder/100/100",
      description: "Housing solutions for displaced communities",
      approvalRate: "84%",
      lastActivity: "8 days ago",
      supporters: 1480
    },
    { 
      id: 10, 
      name: "Rural Development", 
      rating: 4.0, 
      verified: true, 
      donationsReceived: "$228,000", 
      image: "/api/placeholder/100/100",
      description: "Empowering rural communities through infrastructure",
      approvalRate: "82%",
      lastActivity: "11 days ago",
      supporters: 1370
    },
    { 
      id: 11, 
      name: "Tech Education", 
      rating: 3.9, 
      verified: false, 
      donationsReceived: "$217,000", 
      image: "/api/placeholder/100/100",
      description: "Digital literacy programs for underserved communities",
      approvalRate: "80%",
      lastActivity: "10 days ago",
      supporters: 1305
    },
    { 
      id: 12, 
      name: "Artists United", 
      rating: 3.8, 
      verified: true, 
      donationsReceived: "$198,000", 
      image: "/api/placeholder/100/100",
      description: "Supporting artists and cultural preservation",
      approvalRate: "78%",
      lastActivity: "12 days ago",
      supporters: 1190
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('All');
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [showNGOModal, setShowNGOModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedNGOs, setAnimatedNGOs] = useState([]);

  // Filter options
  const filterOptions = ['All', 'Verified', 'Highest Rated', 'Most Donations'];

  // Simulate loading and entrance animations
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Animate in NGOs one by one
  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setAnimatedNGOs(prev => {
          if (prev.length < topNGOs.length) {
            return [...prev, topNGOs[prev.length]];
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 150);

      return () => clearInterval(timer);
    }
  }, [isLoading, topNGOs]);

  // Handle NGO click to show details
  const handleNGOClick = (ngo) => {
    setSelectedNGO(ngo);
    setShowNGOModal(true);
  };

  // Modal for NGO details
  const NGODetailModal = ({ ngo, onClose }) => {
    if (!ngo) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-in fade-in duration-300">
          <div className="relative">
            {/* Header image/banner */}
            <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <img src="/api/placeholder/800/300" alt="Banner" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* NGO logo */}
            <div className="absolute -bottom-16 left-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-800 bg-slate-700">
                <img src={ngo.image} alt={ngo.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="pt-20 pb-6 px-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{ngo.name}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-3">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span className="text-gray-300">{ngo.rating}/5</span>
                  </div>
                  {ngo.verified && (
                    <div className="flex items-center">
                      <Shield size={16} className="text-green-400 mr-1" />
                      <span className="text-gray-300">Verified</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-4 py-2">
                <div className="text-sm text-gray-400">Rank</div>
                <div className="text-2xl font-bold text-white">#{topNGOs.findIndex(n => n.id === ngo.id) + 1}</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8">{ngo.description}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <DollarSign size={20} className="text-green-400 mb-2" />
                <div className="text-sm text-gray-400">Total Donations</div>
                <div className="text-xl font-semibold text-white">{ngo.donationsReceived}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Users size={20} className="text-blue-400 mb-2" />
                <div className="text-sm text-gray-400">Supporters</div>
                <div className="text-xl font-semibold text-white">{ngo.supporters.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Shield size={20} className="text-purple-400 mb-2" />
                <div className="text-sm text-gray-400">Approval Rate</div>
                <div className="text-xl font-semibold text-white">{ngo.approvalRate}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Calendar size={20} className="text-amber-400 mb-2" />
                <div className="text-sm text-gray-400">Last Activity</div>
                <div className="text-xl font-semibold text-white">{ngo.lastActivity}</div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                <Heart size={18} className="mr-2" />
                Support
              </button>
              <button className="flex-1 border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10 py-3 rounded-xl font-medium transition-all duration-300">
                View Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex flex-col items-center animate-pulse">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-700/50 mb-4"></div>
          <div className="h-4 w-16 bg-slate-700/50 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 text-white">
      {/* Modal for NGO details */}
      {showNGOModal && selectedNGO && (
        <NGODetailModal ngo={selectedNGO} onClose={() => setShowNGOModal(false)} />
      )}
      
      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-white/5">
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
            <a href="/ngo-rankings" className="text-purple-400 border-b-2 border-purple-500 py-1 font-medium flex items-center">
              <Award className="mr-2" size={16} />
              NGOs Rankings
            </a>
            <a href="/trading" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <TrendingUp className="mr-2" size={16} />
              Investment
            </a>
            <a href="/compaign" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <BarChart2 className="mr-2" size={16} />
              Campaign
            </a>
          </div>
          
          {/* Search and Profile - right aligned */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NGOs..."
                className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-48"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all cursor-pointer">
              <User size={18} />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-slate-800/95 backdrop-blur-md p-4 z-50 border-b border-white/10">
            <div className="flex flex-col space-y-4 p-2">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search NGOs..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <a href="/ngo-rankings" className="text-purple-400 py-2 flex items-center">
                <Award className="mr-2" size={18} />
                NGOs Rankings
              </a>
              <a href="/trade" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
                <TrendingUp className="mr-2" size={18} />
                Trade
              </a>
              <a href="/campaign" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
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

      <main className="container mx-auto px-6 py-12">
        {/* Page Title with animated background */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -top-20 -left-20 animate-blob"></div>
            <div className="absolute w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -bottom-20 -right-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">NGO Rankings</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover top-rated NGOs making a real impact with transparent fund management and donor voting.
          </p>
        </div>

        {/* Top 5 NGOs Section with eye-catching design */}
        <section className="mb-24 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-full h-56 bg-purple-600/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-16 md:w-32"></div>
            <h2 className="text-2xl font-bold mx-4 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">Top 5 NGOs</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-16 md:w-32"></div>
          </div>
          
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
              {animatedNGOs.map((ngo, index) => (
                <div 
                  key={ngo.id} 
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleNGOClick(ngo)}
                >
                  <div className="flex flex-col items-center">
                    {/* Circle with rank */}
                    <div className="relative mb-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] bg-gray-800 relative">
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-full border-2 border-transparent"></div>
                        
                        {/* Background glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        
                        <img src={ngo.image} alt={ngo.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Rank badge with animation */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* NGO name - always visible */}
                    <div className="text-center">
                      <p className="font-medium text-white">{ngo.name}</p>
                      <div className="flex items-center justify-center text-sm mt-1">
                        <Star size={12} className="text-yellow-400 mr-1" />
                        <span className="text-gray-400">{ngo.rating}</span>
                      </div>
                    </div>
                    
                    {/* NGO info on hover - more detailed */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-purple-500/30 w-56 text-center scale-90 group-hover:scale-100 z-10">
                      <p className="text-sm text-gray-300 truncate">{ngo.description}</p>
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between">
                        <div className="text-xs">
                          <span className="text-gray-400">Donations:</span>
                          <br />
                          <span className="text-white font-medium">{ngo.donationsReceived}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-400">Approval:</span>
                          <br />
                          <span className="text-white font-medium">{ngo.approvalRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Call to action below top 5 */}
          {!isLoading && (
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                View All Top NGOs
              </button>
            </div>
          )}
        </section>

        {/* All NGOs Section with improved design */}
        <section>
          <div className="bg-gradient-to-r from-slate-900 via-purple-900/10 to-slate-900 backdrop-blur-md rounded-2xl border border-white/5 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Globe className="mr-2 text-purple-400" size={24} />
                All NGOs
              </h2>
              
              {/* Advanced filter controls */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative w-48">
                  <button 
                    className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-gray-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span>Filter: {filterOption}</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-slate-800 border border-white/10 rounded-lg shadow-lg overflow-hidden z-10">
                      {filterOptions.map((option) => (
                        <button
                          key={option}
                          className="w-full text-left px-4 py-2 text-gray-300 hover:bg-purple-500/20 transition-colors"
                          onClick={() => {
                            setFilterOption(option);
                            setIsMenuOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search in list..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-48"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
            
            {/* NGOs Table with improved styling and interaction */}
            <div className="overflow-hidden rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-700/50">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 rounded-tl-xl">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">NGO</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rating</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Donations</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allNGOs.map((ngo, index) => (
                      <tr 
                        key={ngo.id} 
                        className={`hover:bg-purple-500/10 transition-colors cursor-pointer ${index < 5 ? 'bg-purple-500/5' : ''}`}
                        onClick={() => handleNGOClick(ngo)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index < 3 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-slate-700 text-gray-300'
                            }`}>
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-white/10">
                              <img src={ngo.image} alt={ngo.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-white">{ngo.name}</div>
                              <div className="text-sm text-gray-400">{ngo.description.substring(0, 30)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" />
                            <span className="text-white">{ngo.rating}</span>
                            <span className="text-gray-400">/5</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {ngo.verified ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                              <Shield size={12} className="mr-1" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {ngo.donationsReceived}
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 rounded-lg px-3 py-1 text-sm font-medium transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 px-2">
              <button className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none">
                Previous
              </button>
              <div className="flex space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
                  10
                </button>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-white/5 py-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting donors with trusted NGOs through transparent governance and blockchain-verified donations.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">NGO Rankings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 Yogdaan. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute h-96 w-96 bg-purple-600/10 rounded-full blur-3xl -top-48 -left-48 animate-blob"></div>
        <div className="absolute h-96 w-96 bg-indigo-600/10 rounded-full blur-3xl -bottom-48 -right-48 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NGORankingPage;