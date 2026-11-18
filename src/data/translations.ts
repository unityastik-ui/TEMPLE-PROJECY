import { Language } from '../types/temple';

export interface UiTranslations {
  languageToggleLabel: string;
  currentLocation: {
    heading: string;
    idlePrompt: string;
    requesting: string;
    deniedTitle: string;
    deniedDetail: string;
    unavailableTitle: string;
    unavailableDetail: string;
    detectBtn: string;
    detectingBtn: string;
    refreshBtn: string;
    retryBtn: string;
    viewMapBtn: string;
  };
  recommended: {
    heading: string;
    nearestTag: string;
    suggestedTag: string;
    noGpsNotice: string;
    getDirections: string;
    readSignificance: string;
  };
  placesList: {
    heading: string;
    sortedSubtext: string;
    defaultSubtext: string;
    searchLabel: string;
    searchPlaceholder: string;
    clearSearch: string;
    noResultsTitle: (query: string) => string;
    noResultsHint: string;
    showAllBtn: string;
    insidePremisesHeading: string;
    nearbyHeading: string;
    insidePremisesLabel: string;
    nearbyLabel: string;
  };
  detailsSheet: {
    headerLabel: string;
    closeAria: string;
    whyImportantHeading: string;
    getDirections: string;
    closeBtn: string;
  };
  mapModal: {
    title: string;
    subtitle: string;
    closeAria: string;
    disclaimerPrefix: string;
    disclaimerHighlight: string;
    disclaimerSuffix: string;
    premisesSvgLabel: string;
    mainRoadSvgLabel: string;
    compassNorth: string;
    getDirections: string;
    viewDetailsBtn: string;
  };
  howToUse: {
    kicker: string;
    heading: string;
    intro: string;
    steps: {
      title: string;
      description: string;
    }[];
    reassuringTip: string;
  };
  offline: {
    title: string;
    description: string;
  };
  install: {
    buttonLabel: string;
    iosButtonLabel: string;
    iosModalTitle: string;
    iosStep1: string;
    iosStep2: string;
    closeLabel: string;
  };
  demoLocation: {
    demoTag: string;
    liveGpsTag: string;
    sampleDistancePrefix: string;
    selectorLabel: string;
    helperNote: string;
  };
  offlineDirections: {
    kicker: string;
    message: string;
    sampleDistancePrefix: string;
    viewMapBtn: string;
    closeBtn: string;
  };
  footer: {
    appTitle: string;
    developedBy: string;
  };
}

export const UI_TRANSLATIONS: Record<Language, UiTranslations> = {
  en: {
    languageToggleLabel: 'Select language',
    currentLocation: {
      heading: 'YOUR CURRENT LOCATION',
      idlePrompt:
        'Allow location access so we can find where you are and show the nearest sacred place.',
      requesting: 'Checking your GPS position, please wait...',
      deniedTitle: 'Location permission was not granted',
      deniedDetail:
        'Please allow location access in your browser settings so we can measure distance and highlight the nearest shrine.',
      unavailableTitle: 'GPS location unavailable',
      unavailableDetail:
        'We could not read your device location right now. You can still browse all sacred places and open walking directions.',
      detectBtn: 'DETECT MY LOCATION',
      detectingBtn: 'DETECTING LOCATION...',
      refreshBtn: 'REFRESH MY LOCATION',
      retryBtn: 'TRY DETECTING AGAIN',
      viewMapBtn: 'VIEW TEMPLE MAP',
    },
    recommended: {
      heading: 'RECOMMENDED PLACE TO VISIT',
      nearestTag: 'Nearest important sacred place',
      suggestedTag: 'Suggested important sacred place',
      noGpsNotice:
        'This suggestion is not based on your current distance because GPS location is not active.',
      getDirections: 'GET DIRECTIONS',
      readSignificance: 'Read Significance',
    },
    placesList: {
      heading: 'IMPORTANT PLACES TO VISIT',
      sortedSubtext: 'Sorted from nearest to farthest · Tap any place for details',
      defaultSubtext:
        'Tap any sacred place to understand its story and get walking directions',
      searchLabel: 'Search temple places',
      searchPlaceholder: 'Search places (e.g. Dwarkamai)',
      clearSearch: 'Clear search',
      noResultsTitle: (query: string) => `No temple places matched "${query}"`,
      noResultsHint:
        'Try searching for Samadhi Mandir, Dwarkamai, Chavadi, Gurusthan, Lendi Garden, or Khandoba Temple.',
      showAllBtn: 'Show All Places',
      insidePremisesHeading: 'Inside Temple Premises',
      nearbyHeading: 'Nearby Sacred Places',
      insidePremisesLabel: 'Inside Temple Premises',
      nearbyLabel: 'Nearby Sacred Place',
    },
    detailsSheet: {
      headerLabel: 'PLACE DETAILS',
      closeAria: 'Close place details',
      whyImportantHeading: 'WHY THIS PLACE IS IMPORTANT',
      getDirections: 'GET DIRECTIONS',
      closeBtn: 'Close',
    },
    mapModal: {
      title: 'Shirdi Temple Guide Map',
      subtitle: 'Illustrative layout of sacred places — tap any marker to explore',
      closeAria: 'Close temple map',
      disclaimerPrefix:
        'This is an illustrative schematic guide of the Shirdi temple grounds, not a live GPS map. Use',
      disclaimerHighlight: 'Get Directions',
      disclaimerSuffix: 'below for turn-by-turn walking navigation.',
      premisesSvgLabel: 'TEMPLE PREMISES',
      mainRoadSvgLabel: 'SHIRDI MAIN ROAD (TOWARD KHANDOBA TEMPLE)',
      compassNorth: 'N ↑',
      getDirections: 'GET DIRECTIONS',
      viewDetailsBtn: 'View Place Details',
    },
    howToUse: {
      kicker: 'HOW TO USE',
      heading: 'Simple Guide to Using Temple QR Codes',
      intro:
        'This guide is built to help you walk comfortably around the temple — no sign-in or app installation needed.',
      steps: [
        {
          title: '01. Scan Any Temple QR Code',
          description:
            'Open your phone camera and scan any Shirdi Sai Guide QR code placed at temple entrances or near shrines to start immediately.',
        },
        {
          title: '02. Check Nearest Place & Route',
          description:
            'See which sacred place is closest to you, tap any shrine to read why it matters, and tap Get Directions for walking help.',
        },
        {
          title: '03. Re-Scan Anytime to Update',
          description:
            'If you walk to another area and want a fresh reading, simply scan any QR code in the temple again to update your location automatically.',
        },
      ],
      reassuringTip:
        'Helpful tip: You do not need to close the page before scanning again—just point your camera at any nearby temple QR board whenever you want to refresh where you are.',
    },
    offline: {
      title: 'Offline Mode —',
      description:
        'Temple places, descriptions, and the guide map remain available without internet.',
    },
    install: {
      buttonLabel: 'Save Guide Offline',
      iosButtonLabel: 'Save to Home Screen',
      iosModalTitle: 'Save on iPhone / iPad',
      iosStep1: 'Tap the Share icon in your Safari toolbar.',
      iosStep2: 'Scroll down and tap "Add to Home Screen".',
      closeLabel: 'Close',
    },
    demoLocation: {
      demoTag: 'Demo Location (Presentation Mode)',
      liveGpsTag: 'Live GPS Location',
      sampleDistancePrefix: 'Sample distance:',
      selectorLabel: 'Sample presentation point:',
      helperNote:
        'Showing sample distances for offline demonstration — tap Detect My Location to try live GPS.',
    },
    offlineDirections: {
      kicker: 'OFFLINE NAVIGATION',
      message:
        'Live navigation requires an internet connection. This demo displays sample temple locations.',
      sampleDistancePrefix: 'Sample distance:',
      viewMapBtn: 'View on Temple Map',
      closeBtn: 'Close',
    },
    footer: {
      appTitle: 'Smart Temple Explorer · A Simple Guide to Sacred Places',
      developedBy: 'Developed by RGBA Infotech Solutions',
    },
  },
  hi: {
    languageToggleLabel: 'भाषा चुनें',
    currentLocation: {
      heading: 'आपका वर्तमान स्थान',
      idlePrompt:
        'अपना स्थान जानने और सबसे नजदीकी पवित्र स्थल देखने के लिए लोकेशन की अनुमति दें।',
      requesting: 'आपकी जीपीएस लोकेशन जाँची जा रही है, कृपया प्रतीक्षा करें...',
      deniedTitle: 'लोकेशन की अनुमति नहीं मिली है',
      deniedDetail:
        'कृपया दूरी मापने और सबसे नजदीकी मंदिर स्थल देखने के लिए अपने ब्राउज़र में लोकेशन की अनुमति दें।',
      unavailableTitle: 'जीपीएस लोकेशन उपलब्ध नहीं है',
      unavailableDetail:
        'अभी आपके फ़ोन की लोकेशन नहीं मिल सकी। आप फिर भी सभी पवित्र स्थलों की जानकारी देख सकते हैं और रास्ता प्राप्त कर सकते हैं।',
      detectBtn: 'मेरा स्थान पता करें',
      detectingBtn: 'स्थान खोजा जा रहा है...',
      refreshBtn: 'स्थान फिर से जाँचें',
      retryBtn: 'फिर से प्रयास करें',
      viewMapBtn: 'मंदिर मानचित्र देखें',
    },
    recommended: {
      heading: 'दर्शन के लिए प्रमुख सुझाव',
      nearestTag: 'आपके सबसे नजदीक पवित्र स्थल',
      suggestedTag: 'दर्शन के लिए प्रमुख पवित्र स्थल',
      noGpsNotice:
        'यह सुझाव आपकी वर्तमान दूरी पर आधारित नहीं है क्योंकि जीपीएस लोकेशन सक्रिय नहीं है।',
      getDirections: 'रास्ता देखें',
      readSignificance: 'महत्व पढ़ें',
    },
    placesList: {
      heading: 'दर्शन करने योग्य प्रमुख स्थान',
      sortedSubtext: 'नजदीक से दूर के क्रम में · विवरण के लिए किसी भी स्थान पर टैप करें',
      defaultSubtext:
        'किसी भी पवित्र स्थल का महत्व जानने और पैदल रास्ता देखने के लिए उस पर टैप करें',
      searchLabel: 'मंदिर के स्थान खोजें',
      searchPlaceholder: 'स्थान खोजें (जैसे द्वारकामाई)',
      clearSearch: 'खोज साफ़ करें',
      noResultsTitle: (query: string) => `"${query}" से मिलता कोई स्थान नहीं मिला`,
      noResultsHint:
        'समाधि मंदिर, द्वारकामाई, चावड़ी, गुरुस्थान, लेंडी बाग या खंडोबा मंदिर खोजने का प्रयास करें।',
      showAllBtn: 'सभी स्थान दिखाएँ',
      insidePremisesHeading: 'मंदिर परिसर के भीतर',
      nearbyHeading: 'आस-पास के पवित्र स्थल',
      insidePremisesLabel: 'मंदिर परिसर के भीतर',
      nearbyLabel: 'नजदीकी पवित्र स्थल',
    },
    detailsSheet: {
      headerLabel: 'स्थान का विवरण',
      closeAria: 'स्थान का विवरण बंद करें',
      whyImportantHeading: 'यह स्थान क्यों महत्वपूर्ण है',
      getDirections: 'रास्ता देखें',
      closeBtn: 'बंद करें',
    },
    mapModal: {
      title: 'शिरडी मंदिर मार्गदर्शक मानचित्र',
      subtitle: 'पवित्र स्थलों का सांकेतिक मानचित्र — देखने के लिए किसी भी चिह्न पर टैप करें',
      closeAria: 'मंदिर मानचित्र बंद करें',
      disclaimerPrefix:
        'यह शिरडी मंदिर परिसर का एक सांकेतिक मानचित्र है, लाइव जीपीएस मैप नहीं। पैदल मार्ग के लिए नीचे',
      disclaimerHighlight: 'रास्ता देखें',
      disclaimerSuffix: 'बटन का उपयोग करें।',
      premisesSvgLabel: 'मंदिर परिसर',
      mainRoadSvgLabel: 'शिरडी मुख्य मार्ग (खंडोबा मंदिर की ओर)',
      compassNorth: 'उत्तर ↑',
      getDirections: 'रास्ता देखें',
      viewDetailsBtn: 'विस्तार से जानें',
    },
    howToUse: {
      kicker: 'उपयोग विधि',
      heading: 'मंदिर क्यूआर (QR) कोड का उपयोग कैसे करें',
      intro:
        'यह मार्गदर्शिका आपको मंदिर परिसर में आसानी से रास्ता दिखाने के लिए बनाई गई है — इसमें किसी लॉगिन या ऐप डाउनलोड की आवश्यकता नहीं है।',
      steps: [
        {
          title: '01. मंदिर का कोई भी क्यूआर कोड स्कैन करें',
          description:
            'अपने फ़ोन के कैमरे से मंदिर के प्रवेश द्वार या किसी भी स्थल के पास लगे क्यूआर कोड को स्कैन करें और तुरंत जानकारी खोलें।',
        },
        {
          title: '02. नजदीकी स्थान और रास्ता देखें',
          description:
            'अपने सबसे पास स्थित पवित्र स्थल को देखें, उसका महत्व पढ़ने के लिए टैप करें और पैदल मार्ग के लिए "रास्ता देखें" दबाएँ।',
        },
        {
          title: '03. स्थान अपडेट करने के लिए फिर से स्कैन करें',
          description:
            'यदि आप मंदिर में आगे बढ़ते हैं और अपना नया स्थान जानना चाहते हैं, तो पास लगे किसी भी क्यूआर कोड को दोबारा स्कैन करें — आपकी लोकेशन अपने-आप अपडेट हो जाएगी।',
        },
      ],
      reassuringTip:
        'सुझाव: दोबारा स्कैन करने से पहले कुछ भी बंद करने की ज़रूरत नहीं है — जब भी आप जानना चाहें कि आप कहाँ हैं, पास लगे किसी भी मंदिर क्यूआर बोर्ड को स्कैन कर लें।',
    },
    offline: {
      title: 'ऑफ़लाइन मोड —',
      description:
        'बिना इंटरनेट के भी मंदिर के सभी स्थान, विवरण और मानचित्र उपलब्ध हैं।',
    },
    install: {
      buttonLabel: 'ऑफ़लाइन उपयोग के लिए सहेजें',
      iosButtonLabel: 'होम स्क्रीन पर सहेजें',
      iosModalTitle: 'iPhone / iPad पर सहेजें',
      iosStep1: 'Safari टूलबार में नीचे "Share" आइकन पर टैप करें।',
      iosStep2: 'नीचे स्क्रॉल करें और "Add to Home Screen" चुनें।',
      closeLabel: 'बंद करें',
    },
    demoLocation: {
      demoTag: 'डेमो स्थान (प्रस्तुति मोड)',
      liveGpsTag: 'लाइव जीपीएस स्थान',
      sampleDistancePrefix: 'नमूना दूरी:',
      selectorLabel: 'डेमो स्थान चुनें:',
      helperNote:
        'ऑफ़लाइन प्रस्तुति के लिए नमूना दूरी दिखाई जा रही है — लाइव जीपीएस के लिए "मेरा स्थान पता करें" दबाएँ।',
    },
    offlineDirections: {
      kicker: 'ऑफ़लाइन नेविगेशन',
      message:
        'लाइव नेविगेशन के लिए इंटरनेट कनेक्शन आवश्यक है। यह डेमो मंदिर के नमूना स्थान और दूरी दिखाता है।',
      sampleDistancePrefix: 'नमूना दूरी:',
      viewMapBtn: 'मंदिर मानचित्र पर देखें',
      closeBtn: 'बंद करें',
    },
    footer: {
      appTitle: 'स्मार्ट टेम्पल एक्सप्लोरर · पवित्र स्थलों की सरल मार्गदर्शिका',
      developedBy: 'RGBA Infotech Solutions द्वारा निर्मित',
    },
  },
};
