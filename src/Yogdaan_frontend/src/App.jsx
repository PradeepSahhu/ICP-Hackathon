import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Menu, X, ArrowRight, Check, Shield, Eye, BarChart3, Globe, Users, ArrowUpRight, Wallet } from 'lucide-react';
import { Button } from './components/ui/button.jsx';

const YogdaanHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNGO, setActiveNGO] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const statsRef = useRef(null);

  // NGO examples with impact stats
  const ngoExamples = [
    {
      id: 1,
      name: "Clean Water Initiative",
      description: "Providing clean drinking water to rural communities in developing regions",
      progress: 78,
      raised: 41.6,
      goal: 53.2,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      name: "Education For All",
      description: "Building schools and providing education resources for underprivileged children",
      progress: 62,
      raised: 28.4,
      goal: 45.8,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      name: "Reforestation Project",
      description: "Planting trees to combat deforestation and climate change impacts",
      progress: 45,
      raised: 21.2,
      goal: 47.0,
      image: "/api/placeholder/400/250"
    }
  ];

  // Impact statistics
  const impactStats = [
    { value: "$2.4M", label: "Total Donations" },
    { value: "40+", label: "Verified NGOs" },
    { value: "12,000+", label: "Donors" },
    { value: "94%", label: "Funds Reach Target" }
  ];

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
      color: 0x0099ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Add some particle effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ffaa
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const FeatureCard = ({ icon, title, description }) => (
    <motion.div 
      className="relative p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-gray-200 border-opacity-20 overflow-hidden"
      whileHover={{ 
        y: -10,
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        borderColor: "#0ea5e9",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-70"></div>
      <div className="mb-4 text-cyan-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );

  const TestimonialCard = ({ quote, author, role, image }) => (
    <motion.div 
      className="bg-slate-800 rounded-xl p-6 border border-gray-700 relative"
      whileHover={{ y: -5 }}
    >
      <div className="absolute -top-4 -left-4 text-cyan-400 text-4xl">"</div>
      <p className="text-gray-300 mb-4 relative z-10">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <div className="text-white font-medium">{author}</div>
          <div className="text-gray-400 text-sm">{role}</div>
        </div>
      </div>
    </motion.div>
  );

  const NGOCard = ({ ngo, index }) => (
    <motion.div 
      className={`bg-slate-800 rounded-xl overflow-hidden border ${activeNGO === index ? 'border-cyan-400' : 'border-gray-700'}`}
      whileHover={{ y: -5, borderColor: "#0ea5e9" }}
      onClick={() => setActiveNGO(index)}
    >
      <img src={ngo.image} alt={ngo.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{ngo.name}</h3>
        <p className="text-gray-300 text-sm mb-3">{ngo.description}</p>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-gray-300">{ngo.progress}% funded</div>
            <div className="text-sm text-cyan-400">{ngo.raised} ETH / {ngo.goal} ETH</div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full" style={{ width: `${ngo.progress}%` }}></div>
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
          Donate Now
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* 3D Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-transparent to-slate-900/70 -z-5"></div>
      
      {/* Navigation */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Yogdaan</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">NGOs</a>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">Connect Wallet</Button>
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
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-slate-800 bg-opacity-95 backdrop-blur-sm p-4 z-50"
          >
            <div className="flex flex-col space-y-4 p-2">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">Home</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">NGOs</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">How It Works</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">About</a>
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white w-full">Connect Wallet</Button>
            </div>
          </motion.div>
        )}
      </header>
      
      {/* Hero Section */}
      <section className="relative z-0 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Transparent Donations</span>
                <br />on the Blockchain
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Donate with confidence knowing exactly how your funds are used. Approve transactions and be part of the change you want to see.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl">
                  Donate Now <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-6 text-lg rounded-xl">
                  Explore NGOs
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* 3D-like illustration with layered elements */}
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-2xl blur-3xl"></div>
                <div className="relative bg-slate-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="bg-slate-700 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-semibold text-lg">Clean Water Initiative</div>
                      <div className="text-cyan-400 text-sm font-medium">78% funded</div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2.5 mb-4">
                      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <div>41.6 ETH raised</div>
                      <div>Goal: 53.2 ETH</div>
                    </div>
                  </div>
                  
                  {/* Transaction approval mockup */}
                  <div className="border border-gray-700 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="text-sm text-white font-medium">Transaction Approval Request</div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      NGO requests to withdraw 5.2 ETH for water pump installation
                    </p>
                    <div className="flex justify-between mb-3">
                      <div className="text-xs text-gray-400">Approval rate: 72%</div>
                      <div className="text-xs text-gray-400">21/28 donors</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10 text-xs flex-1">
                        <Check size={14} className="mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500/10 text-xs flex-1">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="relative z-0 py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {impactStats.map((stat, index) => (
              <div key={index} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative z-0 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Yogdaan</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Our blockchain-based platform ensures transparency and accountability in charitable donations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={32} />} 
              title="Secure Transactions" 
              description="All donations are secured with blockchain technology for maximum security and transparency."
            />
            <FeatureCard 
              icon={<Eye size={32} />} 
              title="Full Transparency" 
              description="Track exactly how your donation is being utilized with complete visibility into transactions."
            />
            <FeatureCard 
              icon={<Check size={32} />} 
              title="Donor Approval" 
              description="NGOs need majority approval from donors before funds can be withdrawn for any purpose."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="relative z-0 py-16 md:py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Works</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Our simple process ensures your donations create the impact you intend.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="relative p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose a Cause</h3>
              <p className="text-gray-300">Browse verified NGOs and select a cause you're passionate about supporting.</p>
            </motion.div>
            
            <motion.div 
              className="relative p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Make Donations</h3>
              <p className="text-gray-300">Contribute using cryptocurrency with minimal fees and maximum security.</p>
            </motion.div>
            
            <motion.div 
              className="relative p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Approve Spending</h3>
              <p className="text-gray-300">Review and approve how NGOs spend your donations, ensuring accountability.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured NGOs Section */}
      <section className="relative z-0 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">NGOs</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Discover verified organizations making a real difference in the world.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ngoExamples.map((ngo, index) => (
              <NGOCard key={ngo.id} ngo={ngo} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 rounded-xl">
              View All NGOs <ArrowUpRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Blockchain Technology Section */}
      <section className="relative z-0 py-16 md:py-24 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-slate-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <div className="text-sm font-semibold text-gray-300">Smart Contract: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <div className="text-gray-400">Total Value Locked</div>
                    <div className="text-white font-medium">184.6 ETH</div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <div className="text-gray-400">Transactions</div>
                    <div className="text-white font-medium">2,428</div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <div className="text-gray-400">Unique Donors</div>
                    <div className="text-white font-medium">1,184</div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div className="text-gray-400">Approval Success Rate</div>
                    <div className="text-white font-medium">93%</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Blockchain</span></h2>
              <p className="text-gray-300 mb-6">Our platform leverages blockchain technology to ensure complete transparency and accountability in the donation process.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mt-1">
                    <Check size={20} className="text-cyan-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
                    <p className="text-gray-400">Automated, tamper-proof contracts ensure donations are managed according to predetermined rules.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mt-1">
                    <Check size={20} className="text-cyan-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Immutable Records</h3>
                    <p className="text-gray-400">All transactions are permanently recorded on the blockchain, creating an unalterable audit trail.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mt-1">
                    <Check size={20} className="text-cyan-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Democratic Approval</h3>
                    <p className="text-gray-400">Multi-signature functionality ensures funds are only spent when approved by the majority of donors.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
     {/* Testimonials Section (Continuing from where the code ended) */}
      <section className="relative z-0 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Say</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Hear from donors and NGO partners who are part of our community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="As a donor, I love being able to see exactly how my contributions are being used. The approval system gives me confidence that my money is making the impact I intended."
              author="Priya Sharma"
              role="Regular Donor"
              image="/api/placeholder/80/80"
            />
            <TestimonialCard 
              quote="The transparency Yogdaan provides has helped us build unprecedented trust with our donors. It's revolutionized how we communicate our impact."
              author="Rajiv Mehta"
              role="NGO Director"
              image="/api/placeholder/80/80"
            />
            <TestimonialCard 
              quote="I've never felt more connected to the causes I support. Being able to approve major expenditures makes me feel like a true stakeholder in creating change."
              author="Ananya Patel"
              role="Community Leader"
              image="/api/placeholder/80/80"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="relative z-0 py-16 md:py-24 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Questions</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Get answers to common questions about our platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How does the approval system work?",
                answer: "When an NGO wants to use donated funds, they submit a spending proposal. All donors who contributed to that campaign receive a notification and can vote to approve or reject the proposal. If more than 50% of donors approve, the transaction can proceed subject to final approval by the campaign organizer."
              },
              {
                question: "What cryptocurrencies can I use to donate?",
                answer: "Currently, we accept donations in ETH (Ethereum), USDC, and DAI stablecoins. We plan to add support for more cryptocurrencies in the future."
              },
              {
                question: "How are NGOs verified on the platform?",
                answer: "We have a thorough verification process that includes legal documentation, on-ground verification, and reputation checks. Only NGOs that pass our strict criteria are listed on the platform."
              },
              {
                question: "What happens if donors don't respond to approval requests?",
                answer: "If a donor doesn't respond within the specified timeframe (usually 72 hours), their vote is considered as an abstention and doesn't count toward the approval percentage."
              },
              {
                question: "Are there any fees for donations?",
                answer: "Yogdaan charges a minimal 1% platform fee to cover operational costs. Additionally, blockchain transaction fees (gas fees) apply, but we optimize transactions to keep these as low as possible."
              },
              {
                question: "Can I donate anonymously?",
                answer: "Yes, your wallet address is the only identifier on the blockchain. You can choose to keep your personal identity private or share it with the NGO and other donors."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-slate-900/50 rounded-xl p-6 border border-gray-700"
                whileHover={{ y: -5, borderColor: "#0ea5e9" }}
              >
                <h3 className="text-xl font-semibold mb-3 text-white">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="relative z-0 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 md:p-12 border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Updated</span></h2>
                <p className="text-xl text-gray-300">Get notified about new NGOs, features, and impact stories.</p>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 bg-slate-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                />
                <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-8 py-4 text-white rounded-xl">
                  Subscribe
                </Button>
              </div>
              
              <div className="mt-4 text-center text-gray-400 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative z-0 py-16 md:py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Difference?</span></h2>
            <p className="text-xl text-gray-300 mb-8">Join our community of donors and NGOs creating positive change with transparency and accountability.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl">
                Start Donating <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-6 text-lg rounded-xl">
                <Wallet className="mr-2" size={18} /> Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-0 pt-16 pb-8 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M7.5 12.5C9 14 10.5 15 12 15C13.5 15 15 14 16.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Yogdaan</span>
              </div>
              <p className="text-gray-400 mb-6">
                Revolutionizing charitable giving with blockchain technology for complete transparency and accountability.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">For NGOs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">For Donors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Transparency</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">NGO Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Donor Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Yogdaan. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YogdaanHomepage;