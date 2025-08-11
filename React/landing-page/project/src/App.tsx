import /* React, */ { useState } from 'react';
import { 
  Menu, 
  X, 
  Brain, 
  Users, 
  BookOpen, 
  Award, 
  Smartphone, 
  Monitor, 
  Database, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Shield,
  TrendingUp,
  Code,
  Cpu,
  Cloud
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AiPLP
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#roles" className="text-gray-600 hover:text-blue-600 transition-colors">User Roles</a>
              <a href="#technology" className="text-gray-600 hover:text-blue-600 transition-colors">Technology</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Get Started
              </button>
            </nav>

            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600">Features</a>
              <a href="#roles" className="block text-gray-600 hover:text-blue-600">User Roles</a>
              <a href="#technology" className="block text-gray-600 hover:text-blue-600">Technology</a>
              <a href="#contact" className="block text-gray-600 hover:text-blue-600">Contact</a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Learning
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform education with our comprehensive platform that integrates AI technology, 
              multi-role management, and cross-platform accessibility for the ultimate learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Learning Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Role System</h3>
              <p className="text-gray-600">Administrators, assistants, and students with tailored experiences</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Intelligent content generation and personalized learning paths</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
              <p className="text-gray-600">Seamless experience across mobile and web applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Learning Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and deliver exceptional educational experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
              <p className="text-gray-600">AI-powered Q&A system with real-time responses and personalized tutoring</p>
            </div>

            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certification System</h3>
              <p className="text-gray-600">AI-generated quizzes and downloadable certificates for course completion</p>
            </div>

            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-gray-600">Integrated payment processing with Chapa gateway for premium content</p>
            </div>

            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">Comprehensive analytics and progress monitoring for all users</p>
            </div>

            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile First</h3>
              <p className="text-gray-600">Native mobile apps for iOS and Android with offline capabilities</p>
            </div>

            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Learning</h3>
              <p className="text-gray-600">Instant AI responses and dynamic content adaptation based on learning patterns</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tailored for Every User
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three distinct experiences designed for administrators, teaching assistants, and students
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Student */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                <Smartphone className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Students</h3>
                <p className="text-blue-100">Mobile-first learning experience</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Cross-platform mobile app (iOS & Android)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>AI-powered interactive learning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Quiz system with certificates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Offline content caching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Progress tracking & analytics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Assistant */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8 text-white">
                <Users className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Assistants</h3>
                <p className="text-purple-100">Content creation & management</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Course & chapter creation tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Field-specific content management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Curriculum structuring by semester</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>AI-assisted content generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Student progress monitoring</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Admin */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
                <Monitor className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Administrators</h3>
                <p className="text-green-100">Complete platform oversight</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>User management & role assignment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Payment & transaction monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Content moderation & approval</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>System configuration & settings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technology" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powered by Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies for scalability, performance, and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="text-center group">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <Code className="h-8 w-8 text-gray-600 group-hover:text-blue-600" />
              </div>
              <h4 className="font-semibold text-sm">React Native</h4>
            </div>
            <div className="text-center group">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                <Monitor className="h-8 w-8 text-gray-600 group-hover:text-purple-600" />
              </div>
              <h4 className="font-semibold text-sm">React</h4>
            </div>
            <div className="text-center group">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors duration-300">
                <Database className="h-8 w-8 text-gray-600 group-hover:text-green-600" />
              </div>
              <h4 className="font-semibold text-sm">Node.js</h4>
            </div>
            <div className="text-center group">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <Brain className="h-8 w-8 text-gray-600 group-hover:text-orange-600" />
              </div>
              <h4 className="font-semibold text-sm">OpenAI</h4>
            </div>
            <div className="text-center group">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-100 transition-colors duration-300">
                <Cpu className="h-8 w-8 text-gray-600 group-hover:text-red-600" />
              </div>
              <h4 className="font-semibold text-sm">MySQL</h4>
            </div>
            <div className="text-center group">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <Cloud className="h-8 w-8 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <h4 className="font-semibold text-sm">Express</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The AI-powered learning experience is incredible. It's like having a personal tutor available 24/7."
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">AS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Alex Smith</h4>
                  <p className="text-gray-500 text-sm">Computer Science Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "As a teaching assistant, the content creation tools have revolutionized how I develop courses."
              </p>
              <div className="flex items-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-semibold">MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Maria Johnson</h4>
                  <p className="text-gray-500 text-sm">Teaching Assistant</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The comprehensive analytics and user management features make administration effortless."
              </p>
              <div className="flex items-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold">DW</span>
                </div>
                <div>
                  <h4 className="font-semibold">David Wilson</h4>
                  <p className="text-gray-500 text-sm">Platform Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students already experiencing the future of learning with AiPLP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">AiPLP</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Transforming education with AI-powered learning experiences. 
                Join the future of personalized education today.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Monitor className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="https://expo.dev/artifacts/eas/rEPgKHr7i8d4crdR5AtXZ3.apk" className="text-gray-300 hover:text-white transition-colors" target="_blank">Mobile App</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Web Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AiPLP. All rights reserved. Built with ❤️ for the future of education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;