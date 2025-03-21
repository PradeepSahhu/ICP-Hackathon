import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Search, User, Award, TrendingUp, BarChart2, Menu, X, ExternalLink, ArrowRight, Heart } from 'lucide-react';

const YogdaanHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create a sphere geometry for the globe effect
    const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x5e35b1,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Add particle effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xab47bc
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 6;
    
    // Add controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.y += 0.002;
      particlesMesh.rotation.y += 0.001;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(sphere);
      scene.remove(particlesMesh);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Automatic feature carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const impactStats = [
    { value: "$2.4M", label: "Total Donations" },
    { value: "40+", label: "Verified NGOs" },
    { value: "12,000+", label: "Donors" },
    { value: "94%", label: "Donor Approval Rate" }
  ];

  const features = [
    {
      title: "Transparent Donations",
      description: "Every transaction is recorded on the blockchain, ensuring full transparency in how funds are utilized."
    },
    {
      title: "Donor Approval System",
      description: "NGOs need approval from 50%+ of donors before spending funds, giving you control over your donation."
    },
    {
      title: "Verified NGOs Only",
      description: "We thoroughly verify every organization on our platform to ensure legitimacy."
    },
    {
      title: "Blockchain Secured",
      description: "Built on Internet Computer blockchain, providing security and immutability for all transactions."
    }
  ];

  const FeaturedNGOs = [
    { name: "Clean Water Initiative", rank: 1, logo: "🌊" },
    { name: "Forest Conservation", rank: 2, logo: "🌳" },
    { name: "Children's Education", rank: 3, logo: "📚" },
    { name: "Women Empowerment", rank: 4, logo: "👩" },
    { name: "Food for All", rank: 5, logo: "🍲" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 text-white overflow-hidden">
      {/* 3D Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900/80 -z-5"></div>
      
      {/* Navigation */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
          </div>
          
          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center group">
              <Award className="mr-1" size={16} />
              <span>NGOs Rankings</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400 mt-0.5"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center group">
              <TrendingUp className="mr-1" size={16} />
              <span>Trade</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400 mt-0.5"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center group">
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
                placeholder="Search NGOs..."
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
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">My Donations</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Watchlist</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded-lg">Holdings</a>
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
                  placeholder="Search NGOs..."
                  className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
                <Award className="mr-2" size={18} />
                NGOs Rankings
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors py-2 flex items-center">
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
      
      {/* Hero Section with TWO main buttons */}
      <section className="relative z-0 pt-20 pb-16 md:py-32 flex items-center min-h-screen">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-purple-300">
              Blockchain Powered Donations
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Donate with</span>
              <br />
              <span className="text-white">Complete Control</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Your donations, your decision. Approve how NGOs spend your funds and be part of the change you want to see.
            </p>
            
            {/* Two main centered buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Button className="px-12 py-5 text-lg sm:w-48 group relative overflow-hidden">
                <span className="relative z-10">Donate Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-indigo-600/50 opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-500 rounded-full"></span>
              </Button>
              <Button variant="outline" className="px-12 py-5 text-lg sm:w-48 group">
                <span>Explore NGOs</span>
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Feature carousel */}
            <div className="mt-12 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl mx-auto overflow-hidden">
              <div className="mb-4 flex justify-center space-x-2">
                {features.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeFeature ? 'bg-purple-500 w-8' : 'bg-gray-600'}`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
              <div className="transition-all duration-500 ease-in-out">
                <div className="text-xl font-semibold text-white mb-2">
                  {features[activeFeature].title}
                </div>
                <p className="text-gray-300">
                  {features[activeFeature].description}
                </p>
              </div>
            </div>
            
            {/* Stats under the buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
              {impactStats.map((stat, index) => (
                <div key={index} className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/30 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured NGOs Section */}
        <div className="absolute bottom-24 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white">Top Ranked NGOs</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-2"></div>
            </div>
            
            <div className="flex justify-center space-x-4 md:space-x-8 overflow-x-auto pb-4 no-scrollbar">
              {FeaturedNGOs.map((ngo, index) => (
                <div key={index} className="text-center group">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl group-hover:bg-gradient-to-r from-purple-500/20 to-indigo-500/20 transition-all duration-300 group-hover:border-purple-500/50">
                      {ngo.logo}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {ngo.rank}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {ngo.name}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center">
                View All Rankings <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl opacity-70"></div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/5 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Yogdaan</span>
            </div>
            
            <div className="text-gray-500 text-sm">© 2025 Yogdaan | Your donations, your decisions</div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xs">Privacy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xs">Terms</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xs">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YogdaanHomepage;