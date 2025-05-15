import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'english' | 'hindi' | 'tamil' | 'kannada' | 'bengali' | 'telugu';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  english: {
    // Common
    'app.name': 'Rural Reach',
    'home': 'Home',
    'agriculture': 'Agriculture',
    'healthcare': 'Healthcare',
    'education': 'Education',
    'transport': 'Transport',
    'finance': 'Finance',
    'contact': 'Contact',
    'listen': 'Listen to this page',
    'voice.navigation': 'Voice Navigation',
    
    // Hero
    'hero.title': 'Essential Services for Rural Communities',
    'hero.description': 'GraminSeva provides accessible information and resources to support rural communities in India across agriculture, healthcare, education, transport, and finance.',
    
    // Agriculture
    'agriculture.title': '🚜 Agriculture',
    'agriculture.description': 'Access essential agricultural information to improve your farming practices, get better crop yields, and earn more from your produce.',
    
    // Healthcare
    'healthcare.title': '🏥 Healthcare',
    'healthcare.description': 'Access essential healthcare information, find medical facilities, and learn about government health programs to keep your family healthy.',
    
    // Education
    'education.title': '🎓 Education',
    'education.description': 'Access quality educational content and resources to support learning for all ages, from young children to adults.',
    
    // Transport
    'transport.title': '🚗 Transport',
    'transport.description': 'Find essential transportation information to help you navigate your area, access services, and travel safely.',
    
    // Finance
    'finance.title': '💰 Finance',
    'finance.description': 'Access financial information and services to help you manage money, access banking facilities, and make informed financial decisions.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.description': 'Have questions or need assistance? We\'re here to help. Fill out the form below, call our helpline, or visit a local assistance center.',
    'contact.name': 'Name',
    'contact.mobile': 'Mobile Number',
    'contact.category': 'Category',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.assistance': 'Assistance Options',
    'contact.helpline': 'Toll-Free Helpline',
    'contact.regional': 'Regional Offices'
  },
  hindi: {
    // Common
    'app.name': 'रुरल रीच',
    'home': 'होम',
    'agriculture': 'कृषि',
    'healthcare': 'स्वास्थ्य देखभाल',
    'education': 'शिक्षा',
    'transport': 'परिवहन',
    'finance': 'वित्त',
    'contact': 'संपर्क करें',
    'listen': 'इस पेज को सुनें',
    'voice.navigation': 'आवाज नेविगेशन',
    
    // Hero
    'hero.title': 'ग्रामीण समुदायों के लिए आवश्यक सेवाएं',
    'hero.description': 'ग्रामीणसेवा भारत के ग्रामीण समुदायों को कृषि, स्वास्थ्य सेवा, शिक्षा, परिवहन और वित्त में सहायता के लिए सुलभ जानकारी और संसाधन प्रदान करता है।',
    
    // Agriculture
    'agriculture.title': '🚜 कृषि',
    'agriculture.description': 'अपनी खेती की प्रथाओं को बेहतर बनाने, बेहतर फसल उपज प्राप्त करने और अपनी उपज से अधिक कमाई करने के लिए आवश्यक कृषि जानकारी तक पहुंचें।',
    
    // Healthcare
    'healthcare.title': '🏥 स्वास्थ्य देखभाल',
    'healthcare.description': 'आवश्यक स्वास्थ्य देखभाल जानकारी तक पहुंचें, चिकित्सा सुविधाओं का पता लगाएं, और अपने परिवार को स्वस्थ रखने के लिए सरकारी स्वास्थ्य कार्यक्रमों के बारे में जानें।',
    
    // Education
    'education.title': '🎓 शिक्षा',
    'education.description': 'सभी उम्र के लोगों के लिए सीखने का समर्थन करने के लिए गुणवत्तापूर्ण शैक्षिक सामग्री और संसाधनों तक पहुंचें, छोटे बच्चों से लेकर वयस्कों तक।',
    
    // Transport
    'transport.title': '🚗 परिवहन',
    'transport.description': 'अपने क्षेत्र में नेविगेट करने, सेवाओं तक पहुंचने और सुरक्षित यात्रा करने में मदद के लिए आवश्यक परिवहन जानकारी प्राप्त करें।',
    
    // Finance
    'finance.title': '💰 वित्त',
    'finance.description': 'धन प्रबंधन, बैंकिंग सुविधाओं तक पहुंच, और सूचित वित्तीय निर्णय लेने में मदद के लिए वित्तीय जानकारी और सेवाओं तक पहुंचें।',
    
    // Contact
    'contact.title': 'संपर्क करें',
    'contact.description': 'प्रश्न हैं या सहायता की आवश्यकता है? हम मदद के लिए यहां हैं। नीचे दिए गए फॉर्म को भरें, हमारी हेल्पलाइन पर कॉल करें, या स्थानीय सहायता केंद्र पर जाएं।',
    'contact.name': 'नाम',
    'contact.mobile': 'मोबाइल नंबर',
    'contact.category': 'श्रेणी',
    'contact.message': 'संदेश',
    'contact.send': 'संदेश भेजें',
    'contact.assistance': 'सहायता विकल्प',
    'contact.helpline': 'टोल-फ्री हेल्पलाइन',
    'contact.regional': 'क्षेत्रीय कार्यालय'
  },
  tamil: {
    // Common
    'app.name': 'கிராமினசேவா',
    'home': 'முகப்பு',
    'agriculture': 'விவசாயம்',
    'healthcare': 'சுகாதாரம்',
    'education': 'கல்வி',
    'transport': 'போக்குவரத்து',
    'finance': 'நிதி',
    'contact': 'தொடர்பு',
    'listen': 'இந்த பக்கத்தை கேளுங்கள்',
    'voice.navigation': 'குரல் வழிசெலுத்தல்',
    
    // Rest of translations
    'hero.title': 'கிராமப்புற சமூகங்களுக்கான அத்தியாவசிய சேவைகள்',
    'hero.description': 'கிராமினசேவா விவசாயம், சுகாதாரம், கல்வி, போக்குவரத்து மற்றும் நிதி ஆகியவற்றில் இந்தியாவின் கிராமப்புற சமூகங்களுக்கு ஆதரவளிக்க அணுகக்கூடிய தகவல்களையும் வளங்களையும் வழங்குகிறது.',
    'agriculture.title': '🚜 விவசாயம்',
    'agriculture.description': 'உங்கள் விவசாய முறைகளை மேம்படுத்தவும், சிறந்த விளைச்சலைப் பெறவும், உங்கள் விளைபொருளுக்கு அதிகமாக வருவாய் ஈட்டவும் அத்தியாவசிய வேளாண் தகவல்களை அணுகவும்.',
    'healthcare.title': '🏥 சுகாதாரம்',
    'healthcare.description': 'அத்தியாவசிய சுகாதார தகவல்களை அணுகுங்கள், மருத்துவ வசதிகளைக் கண்டறியுங்கள், உங்கள் குடும்பத்தை ஆரோக்கியமாக வைத்திருக்க அரசாங்க சுகாதாரத் திட்டங்களைப் பற்றி அறியுங்கள்.',
    'education.title': '🎓 கல்வி',
    'education.description': 'சிறுகுழந்தைகள் முதல் பெரியவர்கள் வரை அனைத்து வயதினருக்கும் கற்றலுக்கு ஆதரவளிக்க தரமான கல்வி உள்ளடக்கம் மற்றும் வளங்களை அணுகவும்.',
    'transport.title': '🚗 போக்குவரத்து',
    'transport.description': 'உங்கள் பகுதியில் வழிசெலுத்த, சேவைகளை அணுக மற்றும் பாதுகாப்பாக பயணிக்க உதவும் அத்தியாவசிய போக்குவரத்து தகவல்களைக் கண்டறியுங்கள்.',
    'finance.title': '💰 நிதி',
    'finance.description': 'பணத்தை நிர்வகிக்க, வங்கி வசதிகளை அணுக, மற்றும் தகவலறிந்த நிதி முடிவுகளை எடுக்க உதவும் நிதி தகவல்கள் மற்றும் சேவைகளை அணுகவும்.',
    'contact.title': 'தொடர்பு கொள்ளுங்கள்',
    'contact.description': 'கேள்விகள் உள்ளதா அல்லது உதவி தேவையா? நாங்கள் உதவ இங்கே இருக்கிறோம். கீழே உள்ள படிவத்தை நிரப்பவும், எங்கள் உதவி எண்ணை அழைக்கவும் அல்லது உள்ளூர் உதவி மையத்திற்குச் செல்லவும்.',
    'contact.name': 'பெயர்',
    'contact.mobile': 'மொபைல் எண்',
    'contact.category': 'வகை',
    'contact.message': 'செய்தி',
    'contact.send': 'செய்தி அனுப்பு',
    'contact.assistance': 'உதவி விருப்பங்கள்',
    'contact.helpline': 'கட்டணமில்லா உதவி எண்',
    'contact.regional': 'பிராந்திய அலுவலகங்கள்'
  },
  kannada: {
    // Common
    'app.name': 'ರೂರಲ್ ರೀಚ್',
    'home': 'ಮುಖಪುಟ',
    'agriculture': 'ಕೃಷಿ',
    'healthcare': 'ಆರೋಗ್ಯ ರಕ್ಷಣೆ',
    'education': 'ಶಿಕ್ಷಣ',
    'transport': 'ಸಾರಿಗೆ',
    'finance': 'ಹಣಕಾಸು',
    'contact': 'ಸಂಪರ್ಕಿಸಿ',
    'listen': 'ಈ ಪುಟವನ್ನು ಆಲಿಸಿ',
    'voice.navigation': 'ಧ್ವನಿ ನ್ಯಾವಿಗೇಶನ್',
    
    // Rest of translations
    'hero.title': 'ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಿಗೆ ಅಗತ್ಯ ಸೇವೆಗಳು',
    'hero.description': 'ಗ್ರಾಮೀಣಸೇವಾ ಭಾರತದ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಿಗೆ ಕೃಷಿ, ಆರೋಗ್ಯ ರಕ್ಷಣೆ, ಶಿಕ್ಷಣ, ಸಾರಿಗೆ ಮತ್ತು ಹಣಕಾಸು ಮೂಲಕ ಬೆಂಬಲಿಸಲು ಸುಲಭವಾಗಿ ಲಭ್ಯವಿರುವ ಮಾಹಿತಿ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    'agriculture.title': '🚜 ಕೃಷಿ',
    'agriculture.description': 'ನಿಮ್ಮ ಕೃಷಿ ಅಭ್ಯಾಸಗಳನ್ನು ಸುಧಾರಿಸಲು, ಉತ್ತಮ ಬೆಳೆ ಇಳುವರಿ ಪಡೆಯಲು ಮತ್ತು ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳಿಂದ ಹೆಚ್ಚು ಗಳಿಸಲು ಅಗತ್ಯವಾದ ಕೃಷಿ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.',
    'healthcare.title': '🏥 ಆರೋಗ್ಯ ರಕ್ಷಣೆ',
    'healthcare.description': 'ಅಗತ್ಯವಾದ ಆರೋಗ್ಯ ರಕ್ಷಣೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ, ವೈದ್ಯಕೀಯ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ಆರೋಗ್ಯಕರವಾಗಿ ಇರಿಸಲು ಸರ್ಕಾರಿ ಆರೋಗ್ಯ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಿ.',
    'education.title': '🎓 ಶಿಕ್ಷಣ',
    'education.description': 'ಚಿಕ್ಕ ಮಕ್ಕಳಿಂದ ವಯಸ್ಕರವರೆಗೆ ಎಲ್ಲಾ ವಯಸ್ಸಿನವರ ಕಲಿಕೆಗೆ ಬೆಂಬಲ ನೀಡಲು ಗುಣಮಟ್ಟದ ಶೈಕ್ಷಣಿಕ ವಿಷಯ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'transport.title': '🚗 ಸಾರಿಗೆ',
    'transport.description': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು, ಸೇವೆಗಳನ್ನು ಪಡೆಯಲು ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಯಾಣಿಸಲು ಸಹಾಯ ಮಾಡುವ ಅಗತ್ಯವಾದ ಸಾರಿಗೆ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಿ.',
    'finance.title': '💰 ಹಣಕಾಸು',
    'finance.description': 'ಹಣವನ್ನು ನಿರ್ವಹಿಸಲು, ಬ್ಯಾಂಕಿಂಗ್ ಸೌಲಭ್ಯಗಳನ್ನು ಪಡೆಯಲು ಮತ್ತು ಮಾಹಿತಿಯುಕ್ತ ಹಣಕಾಸು ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವ ಹಣಕಾಸು ಮಾಹಿತಿ ಮತ್ತು ಸೇವೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'contact.title': 'ಸಂಪರ್ಕಿಸಿ',
    'contact.description': 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ ಅಥವಾ ಸಹಾಯ ಬೇಕೇ? ನಾವು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ. ಕೆಳಗಿನ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ, ನಮ್ಮ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಸ್ಥಳೀಯ ಸಹಾಯ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.',
    'contact.name': 'ಹೆಸರು',
    'contact.mobile': 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    'contact.category': 'ವರ್ಗ',
    'contact.message': 'ಸಂದೇಶ',
    'contact.send': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'contact.assistance': 'ಸಹಾಯ ಆಯ್ಕೆಗಳು',
    'contact.helpline': 'ಉಚಿತ ಸಹಾಯವಾಣಿ',
    'contact.regional': 'ಪ್ರಾದೇಶಿಕ ಕಚೇರಿಗಳು'
  },
  bengali: {
    // Common
    'app.name': 'গ্রামীণসেবা',
    'home': 'হোম',
    'agriculture': 'কৃষি',
    'healthcare': 'স্বাস্থ্যসেবা',
    'education': 'শিক্ষা',
    'transport': 'পরিবহন',
    'finance': 'অর্থ',
    'contact': 'যোগাযোগ',
    'listen': 'এই পৃষ্ঠা শুনুন',
    'voice.navigation': 'ভয়েস নেভিগেশন',
    
    // Rest of translations
    'hero.title': 'গ্রামীণ সম্প্রদায়ের জন্য অপরিহার্য পরিষেবা',
    'hero.description': 'গ্রামীণসেবা ভারতের গ্রামীণ সম্প্রদায়গুলিকে কৃষি, স্বাস্থ্যসেবা, শিক্ষা, পরিবহন এবং অর্থের জন্য সহজলভ্য তথ্য ও সম্পদ প্রদান করে।',
    'agriculture.title': '🚜 কৃষি',
    'agriculture.description': 'আপনার কৃষি অভ্যাস উন্নত করতে, ভাল ফসলের ফলন পেতে এবং আপনার উৎপাদন থেকে আরও বেশি আয় করতে অপরিহার্য কৃষি তথ্য অ্যাক্সেস করুন।',
    'healthcare.title': '🏥 স্বাস্থ্যসেবা',
    'healthcare.description': 'অপরিহার্য স্বাস্থ্যসেবা তথ্য অ্যাক্সেস করুন, চিকিৎসা সুবিধাগুলি খুঁজুন এবং আপনার পরিবারকে সুস্থ রাখতে সরকারি স্বাস্থ্য প্রোগ্রামগুলি সম্পর্কে জানুন।',
    'education.title': '🎓 শিক্ষা',
    'education.description': 'ছোট শিশু থেকে প্রাপ্তবয়স্কদের পর্যন্ত সমস্ত বয়সের শিক্ষার জন্য সমর্থন করতে মানসম্পন্ন শিক্ষামূলক বিষয়বস্তু এবং সম্পদ অ্যাক্সেস করুন।',
    'transport.title': '🚗 পরিবহন',
    'transport.description': 'আপনার এলাকায় নেভিগেট করতে, পরিষেবাগুলি অ্যাক্সেস করতে এবং নিরাপদে ভ্রমণ করতে সাহায্য করার জন্য অপরিহার্য পরিবহন তথ্য খুঁজুন।',
    'finance.title': '💰 অর্থ',
    'finance.description': 'অর্থ পরিচালনা করতে, ব্যাঙ্কিং সুবিধাগুলি অ্যাক্সেস করতে এবং সূচিত আর্থিক সিদ্ধান্ত নিতে সাহায্য করার জন্য আর্থিক তথ্য এবং পরিষেবাগুলি অ্যাক্সেস করুন।',
    'contact.title': 'যোগাযোগ করুন',
    'contact.description': 'প্রশ্ন আছে বা সাহায্য প্রয়োজন? আমরা সাহায্য করতে এখানে আছি। নীচের ফর্মটি পূরণ করুন, আমাদের হেল্পলাইনে কল করুন, বা স্থানীয় সহায়তা কেন্দ্রে যান।',
    'contact.name': 'নাম',
    'contact.mobile': 'মোবাইল নম্বর',
    'contact.category': 'বিভাগ',
    'contact.message': 'বার্তা',
    'contact.send': 'বার্তা পাঠান',
    'contact.assistance': 'সহায়তা বিকল্প',
    'contact.helpline': 'টোল-ফ্রি হেল্পলাইন',
    'contact.regional': 'আঞ্চলিক অফিস'
  },
  telugu: {
    // Common
    'app.name': 'గ్రామీణసేవ',
    'home': 'హోమ్',
    'agriculture': 'వ్యవసాయం',
    'healthcare': 'ఆరోగ్య సంరక్షణ',
    'education': 'విద్య',
    'transport': 'రవాణా',
    'finance': 'ఆర్థిక',
    'contact': 'సంప్రదించండి',
    'listen': 'ఈ పేజీని వినండి',
    'voice.navigation': 'వాయిస్ నావిగేషన్',
    
    // Rest of translations
    'hero.title': 'గ్రామీణ సమాజాలకు అవసరమైన సేవలు',
    'hero.description': 'గ్రామీణసేవ భారతదేశంలోని గ్రామీణ సమాజాలకు వ్యవసాయం, ఆరోగ్య సంరక్షణ, విద్య, రవాణా మరియు ఆర్థిక రంగాల్లో సహాయం చేయడానికి సులభంగా అందుబాటులో ఉన్న సమాచారం మరియు వనరులను అందిస్తుంది.',
    'agriculture.title': '🚜 వ్యవసాయం',
    'agriculture.description': 'మీ వ్యవసాయ పద్ధతులను మెరుగుపరచడానికి, మంచి పంట దిగుబడి పొందడానికి మరియు మీ ఉత్పత్తి నుండి ఎక్కువ సంపాదించడానికి అవసరమైన వ్యవసాయ సమాచారాన్ని పొందండి.',
    'healthcare.title': '🏥 ఆరోగ్య సంరక్షణ',
    'healthcare.description': 'అవసరమైన ఆరోగ్య సంరక్షణ సమాచారాన్ని పొందండి, వైద్య సౌకర్యాలను కనుగొనండి మరియు మీ కుటుంబాన్ని ఆరోగ్యంగా ఉంచడానికి ప్రభుత్వ ఆరోగ్య కార్యక్రమాల గురించి తెలుసుకోండి.',
    'education.title': '🎓 విద్య',
    'education.description': 'చిన్న పిల్లల నుండి పెద్దల వరకు అన్ని వయసుల వారి అభ్యాసానికి మద్దతు ఇవ్వడానికి నాణ్యమైన విద్యా సామగ్రి మరియు వనరులను పొందండి.',
    'transport.title': '🚗 రవాణా',
    'transport.description': 'మీ ప్రాంతంలో నావిగేట్ చేయడానికి, సేవలను పొందడానికి మరియు సురక్షితంగా ప్రయాణించడానికి సహాయపడే అవసరమైన రవాణా సమాచారాన్ని కనుగొనండి.',
    'finance.title': '💰 ఆర్థిక',
    'finance.description': 'డబ్బును నిర్వహించడానికి, బ్యాంకింగ్ సౌకర్యాలను పొందడానికి మరియు తెలిసిన ఆర్థిక నిర్ణయాలు తీసుకోవడంలో సహాయపడే ఆర్థిక సమాచారం మరియు సేవలను పొందండి.',
    'contact.title': 'సంప్రదించండి',
    'contact.description': 'ప్రశ్నలు ఉన్నాయా లేదా సహాయం కావాలా? మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము. దిగువన ఉన్న ఫారమ్‌ని పూరించండి, మా హెల్ప్‌లైన్‌కి కాల్ చేయండి లేదా స్థానిక సహాయ కేంద్రాన్ని సందర్శించండి.',
    'contact.name': 'పేరు',
    'contact.mobile': 'మొబైల్ నంబర్',
    'contact.category': 'వర్గం',
    'contact.message': 'సందేశం',
    'contact.send': 'సందేశం పంపండి',
    'contact.assistance': 'సహాయ ఎంపికలు',
    'contact.helpline': 'టోల్-ఫ్రీ హెల్ప్‌లైన్',
    'contact.regional': 'ప్రాంతీయ కార్యాలయాలు'
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  translate: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage if available, otherwise use English
  const [language, setInternalLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('rural-reach-language');
    return (savedLanguage as Language) || 'english';
  });

  // Wrapper function that updates localStorage and state
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('rural-reach-language', newLanguage);
    setInternalLanguage(newLanguage);
    // No page reload required, as context update will trigger re-renders
  };

  const translate = (key: string): string => {
    // If the key doesn't exist in the current language, fall back to English
    return (translations[language] && translations[language][key]) || 
           translations.english[key] || 
           key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);