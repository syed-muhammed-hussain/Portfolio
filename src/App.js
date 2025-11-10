import React, { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun, Send, X, Menu, ChevronDown, Github, Linkedin, Mail, Zap, Bot, Workflow, MessageSquare, ExternalLink, TrendingUp, Users, Clock, Target, Award, Sparkles, ArrowRight, Play, Pause, Download } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 I\'m an AI assistant powered by GPT-4. Ask me anything about Hussain\'s automation projects, technical skills, or experience!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [autoPlayStats, setAutoPlayStats] = useState(true);
  const [currentStat, setCurrentStat] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [_isVisible, _setIsVisible] = useState(false);
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
      gradient: 'from-purple-500 to-pink-500',
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
      gradient: 'from-green-500 to-emerald-500',
      icon: <MessageSquare className="w-6 h-6" />,
      demo: 'Try the chatbot in bottom-right!',
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
      gradient: 'from-orange-500 to-red-500',
      icon: <Bot className="w-6 h-6" />,
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
      gradient: 'from-yellow-500 to-orange-500',
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
      gradient: 'from-pink-500 to-purple-500',
      icon: <Workflow className="w-6 h-6" />,
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

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { type: 'user', text: chatInput }]);
    const userMessage = chatInput.toLowerCase();
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      
      if (userMessage.includes('upwork')) {
        response = '🚀 The Upwork automation is my flagship project! It generates 20+ high-quality proposals daily with a 60% success rate (up from 40%). The system uses GPT-4 for contextual proposal writing and Deepseek for quality optimization. It monitors jobs 24/7, filters based on budget/skills/location, and delivers complete proposals with client question responses via Slack. This transformed our business development from a full-time manual process to a fully automated system!';
      } else if (userMessage.includes('linkedin')) {
        response = '💼 The LinkedIn Intelligence System is a complete lead generation platform! It scrapes 200+ profiles weekly, sends personalized campaigns, and handles auto-replies using Sales Navigator. Built with a custom HTML/CSS/JS frontend and PostgreSQL backend. The system achieves 85% engagement rates and includes A/B testing, relationship tracking, and intelligent follow-up sequences.';
      } else if (userMessage.includes('chatbot') || userMessage.includes('chat')) {
        response = '🤖 I\'ve built enterprise AI chatbots for WhatsApp, Instagram, and LinkedIn! They handle 1000+ monthly interactions with 85% resolution rate. Features include conversation memory, sentiment analysis, multi-language support, and seamless human handoff. The unified architecture shares intelligence across platforms while adapting to each platform\'s unique capabilities.';
      } else if (userMessage.includes('content') || userMessage.includes('article')) {
        response = '✍️ The Content Generation Pipeline is incredibly powerful! It produces 50+ SEO-optimized articles monthly using Perplexity for research, GPT-4 for writing, and DALL-E for images. Everything publishes automatically to WordPress. The system maintains brand voice consistency, includes A/B testing for headlines, and has increased organic traffic by 200%!';
      } else if (userMessage.includes('skill') || userMessage.includes('tech')) {
        response = '💻 My core expertise includes: n8n (95% - expert level workflow design), OpenAI GPT-4 (90% - advanced prompt engineering), JavaScript/Python (85%/80% - full-stack development), PostgreSQL (75% - database design), and API Integration (90% - complex integrations). I specialize in building scalable automation architectures that deliver measurable business results.';
      } else if (userMessage.includes('contact') || userMessage.includes('hire') || userMessage.includes('work')) {
        response = '📧 I\'d love to discuss your automation needs! Reach out at muhammedhussain1214@gmail.com or call 0303-6324000. I\'m based in Bahawalpur, Pakistan and available for remote automation projects. Let\'s transform your business processes with intelligent AI automation!';
      } else if (userMessage.includes('experience') || userMessage.includes('background')) {
        response = '👨‍💻 I\'m an Automation Engineer at Codecubics since May 2023, where I lead a team of 5 specialists. I\'ve deployed 15+ production AI systems, saving clients 100+ hours weekly. Graduated from Islamia University Bahawalpur with 3.67 CGPA in Cyber Security. I combine security knowledge with AI expertise to build robust, scalable automation solutions.';
      } else if (userMessage.includes('cost') || userMessage.includes('price') || userMessage.includes('rate')) {
        response = '💰 For project rates and custom automation solutions, please email me at muhammedhussain1214@gmail.com. I offer flexible engagement models including project-based, retainer, and consulting. Each automation system is designed to deliver ROI through time savings, efficiency gains, and process improvements.';
      } else if (userMessage.includes('time') || userMessage.includes('how long')) {
        response = '⏱️ Project timelines vary based on complexity: Simple automations (1-2 weeks), Medium complexity like chatbots (1-2 months), Complex systems like the Upwork automation (2-3 months). I prioritize rapid prototyping to show value early, then iterate based on feedback. Most clients see ROI within the first month of deployment!';
      } else {
        response = '👋 I can help you learn about:\n• 🚀 Upwork Automation (20+ proposals/day)\n• 💼 LinkedIn System (lead generation)\n• 🤖 AI Chatbots (multi-platform)\n• ✍️ Content Pipeline (50+ articles/month)\n• 💻 Technical Skills & Experience\n• 📧 Contact & Hiring\n\nWhat would you like to know more about?';
      }

      setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        style={{
          left: `${mousePosition.x / 20}px`,
          top: `${mousePosition.y / 20}px`,
          transition: 'all 0.3s ease-out'
        }}
      />
      <div 
        className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        style={{
          right: `${mousePosition.x / 30}px`,
          bottom: `${mousePosition.y / 30}px`,
          transition: 'all 0.5s ease-out'
        }}
      />
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative`}>
      <ParallaxBackground />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center font-bold text-white shadow-lg">
                  SH
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold">Syed Hussain</span>
                <p className="text-xs text-gray-500">Automation Engineer</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {['home', 'projects', 'skills', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all relative ${activeSection === section ? 'text-purple-500 font-semibold' : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                  )}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
            <div className="px-4 py-2 space-y-1">
              {['home', 'projects', 'skills', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize ${activeSection === section ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative" ref={heroRef}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-6xl font-bold shadow-2xl animate-pulse">
                SH
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-gray-900 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              ✨ Available for Automation Projects
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
            AI Automation
            <br />
            <span className="text-5xl md:text-7xl">Engineer</span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
            Transforming business operations with intelligent AI-powered systems that deliver 
            <span className="text-purple-500 font-bold"> 60% efficiency improvements</span>, process 
            <span className="text-pink-500 font-bold"> 1000+ daily operations</span>, and save 
            <span className="text-orange-500 font-bold"> 100+ hours weekly</span>
          </p>

          {/* Rotating Stats */}
          <div className={`mb-12 max-w-3xl mx-auto ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-2xl p-8 shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Impact Metrics</h3>
              <button 
                onClick={() => setAutoPlayStats(!autoPlayStats)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {autoPlayStats ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stats[currentStat].value}
              </div>
              <div className="text-xl font-semibold mb-1">{stats[currentStat].label}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stats[currentStat].sublabel}</div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {stats.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStat(i)}
                  className={`h-2 rounded-full transition-all ${i === currentStat ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' : 'w-2 bg-gray-600'}`}
                />
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {achievements.map((achievement, i) => (
              <div 
                key={i}
                className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-lg rounded-xl p-4 hover:scale-105 transition-all border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}
              >
                <div className="text-purple-500 mb-2 flex justify-center">{achievement.icon}</div>
                <div className="text-lg font-bold mb-1">{achievement.title}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.description}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              Explore Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-4 rounded-xl font-semibold border-2 ${darkMode ? 'border-purple-500 hover:bg-purple-500/10' : 'border-purple-600 hover:bg-purple-50'} transition-all`}
            >
              Get In Touch
            </button>
            <button
              onClick={() => window.open('mailto:muhammedhussain1214@gmail.com')}
              className={`px-8 py-4 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all flex items-center gap-2`}
            >
              <Download className="w-5 h-5" />
              Download CV
            </button>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto opacity-50" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              💼 Portfolio Showcase
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              AI-powered automation systems delivering measurable business impact and transforming operations at scale
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, technologies, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg`}
              />
            </div>

            <div className="flex justify-center flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl capitalize transition-all font-semibold ${selectedCategory === cat ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-300'}`}
                >
                  {cat === 'all' ? '🎯 All Projects' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer ${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {project.icon}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className={`text-sm font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-600'} mb-3`}>{project.category}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm`}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map(tech => (
                    <span key={tech} className={`text-xs px-2 py-1 rounded-full font-semibold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${darkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4 flex-grow">
                  {project.metrics.slice(0, 2).map(metric => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{metric}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                  <span className="text-sm text-purple-400 font-semibold">Click for details</span>
                  <ExternalLink className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className={`inline-block p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No projects found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div 
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6 flex justify-between items-center z-10`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center shadow-lg`}>
                  {selectedProject.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{selectedProject.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Project Overview
                </h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedProject.fullDescription}</p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3">🚀 Key Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.metrics.map(metric => (
                    <div key={metric} className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg p-4`}>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold">{metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3">💻 Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-2">📊 Business Impact</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{selectedProject.impact}</p>
                <div className="space-y-2">
                  {selectedProject.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg p-4`}>
                  <h5 className="font-bold mb-2">⏱️ Timeline</h5>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedProject.timeline}</p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg p-4`}>
                  <h5 className="font-bold mb-2">🎯 Status</h5>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedProject.demo}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-2">⚡ Challenges Overcome</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedProject.challenges}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              💻 Technical Arsenal
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Technical <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Specialized in AI integration, workflow automation, and building intelligent systems that scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-lg rounded-xl p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold">{skill.name}</span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                    {skill.category}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{skill.description}</p>
                <div className="flex items-center gap-3">
                  <div className={`flex-1 h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 relative overflow-hidden"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                  <span className="text-lg font-bold text-purple-500">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              ⭐ Client Success Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              What <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real results from real automation projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-lg rounded-xl p-6 hover:shadow-2xl transition-all border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-500">⭐</div>
                  ))}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 italic`}>"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100'} relative z-10`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              📧 Get In Touch
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Let's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Build Together</span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Ready to automate your business processes? Let's discuss how AI automation can transform your operations and deliver measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <a 
              href="mailto:muhammedhussain1214@gmail.com"
              className={`${darkMode ? 'bg-gray-800/50 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} backdrop-blur-lg p-8 rounded-xl transition-all hover:shadow-2xl hover:-translate-y-1 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group`}
            >
              <Mail className="w-10 h-10 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">Email</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} break-words`}>muhammedhussain1214@gmail.com</p>
            </a>

            <a 
              href="tel:03036324000"
              className={`${darkMode ? 'bg-gray-800/50 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} backdrop-blur-lg p-8 rounded-xl transition-all hover:shadow-2xl hover:-translate-y-1 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group`}
            >
              <Linkedin className="w-10 h-10 mx-auto mb-4 text-pink-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">Phone</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>0303-6324000</p>
            </a>

            <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-lg p-8 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Github className="w-10 h-10 mx-auto mb-4 text-orange-500" />
              <h3 className="font-bold text-xl mb-2">Location</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bahawalpur, Pakistan</p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Remote-friendly</p>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-lg rounded-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-xl`}>
            <h3 className="text-3xl font-bold mb-6 text-center">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">3.67</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>CGPA</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Cyber Security</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">2+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Years</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Professional Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">15+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>AI Systems</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Production Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">5</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Team Members</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Led & Trained</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      {chatOpen && (
        <div className={`fixed bottom-24 right-4 w-96 h-[500px] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl flex flex-col border-2 ${darkMode ? 'border-purple-500/50' : 'border-purple-300'} z-50`}>
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="font-bold text-white">AI Assistant</span>
                <p className="text-xs text-white/80">Powered by GPT-4</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl shadow-lg ${msg.type === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-lg`}>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Ask me anything..."
                className={`flex-1 px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button 
                onClick={handleChatSubmit} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        {chatOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            <MessageSquare className="w-7 h-7 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse" />
          </>
        )}
      </button>

      {/* Footer */}
      <footer className={`relative z-10 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-950' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center font-bold text-white text-2xl shadow-2xl">
                SH
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
              Transform your business with intelligent AI automation solutions
            </p>
            
            {/* Social/Contact Links */}
            <div className="flex justify-center gap-4 mb-12">
              <a 
                href="mailto:muhammedhussain1214@gmail.com"
                className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-all hover:scale-110 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <Mail className="w-6 h-6 text-purple-500" />
              </a>
              <a 
                href="tel:03036324000"
                className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-all hover:scale-110 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <Linkedin className="w-6 h-6 text-pink-500" />
              </a>
              <a 
                href="linedin.in/syed-muhammad-hussain"
                className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-all hover:scale-110 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <Github className="w-6 h-6 text-orange-500" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8`} />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2024 Syed Muhammad Hussain
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available for Projects</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <button onClick={() => scrollToSection('home')} className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                Home
              </button>
              <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <button onClick={() => scrollToSection('projects')} className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                Projects
              </button>
              <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <button onClick={() => scrollToSection('contact')} className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                Contact
              </button>
              <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <button onClick={() => setChatOpen(true)} className="text-purple-500 hover:text-purple-400 transition-colors font-semibold">
                AI Chat →
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
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
