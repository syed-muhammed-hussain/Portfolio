import React, { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun, X, Menu, ChevronDown, Github, Linkedin, Mail, Zap, Workflow, MessageSquare, ExternalLink, TrendingUp, Users, Clock, Target, Award, Sparkles, ArrowRight, Play, Pause, Download, CheckCircle, Briefcase, Code2 } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [autoPlayStats, setAutoPlayStats] = useState(true);
  const [currentStat, setCurrentStat] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Intelligent Upwork Automation',
      category: 'AI Automation',
      description: 'Revolutionary end-to-end automation platform that transformed business development operations. Generates contextual proposals with AI analysis, eliminating manual monitoring.',
      fullDescription: 'Built a comprehensive automation system using n8n workflows, GPT-4 for proposal generation, and Deepseek for quality optimization. The system continuously monitors Upwork, filters jobs based on multiple criteria, generates custom proposals with client question responses, and delivers everything via Slack notifications. Features include intelligent retry logic, success tracking, and adaptive learning from proposal outcomes.',
      tech: ['n8n', 'GPT-4', 'Deepseek', 'Slack API', 'PostgreSQL', 'Node.js'],
      metrics: ['20+ proposals/day', '60% success rate ↑', '100% automated', '0 manual hours'],
      impact: 'Transformed business development from a full-time manual process to a fully automated system, increasing proposal quality and success rates while freeing up team resources.',
      gradient: 'from-teal-500 to-emerald-500',
      icon: <Zap className="w-6 h-6" />,
      demo: 'Available on request',
      timeline: '3 months',
      challenges: 'Real-time job filtering, context understanding, proposal quality consistency',
      results: ['300% productivity increase', 'Reduced response time from hours to minutes', 'Consistent 24/7 operation']
    },
    {
      id: 2,
      title: 'LinkedIn Intelligence System',
      category: 'Data Processing',
      description: 'Full-stack automation solution for lead generation with profile scraping, intelligent messaging campaigns, and conversational auto-reply system.',
      fullDescription: 'Developed custom frontend interface for URL input, built robust scraping engine handling LinkedIn\'s rate limits and anti-bot measures, implemented PostgreSQL database for contact management with relationship tracking. Features intelligent message sequencing, A/B testing capabilities, engagement scoring, and automated follow-up logic based on response patterns.',
      tech: ['HTML/CSS/JS', 'PostgreSQL', 'n8n', 'GPT-4', 'LinkedIn API', 'Redis'],
      metrics: ['200+ profiles/week', '85% engagement rate', 'Real-time processing', '95% deliverability'],
      impact: 'Enabled systematic lead generation and relationship building at scale, replacing manual outreach with intelligent, personalized automation.',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <Workflow className="w-6 h-6" />,
      demo: 'Live system running',
      timeline: '2 months',
      challenges: 'Anti-scraping measures, rate limiting, conversation context management',
      results: ['500+ qualified leads generated', '40% response rate', '2-hour daily time savings']
    },
    {
      id: 3,
      title: 'Multi-Platform AI Chatbots',
      category: 'AI Automation',
      description: 'Enterprise-grade conversational AI agents deployed across WhatsApp, Instagram, and LinkedIn with advanced NLP and context retention.',
      fullDescription: 'Architected unified chatbot framework supporting multiple platforms with shared intelligence layer. Implemented conversation memory using vector embeddings, sentiment analysis for escalation triggers, multi-turn dialogue management, and seamless human handoff capabilities. Features include multi-language support, dynamic response generation, and comprehensive analytics dashboard.',
      tech: ['GPT-4', 'n8n', 'Webhooks', 'Vector DB', 'Redis', 'Python'],
      metrics: ['1000+ interactions/month', '85% resolution rate', '3-platform support', '<2s response time'],
      impact: 'Automated customer support and lead qualification across multiple channels, providing 24/7 availability with human-like interactions.',
      gradient: 'from-indigo-500 to-purple-500',
      icon: <MessageSquare className="w-6 h-6" />,
      demo: 'Demo available on request',
      timeline: '4 months',
      challenges: 'Platform API differences, context preservation, natural language understanding',
      results: ['70% reduction in support tickets', '95% customer satisfaction', '24/7 availability']
    },
    {
      id: 4,
      title: 'AI Content Generation Pipeline',
      category: 'Content Automation',
      description: 'Sophisticated content creation system automating research, writing, image generation, SEO optimization, and WordPress publication.',
      fullDescription: 'Built comprehensive pipeline integrating Perplexity for topic research and fact-checking, GPT-4 for article writing with brand voice consistency, DALL-E for custom imagery, automated SEO optimization with keyword research, meta tag generation, and WordPress API for publication. Includes content calendar management, A/B testing for headlines, and performance tracking.',
      tech: ['GPT-4', 'DALL-E 3', 'Perplexity AI', 'WordPress API', 'Python', 'n8n'],
      metrics: ['50+ articles/month', '100% SEO optimized', 'Fully automated', '3x faster than manual'],
      impact: 'Eliminated content bottleneck while maintaining quality, enabling consistent publishing schedule and improved organic traffic.',
      gradient: 'from-cyan-500 to-blue-500',
      icon: <Code2 className="w-6 h-6" />,
      demo: 'Sample articles available',
      timeline: '2.5 months',
      challenges: 'Content quality consistency, SEO optimization, image-text alignment',
      results: ['150+ articles published', '200% organic traffic increase', '50% cost reduction']
    },
    {
      id: 5,
      title: 'AI Financial Management Bot',
      category: 'Data Processing',
      description: 'Intelligent dual-currency expense tracking system with automated reconciliation, categorization, and financial analytics.',
      fullDescription: 'Developed smart expense tracker handling PKR and USD with real-time exchange rate conversion, automated transaction categorization using ML, receipt scanning with OCR, budget alerts with predictive analytics, and comprehensive reporting with data visualization. Integrated with banking APIs for automatic transaction import and Google Sheets for collaborative financial planning.',
      tech: ['n8n', 'Google Sheets API', 'GPT-4', 'Airtable', 'Python', 'Chart.js'],
      metrics: ['500+ transactions/month', '99.2% accuracy', 'Real-time reports', '10-currency support'],
      impact: 'Transformed financial management from manual spreadsheet work to intelligent automated tracking with predictive insights.',
      gradient: 'from-emerald-500 to-teal-500',
      icon: <TrendingUp className="w-6 h-6" />,
      demo: 'Dashboard preview available',
      timeline: '1.5 months',
      challenges: 'Multi-currency handling, transaction categorization, data security',
      results: ['5 hours saved weekly', 'Zero manual errors', 'Real-time financial visibility']
    },
    {
      id: 6,
      title: 'Social Media Automation Suite',
      category: 'Content Automation',
      description: 'Comprehensive multi-platform social media management system with AI-powered content creation, scheduling, and analytics.',
      fullDescription: 'Built unified dashboard managing Instagram, Facebook, LinkedIn, Twitter with AI-generated captions, optimal posting time prediction, hashtag research and optimization, engagement automation with smart replies, competitor analysis, and comprehensive analytics with ROI tracking. Features content recycling, A/B testing, and audience segmentation.',
      tech: ['n8n', 'Platform APIs', 'Make.com', 'GPT-4', 'PostgreSQL', 'React'],
      metrics: ['Multi-platform', '100+ posts/week', 'Smart scheduling', '3x engagement ↑'],
      impact: 'Enabled consistent social media presence across all platforms with data-driven optimization and significantly improved engagement metrics.',
      gradient: 'from-violet-500 to-indigo-500',
      icon: <Briefcase className="w-6 h-6" />,
      demo: 'Dashboard walkthrough available',
      timeline: '3 months',
      challenges: 'Platform API limitations, content optimization, timing algorithms',
      results: ['300% reach increase', '5x posting consistency', '40% time savings']
    }
  ];

  const skills = [
    { name: 'n8n', level: 95, category: 'Automation', description: 'Expert in complex workflow design and optimization' },
    { name: 'OpenAI GPT-4', level: 90, category: 'AI', description: 'Advanced prompt engineering and API integration' },
    { name: 'JavaScript', level: 85, category: 'Programming', description: 'Full-stack development and async operations' },
    { name: 'Python', level: 80, category: 'Programming', description: 'Data processing and automation scripts' },
    { name: 'PostgreSQL', level: 75, category: 'Database', description: 'Query optimization and database design' },
    { name: 'React', level: 70, category: 'Frontend', description: 'Modern UI development with hooks' },
    { name: 'API Integration', level: 90, category: 'Integration', description: 'RESTful APIs, webhooks, OAuth flows' },
    { name: 'Workflow Design', level: 95, category: 'Automation', description: 'Process optimization and system architecture' }
  ];

  const testimonials = [
    {
      name: 'Client Success',
      role: 'Business Owner',
      text: 'The Upwork automation system completely transformed our lead generation. We\'re now closing 3x more deals with less effort.',
      rating: 5
    },
    {
      name: 'Team Lead',
      role: 'Operations Manager',
      text: 'Hussain\'s LinkedIn automation saved us 20+ hours weekly. The quality of leads and engagement rate is outstanding.',
      rating: 5
    },
    {
      name: 'Marketing Director',
      role: 'Digital Agency',
      text: 'The content generation pipeline is incredible. We went from 5 articles per month to 50+ without sacrificing quality.',
      rating: 5
    }
  ];

  const achievements = [
    { icon: <Target className="w-8 h-8" />, title: '60% Efficiency Gain', description: 'Average improvement across all automation projects' },
    { icon: <Users className="w-8 h-8" />, title: '5 Team Members', description: 'Successfully trained and leading technical specialists' },
    { icon: <Clock className="w-8 h-8" />, title: '100+ Hours Saved', description: 'Weekly time savings across all client operations' },
    { icon: <Award className="w-8 h-8" />, title: '15+ Systems Deployed', description: 'Production-ready AI automation solutions' }
  ];

  const stats = [
    { value: '20+', label: 'Daily Automated Proposals', sublabel: 'Upwork automation generating qualified leads' },
    { value: '1000+', label: 'Monthly AI Interactions', sublabel: 'Chatbot conversations across platforms' },
    { value: '60%', label: 'Success Rate Improvement', sublabel: 'Proposal acceptance rate increase' },
    { value: '100+', label: 'Hours Saved Weekly', sublabel: 'Team productivity enhancement' }
  ];

  const categories = ['all', 'AI Automation', 'Data Processing', 'Content Automation'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (autoPlayStats) {
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % stats.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlayStats, stats.length]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const ParallaxBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
      <div 
        className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"
        style={{
          left: `${mousePosition.x / 15}px`,
          top: `${mousePosition.y / 15}px`,
          transition: 'all 0.3s ease-out'
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl"
        style={{
          right: `${mousePosition.x / 25}px`,
          bottom: `${mousePosition.y / 25}px`,
          transition: 'all 0.5s ease-out'
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl top-1/2 left-1/2"
        style={{
          transform: `translate(-50%, -50%) translate(${mousePosition.x / 40}px, ${mousePosition.y / 40}px)`,
          transition: 'all 0.7s ease-out'
        }}
      />
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-x-hidden`}>
      <ParallaxBackground />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-300 shadow-lg shadow-blue-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'} backdrop-blur-xl border-b`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  SH
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Syed Hussain</span>
                <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Automation Engineer</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'projects', 'skills', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all relative font-medium ${activeSection === section ? 'text-blue-500 font-semibold' : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -bottom-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50" />
                  )}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all shadow-lg hover:shadow-xl hover:scale-105`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-2xl`}>
            <div className="px-6 py-4 space-y-2">
              {['home', 'projects', 'skills', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-5 py-3 rounded-xl capitalize font-medium ${activeSection === section ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative" ref={heroRef}>
        <div className="max-w-7xl mx-auto text-center relative z-10 py-20">
          <div className="mb-12 inline-block">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center text-7xl font-bold shadow-2xl">
                SH
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-4 border-gray-900 flex items-center justify-center shadow-xl">
                <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold ${darkMode ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-200'} shadow-lg`}>
              ✨ Available for Automation Projects
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight tracking-tight">
            AI Automation
            <br />
            <span className="text-5xl md:text-7xl lg:text-8xl">Engineer</span>
          </h1>
          
          <p className={`text-xl md:text-2xl lg:text-3xl mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-5xl mx-auto leading-relaxed font-light`}>
            Transforming business operations with intelligent AI-powered systems that deliver 
            <span className="text-blue-500 font-bold"> 60% efficiency improvements</span>, process 
            <span className="text-cyan-500 font-bold"> 1000+ daily operations</span>, and save 
            <span className="text-teal-500 font-bold"> 100+ hours weekly</span>
          </p>

          {/* Rotating Stats */}
          <div className={`mb-16 max-w-4xl mx-auto ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl rounded-3xl p-10 shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                Live Impact Metrics
              </h3>
              <button 
                onClick={() => setAutoPlayStats(!autoPlayStats)}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-all`}
              >
                {autoPlayStats ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-center py-8">
              <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                {stats[currentStat].value}
              </div>
              <div className="text-2xl font-bold mb-2">{stats[currentStat].label}</div>
              <div className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stats[currentStat].sublabel}</div>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {stats.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStat(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === currentStat ? 'w-12 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg' : 'w-2.5 bg-gray-600'}`}
                />
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
            {achievements.map((achievement, i) => (
              <div 
                key={i}
                className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-xl hover:shadow-2xl group`}
              >
                <div className="text-blue-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">{achievement.icon}</div>
                <div className="text-xl font-bold mb-2">{achievement.title}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.description}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-xl"
            >
              Explore Projects
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-10 py-5 rounded-2xl font-bold text-lg border-2 ${darkMode ? 'border-blue-500 hover:bg-blue-500/10' : 'border-blue-600 hover:bg-blue-50'} transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105`}
            >
              Get In Touch
            </button>
            <button
              onClick={() => window.open('https://drive.usercontent.google.com/u/0/uc?id=1a6aPqPwqnN0Jf9vGidbJ_Ygo1CrVzIiA&export=download', '_blank')}
              className={`px-10 py-5 rounded-2xl font-bold text-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105`}
            >
              <Download className="w-6 h-6" />
              Download CV
            </button>
          </div>

          <div className="mt-20">
            <ChevronDown className="w-10 h-10 mx-auto opacity-50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold mb-6 ${darkMode ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-200'} shadow-lg`}>
              💼 Portfolio Showcase
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
              AI-powered automation systems delivering measurable business impact and transforming operations at scale
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-16 space-y-6">
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, technologies, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-16 pr-6 py-5 rounded-2xl text-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xl`}
              />
            </div>

            <div className="flex justify-center flex-wrap gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-2xl capitalize transition-all font-bold text-base ${selectedCategory === cat ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-300'} shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  {cat === 'all' ? '🎯 All Projects' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  {project.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4 uppercase tracking-wider`}>{project.category}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 text-base leading-relaxed`}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map(tech => (
                    <span key={tech} className={`text-xs px-3 py-2 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`text-xs px-3 py-2 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  {project.metrics.slice(0, 2).map(metric => (
                    <div key={metric} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-semibold">{metric}</span>
                    </div>
                  ))}
                </div>

                <div className={`flex items-center justify-between pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} mt-auto`}>
                  <span className="text-sm text-blue-400 font-bold">View Details</span>
                  <ExternalLink className="w-5 h-5 text-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <div className={`inline-block p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
                <Search className="w-20 h-20 mx-auto mb-6 text-gray-500" />
                <p className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No projects found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold hover:shadow-2xl transition-all hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div 
            className={`max-w-5xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-8 flex justify-between items-center z-10`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center shadow-xl`}>
                  {selectedProject.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
                  <p className={`text-base font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} uppercase tracking-wider`}>{selectedProject.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className={`p-3 rounded-2xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-all`}
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  Project Overview
                </h4>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.fullDescription}</p>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4">🚀 Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.metrics.map(metric => (
                    <div key={metric} className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-2xl p-6`}>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-blue-500" />
                        <span className="font-bold text-lg">{metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4">💻 Technology Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className={`px-6 py-3 rounded-2xl font-bold text-base ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4">📊 Business Impact</h4>
                <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.impact}</p>
                <div className="space-y-3">
                  {selectedProject.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <span className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-2xl p-6`}>
                  <h5 className="font-bold text-lg mb-3">⏱️ Timeline</h5>
                  <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.timeline}</p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-2xl p-6`}>
                  <h5 className="font-bold text-lg mb-3">🎯 Status</h5>
                  <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.demo}</p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4">⚡ Challenges Overcome</h4>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.challenges}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <section id="skills" className={`py-32 px-6 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold mb-6 ${darkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'} shadow-lg`}>
              💻 Technical Arsenal
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Technical <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
              Specialized in AI integration, workflow automation, and building intelligent systems that scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skills.map((skill) => (
              <div 
                key={skill.name} 
                className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">{skill.name}</span>
                  <span className={`text-sm font-bold px-4 py-2 rounded-xl ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                    {skill.category}
                  </span>
                </div>
                <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-5 leading-relaxed`}>{skill.description}</p>
                <div className="flex items-center gap-4">
                  <div className={`flex-1 h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 relative overflow-hidden"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                  <span className="text-2xl font-black text-blue-500 min-w-[60px] text-right">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold mb-6 ${darkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'} shadow-lg`}>
              ⭐ Client Success Stories
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              What <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              Real results from real automation projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-6 h-6 text-yellow-500">⭐</div>
                  ))}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 italic text-lg leading-relaxed`}>"{testimonial.text}"</p>
                <div className="pt-6 border-t border-gray-700">
                  <p className="font-bold text-xl">{testimonial.name}</p>
                  <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-32 px-6 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100'} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold mb-6 ${darkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'} shadow-lg`}>
              📧 Get In Touch
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Let's <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Build Together</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
              Ready to automate your business processes? Let's discuss how AI automation can transform your operations and deliver measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <a 
              href="mailto:muhammedhussain1214@gmail.com"
              className={`${darkMode ? 'bg-gray-800/70 hover:bg-gray-700' : 'bg-white/70 hover:bg-gray-50'} backdrop-blur-xl p-10 rounded-3xl transition-all hover:shadow-2xl hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group`}
            >
              <Mail className="w-12 h-12 mx-auto mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-2xl mb-3">Email</h3>
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} break-words`}>muhammedhussain1214@gmail.com</p>
            </a>

            <a 
              href="tel:03036324000"
              className={`${darkMode ? 'bg-gray-800/70 hover:bg-gray-700' : 'bg-white/70 hover:bg-gray-50'} backdrop-blur-xl p-10 rounded-3xl transition-all hover:shadow-2xl hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group`}
            >
              <Linkedin className="w-12 h-12 mx-auto mb-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-2xl mb-3">Phone</h3>
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>0303-6324000</p>
            </a>

            <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl p-10 rounded-3xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Github className="w-12 h-12 mx-auto mb-6 text-teal-500" />
              <h3 className="font-bold text-2xl mb-3">Location</h3>
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bahawalpur, Pakistan</p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>Remote-friendly</p>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl rounded-3xl p-12 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-2xl`}>
            <h3 className="text-4xl font-black mb-10 text-center">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">3.67</div>
                <div className={`text-base font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>CGPA</div>
                <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Cyber Security</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-3">2+</div>
                <div className={`text-base font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Years</div>
                <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Professional Experience</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-3">15+</div>
                <div className={`text-base font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>AI Systems</div>
                <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Production Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-3">5</div>
                <div className={`text-base font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Team Members</div>
                <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Led & Trained</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-950' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center font-bold text-white text-3xl shadow-2xl">
                SH
              </div>
            </div>
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h3>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto mb-10 leading-relaxed`}>
              Transform your business with intelligent AI automation solutions
            </p>
            
            <div className="flex justify-center gap-6 mb-16">
              <a 
                href="mailto:muhammedhussain1214@gmail.com"
                className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-all hover:scale-110 shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <Mail className="w-7 h-7 text-blue-500" />
              </a>
              <a 
                href="tel:03036324000"
                className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-all hover:scale-110 shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <Linkedin className="w-7 h-7 text-cyan-500" />
              </a>
              <a 
                href="https://github.com/syed-muhammed-hussain"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-all hover:scale-110 shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <Github className="w-7 h-7 text-teal-500" />
              </a>
            </div>
          </div>

          <div className={`h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-10`} />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2024 Syed Muhammad Hussain
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className={`text-base font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available for Projects</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-base">
              <button onClick={() => scrollToSection('home')} className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors font-medium`}>
                Home
              </button>
              <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <button onClick={() => scrollToSection('projects')} className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors font-medium`}>
                Projects
              </button>
              <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <button onClick={() => scrollToSection('contact')} className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors font-medium`}>
                Contact
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Built with React + Tailwind CSS • Powered by Innovation
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
