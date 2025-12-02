import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Star, Clock, MapPin, ChevronRight, ChevronLeft, Calendar, User, 
  Heart, Shield, Menu, X, ArrowRight, Sparkles, LogOut, LogIn, Lock, 
  FileText, Check, Activity, Phone, Mail, Filter, Home, ChevronDown, Plus,
  Facebook, Linkedin, Youtube, UploadCloud, Send, FileBadge
} from 'lucide-react';

// ==========================================
// 1. MOCK DATA & CONFIG
// ==========================================

const APP_CONFIG = {
  colors: {
    primary: '#2A4D5E', 
    secondary: '#72A6BB',
    background: '#EAF2F5',
    white: '#FFFFFF',
    textMain: '#1F2937'
  },
  apiKey: "" 
};

// --- Nurses Data ---
const MOCK_NURSES = [
  {
    id: 1,
    name: "Sarah Al-Masri",
    // 🔴 (1) غير صورة سارة هنا
    image: "nurse-g1.jpg",
    specialty: "Elderly Care", 
    age: 34,
    gender: "Female",
    rating: 4.9,
    experience: "8 Years",
    location: "Damascus",
    bio: "Certified specialist in general elderly care, focusing on daily living assistance and medication management in Damascus."
  },
  {
    id: 2,
    name: "Omar Kanaan",
    // 🔴 (2) غير صورة عمر هنا
    image: "nurse-m1.jpeg",
    specialty: "Elderly w/ Special Needs", 
    age: 29,
    gender: "Male",
    rating: 4.7,
    experience: "5 Years",
    location: "Aleppo",
    bio: "Dedicated to caring for seniors with physical disabilities and special mobility needs. Expert in accessible care techniques."
  },
  {
    id: 3,
    name: "Layla Hassan",
    // 🔴 (3) غير صورة ليلى هنا
    image: "nurse-g2.jpeg",
    specialty: "Elderly Autism Support", 
    age: 27,
    gender: "Female",
    rating: 4.8,
    experience: "4 Years",
    location: "Homs",
    bio: "Specialized training in supporting elderly individuals on the autism spectrum, providing structured and compassionate care."
  },
  {
    id: 4,
    name: "Youssef Ibrahim",
    // 🔴 (4) غير صورة يوسف هنا
    image: "nurse-g2.jpeg",
    specialty: "Elderly Care", 
    age: 40,
    gender: "Male",
    rating: 5.0,
    experience: "15 Years",
    location: "Latakia",
    bio: "Highly experienced in geriatric health monitoring and companionship for seniors living independently in Latakia."
  },
  {
    id: 5,
    name: "Nour Al-Huda",
    // 🔴 (5) غير صورة نور هنا
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    specialty: "Elderly w/ Special Needs", 
    age: 45,
    gender: "Female",
    rating: 4.9,
    experience: "20 Years",
    location: "Damascus",
    bio: "Expert in palliative care and supporting seniors with chronic conditions and special medical requirements."
  },
  {
    id: 6,
    name: "Kareem Mansour",
    // 🔴 (6) غير صورة كريم هنا
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    specialty: "Elderly Autism Support", 
    age: 32,
    gender: "Male",
    rating: 4.6,
    experience: "7 Years",
    location: "Aleppo",
    bio: "Patient and understanding caregiver focusing on sensory needs and routine stability for seniors with autism."
  }
];

// --- Mock Requests for Nurse Dashboard ---
const MOCK_NURSE_REQUESTS = [
    { id: 101, patientName: "Samer Ali", age: 75, gender: "Male", condition: "Diabetes & Mobility issues", date: "2024-03-15", time: "09:00 AM", status: "pending" },
    { id: 102, patientName: "Rana Zaid", age: 68, gender: "Female", condition: "Post-surgery recovery", date: "2024-03-16", time: "02:00 PM", status: "pending" },
    { id: 103, patientName: "Fadi Jaber", age: 80, gender: "Male", condition: "Alzheimer's care", date: "2024-03-18", time: "10:30 AM", status: "accepted" },
];

const FAQ_DATA = [
    {
        id: 'general',
        label: 'General Questions',
        questions: [
            { q: "What is the Home Care system?", a: "It is a system that helps families find reliable nurses and caregivers for the elderly within their homes easily and safely." },
            { q: "How does the system ensure user safety?", a: "We verify the identities and qualifications of all nurses rigorously." },
            { q: "Is the service available in all areas?", a: "Yes, we strive to cover all regions. You can filter nurses by your city." }
        ]
    },
    {
        id: 'families',
        label: 'For Families',
        questions: [
            { q: "How can I book a nurse?", a: "Simply browse the list of nurses, choose the right person, then click 'Book Now'." },
            { q: "Can I communicate with the nurse before booking?", a: "Yes, the system provides a chat feature or initial contact details." },
            { q: "What if the nurse does not show up?", a: "We have a strict attendance policy and support team will secure a replacement." }
        ]
    },
    {
        id: 'nurses',
        label: 'For Nurses',
        questions: [
            { q: "How can I join as a caregiver?", a: "Create a 'Nurse' account, upload documents. After review, your account will be activated." },
            { q: "Can I set my own working hours?", a: "Certainly. You have full flexibility in managing your schedule." },
            { q: "How do I view health condition details?", a: "Upon booking request, basic information entered by the family will appear to you." }
        ]
    }
];

const MOCK_FEEDBACK = [
    { 
        id: 1, 
        name: "Sami Al-Ahmad", 
        role: "Damascus", 
        feedback: "The service provided was exceptional. Nurse Sarah was very patient with my father.", 
        // 🔴 (7) غير صورة سامي هنا
        image: "feed-man.jpeg" 
    },
    { 
        id: 2, 
        name: "Rania Kabbani", 
        role: "Aleppo", 
        feedback: "Finding a specialized nurse for autism care was hard until I found this app. Highly recommended!", 
        // 🔴 (8) غير صورة رانيا هنا
        image: "feed-girl.jpeg" 
    },
    { 
        id: 3, 
        name: "Mazen Othman", 
        role: "Latakia", 
        feedback: "Very professional and punctual. The booking process is smooth and easy.", 
        // 🔴 (9) غير صورة مازن هنا
        image: "feeed-man2.jpeg" 
    },
    { 
        id: 4, 
        name: "Hala Zaid", 
        role: "Homs", 
        feedback: "I feel much safer knowing my mother is in good hands. Thank you Home Care!", 
        // 🔴 (10) غير صورة هالة هنا
        image: "feed-girl2.jpeg" 
    }
];

// ==========================================
// 2. AUTH CONTEXT
// ==========================================
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const login = (email, password) => {
        let role = 'patient';
        if (email.toLowerCase().includes('nurse')) role = 'nurse';
        
        const mockUser = {
            name: email.split('@')[0], 
            email: email,
            role: role, 
            token: "mock-jwt-token-123456",
            specialty: role === 'nurse' ? 'Elderly Care' : null,
            location: 'Damascus'
        };
        setUser(mockUser);
        localStorage.setItem('cc_user', JSON.stringify(mockUser));
        return mockUser;
    };

    const register = (data) => {
        const mockUser = {
            ...data,
            token: "mock-jwt-token-register",
            experience: '0 Years', 
            bio: 'New member.',
            certificateVerified: false
        };
        setUser(mockUser);
        localStorage.setItem('cc_user', JSON.stringify(mockUser));
        return mockUser;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cc_user');
    };

    useEffect(() => {
        const stored = localStorage.getItem('cc_user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

// ==========================================
// 3. UI COMPONENTS
// ==========================================

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type="button" }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: `bg-[#2A4D5E] text-white hover:bg-[#1f3a46] hover:shadow-lg`,
    secondary: `bg-[#72A6BB] text-white hover:bg-[#5b8a9e]`,
    outline: `border-2 border-[#2A4D5E] text-[#2A4D5E] hover:bg-[#EAF2F5]`,
    danger: `bg-red-500 text-white hover:bg-red-600`,
    success: `bg-green-600 text-white hover:bg-green-700`
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button className="w-full flex items-center justify-between py-6 px-6 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none" onClick={onClick}>
                <span className="text-lg font-semibold text-[#2A4D5E]">{question}</span>
                <ChevronDown className={`text-[#72A6BB] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} size={20}/>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-white px-6 ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 leading-relaxed text-sm">{answer}</p>
            </div>
        </div>
    );
};

// ==========================================
// 4. PAGE COMPONENTS
// ==========================================

// --- HOME PAGE ---
const HomePage = ({ onNavigate }) => {
    const heroImages = [
        // 🔴 (11) غير صور السلايدر الرئيسي هنا
        "hero1.jpeg",
        "hero2.jpeg",
        "hero3.jpeg"
    ];
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
    const [openFAQIndex, setOpenFAQIndex] = useState(0); 
    const [activeTabId, setActiveTabId] = useState('general');

    useEffect(() => {
        const interval = setInterval(() => setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length), 3000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    useEffect(() => { setOpenFAQIndex(0); }, [activeTabId]);

    const currentFAQs = FAQ_DATA.find(tab => tab.id === activeTabId)?.questions || [];

    return (
        <div className="bg-[#EAF2F5] min-h-screen">
             {/* Styling for Animations */}
             <style>{`
                @keyframes slideUpFade { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-slideUp { animation: slideUpFade 0.8s ease-out forwards; opacity: 0; }
                .delay-100 { animation-delay: 0.1s; } .delay-300 { animation-delay: 0.3s; } .delay-500 { animation-delay: 0.5s; }
            `}</style>

            {/* HERO */}
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 text-left">
                    <h1 className="text-5xl font-bold text-[#2A4D5E] mb-2">professional Care</h1>
                    <h2 className="text-5xl font-bold text-[#1F2937] mb-8">Right at Home</h2>
                    <p className="text-gray-900 text-lg leading-relaxed mb-10">Home Care is a platform that connects families with trusted caregivers and nurses to support elderly individuals at home safely and easily.</p>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="relative h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                        {heroImages.map((img, index) => (
                            <img key={index} src={img} alt={`Slide ${index}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentHeroSlide ? 'opacity-100' : 'opacity-0'}`}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* SERVICES */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#2A4D5E] mb-2"><span className="text-[#72A6BB]">Specialized</span> Home Care</h2>
                        <p className="text-gray-500">Our dedicated nurses offer professional and compassionate assistance tailored to unique needs.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 🔴 (12) Card Images Here */}
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full group">
                            <div className="h-64 overflow-hidden"><img src="Elderly_Care.jpeg" alt="Elderly Care" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/></div>
                            <div className="bg-[#2A4D5E] p-8 flex-grow text-white text-center"><h3 className="text-xl font-bold mb-4">Elderly Care & Support</h3><p className="text-blue-100 text-sm leading-relaxed">Assistance with daily living, medication management, and specialized care for the elderly, ensuring their comfort and safety at home.</p></div>
                        </div>
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full group">
                            <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center"><img src="Special_Needs_Assistance.jpeg" alt="Special Needs" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/></div>
                            <div className="bg-[#2A4D5E] p-8 flex-grow text-white text-center"><h3 className="text-xl font-bold mb-4">Special Needs Assistance</h3><p className="text-blue-100 text-sm leading-relaxed">Dedicated nurses providing comprehensive support for individuals with various special needs, offering flexibility in time and days.</p></div>
                        </div>
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full group">
                            <div className="h-64 overflow-hidden"><img src="Autism_Spectrum_Care_(ASD).jpeg" alt="Autism Care" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/></div>
                            <div className="bg-[#2A4D5E] p-8 flex-grow text-white text-center"><h3 className="text-xl font-bold mb-4">Autism Spectrum Care (ASD)</h3><p className="text-blue-100 text-sm leading-relaxed">Specialized therapeutic and behavioral support from nurses trained to assist individuals on the autism spectrum, ensuring continuous follow-up with the family.</p></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ABOUT US */}
            <div id="about-us-section" className="bg-[#EAF2F5] py-24 overflow-hidden">
                <div className="max-w-10xl mx-auto px-4 flex flex-col md:flex-row items-center gap-20">
                    <div className="w-full md:w-1/2 flex gap-6 h-96 justify-center items-end relative">
                        {/* 🔴 (13) About Us Images Here */}
                        <div className="w-60 h-64 bg-gray-300 rounded-3xl overflow-hidden shadow-xl transform translate-y-10 animate-slideUp delay-100 border-4 border-white"><img src="about2.jpeg" className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="Care 1" /></div>
                        <div className="w-70 h-80 bg-gray-300 rounded-3xl overflow-hidden shadow-2xl transform -translate-y-10 z-10 animate-slideUp delay-300 border-4 border-white"><img src="about 3.jpeg" className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="Care 2" /></div>
                        <div className="w-60 h-64 bg-gray-300 rounded-3xl overflow-hidden shadow-xl transform translate-y-10 animate-slideUp delay-500 border-4 border-white"><img src="about1.jpeg" className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="Care 3" /></div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-5xl font-extrabold text-[#2A4D5E] mb-8 relative inline-block">About Us<span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#72A6BB]"></span></h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">Home Care is a platform that connects families with trusted caregivers and nurses to support elderly individuals at home safely and easily.</p>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">It allows families to browse caregiver profiles and book suitable hours, while caregivers manage their schedules and access essential case details.</p>
                        <div className="flex items-center gap-3 text-[#2A4D5E] font-bold text-lg mt-8"><div className="bg-[#72A6BB] p-2 rounded-full text-white"><Check size={20} /></div><p>Our goal is to provide a simple, safe, and efficient solution that supports seniors and relieves families.</p></div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-6xl font-extrabold text-[#2A4D5E] mb-16 text-center">FAQ</h2>
                    <div className=" flex flex-col md:flex-row gap-20 items-start justify-between  ">
                        {/* 🔴 (14) FAQ Image */}
                        <div className="w-full md:w-1/2"><img src="FAQ.png" alt="Medical Team" className="w-full h-auto rounded-none shadow-none object-contain" style={{ mixBlendMode: 'multiply' }} /></div>
                        <div className="w-full md:w-1/2">
                            <div className="bg-white shadow-lg overflow-hidden min-h-[400px]">
                                <div className="bg-[#2A4D5E] text-white px-6 flex overflow-x-auto">
                                    {FAQ_DATA.map((tab) => (
                                        <button key={tab.id} onClick={() => setActiveTabId(tab.id)} className={`py-4 px-6 font-bold text-sm md:text-base whitespace-nowrap focus:outline-none transition-all duration-300 border-b-4 ${activeTabId === tab.id ? 'border-white text-white bg-[#1f3a46]' : 'border-transparent text-blue-200 hover:text-white hover:bg-[#355f72]'}`}>{tab.label}</button>
                                    ))}
                                </div>
                                <div className="bg-white animate-fade-in">
                                    {currentFAQs.map((faq, index) => (<FAQItem key={`${activeTabId}-${index}`} question={faq.q} answer={faq.a} isOpen={index === openFAQIndex} onClick={() => setOpenFAQIndex(index === openFAQIndex ? null : index)}/>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEEDBACK */}
            <div className="bg-[#EAF2F5] py-20">
                <div className="max-w-13xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-[#2A4D5E] mb-12 text-center">Feedback</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {MOCK_FEEDBACK.map((item) => (
                            <div key={item.id} className="flex flex-col items-center text-center">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md mb-6"><img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" /></div>
                                <h3 className="text-xl font-bold text-[#2A4D5E] mb-1">{item.name}</h3>
                                <p className="text-xs text-[#72A6BB] uppercase font-bold tracking-wider mb-3">{item.role}</p>
                                <p className="text-gray-500 text-sm leading-relaxed px-2">"{item.feedback}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- FOOTER ---
const Footer = ({ onNavigate }) => {
    const scrollToAbout = () => {
        onNavigate('home');
        setTimeout(() => {
            const aboutSection = document.getElementById('about-us-section');
            if(aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <footer className="bg-[#2A4D5E] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h4 className="text-[#72A6BB] font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white transition-colors">Home</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">How It Works</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Features & Pricing</button></li>
                            <li><button onClick={scrollToAbout} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
                            <li><button onClick={() => onNavigate('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#72A6BB] font-bold text-lg mb-6 uppercase tracking-wider">Care Services</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => onNavigate('nurses')} className="text-gray-300 hover:text-white transition-colors">Book a Home Nurse</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Elderly Care</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Special Needs Support</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Autism (ASD) Specialists</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Family Monitoring System</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#72A6BB] font-bold text-lg mb-6 uppercase tracking-wider">For Nurses & Carers</h4>
                        <ul className="space-y-3">
                            <li><button className="text-gray-300 hover:text-white transition-colors">Nurse Registration</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Join Requirements</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Nurse Portal Login</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Help Center</button></li>
                            <li><button className="text-gray-300 hover:text-white transition-colors">Privacy Policy</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#72A6BB] font-bold text-lg mb-6 uppercase tracking-wider">Contact & Location</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li>T: +963 (0) 11 123 456</li>
                            <li>E: homecare@gmail.com</li>
                            <li>Damascus, Syria</li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <button className="bg-[#72A6BB] p-2 rounded-full hover:bg-white hover:text-[#2A4D5E] transition-colors text-white"><Facebook size={18} fill="currentColor" strokeWidth={0} /></button>
                            <button className="bg-[#72A6BB] p-2 rounded-full hover:bg-white hover:text-[#2A4D5E] transition-colors text-white"><Youtube size={18} fill="currentColor" strokeWidth={0} /></button>
                            <button className="bg-[#72A6BB] p-2 rounded-full hover:bg-white hover:text-[#2A4D5E] transition-colors text-white"><Linkedin size={18} fill="currentColor" strokeWidth={0} /></button>
                            <button className="bg-[#72A6BB] p-2 rounded-full hover:bg-white hover:text-[#2A4D5E] transition-colors text-white"><Phone size={18} fill="currentColor" strokeWidth={0} /></button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#3a6375] pt-8 text-center">
                    <p className="text-gray-400 text-sm">© 2025 Your Trusted Home Care Platform. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- CONTACT PAGE ---
const ContactPage = () => {
    const handleSubmit = (e) => { e.preventDefault(); alert("Message Sent! We will get back to you shortly."); };
    return (
        <div className="min-h-screen bg-[#EAF2F5] py-20 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-5/12 bg-[#2A4D5E] p-12 text-white flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold mb-6">Get in Touch</h2>
                    <p className="text-blue-100 mb-10 leading-relaxed text-lg">Have questions about our home care services? Need assistance for a loved one?</p>
                    <div className="space-y-8">
                        <div className="flex items-start gap-4"><div className="bg-[#72A6BB] p-3 rounded-full shrink-0"><Phone size={24} className="text-white"/></div><div><p className="text-sm text-blue-200 uppercase font-bold tracking-wide">Phone</p><p className="font-semibold text-lg">+963 (0) 11 123 456</p></div></div>
                        <div className="flex items-start gap-4"><div className="bg-[#72A6BB] p-3 rounded-full shrink-0"><Mail size={24} className="text-white"/></div><div><p className="text-sm text-blue-200 uppercase font-bold tracking-wide">Email</p><p className="font-semibold text-lg">homecare@gmail.com</p></div></div>
                        <div className="flex items-start gap-4"><div className="bg-[#72A6BB] p-3 rounded-full shrink-0"><MapPin size={24} className="text-white"/></div><div><p className="text-sm text-blue-200 uppercase font-bold tracking-wide">Location</p><p className="font-semibold text-lg">Damascus, Syria</p></div></div>
                    </div>
                </div>
                <div className="md:w-7/12 p-12">
                    <h2 className="text-3xl font-bold text-[#2A4D5E] mb-2">Send us a Message</h2>
                    <p className="text-gray-500 mb-8">Fill up the form and our team will get back to you within 24 hours.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div><label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label><input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2A4D5E] outline-none" placeholder="John Doe" /></div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label><input type="email" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2A4D5E] outline-none" placeholder="john@example.com" /></div>
                        </div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Subject</label><input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2A4D5E] outline-none" placeholder="How can we help?" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Message</label><textarea rows="5" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2A4D5E] outline-none resize-none" placeholder="Write your message here..."></textarea></div>
                        <button type="submit" className="px-8 py-4 bg-[#2A4D5E] text-white font-bold rounded-xl shadow-lg hover:bg-[#1f3a46] transition-all flex items-center gap-2">Send Message <Send size={20} /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- REGISTER PAGE (TABS FOR NURSE/PATIENT) ---
const RegisterPage = ({ onNavigate }) => {
    const { register } = useContext(AuthContext);
    const [role, setRole] = useState('patient');
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', 
        region: '', certificate: null 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            register({ ...formData, role });
            setLoading(false);
            onNavigate(role === 'nurse' ? 'nurse-profile' : 'patient-profile');
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAF2F5] p-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-[#2A4D5E]">Create Account</h2>
                    <p className="text-gray-500">Join as a Patient or Nurse</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button className={`flex-1 py-2 rounded-lg font-bold transition-all ${role === 'patient' ? 'bg-[#2A4D5E] text-white shadow-md' : 'text-gray-500 hover:text-[#2A4D5E]'}`} onClick={() => setRole('patient')}>Patient</button>
                    <button className={`flex-1 py-2 rounded-lg font-bold transition-all ${role === 'nurse' ? 'bg-[#2A4D5E] text-white shadow-md' : 'text-gray-500 hover:text-[#2A4D5E]'}`} onClick={() => setRole('nurse')}>Nurse</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#72A6BB] outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#72A6BB] outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#72A6BB] outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>

                    {role === 'nurse' && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Region / Area</label>
                                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#72A6BB] outline-none" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} required>
                                    <option value="">Select Region</option>
                                    <option value="Damascus">Damascus</option>
                                    <option value="Aleppo">Aleppo</option>
                                    <option value="Homs">Homs</option>
                                    <option value="Latakia">Latakia</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Upload</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                                    <UploadCloud className="mx-auto text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Click to upload image</span>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating Account...' : 'Register'}</Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Already have an account? <button onClick={() => onNavigate('login')} className="text-[#2A4D5E] font-bold hover:underline">Login</button></p>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 4. AUTH PAGES (Login / Register)
// ==========================================
const LoginPage = ({ onNavigate }) => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const role = formData.email.includes('nurse') ? 'nurse' : 'patient';
            login(formData.email, formData.password, role);
            setLoading(false);
            onNavigate(role === 'nurse' ? 'nurse-profile' : 'patient-profile');
        }, 1000);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAF2F5] p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-[#2A4D5E] mb-8 text-center">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" required className="w-full p-3 border rounded-lg" placeholder="name@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input type="password" required className="w-full p-3 border rounded-lg" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
                    <button></button>
                </form>
            </div>
        </div>
    );
};

// --- NURSE SLIDER, FILTER ---
// (Reusing previously defined components)
const NurseSlider = ({ nurses, onNurseClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth < 640) setItemsToShow(1); else if (window.innerWidth < 1024) setItemsToShow(2); else setItemsToShow(3); };
    handleResize(); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize);
  }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setCurrentIndex(0); }, [nurses.length]);
  const nextSlide = () => { if (currentIndex < nurses.length - itemsToShow) setCurrentIndex(prev => prev + 1); };
  const prevSlide = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };
  if (nurses.length === 0) return <div className="text-center py-20 text-gray-500">No nurses found matching your filters.</div>;
  return (
    <div className="relative group px-4 md:px-10">
        <button onClick={prevSlide} disabled={currentIndex === 0} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-[#2A4D5E] hover:bg-[#2A4D5E] hover:text-white transition-all disabled:opacity-30 border border-gray-100"><ChevronLeft size={24} /></button>
        <div className="overflow-hidden py-8 -mx-4 px-4">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
                {nurses.map((nurse) => (
                    <div key={nurse.id} className="flex-shrink-0 px-3 box-border" style={{ width: `${100 / itemsToShow}%` }}>
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col border border-gray-50" onClick={() => onNurseClick(nurse.id)}>
                            <div className="h-64 overflow-hidden relative">
                                <img src={nurse.image} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt={nurse.name}/>
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm"><Star size={12} className="text-yellow-500 fill-yellow-500"/><span className="text-xs font-bold text-gray-800">{nurse.rating}</span></div>
                                <div className="absolute bottom-3 left-3 bg-[#2A4D5E]/90 backdrop-blur px-2 py-1 rounded text-white text-xs font-semibold">{nurse.specialty}</div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-[#2A4D5E] mb-1">{nurse.name}</h3>
                                <div className="mt-auto flex items-center justify-between text-gray-500 text-sm border-t pt-4 border-gray-50">
                                    <span className="flex items-center gap-1"><User size={14}/> {nurse.gender}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14}/> {nurse.location}</span>
                                </div>
                                <button className="mt-4 w-full py-2 bg-[#EAF2F5] text-[#2A4D5E] font-semibold rounded-lg hover:bg-[#2A4D5E] hover:text-white transition-colors text-sm">View Profile</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <button onClick={nextSlide} disabled={currentIndex >= nurses.length - itemsToShow} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-[#2A4D5E] hover:bg-[#2A4D5E] hover:text-white transition-all disabled:opacity-30 border border-gray-100"><ChevronRight size={24} /></button>
    </div>
  );
};

const NurseFilter = ({ filters, setFilters }) => {
    const locations = ['All', ...new Set(MOCK_NURSES.map(n => n.location))];
    const specialties = ['All', ...new Set(MOCK_NURSES.map(n => n.specialty))];
    const genders = ['All', 'Male', 'Female'];
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4 text-[#2A4D5E] font-bold"><Filter size={20} /><h3>Filter Nurses</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Specialty</label><select value={filters.specialty} onChange={(e) => setFilters({...filters, specialty: e.target.value})} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#72A6BB]">{specialties.map(spec => (<option key={spec} value={spec}>{spec}</option>))}</select></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Location</label><select value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#72A6BB]">{locations.map(loc => (<option key={loc} value={loc}>{loc}</option>))}</select></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Gender</label><select value={filters.gender} onChange={(e) => setFilters({...filters, gender: e.target.value})} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#72A6BB]">{genders.map(gen => (<option key={gen} value={gen}>{gen}</option>))}</select></div>
            </div>
            {(filters.specialty !== 'All' || filters.location !== 'All' || filters.gender !== 'All') && (<div className="mt-4 pt-4 border-t flex justify-between items-center"><span className="text-xs text-gray-500">Filters Active</span><button onClick={() => setFilters({ specialty: 'All', location: 'All', gender: 'All' })} className="text-xs font-bold text-red-500 hover:text-red-700">Clear All</button></div>)}
        </div>
    );
};

const NurseDetailsPage = ({ nurseId, onBook, onBack }) => {
  const nurse = MOCK_NURSES.find(n => n.id === parseInt(nurseId));
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  if (!nurse) return <div className="text-center py-20">Nurse not found</div>;
  return (
    <div className="min-h-screen bg-[#EAF2F5] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <button onClick={onBack} className="mb-6 flex items-center text-gray-500 hover:text-[#2A4D5E] transition font-medium"><ChevronLeft size={20} /> Back to List</button>
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
          <div className="md:w-[40%] bg-gray-100 relative h-80 md:h-auto"><img src={nurse.image} alt={nurse.name} className="w-full h-full object-cover"/></div>
          <div className="md:w-[60%] p-8 md:p-12 flex flex-col relative">
            <div className="flex justify-between items-start mb-2">
                <div><h1 className="text-3xl font-bold text-[#1F2937] mb-1">{nurse.name}</h1><p className="text-lg text-gray-500">{nurse.specialty}</p></div>
                <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg flex flex-col items-center"><span className="text-xl font-bold text-[#1F2937]">{nurse.rating}</span><div className="flex text-yellow-400"><Star size={10} fill="currentColor"/></div></div>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 my-8">
                <div><p className="text-xs text-gray-400 font-semibold">EXPERIENCE</p><p className="text-lg font-bold text-[#2A4D5E]">{nurse.experience}</p></div>
                <div><p className="text-xs text-gray-400 font-semibold">AGE</p><p className="text-lg font-bold text-[#2A4D5E]">{nurse.age} Years</p></div>
                <div><p className="text-xs text-gray-400 font-semibold">GENDER</p><p className="text-lg font-bold text-[#2A4D5E]">{nurse.gender}</p></div>
                <div><p className="text-xs text-gray-400 font-semibold">LOCATION</p><p className="text-lg font-bold text-[#2A4D5E]">{nurse.location}</p></div>
            </div>
            <div className="mb-6"><h3 className="text-md font-bold text-[#2A4D5E] mb-2">About {nurse.name}</h3><p className="text-gray-500 text-sm leading-relaxed">{nurse.bio}</p></div>
            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div><h3 className="text-sm font-bold text-[#2A4D5E] mb-1">Rate this Nurse</h3><p className="text-xs text-gray-400">How was your experience?</p></div>
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (<button key={star} onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setUserRating(star)}><Star size={24} fill={(hoveredStar || userRating) >= star ? "#fbbf24" : "none"} className={(hoveredStar || userRating) >= star ? "text-yellow-400" : "text-gray-300"}/></button>))}</div>
            </div>
            <div className="mt-auto flex items-center gap-4"><Button onClick={() => onBook(nurse.id)} className="flex-grow py-4 text-lg bg-[#2A4D5E] rounded-xl">Book Now</Button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic (Router) ---
const Navbar = ({ onNavigate, currentPage }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    // NAVBAR COLOR UPDATED TO #2A4D5E to match brand
    <nav className="bg-[#2A4D5E] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer gap-2" onClick={() => onNavigate('home')}>
            {/* UPDATED LOGO: House Icon and Text */}
            <Home className="h-8 w-8 text-white" />
            <span className="font-bold text-2xl text-white tracking-wide">HOMECARE</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-gray-200 hover:text-white font-medium transition-colors">Home</button>
            <button onClick={() => onNavigate('nurses')} className="text-gray-200 hover:text-white font-medium transition-colors">Nurses</button>
            <button onClick={() => {onNavigate('home'); setTimeout(()=>document.getElementById('about-us-section').scrollIntoView({behavior:'smooth'}), 100)}} className="text-gray-200 hover:text-white font-medium transition-colors">About Us</button>
            <button onClick={() => onNavigate('contact')} className="text-gray-200 hover:text-white font-medium transition-colors">Contact Us</button>
            
            {user ? (
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => onNavigate(user.role === 'nurse' ? 'nurse-profile' : 'patient-profile')} 
                        className="text-white font-bold hover:underline"
                    >
                        {user.name} ({user.role === 'nurse' ? 'Nurse' : 'Patient'})
                    </button>
                    <button onClick={() => { logout(); onNavigate('home'); }} className="ml-4 text-red-300 hover:text-red-100 flex items-center gap-1 font-medium"><LogOut size={18}/></button>
                </div>
            ) : (
                <button 
                    onClick={() => onNavigate('login')} 
                    className="ml-4 border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-[#2A4D5E] transition-all"
                >
                    Login
                </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const MainContent = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState('home'); 
    const [selectedNurseId, setSelectedNurseId] = useState(null);

    // --- FILTERS STATE ---
    const [filters, setFilters] = useState({
        specialty: 'All',
        location: 'All',
        gender: 'All'
    });

    useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

    const handleNavigate = (page) => setCurrentPage(page);

    // --- FILTERING LOGIC ---
    const getFilteredNurses = () => {
        return MOCK_NURSES.filter(nurse => {
            const matchSpecialty = filters.specialty === 'All' || nurse.specialty === filters.specialty;
            const matchLocation = filters.location === 'All' || nurse.location === filters.location;
            const matchGender = filters.gender === 'All' || nurse.gender === filters.gender;
            return matchSpecialty && matchLocation && matchGender;
        });
    };

    const renderPage = () => {
        switch(currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'login': return <LoginPage onNavigate={handleNavigate} />;
            case 'register': return <RegisterPage onNavigate={handleNavigate} />;
            case 'contact': return <ContactPage />;
            case 'nurses':
                return (
                    <div className="py-12 px-4 bg-[#EAF2F5] min-h-screen">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold text-[#2A4D5E] mb-2 text-center">Meet Our Caregivers</h2>
                            <p className="text-gray-500 text-center mb-8">Browse our specialized staff in Syria</p>
                            
                            {/* Filter Component */}
                            <NurseFilter filters={filters} setFilters={setFilters} />

                            {/* Slider with Filtered Data */}
                            <NurseSlider 
                                nurses={getFilteredNurses()} 
                                onNurseClick={(id) => { setSelectedNurseId(id); handleNavigate('details'); }} 
                            />
                        </div>
                    </div>
                );
            case 'details': return <NurseDetailsPage nurseId={selectedNurseId} onBook={() => handleNavigate('book')} onBack={() => handleNavigate('nurses')} />;
            case 'book': return <BookingPage nurseId={selectedNurseId} onBack={() => handleNavigate('details')} />;
            case 'nurse-profile': return <NurseProfilePage />;
            case 'patient-profile': return <PatientProfilePage onNavigate={handleNavigate} />; // Pass onNavigate here
            default: return <div>Page Not Found</div>;
        }
    };

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
            <main className="flex-grow">{renderPage()}</main>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

const App = () => { return <AuthProvider><MainContent /></AuthProvider>; };

export default App;