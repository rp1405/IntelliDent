// translations.js
const translations = {
  English: {
    //Splash Page
    intelliDent: "IntelliDent",
    dentalCareXAI: "Dental Care X Artificial Intel",
    existingUser: "Existing User",
    newUser: "New User",
    english: "English",
    hindi: "Hindi",

    //Login Page
    loginHeading: "Login to your account",
    otpBasedLogin: "OTP Based Login",
    noAccount: "Don't have an account? Signup",
    error: "Error",
    noUserExists: "No user exists with the given phone number",
    enterMobileNumberPlaceholder: "Enter Mobile Number",

    //Signup Page
    createNewAccountHeading: "Create New Account",
    verifyMobileNumber: "Verify Your Mobile Number",
    receiveOTP: "You will receive a One Time Password (OTP) on this number",
    enterMobileNumber: "Enter Mobile Number",
    haveAccount: "Already have an account? ",
    login: "Login",
    getOTP: "Get OTP",
    userExists: "User already exists",

    //OTP screen
    enterOtp: "Enter OTP",
    enterCode: (mobileNumber) =>
      `Enter the code from the WHATSAPP message we sent to ${mobileNumber}`,
    resendOtp: "Resend OTP",
    verifyOtp: "Verify OTP",

    //Homepage
    selectMode: "Select mode for image upload",
    submit: "Submit",
    gallery: "Gallery",
    camera: "Camera",
    selectImage: "Please select an image",
    cameraPermission: "Please provide the required permissions",

    //Test Card
    testId: "Test Id",
    date: "Date",
    time: "Time",
    getDetails: "Get Details",
    logout: "Logout",

    //Drawer
    home: "Home",
    yourTests: "Your Tests",
    profile: "Profile",

    //Test Details
    treatments: "Treatments:",
    detected: "detected",
    safe: (disease) => `You are safe from ${disease}`,
    dentalStain: "Dental Stain",
    dentalCalculus: "Dental Calculus",
    dentalCavity: "Dental Cavity",
    spacesBetweenTeeth: "Spaces between teeth",

    positive: "Positive",
    negative: "Negative",

    //Result Splash
    goToResults: "Go to results->",
    resultsGenerated: "Results Generated!",
    whatsappMessage:
      "You will also receive the complete report on Whatsapp on your registered mobile number.",
    cropWarning:
      "For best results, please take images of the tooth part. \nYou can use the crop feature to focus on the tooth only.",
    information: "Information",
  },
  Hindi: {
    //Splash Page
    intelliDent: "इंटेलीडेंट",
    dentalCareXAI: "डेंटल केयर X आर्टिफिशियल इंटेल",
    existingUser: "मौजूदा उपयोगकर्ता",
    newUser: "नया उपयोगकर्ता",
    english: "अंग्रेजी",
    hindi: "हिंदी",

    //Login Page
    loginHeading: "अपने खाते में लॉगिन करें",
    otpBasedLogin: "ओटीपी आधारित लॉगिन",
    receiveOTP: "इस नंबर पर आपको एक समय पासवर्ड (ओटीपी) प्राप्त होगा",
    noAccount: "खाता नहीं है? साइनअप करें",
    getOTP: "ओटीपी प्राप्त करें",
    error: "त्रुटि",
    noUserExists: "दिए गए फ़ोन नंबर के साथ कोई उपयोगकर्ता मौजूद नहीं है",
    enterMobileNumberPlaceholder: "मोबाइल नंबर दर्ज करें",

    //Signup Page
    createNewAccountHeading: "नया खाता बनाएं",
    verifyMobileNumber: "अपना मोबाइल नंबर सत्यापित करें",
    enterMobileNumber: "मोबाइल नंबर दर्ज करें",
    haveAccount: "पहले से ही एक खाता है? ",
    login: "लॉगिन करें",
    userExists: "उपयोगकर्ता पहले से ही मौजूद है",

    //OTP Screen
    enterOtp: "ओटीपी दर्ज करें",
    enterCode: (mobileNumber) =>
      `WHATSAPP मैसेज हमने ${mobileNumber} पर भेजा है, उस से कोड दर्ज करें`,
    resendOtp: "ओटीपी पुनः भेजें",
    verifyOtp: "ओटीपी सत्यापित करें",
    //Homepage
    selectMode: "छवि अपलोड करने के लिए मोड चुनें",
    submit: "प्रस्तुत करें",
    gallery: "गैलरी",
    camera: "कैमरा",
    selectImage: "कृपया एक छवि का चयन करें",
    cameraPermission: "कृपया अनुमतिया प्रदान करें",

    //Test Card
    testId: "टेस्ट आईडी",
    date: "तारीख",
    time: "समय",
    getDetails: "विवरण प्राप्त करें",
    logout: "लॉगआउट",

    //Drawer
    home: "होम",
    yourTests: "आपकी टेस्ट्स",
    profile: "प्रोफ़ाइल",
    logout: "लॉगआउट",

    //Test Details
    detected: "पाया गया",
    safe: (disease) => `आप ${disease} से सुरक्षित हैं।`,
    treatments: "उपचार:",
    dentalStain: "दांतो में दाग़",
    dentalCalculus: "पथरीली जमावत",
    dentalCavity: "दांतो में कीड़ा",
    spacesBetweenTeeth: "दांतो में गैप",

    positive: "पाया गया",
    negative: "नहीं पाया गया",

    goToResults: "परिणामों पर जाएं ->",
    resultsGenerated: "परिणाम तैयार हैं",
    whatsappMessage:
      "आपके पंजीकृत मोबाइल नंबर पर आपको व्हाट्सएप पर पूरी रिपोर्ट भी मिलेगी।",
    cropWarning:
      "सर्वश्रेष्ठ परिणामों के लिए, कृपया दांत के हिस्से की तस्वीरें लें।\nआप केवल दांत पर ध्यान केंद्रित करने के लिए क्रॉप सुविधा का उपयोग कर सकते हैं।",
    information: "सूचना",
  },
};

export default translations;
