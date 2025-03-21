import React, { useState, useEffect } from 'react';
import { Search, User, ArrowRight, Star, Calendar, ChevronRight, Filter, 
         TrendingUp, X, DollarSign, Award, Heart } from 'lucide-react';
import { Yogdaan_backend } from '../../../declarations/Yogdaan_backend';

const YogdaanCampaignPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [ngos, setNgos] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all campaigns
        const campaignsResult = await Yogdaan_backend.getAllCampaigns();
        
        // Fetch all NGOs
        const ngosResult = await Yogdaan_backend.getAllNGOs();
        
        // Create an NGO lookup object
        const ngoLookup = {};
        ngosResult.forEach(ngo => {
          ngoLookup[ngo.id] = ngo;
        });
        
        setNgos(ngoLookup);
        setCampaigns(campaignsResult);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load campaigns. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDonate = async (campaignId) => {
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    try {
      // Convert donation amount to the format expected by the backend
      const amount = Math.floor(parseFloat(donationAmount) * 100); // Convert to lowest denomination
      
      // Call the donate function from the backend
      const donationResult = await Yogdaan_backend.donate(campaignId, amount, anonymous);
      
      if ('ok' in donationResult) {
        alert(`Thank you for your donation of ${donationAmount} to this campaign!`);
        setDonationAmount('');
        
        // Refresh campaign data after donation
        const updatedCampaignResult = await Yogdaan_backend.getCampaign(campaignId);
        if ('ok' in updatedCampaignResult) {
          // If we're looking at the selected campaign, update it
          if (selectedCampaign && selectedCampaign.id === campaignId) {
            setSelectedCampaign({
              ...updatedCampaignResult.ok,
              ngo: ngos[updatedCampaignResult.ok.ngoId]
            });
          }
          
          // Update the campaign in the main list
          setCampaigns(prev => 
            prev.map(campaign => 
              campaign.id === campaignId ? updatedCampaignResult.ok : campaign
            )
          );
        }
      } else {
        // Handle error from backend
        const errorType = Object.keys(donationResult.err)[0];
        alert(`Error: ${errorType}. Please try again.`);
      }
    } catch (err) {
      console.error("Error making donation:", err);
      alert("Failed to process donation. Please try again later.");
    }
  };

  const formatAmount = (amount) => {
    const amu = parseFloat( Number(amount));
    if (amu >= 100000) {
      return `₹${(amu / 100000).toFixed(1)}L`;
    } else if (amu >= 1000) {
      return `₹${(amu / 1000).toFixed(1)}K`;
    } else {
      return `₹${amu}`;
    }
  };

  const calculateProgress = (raised, target) => {
    return Math.min((parseFloat(Number(raised)) / parseFloat(Number(target))) * 100, 100);
  };

  const filterCampaigns = (filter) => {
    setActiveFilter(filter);
    // In a real application, you would apply actual filtering logic
    // For now, we're just setting the filter state
  };

  const formatDate = (timestamp) => {
    // Convert nanoseconds to milliseconds for JS Date
    return new Date(Number(timestamp) / 1000000).toLocaleDateString();
  };

  const getStatusDisplay = (statusObj) => {
    if ('active' in statusObj) return "Active";
    if ('completed' in statusObj) return "Completed";
    if ('cancelled' in statusObj) return "Cancelled";
    return "Unknown";
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterCampaignsBySearch = () => {
    if (!searchTerm.trim()) return campaigns;
    
    const term = searchTerm.toLowerCase();
    return campaigns.filter(campaign => {
      const matchesTitle = campaign.title.toLowerCase().includes(term);
      const matchesPurpose = campaign.purpose.toLowerCase().includes(term);
      const matchesNGO = ngos[campaign.ngoId]?.name.toLowerCase().includes(term);
      
      return matchesTitle || matchesPurpose || matchesNGO;
    });
  };

  const filterCampaignsByCategory = (campaignsList) => {
    if (activeFilter === 'all') return campaignsList;
    
    return campaignsList.filter(campaign => {
      return campaign.purpose.toLowerCase() === activeFilter.toLowerCase();
    });
  };

  const getFilteredCampaigns = () => {
    const searchFiltered = filterCampaignsBySearch();
    return filterCampaignsByCategory(searchFiltered);
  };

  const Button = ({ children, className, onClick, variant = "primary" }) => {
    const baseClasses = "rounded-xl font-medium transition-all duration-300 shadow-lg flex items-center justify-center";
    
    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
      outline: "border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10",
      secondary: "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20"
    };
    
    return (
      <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };

  const handleCampaignClick = async (campaign) => {
    try {
      // Fetch the latest campaign data
      const campaignResult = await Yogdaan_backend.getCampaign(campaign.id);
      
      if ('ok' in campaignResult) {
        // Set the selected campaign with NGO information
        setSelectedCampaign({
          ...campaignResult.ok,
          ngo: ngos[campaignResult.ok.ngoId]
        });
      } else {
        alert("Failed to load campaign details.");
      }
    } catch (err) {
      console.error("Error fetching campaign details:", err);
      alert("Failed to load campaign details. Please try again later.");
    }
  };

  const CampaignCard = ({ campaign }) => {
    const [isHovered, setIsHovered] = useState(false);
    const ngo = ngos[campaign.ngoId];
    const isActive = 'active' in campaign.status;
    
    if (!ngo) return null; // Skip if NGO data is not available
    
    return (
      <div 
        className="relative overflow-hidden bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleCampaignClick(campaign)}
      >
        <div className="h-full p-6 flex flex-col">
          {/* Basic Campaign Info */}
          <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-0 absolute' : 'opacity-100'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                <p className="text-gray-400 text-sm mb-1">by <span className="text-purple-400">{ngo.name}</span></p>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Calendar size={14} className="mr-1" />
                  <span>Ends: {formatDate(campaign.endDate)}</span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-500"></div>
                  <Star size={14} className="mr-1 text-yellow-400" />
                  <span>Rank #{ngo.rank}</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{formatAmount(campaign.raisedAmount)}</span>
                <span className="text-gray-400">of {formatAmount(campaign.targetAmount)}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${calculateProgress(campaign.raisedAmount, campaign.targetAmount)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Hover State with Banner and Details */}
          <div className={`transition-opacity duration-300 absolute inset-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-slate-900/95"></div>
              <img 
                src="/api/placeholder/600/300" 
                alt={campaign.title}
                className="object-cover w-full h-32 opacity-20"
              />
              <div className="absolute inset-0 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">{campaign.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Award size={12} className="mr-1 text-purple-400" />
                    Rank: #{ngo.rank}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1 text-purple-400" />
                    {formatDate(campaign.endDate)}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp size={12} className="mr-1 text-purple-400" />
                    {formatAmount(campaign.raisedAmount)}
                  </div>
                  <div className="flex items-center">
                    <Heart size={12} className="mr-1 text-purple-400" />
                    {ngo.completedProjects} Projects
                  </div>
                </div>
                <Button className="px-4 py-2 text-sm mt-auto w-full">View Details</Button>
              </div>
            </div>
          </div>
          
          {/* Donation Button (Always Visible) */}
          {isActive && (
            <Button 
              className="absolute top-6 right-6 px-3 py-1 text-sm" 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCampaign({
                  ...campaign,
                  ngo: ngo
                });
              }}
            >
              <DollarSign size={14} className="mr-1" />
              Donate
            </Button>
          )}
        </div>
      </div>
    );
  };

  const CampaignDetailView = () => {
    if (!selectedCampaign) return null;
    
    const campaign = selectedCampaign;
    const ngo = campaign.ngo;
    const progress = calculateProgress(campaign.raisedAmount, campaign.targetAmount);
    const status = getStatusDisplay(campaign.status);
    const isActive = 'active' in campaign.status;
    
    // For demo purposes - would normally come from the smart contract
    const pastCampaigns = [
      {
        id: "past-1",
        title: ngo.completedProjects > 0 ? `${ngo.name} Previous Campaign` : "No Previous Campaigns",
        status: "Completed",
        year: "2024",
        raisedAmount: ngo.completedProjects > 0 ? campaign.targetAmount * 0.9 : 0,
        beneficiaries: ngo.beneficiaries > 1000 ? Math.floor(ngo.beneficiaries / 3) : 0
      }
    ];
    
    return (
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 overflow-y-auto">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            onClick={() => setSelectedCampaign(null)}
          >
            <X size={24} className="text-white" />
          </button>
          
          {/* NGO Banner and Basic Info */}
          <div className="relative mb-8 rounded-2xl overflow-hidden">
            <img 
              src="/api/placeholder/1200/400" 
              alt={campaign.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">Rank #{ngo.rank}</div>
              <h1 className="text-3xl font-bold text-white mb-2">{ngo.name}</h1>
              <p className="text-gray-300 flex items-center">
                <Calendar size={16} className="mr-2" />
                {ngo.completedProjects} completed projects • {ngo.beneficiaries.toLocaleString()} beneficiaries
              </p>
            </div>
          </div>
          
          {/* Current Campaign */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Current Campaign</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>Ends: {formatDate(campaign.endDate)}</span>
                    </div>
                  </div>
                  {isActive && (
                    <Button 
                      className="px-4 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Donation will be handled in the donation section
                      }}
                    >
                      <DollarSign size={16} className="mr-1" />
                      Donate
                    </Button>
                  )}
                </div>
                
                <p className="text-gray-300 mb-6">{campaign.description}</p>
                
                {/* Campaign Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Location</div>
                    <div className="text-white">{campaign.location}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Purpose</div>
                    <div className="text-white">{campaign.purpose}</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium">{formatAmount(campaign.raisedAmount)}</span>
                    <span className="text-gray-400">of {formatAmount(campaign.targetAmount)}</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    {Math.round(progress)}% Complete
                  </div>
                </div>
              </div>
            </div>
            
            {/* NGO Info + Donation Box */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About the NGO</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-6">
                <div className="text-gray-300 mb-6">
                  <p className="mb-4">{ngo.name} has been working in the field of {campaign.purpose.toLowerCase()} with a focus on sustainable development and community empowerment.</p>
                  <p>{ngo.description}</p>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">#{ngo.rank}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">Transparency</div>
                    <div className="text-2xl font-bold text-white">{ngo.transparencyScore}/100</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">Verified</div>
                    <div className="text-2xl font-bold text-white">{ngo.verified ? "Yes" : "No"}</div>
                  </div>
                </div>
              </div>
              
              {/* Donation Box */}
              {isActive ? (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Make a Donation</h2>
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="donation-amount">
                      Amount (₹)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-300 bg-slate-700 rounded-l-md border border-r-0 border-slate-600">
                        ₹
                      </span>
                      <input
                        className="appearance-none border rounded-r-md w-full py-2 px-3 bg-slate-700 text-white border-slate-600 leading-tight focus:outline-none focus:border-purple-500"
                        id="donation-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={() => setAnonymous(!anonymous)}
                        className="mr-2 text-purple-500 focus:ring-purple-400 border-slate-600 bg-slate-700 rounded"
                      />
                      <span className="text-gray-300 text-sm">Make this donation anonymous</span>
                    </label>
                  </div>
                  
                  <Button
                    className="py-2 px-4 w-full"
                    onClick={() => handleDonate(campaign.id)}
                  >
                    <DollarSign size={16} className="mr-2" />
                    Donate Now
                  </Button>
                  
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    Your donation will be securely processed and tracked on the blockchain.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Campaign {status}</h2>
                  <p className="text-gray-300 mb-4">
                    This campaign is no longer accepting donations as it has been marked as {status.toLowerCase()}.
                  </p>
                  <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30">
                    <h3 className="font-medium text-indigo-300 mb-2">Campaign Results</h3>
                    <p className="text-indigo-200 mb-2">
                      Total Raised: ₹{campaign.raisedAmount.toLocaleString()}
                    </p>
                    <p className="text-indigo-200">
                      Goal Completion: {progress}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Past Campaigns */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Past Campaigns</h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="divide-y divide-white/10">
                {pastCampaigns.map((pastCampaign) => (
                  <div key={pastCampaign.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">{pastCampaign.title}</h4>
                        <div className="flex items-center text-sm text-gray-400">
                          <span className="text-green-400 mr-2">{pastCampaign.status}</span>
                          <span>• {pastCampaign.year}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{formatAmount(pastCampaign.raisedAmount)}</div>
                        <div className="text-sm text-gray-400">{pastCampaign.beneficiaries.toLocaleString()} beneficiaries</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-8 max-w-lg mx-auto text-center">
          <X size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Campaigns</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button className="px-6 py-3 mx-auto" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 text-white">
      {/* Navigation */}
      <header>
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
            <a href="/ngo-rankings" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <Award className="mr-1" size={16} />
              NGOs Rankings
            </a>
            <a href="trading" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <TrendingUp className="mr-1" size={16} />
              Investment
            </a>
            <a href="compaign" className="text-purple-400 border-b-2 border-purple-500 pb-1 transition-colors flex items-center">
              <Heart className="mr-1" size={16} />
              Campaign
            </a>
          </div>
          
          {/* Search and Profile - right aligned */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-48"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all cursor-pointer">
              <User size={18} />
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        {/* Page Title and Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Make a Difference
          </h1>
          <p className="text-xl text-gray-300">
            Support verified NGOs and track your donations with full transparency.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-full border border-white/10 p-1 flex-shrink-0">
            <div className="flex items-center">
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
               // Complete the filterCampaigns function that was cut off
               onClick={() => filterCampaigns('all')}
               >
                 All
               </button>
               <button 
                 className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'education' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
                 onClick={() => filterCampaigns('education')}
               >
                 Education
               </button>
               <button 
                 className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'healthcare' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
                 onClick={() => filterCampaigns('healthcare')}
               >
                 Healthcare
               </button>
               <button 
                 className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'environment' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
                 onClick={() => filterCampaigns('environment')}
               >
                 Environment
               </button>
             </div>
           </div>
           
           <div className="flex-grow"></div>
           
           <Button 
             variant="secondary"
             className="px-4 py-2 text-sm"
             onClick={() => {/* Advanced filter functionality would go here */}}
           >
             <Filter size={14} className="mr-2" />
             Advanced Filters
           </Button>
         </div>
         
         {/* Campaign Grid */}
         {isLoading ? (
           <div className="flex flex-col items-center justify-center py-16">
             <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-gray-300">Loading campaigns...</p>
           </div>
         ) : (
           <>
             {getFilteredCampaigns().length === 0 ? (
               <div className="text-center py-16">
                 <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                   <Search size={32} className="text-gray-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">No campaigns found</h3>
                 <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                 <Button 
                   className="px-6 py-3 mx-auto"
                   onClick={() => {
                     setSearchTerm('');
                     setActiveFilter('all');
                   }}
                 >
                   Clear All Filters
                 </Button>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {getFilteredCampaigns().map(campaign => (
                   <CampaignCard key={campaign.id} campaign={campaign} />
                 ))}
               </div>
             )}
           </>
         )}
         
         {/* Load More Button */}
         {!isLoading && getFilteredCampaigns().length > 0 && (
           <div className="text-center mt-12">
             <Button className="px-6 py-3 mx-auto">
               Load More Campaigns
               <ChevronRight size={16} className="ml-2" />
             </Button>
           </div>
         )}
       </main>
       
       {/* Footer */}
       <footer className="border-t border-white/10 mt-16">
         <div className="container mx-auto px-6 py-8">
           <div className="flex flex-col md:flex-row justify-between items-center">
             <div className="flex items-center space-x-2 mb-4 md:mb-0">
               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                   <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                   <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                 </svg>
               </div>
               <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
             </div>
             <div className="text-gray-400 text-sm">
               &copy; {new Date().getFullYear()} Yogdaan Foundation. All rights reserved.
             </div>
           </div>
         </div>
       </footer>
       
       {/* Campaign Detail Modal */}
       {selectedCampaign && <CampaignDetailView />}
       
       {/* Mobile Menu */}
       <div className={`fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="container mx-auto px-6 py-8">
           <div className="flex justify-between items-center mb-8">
             <div className="flex items-center space-x-2">
               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                   <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                   <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                 </svg>
               </div>
               <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
             </div>
             <button 
               className="bg-white/10 p-2 rounded-full"
               onClick={() => setIsMenuOpen(false)}
             >
               <X size={24} className="text-white" />
             </button>
           </div>
           
           <div className="flex flex-col space-y-6">
             <a href="/ngo-rankings" className="text-xl font-medium text-white flex items-center hover:text-purple-400 transition-colors">
               <Award className="mr-3" size={24} />
               NGOs Rankings
               <ArrowRight className="ml-auto" size={20} />
             </a>
             <a href="/trading" className="text-xl font-medium text-white flex items-center hover:text-purple-400 transition-colors">
               <TrendingUp className="mr-3" size={24} />
               Investment
               <ArrowRight className="ml-auto" size={20} />
             </a>
             <a href="/campaign" className="text-xl font-medium text-purple-400 flex items-center">
               <Heart className="mr-3" size={24} />
               Campaign
               <ArrowRight className="ml-auto" size={20} />
             </a>
             
             <div className="pt-6 border-t border-white/10">
               <div className="relative mb-6">
                 <input
                   type="text"
                   placeholder="Search campaigns..."
                   className="pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-full"
                   value={searchTerm}
                   onChange={handleSearch}
                 />
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
               </div>
               
               <Button className="w-full py-3">
                 <User size={20} className="mr-3" />
                 Sign In / Register
               </Button>
             </div>
           </div>
         </div>
       </div>
       
       {/* Mobile Nav Bar */}
       <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-2 md:hidden">
         <div className="flex justify-between">
           <a href="/" className="flex-1 flex flex-col items-center justify-center py-2 text-gray-400 hover:text-purple-400 transition-colors">
             <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             <span className="text-xs mt-1">Home</span>
           </a>
           <a href="/ngo-rankings" className="flex-1 flex flex-col items-center justify-center py-2 text-gray-400 hover:text-purple-400 transition-colors">
             <Award size={20} />
             <span className="text-xs mt-1">NGOs</span>
           </a>
           <a href="/campaign" className="flex-1 flex flex-col items-center justify-center py-2 text-purple-400">
             <Heart size={20} />
             <span className="text-xs mt-1">Campaigns</span>
           </a>
           <a href="/trading" className="flex-1 flex flex-col items-center justify-center py-2 text-gray-400 hover:text-purple-400 transition-colors">
             <TrendingUp size={20} />
             <span className="text-xs mt-1">Invest</span>
           </a>
           <button 
             className="flex-1 flex flex-col items-center justify-center py-2 text-gray-400 hover:text-purple-400 transition-colors"
             onClick={() => setIsMenuOpen(true)}
           >
             <div className="w-6 h-6 relative">
               <span className="absolute top-1 left-0 w-6 h-0.5 bg-current rounded"></span>
               <span className="absolute top-3 left-0 w-6 h-0.5 bg-current rounded"></span>
               <span className="absolute top-5 left-0 w-6 h-0.5 bg-current rounded"></span>
             </div>
             <span className="text-xs mt-1">Menu</span>
           </button>
         </div>
       </div>
     </div>
   );
 };
 
 export default YogdaanCampaignPage;