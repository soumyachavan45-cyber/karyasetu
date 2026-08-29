export interface ServiceCategory {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  icon: string;
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

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // 1. Core Trades
  {
    id: "electrical",
    name: "Electrical Systems",
    nameHi: "विद्युत प्रणाली व रिपेयर",
    nameMr: "इलेक्ट्रिकल वायरिंग व दुरुस्ती",
    icon: "⚡",
    description: "Certified electricians for wiring, switchboards, MCB faults & appliance setup.",
    descriptionHi: "वायरिंग, स्विचबोर्ड, एमसीबी फॉल्ट और घरेलू उपकरणों की जांच हेतु प्रमाणित इलेक्ट्रीशियन।",
    category: "core",
    baseWage: 350,
    unit: "per hour / visit",
    societiesCount: 8,
    avgRating: 4.88,
    completedJobs: 1420,
    popularServices: ["Switchboard Installation", "MCB Trip Resolution", "Ceiling Fan Repair", "Inverter Wiring"],
    govWageStandard: "Labour Board Code E-401 (MH)",
  },
  {
    id: "hvac",
    name: "HVAC & AC Cooling",
    nameHi: "एसी व कूलिंग सर्विसेज",
    nameMr: "एसी व कुलिंग मेंटेनन्स",
    icon: "🛠️",
    description: "Deep jet chemical service, gas leak detection & inverter AC maintenance.",
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
    id: "plumbing",
    name: "Plumbing Logistics",
    nameHi: "नलसाजी व सैनिटरी रिपेयर",
    nameMr: "प्लंबिंग व पाईपलाइन कामे",
    icon: "🚰",
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
    id: "carpentry",
    name: "Carpentry Systems",
    nameHi: "बढ़ईगीरी व फर्नीचर कार्य",
    nameMr: "सुतारकाम व फर्निचर दुरुस्ती",
    icon: "🪵",
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

  // 4. Tech & B2B
  {
    id: "gst_it",
    name: "Small Business GST & IT Setup",
    nameHi: "जीएसटी बिलिंग व पीओएस मशीन सेटअप",
    nameMr: "जीएसटी बिलिंग व पॉस सिस्टीम",
    icon: "💻",
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
    id: "w1",
    workerId: "#4012",
    name: "Ramesh Kumar",
    nameHi: "रमेश कुमार",
    nameMr: "रमेश कुमार",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98231 44012",
    trade: "Electrical Specialist",
    tradeHi: "इलेक्ट्रिकल विशेषज्ञ",
    tradeMr: "इलेक्ट्रिकल तज्ज्ञ",
    rating: 4.9,
    totalJobs: 230,
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
  },
  {
    id: "w2",
    workerId: "#3890",
    name: "Santosh Gawande",
    nameHi: "संतोष गवांडे",
    nameMr: "संतोष गवांडे",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+91 94221 83890",
    trade: "Master Plumber",
    tradeHi: "वरिष्ठ नलसाज (प्लंबर)",
    tradeMr: "मास्टर प्लंबर",
    rating: 4.85,
    totalJobs: 412,
    societyName: "Trimurti Artisans Sahakari Sanstha",
    societyTier: "District Federation Member",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-7712-3890-5544",
    status: "busy",
    currentLocation: {
      lat: 21.1215,
      lng: 79.0495,
      area: "Trimurti Nagar, Nagpur",
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
    photoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98902 55102",
    trade: "Vedic Ritual Scholar",
    tradeHi: "वैदिक पुरोहित व ज्योतिषाचार्य",
    tradeMr: "वैदिक पौरोहित्य व ज्योतिषी",
    rating: 4.98,
    totalJobs: 180,
    societyName: "Vidarbha Purohit & Sanskar Sahakari Samiti",
    societyTier: "Affiliated Cultural Board",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-9921-5102-1134",
    status: "available",
    currentLocation: {
      lat: 21.1539,
      lng: 79.0664,
      area: "Dharampeth, Nagpur",
    },
    todayEarnings: 4200,
    todayWelfareSaved: 274,
    upiId: "radheshyam.joshi@upi",
    skills: ["Griha Pravesh", "Vastu Shanti", "Satyanarayan Katha", "Kundali"],
    languages: ["Sanskrit", "Hindi", "Marathi"],
    hasSmartphone: true,
  },
  {
    id: "w4",
    workerId: "#1092",
    name: "Bhikaji Shinde (Offline Worker)",
    nameHi: "भीकाजी शिंदे (ऑफलाइन कारीगर)",
    nameMr: "भिकाजी शिंदे (ऑफलाइन कारागीर)",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+91 71225 10920",
    trade: "Senior Carpenter",
    tradeHi: "वरिष्ठ बढ़ई (सुतार)",
    tradeMr: "वरिष्ठ सुतार",
    rating: 4.92,
    totalJobs: 540,
    societyName: "Sitabuldi Shramik Sanstha",
    societyTier: "Labour Felicitation Centre (LFC)",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-3301-1092-7788",
    status: "available",
    currentLocation: {
      lat: 21.1444,
      lng: 79.0838,
      area: "Sitabuldi LFC Hub, Nagpur",
    },
    todayEarnings: 950,
    todayWelfareSaved: 62,
    upiId: "lfc.sitabuldi.ops@upi",
    skills: ["Solid Teak Restoration", "Door Fitting", "Antique Wood Repair"],
    languages: ["Marathi", "Hindi"],
    hasSmartphone: false, // Dispatched via printed job cards
  },
  {
    id: "w5",
    workerId: "#6211",
    name: "Anjali Tayade (SHG Lead)",
    nameHi: "अंजलि तायडे (बचत गट प्रमुख)",
    nameMr: "अंजली तायडे (बचत गट प्रमुख)",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+91 97654 66211",
    trade: "Co-op Farm & SHG Logistician",
    tradeHi: "सहकारी उत्पाद व वितरण प्रबंधक",
    tradeMr: "सहकारी उत्पादन व वितरण व्यवस्थापक",
    rating: 4.94,
    totalJobs: 890,
    societyName: "Maa Sharda Mahila Krishi Sahakari Sanstha",
    societyTier: "Rural Self-Help Federation",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-4422-6211-0099",
    status: "available",
    currentLocation: {
      lat: 21.1612,
      lng: 79.0915,
      area: "Wardhaman Nagar, Nagpur",
    },
    todayEarnings: 2450,
    todayWelfareSaved: 160,
    upiId: "maasharda.shg@upi",
    skills: ["Organic Curation", "Cold Chain Logistics", "SHG Quality Check"],
    languages: ["Marathi", "Hindi", "English"],
    hasSmartphone: true,
  },
  {
    id: "w6",
    workerId: "#7723",
    name: "Pravin Deshmukh",
    nameHi: "प्रवीण देशमुख",
    nameMr: "प्रवीण देशमुख",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98811 77723",
    trade: "Solar & CCTV Technician",
    tradeHi: "सोलर व सीसीटीवी तकनीशियन",
    tradeMr: "सोलर व सीसीटीव्ही तंत्रज्ञ",
    rating: 4.88,
    totalJobs: 310,
    societyName: "Vidarbha Urja & Tech Sahakari Mandal",
    societyTier: "Technical Services Union",
    verifiedAadhaar: true,
    verifiedNCD: true,
    eShramCardNo: "UAN-5533-7723-8812",
    status: "available",
    currentLocation: {
      lat: 21.1325,
      lng: 79.0582,
      area: "Pratap Nagar, Nagpur",
    },
    todayEarnings: 1600,
    todayWelfareSaved: 104,
    upiId: "pravin.tech@upi",
    skills: ["Solar Micro-Inverter", "IP Camera Mesh", "Battery Diagnostics"],
    languages: ["Marathi", "Hindi", "English"],
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
    area: "Sadatpur / Gandhisagar, Nagpur",
    city: "Nagpur",
    lat: 21.1412,
    lng: 79.0945,
    timestamp: "18:38",
    status: "unassigned",
    baseAmount: 380,
    workerPayout: 349.6,
    welfareLocker: 22.8,
    adminFund: 7.6,
    otpCode: "4921",
    isOfflineWorker: true,
    notes: "Requires physical job sheet dispatch. Customer requested immediate technician.",
  },
  {
    id: "BK-9038",
    customerName: "Sunita Mahajan",
    customerPhone: "+91 97633 44018",
    serviceId: "dairy_produce",
    serviceName: "A2 Milk & Organic Produce Hamper",
    category: "commerce",
    area: "Trimurti Nagar, Nagpur",
    city: "Nagpur",
    lat: 21.1215,
    lng: 79.0495,
    timestamp: "18:32",
    status: "assigned",
    baseAmount: 640,
    workerPayout: 588.8,
    welfareLocker: 38.4,
    adminFund: 12.8,
    assignedWorker: MOCK_WORKERS[1],
    otpCode: "7104",
    isOfflineWorker: false,
    notes: "Delivery on route. Scheduled before 7:30 PM.",
  },
  {
    id: "BK-9032",
    customerName: "Anand Kulkarni",
    customerPhone: "+91 94231 09812",
    serviceId: "electrical",
    serviceName: "Wiring Fault & MCB Tripping",
    category: "core",
    area: "Dighori, Nagpur",
    city: "Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    timestamp: "18:15",
    status: "otp_verified",
    baseAmount: 350,
    workerPayout: 322.0,
    welfareLocker: 21.0,
    adminFund: 7.0,
    assignedWorker: MOCK_WORKERS[0],
    otpCode: "3892",
    isOfflineWorker: false,
    notes: "Job in progress. Worker Ramesh Kumar active on site.",
  },
  {
    id: "BK-9025",
    customerName: "Pooja Agrawal",
    customerPhone: "+91 98901 22894",
    serviceId: "pandit",
    serviceName: "Griha Pravesh Puja Consultation",
    category: "desi",
    area: "Civil Lines, Nagpur",
    city: "Nagpur",
    lat: 21.1565,
    lng: 79.0712,
    timestamp: "17:40",
    status: "completed",
    baseAmount: 2100,
    workerPayout: 1932.0,
    welfareLocker: 126.0,
    adminFund: 42.0,
    assignedWorker: MOCK_WORKERS[2],
    otpCode: "8821",
    isOfflineWorker: false,
    notes: "Completed successfully. Instant UPI split settled.",
  },
];

export const DEMAND_FORECAST_DATA = [
  { month: "Jan", electrical: 65, hvac: 30, festive: 80, tech: 40 },
  { month: "Feb", electrical: 70, hvac: 45, festive: 60, tech: 45 },
  { month: "Mar", electrical: 85, hvac: 95, festive: 50, tech: 52 },
  { month: "Apr", electrical: 110, hvac: 180, festive: 45, tech: 60 },
  { month: "May", electrical: 130, hvac: 220, festive: 40, tech: 68 },
  { month: "Jun", electrical: 140, hvac: 160, festive: 35, tech: 75 },
  { month: "Jul", electrical: 125, hvac: 90, festive: 55, tech: 80 },
  { month: "Aug", electrical: 135, hvac: 75, festive: 110, tech: 85 },
  { month: "Sep", electrical: 150, hvac: 80, festive: 170, tech: 90 },
  { month: "Oct", electrical: 190, hvac: 70, festive: 240, tech: 105 },
  { month: "Nov", electrical: 175, hvac: 40, festive: 260, tech: 115 },
  { month: "Dec", electrical: 120, hvac: 25, festive: 140, tech: 95 },
];
