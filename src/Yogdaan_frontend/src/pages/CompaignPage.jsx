import React, { useState, useEffect } from 'react';
import { Search, User, ArrowRight, Star, Calendar, ChevronRight, Filter, TrendingUp, X, DollarSign, Award, Heart } from 'lucide-react';

const YogdaanCampaignPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simulate fetching campaign data
    const fetchCampaigns = () => {
      setIsLoading(true);
      
      // Mock campaign data
      const mockCampaigns = [
        {
          id: 1,
          title: "Clean Water Initiative",
          ngoName: "Water For All Foundation",
          endDate: "2025-05-15",
          rank: 2,
          raisedAmount: 123450,
          targetAmount: 250000,
          description: "Providing clean drinking water to rural communities affected by drought and water pollution. This initiative aims to install water purification systems in 50 villages.",
          bannerImage: "/api/placeholder/600/300",
          location: "Maharashtra, India",
          purpose: "Water & Sanitation",
          completedProjects: 12,
          beneficiaries: 45000
        },
        {
          id: 2,
          title: "Education for Every Child",
          ngoName: "Bright Future Trust",
          endDate: "2025-06-30",
          rank: 1,
          raisedAmount: 289700,
          targetAmount: 400000,
          description: "Building schools and providing educational materials for underprivileged children in remote areas. Our goal is to reach 100 new children this year.",
          bannerImage: "/api/placeholder/600/300",
          location: "Rajasthan, India",
          purpose: "Education",
          completedProjects: 18,
          beneficiaries: 72000
        },
        {
          id: 3,
          title: "Healthcare for Remote Villages",
          ngoName: "Health First Alliance",
          endDate: "2025-04-22",
          rank: 4,
          raisedAmount: 87200,
          targetAmount: 150000,
          description: "Providing essential medical services and supplies to remote villages with limited access to healthcare facilities.",
          bannerImage: "/api/placeholder/600/300",
          location: "Assam, India",
          purpose: "Healthcare",
          completedProjects: 8,
          beneficiaries: 23000
        },
        {
          id: 4,
          title: "Women Empowerment Program",
          ngoName: "Shakti Foundation",
          endDate: "2025-07-10",
          rank: 3,
          raisedAmount: 113800,
          targetAmount: 200000,
          description: "Training and supporting women entrepreneurs in rural communities to establish sustainable businesses.",
          bannerImage: "/api/placeholder/600/300",
          location: "Gujarat, India",
          purpose: "Women Empowerment",
          completedProjects: 14,
          beneficiaries: 3600
        },
        {
          id: 5,
          title: "Reforestation Project",
          ngoName: "Green Earth Initiative",
          endDate: "2025-08-25",
          rank: 5,
          raisedAmount: 56300,
          targetAmount: 120000,
          description: "Planting trees and restoring forest ecosystems in areas affected by deforestation and environmental degradation.",
          bannerImage: "/api/placeholder/600/300",
          location: "Uttarakhand, India",
          purpose: "Environment",
          completedProjects: 6,
          beneficiaries: 0
        },
        {
          id: 6,
          title: "Food Security Program",
          ngoName: "Hunger Relief Network",
          endDate: "2025-05-30",
          rank: 8,
          raisedAmount: 42500,
          targetAmount: 100000,
          description: "Providing nutritious meals to vulnerable populations and establishing sustainable food production systems.",
          bannerImage: "/api/placeholder/600/300",
          location: "Bihar, India",
          purpose: "Food & Nutrition",
          completedProjects: 5,
          beneficiaries: 18000
        }
      ];
      
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    };
    
    fetchCampaigns();
  }, []);

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    } else {
      return `₹${amount}`;
    }
  };

  const calculateProgress = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const filterCampaigns = (filter) => {
    setActiveFilter(filter);
    // In a real application, you would apply actual filtering logic here
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

  const CampaignCard = ({ campaign }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleCardClick = () => {
      setSelectedCampaign(campaign);
    };
    
    return (
      <div 
        className="relative overflow-hidden bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="h-full p-6 flex flex-col">
          {/* Basic Campaign Info */}
          <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-0 absolute' : 'opacity-100'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                <p className="text-gray-400 text-sm mb-1">by <span className="text-purple-400">{campaign.ngoName}</span></p>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Calendar size={14} className="mr-1" />
                  <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-500"></div>
                  <Star size={14} className="mr-1 text-yellow-400" />
                  <span>Rank #{campaign.rank}</span>
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
                src={campaign.bannerImage} 
                alt={campaign.title}
                className="object-cover w-full h-32 opacity-20"
              />
              <div className="absolute inset-0 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">{campaign.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Award size={12} className="mr-1 text-purple-400" />
                    Rank: #{campaign.rank}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1 text-purple-400" />
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp size={12} className="mr-1 text-purple-400" />
                    {formatAmount(campaign.raisedAmount)}
                  </div>
                  <div className="flex items-center">
                    <Heart size={12} className="mr-1 text-purple-400" />
                    {campaign.completedProjects} Projects
                  </div>
                </div>
                <Button className="px-4 py-2 text-sm mt-auto w-full">View Details</Button>
              </div>
            </div>
          </div>
          
          {/* Donation Button (Always Visible) */}
          <Button className="absolute top-6 right-6 px-3 py-1 text-sm" onClick={(e) => {
            e.stopPropagation();
            console.log("Donate to:", campaign.title);
          }}>
            <DollarSign size={14} className="mr-1" />
            Donate
          </Button>
        </div>
      </div>
    );
  };

  const CampaignDetailView = () => {
    if (!selectedCampaign) return null;
    
    const campaign = selectedCampaign;
    
    // Mock past campaigns data
    const pastCampaigns = [
      {
        id: 101,
        title: "Rural School Development",
        status: "Completed",
        year: "2024",
        raisedAmount: 180000,
        beneficiaries: 2400
      },
      {
        id: 102,
        title: "Teacher Training Program",
        status: "Completed",
        year: "2023",
        raisedAmount: 120000,
        beneficiaries: 650
      },
      {
        id: 103,
        title: "School Supply Drive",
        status: "Completed",
        year: "2023",
        raisedAmount: 85000,
        beneficiaries: 3200
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
              src={campaign.bannerImage} 
              alt={campaign.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">Rank #{campaign.rank}</div>
              <h1 className="text-3xl font-bold text-white mb-2">{campaign.ngoName}</h1>
              <p className="text-gray-300 flex items-center">
                <Calendar size={16} className="mr-2" />
                {campaign.completedProjects} completed projects • {campaign.beneficiaries.toLocaleString()} beneficiaries
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
                      <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button className="px-4 py-2">
                    <DollarSign size={16} className="mr-1" />
                    Donate
                  </Button>
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
                      style={{ width: `${calculateProgress(campaign.raisedAmount, campaign.targetAmount)}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    {Math.round(calculateProgress(campaign.raisedAmount, campaign.targetAmount))}% Complete
                  </div>
                </div>
              </div>
            </div>
            
            {/* NGO Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About the NGO</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="text-gray-300 mb-6">
                  <p className="mb-4">{campaign.ngoName} has been working in the field of {campaign.purpose.toLowerCase()} for over 10 years, focusing on sustainable development and community empowerment.</p>
                  <p>With a strong track record of successful projects and transparent fund management, we've earned the trust of donors and communities alike.</p>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">#{campaign.rank}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">Success Rate</div>
                    <div className="text-2xl font-bold text-white">94%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">Transparency</div>
                    <div className="text-2xl font-bold text-white">High</div>
                  </div>
                </div>
              </div>
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
                className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'all' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => filterCampaigns('all')}
              >
                All Campaigns
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'education' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => filterCampaigns('education')}
              >
                Education
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'healthcare' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => filterCampaigns('healthcare')}
              >
                Healthcare
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'environment' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => filterCampaigns('environment')}
              >
                Environment
              </button>
            </div>
          </div>
          
          <div className="flex items-center ml-auto">
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mr-2">
              <Filter size={18} className="text-gray-300" />
            </button>
            <div className="relative md:hidden">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-40"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
        
        {/* Campaign Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" className="px-8 py-3 mx-auto">
            Load More
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </main>
      
      {/* Campaign Detail View (Modal) */}
      {selectedCampaign && <CampaignDetailView />}
      
      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-white/5 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
            </div>
            
            <div className="text-gray-500 text-sm">© 2025 Yogdaan. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YogdaanCampaignPage;