const MOCK_NURSES = [
  {
    id: 1,
    name: "Sarah Al-Masri",
    // 🔴 (1) غير صورة سارة هنا
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
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
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
    },
    { 
        id: 2, 
        name: "Rania Kabbani", 
        role: "Aleppo", 
        feedback: "Finding a specialized nurse for autism care was hard until I found this app. Highly recommended!", 
        // 🔴 (8) غير صورة رانيا هنا
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" 
    },
    { 
        id: 3, 
        name: "Mazen Othman", 
        role: "Latakia", 
        feedback: "Very professional and punctual. The booking process is smooth and easy.", 
        // 🔴 (9) غير صورة مازن هنا
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
    },
    { 
        id: 4, 
        name: "Hala Zaid", 
        role: "Homs", 
        feedback: "I feel much safer knowing my mother is in good hands. Thank you Home Care!", 
        // 🔴 (10) غير صورة هالة هنا
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
    }
];