export type Language = "en" | "hi" | "mr";

export interface Translations {
  appName: string;
  appNameDevanagari: string;
  tagline: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  selectLocation: string;
  bookArtisan: string;
  activeStatus: string;
  dutyMode: string;
  todaysEarnings: string;
  socialSecurityStatus: string;
  fullySecured: string;
  allocatedToday: string;
  tapToSpeak: string;
  voicePrompt: string;
  newJobRequest: string;
  accept: string;
  decline: string;
  distanceAway: string;
  payoutToWallet: string;
  payoutBreakdown: string;
  workerShare: string;
  welfareShare: string;
  adminShare: string;
  adminHubTitle: string;
  unassigned: string;
  matchOfflineWorker: string;
  printTicket: string;
  liveMap: string;
  eShramStatus: string;
  ondcStatus: string;
  safeAtHome: string;
  safeAtHomeDesc: string;
  fairFlatRates: string;
  fairFlatRatesDesc: string;
  directPayouts: string;
  directPayoutsDesc: string;
  baseWage: string;
  viewDetails: string;
  quickBook: string;
  filterAll: string;
  filterTrades: string;
  filterDesi: string;
  filterCommerce: string;
  filterTech: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "KaryaSetu",
    appNameDevanagari: "कार्यसेतु",
    tagline: "India's Sovereign Cooperative Digital Workforce Platform",
    heroTitle1: "It's all about",
    heroTitleHighlight: "workforce transparency",
    heroSubtitle:
      "A decentralized, state-backed, cooperative-owned digital public marketplace that formalizes India's blue-collar artisans with direct 92% payouts and automated e-Shram social security.",
    searchPlaceholder: "Search for 'AC Repair', 'Plumber', 'Electrician', 'Pandit', 'Solar'...",
    searchBtn: "Find Verified Artisan",
    selectLocation: "Nagpur, MH",
    bookArtisan: "Book Artisan",
    activeStatus: "Active",
    dutyMode: "Duty Mode",
    todaysEarnings: "Today's Earnings",
    socialSecurityStatus: "Automated Social Security Status",
    fullySecured: "FULLY SECURED",
    allocatedToday: "allocated today to your e-Shram Accident & Pension Fund",
    tapToSpeak: "Tap to Speak in Hindi / Marathi / English",
    voicePrompt: "Where is my next job?",
    newJobRequest: "NEW REQUEST RECEIVED!",
    accept: "ACCEPT JOB",
    decline: "DECLINE",
    distanceAway: "away",
    payoutToWallet: "Direct Payout to Wallet",
    payoutBreakdown: "Transparent Payout Rail (Code on Social Security 2020)",
    workerShare: "92% Direct Bank Transfer (Instant UPI)",
    welfareShare: "6% National e-Shram Accident & Pension Locker",
    adminShare: "2% Local Cooperative Operations & Hub",
    adminHubTitle: "Nagpur Central District Labour Federation",
    unassigned: "UNASSIGNED",
    matchOfflineWorker: "Match Offline Worker",
    printTicket: "Print Physical Job Ticket",
    liveMap: "Live Bhuvan Resource Map",
    eShramStatus: "e-Shram Portal API",
    ondcStatus: "ONDC Network Gateway",
    safeAtHome: "Safe At Home",
    safeAtHomeDesc: "Every artisan is vetted via Aadhaar e-KYC and National Cooperative Database (NCD).",
    fairFlatRates: "Fair Flat Rates",
    fairFlatRatesDesc: "Zero surge pricing gouging. Rates are set by State Labour Minimum Wage Boards.",
    directPayouts: "92% Direct Payouts",
    directPayoutsDesc: "92% goes instantly to worker's bank account, funding family welfare & pensions.",
    baseWage: "Base Wage",
    viewDetails: "View Details",
    quickBook: "Instant Book",
    filterAll: "All Services",
    filterTrades: "Core Trades",
    filterDesi: "Desi Community",
    filterCommerce: "Co-op Commerce",
    filterTech: "Tech & B2B",
  },
  hi: {
    appName: "कार्यसेतु",
    appNameDevanagari: "कार्यसेतु",
    tagline: "भारत का संप्रभु सहकारी डिजिटल कार्यबल मंच",
    heroTitle1: "यह सब कुछ है",
    heroTitleHighlight: "पारदर्शी और न्यायसंगत कार्यबल",
    heroSubtitle:
      "श्रमिक सहकारी समितियों द्वारा संचालित सार्वजनिक डिजिटल बाज़ार—जहां 92% भुगतान सीधे कारीगर के बैंक खाते में और स्वचालित ई-श्रम सामाजिक सुरक्षा मिलती है।",
    searchPlaceholder: "खोजें: 'एसी रिपेयर', 'प्लंबर', 'इलेक्ट्रीशियन', 'पंडित जी', 'सोलर'...",
    searchBtn: "सत्यापित कारीगर खोजें",
    selectLocation: "नागपुर, महाराष्ट्र",
    bookArtisan: "कारीगर बुक करें",
    activeStatus: "सक्रिय (ड्यूटी ऑन)",
    dutyMode: "ड्यूटी मोड",
    todaysEarnings: "आज की कुल कमाई",
    socialSecurityStatus: "स्वचालित सामाजिक सुरक्षा स्थिति",
    fullySecured: "पूर्णतः सुरक्षित [e-Shram]",
    allocatedToday: "आज आपके ई-श्रम दुर्घटना व पेंशन फंड में जमा किए गए",
    tapToSpeak: "बोलने के लिए माइक दबाएं (हिंदी / मराठी / अंग्रेज़ी)",
    voicePrompt: "मेरा अगला काम कहाँ है?",
    newJobRequest: "नया काम अनुरोध प्राप्त हुआ!",
    accept: "स्वीकार करें (ACCEPT)",
    decline: "अस्वीकार (DECLINE)",
    distanceAway: "दूरी पर",
    payoutToWallet: "वॉलेट में सीधा भुगतान",
    payoutBreakdown: "पारदर्शी भुगतान संरचना (सामाजिक सुरक्षा संहिता 2020)",
    workerShare: "92% तत्काल बैंक ट्रांसफर (UPI द्वारा सीधे कारीगर को)",
    welfareShare: "6% ई-श्रम राष्ट्रीय दुर्घटना एवं पेंशन लॉकर",
    adminShare: "2% स्थानीय सहकारी सुविधा केंद्र व सर्वर",
    adminHubTitle: "नागपुर केंद्रीय जिला श्रम सहकारी संघ",
    unassigned: "अ-आबंटित (बिना फोन वाले श्रमिक)",
    matchOfflineWorker: "ऑफलाइन कारीगर जोड़ें",
    printTicket: "भौतिक जॉब कार्ड प्रिंट करें",
    liveMap: "लाइव भुवन संसाधन मानचित्र",
    eShramStatus: "ई-श्रम पोर्टल एपीआई",
    ondcStatus: "ओएनडीसी नेटवर्क गेटवे",
    safeAtHome: "घर पर पूर्ण सुरक्षा",
    safeAtHomeDesc: "आधार ई-केवाईसी और राष्ट्रीय सहकारी डेटाबेस (NCD) द्वारा शत-प्रतिशत प्रमाणित कारीगर।",
    fairFlatRates: "उचित निर्धारित दरें",
    fairFlatRatesDesc: "कोई अनुचित सर्ज चार्ज नहीं। राज्य श्रम विभाग के न्यूनतम वेतन बोर्ड अनुसार तय मूल्य।",
    directPayouts: "92% सीधा भुगतान",
    directPayoutsDesc: "ग्राहकों के पैसे का 92% सीधे कारीगर के खाते में, शेष उनके कल्याण व पेंशन फंड में।",
    baseWage: "मूल दर",
    viewDetails: "विवरण देखें",
    quickBook: "तुरंत बुक करें",
    filterAll: "सभी सेवाएं",
    filterTrades: "मुख्य कारीगरी",
    filterDesi: "देसी सामुदायिक सेवाएं",
    filterCommerce: "सहकारी उत्पाद",
    filterTech: "तकनीकी व व्यावसायिक",
  },
  mr: {
    appName: "कार्यसेतू",
    appNameDevanagari: "कार्यसेतू",
    tagline: "भारताचे सार्वभौम सहकारी डिजिटल कामगार व्यासपीठ",
    heroTitle1: "हे सर्व आहे",
    heroTitleHighlight: "कामगार पारदर्शकता आणि न्याय",
    heroSubtitle:
      "कामगार सहकारी संस्थांच्या मालकीचे डिजिटल व्यासपीठ—जिथे ९२% मोबदला थेट कारागिराच्या खात्यात आणि ई-श्रमद्वारे आपोआप सामाजिक सुरक्षा मिळते.",
    searchPlaceholder: "शोधा: 'इलेक्ट्रिशियन', 'प्लंबर', 'एसी दुरुस्ती', 'पंडित', 'सोलर'...",
    searchBtn: "प्रमाणित कारागीर शोधा",
    selectLocation: "नागपूर, महाराष्ट्र",
    bookArtisan: "कारागीर बुक करा",
    activeStatus: "सक्रिय",
    dutyMode: "ड्युटी मोड",
    todaysEarnings: "आजची एकूण कमाई",
    socialSecurityStatus: "स्वयंचलित सामाजिक सुरक्षा स्थिती",
    fullySecured: "पूर्णपणे सुरक्षित [e-Shram]",
    allocatedToday: "आज तुमच्या ई-श्रम अपघात व पेन्शन निधीत जमा झाले",
    tapToSpeak: "मराठीत बोलण्यासाठी टॅप करा",
    voicePrompt: "माझे पुढचे काम कुठे आहे?",
    newJobRequest: "नवीन कामाची विनंती आली आहे!",
    accept: "स्वीकारा (ACCEPT)",
    decline: "नाकारा (DECLINE)",
    distanceAway: "अंतरावर",
    payoutToWallet: "थेट बँक खात्यात रक्कम",
    payoutBreakdown: "पारदर्शक मोबदला रचना (सामाजिक सुरक्षा संहिता २०२०)",
    workerShare: "९२% थेट बँक ट्रान्सफर (UPI द्वारे)",
    welfareShare: "६% राष्ट्रीय ई-श्रम अपघात व पेन्शन निधी",
    adminShare: "२% स्थानिक सहकारी संस्था व केंद्र खर्च",
    adminHubTitle: "नागपूर मध्यवर्ती जिल्हा कामगार सहकारी संघ",
    unassigned: "नियुक्त न केलेले",
    matchOfflineWorker: "ऑफलाइन कारागीर जोडा",
    printTicket: "प्रत्यक्ष जॉब तिकीट प्रिंट करा",
    liveMap: "थेट भुवन नकाशा",
    eShramStatus: "ई-श्रम पोर्टल एपीआई",
    ondcStatus: "ONDC नेटवर्क गेटवे",
    safeAtHome: "घरी पूर्ण सुरक्षितता",
    safeAtHomeDesc: "प्रत्येक कारागीर आधार ई-केवायसी आणि राष्ट्रीय सहकारी डेटाबेस (NCD) द्वारे प्रमाणित.",
    fairFlatRates: "न्याय्य निश्चित दर",
    fairFlatRatesDesc: "कोणतेही लपविलेले शुल्क नाही. शासकीय किमान वेतन मंडळानुसार निश्चित केलेले दर.",
    directPayouts: "९२% थेट मोबदला",
    directPayoutsDesc: "तुमच्या पैशांपैकी ९२% थेट स्थानिक कारागिराच्या बँक खात्यात जमा होतो.",
    baseWage: "मूळ दर",
    viewDetails: "तपशील पहा",
    quickBook: "त्वरित बुक करा",
    filterAll: "सर्व सेवा",
    filterTrades: "मुख्य कामे",
    filterDesi: "पारंपरिक सेवा",
    filterCommerce: "सहकारी उत्पादने",
    filterTech: "तांत्रिक सेवा",
  },
};
