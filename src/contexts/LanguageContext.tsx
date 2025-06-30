
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'np';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Building Dreams with Precision and Quality',
    heroSubtitle: 'Your trusted partner in construction excellence',
    getQuote: 'Get a Quote',
    
    // Home Page
    whyChooseUs: 'Why Choose Us',
    experienceTitle: 'Years of Experience',
    experienceDesc: 'Delivering quality construction projects',
    qualityTitle: 'Premium Quality',
    qualityDesc: 'Using only the finest materials and techniques',
    teamTitle: 'Expert Team',
    teamDesc: 'Skilled professionals dedicated to excellence',
    servicesTitle: 'Our Services',
    featuredProjects: 'Featured Projects',
    testimonials: 'What Our Clients Say',
    
    // About Page
    aboutTitle: 'About Prestige Construction',
    aboutDesc: 'With over two decades of experience in the construction industry, Prestige Construction and Builders has established itself as a leading name in quality construction services.',
    missionTitle: 'Our Mission',
    missionDesc: 'To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of quality, safety, and professionalism.',
    visionTitle: 'Our Vision',
    visionDesc: 'To be the most trusted construction company, known for innovation, reliability, and creating lasting structures that stand the test of time.',
    
    // Services Page
    servicesPageTitle: 'Our Services',
    architecture: 'Architecture',
    architectureDesc: 'Creative and functional architectural designs',
    construction: 'Construction',
    constructionDesc: 'Complete construction solutions from foundation to finish',
    renovation: 'Renovation',
    renovationDesc: 'Transform existing spaces with modern upgrades',
    planning: 'Planning',
    planningDesc: 'Comprehensive project planning and management',
    
    // Projects Page
    projectsTitle: 'Our Projects',
    projectsDesc: 'Explore our portfolio of completed construction projects',
    residentialTitle: 'Residential Complex',
    residentialDesc: 'Modern residential building with premium amenities',
    commercialTitle: 'Commercial Plaza',
    commercialDesc: 'State-of-the-art commercial complex',
    
    // Contact Page
    contactTitle: 'Contact Us',
    contactDesc: 'Get in touch with us for your construction needs',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    sendMessage: 'Send Message',
    address: 'Address',
    
    // Footer
    footerDesc: 'Building excellence, one project at a time.',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
  },
  np: {
    // Navigation
    home: 'गृहपृष्ठ',
    about: 'हाम्रो बारेमा',
    services: 'सेवाहरू',
    projects: 'परियोजनाहरू',
    contact: 'सम्पर्क',
    
    // Hero Section
    heroTitle: 'सटीकता र गुणस्तरसँग सपनाहरू निर्माण गर्दै',
    heroSubtitle: 'निर्माण उत्कृष्टतामा तपाईंको भरपर्दो साझेदार',
    getQuote: 'कोटेशन प्राप्त गर्नुहोस्',
    
    // Home Page
    whyChooseUs: 'हामीलाई किन छन्नुहोस्',
    experienceTitle: 'वर्षको अनुभव',
    experienceDesc: 'गुणस्तरीय निर्माण परियोजनाहरू प्रदान गर्दै',
    qualityTitle: 'प्रिमियम गुणस्तर',
    qualityDesc: 'केवल उत्कृष्ट सामग्री र प्रविधिको प्रयोग',
    teamTitle: 'विशेषज्ञ टोली',
    teamDesc: 'उत्कृष्टतामा समर्पित दक्ष पेशेवरहरू',
    servicesTitle: 'हाम्रा सेवाहरू',
    featuredProjects: 'विशेष परियोजनाहरू',
    testimonials: 'हाम्रा ग्राहकहरूको भनाइ',
    
    // About Page
    aboutTitle: 'प्रेस्टिज कन्स्ट्रक्सनको बारेमा',
    aboutDesc: 'निर्माण उद्योगमा दुई दशक भन्दा बढी अनुभवका साथ, प्रेस्टिज कन्स्ट्रक्सन एण्ड बिल्डर्सले गुणस्तरीय निर्माण सेवाहरूमा अग्रणी नामको रूपमा स्थापना गरेको छ।',
    missionTitle: 'हाम्रो मिशन',
    missionDesc: 'गुणस्तर, सुरक्षा र व्यावसायिकताको उच्चतम मापदण्ड कायम राख्दै ग्राहकको अपेक्षा भन्दा बढी उत्कृष्ट निर्माण सेवाहरू प्रदान गर्नु।',
    visionTitle: 'हाम्रो दृष्टिकोण',
    visionDesc: 'नवाचार, विश्वसनीयता र समयको परीक्षामा टिक्ने दिगो संरचनाहरू सिर्जना गर्नका लागि परिचित सबैभन्दा भरपर्दो निर्माण कम्पनी बन्नु।',
    
    // Services Page
    servicesPageTitle: 'हाम्रा सेवाहरू',
    architecture: 'वास्तुकला',
    architectureDesc: 'रचनात्मक र कार्यात्मक वास्तुकला डिजाइन',
    construction: 'निर्माण',
    constructionDesc: 'जगदेखि फिनिसिङसम्म पूर्ण निर्माण समाधान',
    renovation: 'नवीकरण',
    renovationDesc: 'आधुनिक अपग्रेडका साथ अवस्थित स्थानहरूको रूपान्तरण',
    planning: 'योजना',
    planningDesc: 'व्यापक परियोजना योजना र व्यवस्थापन',
    
    // Projects Page
    projectsTitle: 'हाम्रा परियोजनाहरू',
    projectsDesc: 'हाम्रा सम्पन्न निर्माण परियोजनाहरूको पोर्टफोलियो हेर्नुहोस्',
    residentialTitle: 'आवासीय कम्प्लेक्स',
    residentialDesc: 'प्रिमियम सुविधाहरू सहितको आधुनिक आवासीय भवन',
    commercialTitle: 'व्यापारिक प्लाजा',
    commercialDesc: 'अत्याधुनिक व्यापारिक कम्प्लेक्स',
    
    // Contact Page
    contactTitle: 'सम्पर्क गर्नुहोस्',
    contactDesc: 'तपाईंको निर्माण आवश्यकताहरूको लागि हामीसँग सम्पर्क गर्नुहोस्',
    name: 'नाम',
    email: 'इमेल',
    phone: 'फोन',
    message: 'सन्देश',
    sendMessage: 'सन्देश पठाउनुहोस्',
    address: 'ठेगाना',
    
    // Footer
    footerDesc: 'एक पटकमा एक परियोजना, उत्कृष्टता निर्माण गर्दै।',
    quickLinks: 'द्रुत लिङ्कहरू',
    followUs: 'हामीलाई फलो गर्नुहोस्',
    allRightsReserved: 'सबै अधिकारहरू सुरक्षित।',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
