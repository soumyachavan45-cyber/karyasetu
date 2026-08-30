export interface ServiceCategory {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  icon: string;
  imageUrl: string;
  description: string;
  descriptionHi: string;
  category: "core" | "desi" | "commerce" | "tech";
  baseWage: number;
  unit: string;
  societiesCount: number;
  avgRating: number;
  completedJobs: number;
  popularServices: string[];
  govWageStandard: string;
}

export interface Worker {
  id: string;
  workerId: string;
  name: string;
  nameHi: string;
  nameMr: string;
  photoUrl: string;
  phone: string;
  trade: string;
  tradeHi: string;
  tradeMr: string;
  rating: number;
  totalJobs: number;
  state: string;
  city: string;
  societyName: string;
  societyTier: string;
  verifiedAadhaar: boolean;
  verifiedNCD: boolean;
  eShramCardNo: string;
  status: "available" | "busy" | "offline";
  currentLocation: {
    lat: number;
    lng: number;
    area: string;
  };
  todayEarnings: number;
  todayWelfareSaved: number;
  upiId: string;
  skills: string[];
  languages: string[];
  hasSmartphone: boolean;
  testimonial?: string;
  experienceYears?: number;
  uanNumber?: string;
}


export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  category: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  timestamp: string;
  status: "unassigned" | "assigned" | "in_transit" | "otp_verified" | "completed" | "cancelled";
  baseAmount: number;
  workerPayout: number; // 92%
  welfareLocker: number; // 6%
  adminFund: number; // 2%
  assignedWorker?: Worker;
  otpCode: string;
  isOfflineWorker: boolean;
  notes?: string;
}

export interface CityInfo {
  name: string;
  state: string;
  region: "North" | "South" | "East" | "West" | "Central" | "North East";
  lat: number;
  lng: number;
  activeArtisans: number;
  cooperativesCount: number;
}

export const INDIA_CITIES: CityInfo[] = [
  // West
  { name: "Mumbai", state: "Maharashtra", region: "West", lat: 19.0760, lng: 72.8777, activeArtisans: 2840, cooperativesCount: 34 },
  { name: "Pune", state: "Maharashtra", region: "West", lat: 18.5204, lng: 73.8567, activeArtisans: 1950, cooperativesCount: 26 },
  { name: "Nagpur", state: "Maharashtra", region: "West", lat: 21.1458, lng: 79.0882, activeArtisans: 1420, cooperativesCount: 18 },
  { name: "Nashik", state: "Maharashtra", region: "West", lat: 19.9975, lng: 73.7898, activeArtisans: 890, cooperativesCount: 12 },
  { name: "Ahmedabad", state: "Gujarat", region: "West", lat: 23.0225, lng: 72.5714, activeArtisans: 2100, cooperativesCount: 28 },
  { name: "Surat", state: "Gujarat", region: "West", lat: 21.1702, lng: 72.8311, activeArtisans: 1650, cooperativesCount: 22 },
  { name: "Panaji", state: "Goa", region: "West", lat: 15.4909, lng: 73.8278, activeArtisans: 420, cooperativesCount: 8 },

  // North
  { name: "Delhi NCR", state: "Delhi", region: "North", lat: 28.6139, lng: 77.2090, activeArtisans: 4200, cooperativesCount: 52 },
  { name: "Jaipur", state: "Rajasthan", region: "North", lat: 26.9124, lng: 75.7873, activeArtisans: 1850, cooperativesCount: 24 },
  { name: "Lucknow", state: "Uttar Pradesh", region: "North", lat: 26.8467, lng: 80.9462, activeArtisans: 2300, cooperativesCount: 30 },
  { name: "Varanasi", state: "Uttar Pradesh", region: "North", lat: 25.3176, lng: 82.9739, activeArtisans: 1450, cooperativesCount: 19 },
  { name: "Chandigarh", state: "Punjab / Haryana", region: "North", lat: 30.7333, lng: 76.7794, activeArtisans: 980, cooperativesCount: 14 },
  { name: "Dehradun", state: "Uttarakhand", region: "North", lat: 30.3165, lng: 78.0322, activeArtisans: 650, cooperativesCount: 10 },
  { name: "Srinagar", state: "Jammu & Kashmir", region: "North", lat: 34.0837, lng: 74.7973, activeArtisans: 580, cooperativesCount: 9 },

  // South
  { name: "Bengaluru", state: "Karnataka", region: "South", lat: 12.9716, lng: 77.5946, activeArtisans: 3900, cooperativesCount: 48 },
  { name: "Chennai", state: "Tamil Nadu", region: "South", lat: 13.0827, lng: 80.2707, activeArtisans: 3100, cooperativesCount: 40 },
  { name: "Hyderabad", state: "Telangana", region: "South", lat: 17.3850, lng: 78.4867, activeArtisans: 2950, cooperativesCount: 38 },
  { name: "Kochi", state: "Kerala", region: "South", lat: 9.9312, lng: 76.2673, activeArtisans: 1250, cooperativesCount: 18 },
  { name: "Coimbatore", state: "Tamil Nadu", region: "South", lat: 11.0168, lng: 76.9558, activeArtisans: 1120, cooperativesCount: 16 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", region: "South", lat: 17.6868, lng: 83.2185, activeArtisans: 950, cooperativesCount: 14 },

  // Central
  { name: "Bhopal", state: "Madhya Pradesh", region: "Central", lat: 23.2599, lng: 77.4126, activeArtisans: 1350, cooperativesCount: 18 },
  { name: "Indore", state: "Madhya Pradesh", region: "Central", lat: 22.7196, lng: 75.8577, activeArtisans: 1720, cooperativesCount: 22 },
  { name: "Raipur", state: "Chhattisgarh", region: "Central", lat: 21.2514, lng: 81.6296, activeArtisans: 820, cooperativesCount: 12 },

  // East & North East
  { name: "Kolkata", state: "West Bengal", region: "East", lat: 22.5726, lng: 88.3639, activeArtisans: 3400, cooperativesCount: 42 },
  { name: "Patna", state: "Bihar", region: "East", lat: 25.5941, lng: 85.1376, activeArtisans: 1680, cooperativesCount: 21 },
  { name: "Bhubaneswar", state: "Odisha", region: "East", lat: 20.2961, lng: 85.8245, activeArtisans: 1100, cooperativesCount: 15 },
  { name: "Ranchi", state: "Jharkhand", region: "East", lat: 23.3441, lng: 85.3096, activeArtisans: 890, cooperativesCount: 12 },
  { name: "Guwahati", state: "Assam", region: "North East", lat: 26.1445, lng: 91.7362, activeArtisans: 940, cooperativesCount: 14 },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // 1. Core Trades
  {
    id: "electrical",
    name: "Electrical Systems",
    nameHi: "विद्युत प्रणाली व रिपेयर",
    nameMr: "इलेक्ट्रिकल वायरिंग व दुरुस्ती",
    icon: "⚡",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    description: "Certified electricians for wiring, switchboards, MCB faults, lighting & appliance setup.",
    descriptionHi: "वायरिंग, स्विचबोर्ड, एमसीबी फॉल्ट और घरेलू उपकरणों की जांच हेतु प्रमाणित इलेक्ट्रीशियन।",
    category: "core",
    baseWage: 350,
    unit: "per hour / visit",
    societiesCount: 8,
    avgRating: 4.88,
    completedJobs: 1420,
    popularServices: ["Switchboard Installation", "MCB Trip Resolution", "Ceiling Fan Repair", "Inverter Wiring"],
    govWageStandard: "Labour Board Code E-401",
  },
  {
    id: "plumbing",
    name: "Plumbing Logistics",
    nameHi: "नलसाजी व सैनिटरी रिपेयर",
    nameMr: "प्लंबिंग व पाईपलाइन कामे",
    icon: "🚰",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop&q=80",
    description: "High-pressure pipeline repair, bathroom fittings, motor installation & drain unclogging.",
    descriptionHi: "पाइपलाइन लीकेज, मोटर पंप फिटिंग, ड्रेनेज ब्लॉकेज एवं नल फिटिंग समाधान।",
    category: "core",
    baseWage: 320,
    unit: "per hour / visit",
    societiesCount: 9,
    avgRating: 4.82,
    completedJobs: 2150,
    popularServices: ["Tap & Mixer Leakage", "Water Motor Installation", "Drainage Jetting", "Tank Cleaning"],
    govWageStandard: "Sanitary Workers Code S-110",
  },
  {
    id: "hvac",
    name: "HVAC & AC Cooling",
    nameHi: "एसी व कूलिंग सर्विसेज",
    nameMr: "एसी व कुलिंग मेंटेनन्स",
    icon: "🛠️",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    description: "Deep jet chemical wash, gas leak detection, PCB repair & inverter AC maintenance.",
    descriptionHi: "जेट वॉश केमिकल सर्विसिंग, गैस लीकेज चेक एवं स्प्लिट/विंडो एसी इंस्टॉलेशन।",
    category: "core",
    baseWage: 499,
    unit: "per unit service",
    societiesCount: 6,
    avgRating: 4.91,
    completedJobs: 980,
    popularServices: ["Deep Jet Cleaning", "Gas Refill & Leak Test", "PCB Circuit Repair", "Uninstallation"],
    govWageStandard: "Technical Artisan Code H-209",
  },
  {
    id: "carpentry",
    name: "Carpentry & Woodwork",
    nameHi: "बढ़ईगीरी व फर्नीचर कार्य",
    nameMr: "सुतारकाम व फर्निचर दुरुस्ती",
    icon: "🪵",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    description: "Master carpenters for modular fittings, door lock fixes, hinge repairs & custom woodwork.",
    descriptionHi: "मॉड्यूलर किचन कार्य, दरवाजा लॉक रिपेयर, अलमारी सुधार एवं कस्टम लकड़ी का काम।",
    category: "core",
    baseWage: 380,
    unit: "per hour / visit",
    societiesCount: 5,
    avgRating: 4.79,
    completedJobs: 860,
    popularServices: ["Door Lock Installation", "Hinge & Slider Alignment", "Furniture Assembly", "Termite Wood Fix"],
    govWageStandard: "Artisan Guild Code C-302",
  },

  // 2. Desi Everyday Community
  {
    id: "pandit",
    name: "Pandits & Vedic Purohits",
    nameHi: "वैदिक पंडित व पुरोहित",
    nameMr: "वैदिक पंडित व गुरुजी",
    icon: "🪕",
    imageUrl: "https://images.unsplash.com/photo-1609358905581-e5382c16a695?w=600&auto=format&fit=crop&q=80",
    description: "Verified Vedic priests for Griha Pravesh, Satyanarayan Puja, Navgrah rituals & Muhurat.",
    descriptionHi: "गृह प्रवेश, सत्यनारायण कथा, नवग्रह शांति एवं संपूर्ण सामग्री सूची सहित पूजा अनुष्ठान।",
    category: "desi",
    baseWage: 2100,
    unit: "per ritual event",
    societiesCount: 4,
    avgRating: 4.96,
    completedJobs: 640,
    popularServices: ["Griha Pravesh (Housewarming)", "Satyanarayan Katha", "Vastu Shanti", "Vehicle Puja"],
    govWageStandard: "Cultural Society Registry P-88",
  },
  {
    id: "drivers",
    name: "Hourly Drivers & Logistics",
    nameHi: "घंटेवार चालक व लोडिंग ऑटो",
    nameMr: "तासिका चालक व मालवाहतूक",
    icon: "🚗",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80",
    description: "Commercial & personal chauffeurs with verified background checks for outstation or city transit.",
    descriptionHi: "व्यक्तिगत कार चालक, व्यावसायिक लोडिंग ऑटो एवं अंतर-शहरी यात्रा के लिए सत्यापित ड्राइवर।",
    category: "desi",
    baseWage: 180,
    unit: "per hour (min 4 hrs)",
    societiesCount: 7,
    avgRating: 4.85,
    completedJobs: 1340,
    popularServices: ["Personal City Driver", "Outstation Roadtrip Chauffeur", "Small Goods Loading Auto", "Night Valet"],
    govWageStandard: "Transport Cooperative Union T-04",
  },
  {
    id: "festive",
    name: "Festive Artisans & Halwais",
    nameHi: "उत्सव कारीगर, मेहंदी व हलवाई",
    nameMr: "सण कारागीर, मेंदी व आचारी",
    icon: "🎨",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    description: "Traditional Mehendi artists, wedding decorators & village Halwai cooking troupes for ceremonies.",
    descriptionHi: "पारंपरिक मेहंदी आर्टिस्ट, शामियाना डेकोरेशन एवं पारिवारिक कार्यक्रमों हेतु आचारी/हलवाई।",
    category: "desi",
    baseWage: 1500,
    unit: "per event / team",
    societiesCount: 6,
    avgRating: 4.93,
    completedJobs: 520,
    popularServices: ["Bridal Mehendi Package", "Traditional Halwai Catering", "Stage Marigold Decor", "Dhol Tasha Team"],
    govWageStandard: "Handicrafts & Artisans Board F-12",
  },

  // 3. Cooperative Commerce
  {
    id: "dairy_produce",
    name: "Farm-Fresh Co-op Milk & Ghee",
    nameHi: "सहकारी शुद्ध दूध व जैविक उत्पाद",
    nameMr: "सहकारी शुद्ध दूध व सेंद्रिय भाज्या",
    icon: "🥛",
    imageUrl: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=80",
    description: "Direct farm-to-doorstep unadulterated A2 Gir Cow milk, fresh butter & organic vegetable crates.",
    descriptionHi: "किसान सहकारी समितियों से सीधे घर तक शुद्ध A2 दूध, बिलौना घी एवं ताजा जैविक सब्जियों की टोकरी।",
    category: "commerce",
    baseWage: 68,
    unit: "per litre / basket (from ₹300)",
    societiesCount: 12,
    avgRating: 4.95,
    completedJobs: 4300,
    popularServices: ["Daily A2 Gir Cow Milk Delivery", "Desi Cultured Bilona Ghee", "Farm Organic Veggie Box", "Fresh Paneer Crate"],
    govWageStandard: "NDDB / Agricultural Co-op Act",
  },
  {
    id: "shg_handicrafts",
    name: "SHG Handicrafts & Spices",
    nameHi: "महिला बचत गट हस्तशिल्प व मसाले",
    nameMr: "महिला बचत गट मसाले व हस्तकला",
    icon: "🏺",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
    description: "Authentic handloom sarees, earthen clay cookware, sun-dried pickles (Athaana) & stone-ground spices.",
    descriptionHi: "महिला स्वयं सहायता समूहों द्वारा तैयार पारंपरिक अचार, मसाले, मिट्टी के बर्तन एवं हथकरघा वस्त्र।",
    category: "commerce",
    baseWage: 250,
    unit: "per item / hamper",
    societiesCount: 15,
    avgRating: 4.89,
    completedJobs: 1890,
    popularServices: ["Nagpuri Saoji Special Masala Hamper", "Traditional Mango & Lemon Athaana", "Unglazed Clay Cooking Pot", "Paithani Handloom Stole"],
    govWageStandard: "NRLM Mahila Samriddhi Co-op",
  },

  // 4. Tech & Security
  {
    id: "gst_it",
    name: "Small Business GST & IT Setup",
    nameHi: "जीएसटी बिलिंग व पीओएस मशीन सेटअप",
    nameMr: "जीएसटी बिलिंग व पॉस सिस्टीम",
    icon: "💻",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    description: "On-site tech assistants for Kirana store GST invoicing, POS terminal sync & Wi-Fi router fixing.",
    descriptionHi: "किराना दुकानों हेतु जीएसटी बिलिंग सॉफ्टवेयर, पीओएस स्वाइप मशीन एवं वाई-फाई नेटवर्क समाधान।",
    category: "tech",
    baseWage: 800,
    unit: "per setup visit",
    societiesCount: 4,
    avgRating: 4.87,
    completedJobs: 410,
    popularServices: ["GST Return Filing Assistant", "Billing POS Terminal Setup", "CCTV NVR Configuration", "Store Wi-Fi Mesh Install"],
    govWageStandard: "Digital India IT Guild Code D-90",
  },
  {
    id: "solar_cctv",
    name: "Solar Inverter & CCTV Security",
    nameHi: "सोलर पैनल व सीसीटीवी सुरक्षा",
    nameMr: "सोलर पॅनल व सीसीटीव्ही कॅमेरा",
    icon: "📹",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    description: "Rooftop solar panel maintenance, inverter battery diagnostics & multi-channel CCTV installation.",
    descriptionHi: "रूफटॉप सोलर पैनल सर्विसिंग, इनवर्टर बैटरी चेकअप एवं 4-कैमरा हाई-डेफिनिशन सीसीटीवी फिटिंग।",
    category: "tech",
    baseWage: 650,
    unit: "per camera / inverter check",
    societiesCount: 5,
    avgRating: 4.92,
    completedJobs: 730,
    popularServices: ["4-Cam CCTV Full Setup", "Rooftop Solar Maintenance", "Tubular Battery Desulfation", "Smart Video Doorbell"],
    govWageStandard: "Renewable Energy Board SE-10",
  },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: "w-vidya",
    workerId: "#5012",
    name: "Vidya Deshmukh",
    nameHi: "विद्या देशमुख",
    nameMr: "विद्या देशमुख",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    phone: "+91 98221 55012",
    trade: "SHG Producer & Handicrafts",
    tradeHi: "महिला बचत गट उत्पादक",
    tradeMr: "महिला बचत गट उत्पादक",
    rating: 4.95,
    totalJobs: 540,
    state: "Maharashtra",
    city: "Mumbai",
    societyName: "Maa Sharda Mahila Cooperative Federation",
    societyTier: "Primary State Society",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-8890-5012-9901",
    status: "available",
    currentLocation: {
      lat: 19.0760,
      lng: 72.8777,
      area: "Dadar, Mumbai",
    },
    todayEarnings: 1850,
    todayWelfareSaved: 120,
    upiId: "vidya.shg@upi",
    skills: ["Handloom Curation", "Athaana Pickles", "Direct UPI Settlement"],
    languages: ["Marathi", "Hindi", "English"],
    hasSmartphone: true,
    testimonial: "KaryaSetu has changed my life. I earn better and feel respected.",
  },
  {
    id: "w-rajesh",
    workerId: "#4018",
    name: "Rajesh Sharma",
    nameHi: "राजेश शर्मा",
    nameMr: "राजेश शर्मा",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    phone: "+91 94150 44018",
    trade: "Senior Electrician",
    tradeHi: "वरिष्ठ इलेक्ट्रीशियन",
    tradeMr: "वरिष्ठ इलेक्ट्रिशियन",
    rating: 4.91,
    totalJobs: 720,
    state: "Uttar Pradesh",
    city: "Lucknow",
    societyName: "Avadh Shramik Cooperative Union",
    societyTier: "District Cooperative Society",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-7712-4018-3321",
    status: "available",
    currentLocation: {
      lat: 26.8467,
      lng: 80.9462,
      area: "Hazratganj, Lucknow",
    },
    todayEarnings: 1650,
    todayWelfareSaved: 108,
    upiId: "rajesh.elec@upi",
    skills: ["Industrial Wiring", "MCB Tripping", "Solar Inverters", "Safety Compliance"],
    languages: ["Hindi", "English"],
    hasSmartphone: true,
    testimonial: "I have job security and fair pay now. It's been a blessing!",
  },
  {
    id: "w-latha",
    workerId: "#6024",
    name: "Latha Ramanathan",
    nameHi: "लता रामनाथन",
    nameMr: "लता रामनाथन",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    phone: "+91 98401 66024",
    trade: "Dairy & Organic Produce Lead",
    tradeHi: "सहकारी डेयरी व जैविक उत्पाद",
    tradeMr: "सहकारी दुग्ध व सेंद्रिय उत्पादने",
    rating: 4.98,
    totalJobs: 890,
    state: "Tamil Nadu",
    city: "Chennai",
    societyName: "Kaveri Delta Farmers Cooperative",
    societyTier: "State Apex Federation",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-9921-6024-4455",
    status: "available",
    currentLocation: {
      lat: 13.0827,
      lng: 80.2707,
      area: "T. Nagar, Chennai",
    },
    todayEarnings: 2400,
    todayWelfareSaved: 156,
    upiId: "latha.kaveri@upi",
    skills: ["Farm Fresh Milk", "Cold Chain Logistics", "Quality Testing"],
    languages: ["Tamil", "English", "Hindi"],
    hasSmartphone: true,
    testimonial: "Through KaryaSetu, I can support my family with pride.",
  },
  {
    id: "w1",
    workerId: "#4012",
    name: "Ramesh Kumar",
    nameHi: "रमेश कुमार",
    nameMr: "रमेश कुमार",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80",
    phone: "+91 98231 44012",
    trade: "Electrical Specialist",
    tradeHi: "इलेक्ट्रिकल विशेषज्ञ",
    tradeMr: "इलेक्ट्रिकल तज्ज्ञ",
    rating: 4.9,
    totalJobs: 230,
    state: "Maharashtra",
    city: "Nagpur",
    societyName: "Nagpur Central Labour Cooperative (NLCF-78)",
    societyTier: "Primary Industrial Society",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-8890-4412-9901",
    status: "available",
    currentLocation: {
      lat: 21.1458,
      lng: 79.0882,
      area: "Dighori, Nagpur",
    },
    todayEarnings: 1280,
    todayWelfareSaved: 84,
    upiId: "ramesh.kumar@upi",
    skills: ["MCB Faults", "Industrial Wiring", "Inverter Setup", "Appliance Safety"],
    languages: ["Hindi", "Marathi", "English"],
    hasSmartphone: true,
    testimonial: "92% instant payout straight into my bank account has ended all my financial stress.",
  },
  {
    id: "w2",
    workerId: "#3890",
    name: "Santosh Gawande",
    nameHi: "संतोष गवांडे",
    nameMr: "संतोष गवांडे",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    phone: "+91 94221 83890",
    trade: "Master Plumber",
    tradeHi: "वरिष्ठ नलसाज (प्लंबर)",
    tradeMr: "मास्टर प्लंबर",
    rating: 4.85,
    totalJobs: 412,
    state: "Maharashtra",
    city: "Pune",
    societyName: "Trimurti Artisans Sahakari Sanstha",
    societyTier: "District Federation Member",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-7712-3890-5544",
    status: "busy",
    currentLocation: {
      lat: 18.5204,
      lng: 73.8567,
      area: "Kothrud, Pune",
    },
    todayEarnings: 1920,
    todayWelfareSaved: 125,
    upiId: "santosh.plumb@upi",
    skills: ["Pressure Jetting", "CPVC Piping", "Motor Repair", "Sanitary Lines"],
    languages: ["Marathi", "Hindi"],
    hasSmartphone: true,
  },
  {
    id: "w3",
    workerId: "#5102",
    name: "Pandit Radheshyam Joshi",
    nameHi: "पंडित राधेश्याम जोशी",
    nameMr: "पंडित राधेश्याम जोशी",
    photoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80",
    phone: "+91 98902 55102",
    trade: "Vedic Ritual Scholar",
    tradeHi: "वैदिक पुरोहित व ज्योतिषाचार्य",
    tradeMr: "वैदिक पौरोहित्य व ज्योतिषी",
    rating: 4.98,
    totalJobs: 180,
    state: "Delhi",
    city: "Delhi NCR",
    societyName: "Vedic Sanskar Sahakari Samiti",
    societyTier: "Affiliated Cultural Board",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-9921-5102-1134",
    status: "available",
    currentLocation: {
      lat: 28.6139,
      lng: 77.2090,
      area: "Connaught Place, Delhi",
    },
    todayEarnings: 4200,
    todayWelfareSaved: 274,
    upiId: "radheshyam.joshi@upi",
    skills: ["Griha Pravesh", "Vastu Shanti", "Satyanarayan Katha", "Kundali"],
    languages: ["Sanskrit", "Hindi", "English"],
    hasSmartphone: true,
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-9041",
    customerName: "Vikas Deshpande",
    customerPhone: "+91 98220 11902",
    serviceId: "plumbing",
    serviceName: "Plumber Needed (Main Line Clog)",
    category: "core",
    area: "Dadar West, Mumbai",
    city: "Mumbai",
    lat: 19.0178,
    lng: 72.8478,
    timestamp: "18:38",
    status: "unassigned",
    baseAmount: 380,
    workerPayout: 349.6,
    welfareLocker: 22.8,
    adminFund: 7.6,
    otpCode: "4921",
    isOfflineWorker: false,
    notes: "Customer requested immediate plumbing technician for bathroom line.",
  },
  {
    id: "BK-9038",
    customerName: "Sunita Mahajan",
    customerPhone: "+91 97633 44018",
    serviceId: "dairy_produce",
    serviceName: "A2 Gir Cow Milk & Organic Produce Hamper",
    category: "commerce",
    area: "T. Nagar, Chennai",
    city: "Chennai",
    lat: 13.0418,
    lng: 80.2341,
    timestamp: "18:32",
    status: "assigned",
    baseAmount: 640,
    workerPayout: 588.8,
    welfareLocker: 38.4,
    adminFund: 12.8,
    assignedWorker: MOCK_WORKERS[2], // Latha
    otpCode: "7104",
    isOfflineWorker: false,
    notes: "Farm delivery on route. Scheduled before 7:30 PM.",
  },
  {
    id: "BK-9032",
    customerName: "Anand Kulkarni",
    customerPhone: "+91 94231 09812",
    serviceId: "electrical",
    serviceName: "Wiring Fault & MCB Tripping",
    category: "core",
    area: "Hazratganj, Lucknow",
    city: "Lucknow",
    lat: 26.8467,
    lng: 80.9462,
    timestamp: "18:15",
    status: "otp_verified",
    baseAmount: 350,
    workerPayout: 322.0,
    welfareLocker: 21.0,
    adminFund: 7.0,
    assignedWorker: MOCK_WORKERS[1], // Rajesh
    otpCode: "3892",
    isOfflineWorker: false,
    notes: "Job in progress. Worker active on site.",
  },
  {
    id: "BK-9025",
    customerName: "Pooja Agrawal",
    customerPhone: "+91 98901 22894",
    serviceId: "pandit",
    serviceName: "Griha Pravesh Puja Consultation",
    category: "desi",
    area: "Civil Lines, Delhi",
    city: "Delhi NCR",
    lat: 28.6750,
    lng: 77.2250,
    timestamp: "17:40",
    status: "completed",
    baseAmount: 2100,
    workerPayout: 1932.0,
    welfareLocker: 126.0,
    adminFund: 42.0,
    assignedWorker: MOCK_WORKERS[5], // Radheshyam Joshi
    otpCode: "8821",
    isOfflineWorker: false,
    notes: "Completed successfully. Instant 92% UPI split settled.",
  },
];

export const DEMAND_FORECAST_DATA = [
  { month: "Jan", actualBookings: 1420, forecastedDemand: 1380, highDemandTrade: "Solar & Geyser" },
  { month: "Feb", actualBookings: 1680, forecastedDemand: 1650, highDemandTrade: "Carpentry & Paint" },
  { month: "Mar", actualBookings: 2150, forecastedDemand: 2100, highDemandTrade: "HVAC & AC Service" },
  { month: "Apr", actualBookings: 3200, forecastedDemand: 3100, highDemandTrade: "HVAC Deep Jet Repair" },
  { month: "May", actualBookings: 3890, forecastedDemand: 3950, highDemandTrade: "HVAC & Cooler Wiring" },
  { month: "Jun", actualBookings: 2900, forecastedDemand: 2850, highDemandTrade: "Monsoon Waterproofing" },
  { month: "Jul", actualBookings: 2400, forecastedDemand: 2500, highDemandTrade: "Drainage & Plumbing" },
  { month: "Aug", actualBookings: 2800, forecastedDemand: 2750, highDemandTrade: "Festive Puja Pandits" },
  { month: "Sep", actualBookings: 3400, forecastedDemand: 3500, highDemandTrade: "Navratri & Mehendi" },
  { month: "Oct", actualBookings: 4200, forecastedDemand: 4300, highDemandTrade: "Diwali Deep Clean & Paint" },
  { month: "Nov", actualBookings: 3900, forecastedDemand: 3850, highDemandTrade: "Wedding Halwais & Pandits" },
  { month: "Dec", actualBookings: 2600, forecastedDemand: 2550, highDemandTrade: "Winter Home Repairs" },
];


