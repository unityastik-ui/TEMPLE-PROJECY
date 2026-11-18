import { TempleConfig } from '../types/temple';

/**
 * Reusable Temple Configuration Registry
 * --------------------------------------
 * To support additional temples (e.g. Siddhivinayak Temple, Kashi Vishwanath Temple,
 * Tirupati Balaji), add a new TempleConfig object to TEMPLES without changing UI code.
 */
export const SHIRDI_TEMPLE_CONFIG: TempleConfig = {
  id: 'shirdi-sai-baba',
  guideTitle: {
    en: 'SHIRDI SAI GUIDE',
    hi: 'शिरडी साईं गाइड',
  },
  guideSubtitle: {
    en: 'Your simple guide to important temple places.',
    hi: 'प्रमुख मंदिर स्थलों के लिए आपकी सरल मार्गदर्शिका।',
  },
  templeName: {
    en: 'Shirdi Sai Baba Temple',
    hi: 'शिरडी साईं बाबा मंदिर',
  },
  cityRegion: {
    en: 'Shirdi, Maharashtra, India',
    hi: 'शिरडी, महाराष्ट्र, भारत',
  },
  centerCoordinates: {
    latitude: 19.7668,
    longitude: 74.4773,
  },
  locations: [
    {
      id: 'samadhi-mandir',
      name: {
        en: 'Samadhi Mandir',
        hi: 'समाधि मंदिर',
      },
      category: {
        en: 'Main Sanctum',
        hi: 'मुख्य मंदिर',
      },
      latitude: 19.7665,
      longitude: 74.4767,
      image: '/src/assets/images/shirdi_samadhi_mandir_1795007685993.jpg',
      shortDescription: {
        en: 'The sacred resting place of Sai Baba and the main destination for devotees visiting Shirdi.',
        hi: 'साईं बाबा का पवित्र समाधि स्थल और शिरडी आने वाले श्रद्धालुओं का मुख्य दर्शन केंद्र।',
      },
      explanation: {
        en: 'Samadhi Mandir is the heart of Shirdi, housing the sacred marble tomb and lifelike statue of Shri Sai Baba. Devotees gather here in peaceful queues for darshan, daily aartis, and quiet prayer. Built in 1918, this serene marble hall welcomes millions of pilgrims seeking peace, comfort, and Sai Baba’s timeless blessings.',
        hi: 'समाधि मंदिर शिरडी का मुख्य केंद्र है, जहाँ श्री साईं बाबा की पवित्र संगमरमर समाधि और जीवंत मूर्ति स्थापित है। श्रद्धालु यहाँ शांत कतारों में दर्शन, दैनिक आरती और प्रार्थना के लिए आते हैं। 1918 में निर्मित यह शांत संगमरमर कक्ष लाखों भक्तों को शांति और बाबा का आशीर्वाद प्रदान करता है।',
      },
      historicalSignificance: {
        en: 'Sai Baba attained Mahasamadhi here in October 1918. Originally built by devotee Gopalrao Buti, this shrine became Baba’s final resting place and remains the spiritual center of Shirdi.',
        hi: 'अक्टूबर 1918 में साईं बाबा ने यहीं महासमाधि ली थी। भक्त गोपालराव बूटी द्वारा बनवाया गया यह मंदिर बाबा का विश्राम स्थल बना और आज भी शिरडी का आध्यात्मिक केंद्र है।',
      },
      isInsidePremises: true,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=19.7665,74.4767&travelmode=walking',
      recommendedPriority: 1,
      mapPosition: { x: 58, y: 44 },
    },
    {
      id: 'dwarkamai',
      name: {
        en: 'Dwarkamai',
        hi: 'द्वारकामाई',
      },
      category: {
        en: 'Sacred Residence',
        hi: 'पवित्र निवास',
      },
      latitude: 19.7662,
      longitude: 74.4763,
      image: '/src/assets/images/shirdi_dwarkamai_1795007685133.jpg',
      shortDescription: {
        en: 'The historic shrine where Sai Baba lived for sixty years and tended the sacred eternal fire.',
        hi: 'वह ऐतिहासिक स्थान जहाँ साईं बाबा लगभग साठ वर्षों तक रहे और पवित्र धुनी प्रज्वलित रखी।',
      },
      explanation: {
        en: 'Dwarkamai is the humble old structure where Sai Baba spent nearly sixty years welcoming people of every faith. Inside, the sacred Dhuni fire that Baba lit still burns continuously today. Visitors come here to receive sacred Udi ash, offer quiet prayers, and feel the warmth of Baba’s everyday life in Shirdi.',
        hi: 'द्वारकामाई वह सरल स्थान है जहाँ साईं बाबा ने लगभग साठ वर्षों तक सभी धर्मों के लोगों का स्वागत किया। बाबा द्वारा प्रज्वलित पवित्र धुनी आज भी यहाँ निरंतर जलती रहती है। भक्त यहाँ पवित्र उदी प्राप्त करने, प्रार्थना करने और बाबा के सरल जीवन का अनुभव करने आते हैं।',
      },
      historicalSignificance: {
        en: 'Baba called this place Dwarkamai and taught equality, kindness, and faith here. The continuously burning Dhuni provides sacred Udi ash, cherished by devotees for protection and healing.',
        hi: 'बाबा ने इस स्थान को द्वारकामाई नाम दिया और यहीं समानता, करुणा व श्रद्धा का संदेश दिया। यहाँ की निरंतर जलती धुनी से प्राप्त उदी को भक्त आरोग्य और रक्षा का प्रतीक मानते हैं।',
      },
      isInsidePremises: true,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=19.7662,74.4763&travelmode=walking',
      recommendedPriority: 2,
      mapPosition: { x: 25, y: 46 },
    },
    {
      id: 'gurusthan',
      name: {
        en: 'Gurusthan',
        hi: 'गुरुस्थान',
      },
      category: {
        en: 'Sacred Meditation Spot',
        hi: 'पवित्र ध्यान स्थल',
      },
      latitude: 19.7670,
      longitude: 74.4770,
      image: '/src/assets/images/shirdi_gurusthan_1795007686370.jpg',
      shortDescription: {
        en: 'The sacred neem tree courtyard where young Sai Baba was first seen meditating in Shirdi.',
        hi: 'नीम के वृक्ष के नीचे स्थित वह पवित्र स्थान जहाँ युवा साईं बाबा पहली बार ध्यान करते दिखे थे।',
      },
      explanation: {
        en: 'Gurusthan marks the peaceful spot beneath a historic neem tree where sixteen-year-old Sai Baba first appeared to Shirdi villagers in deep meditation. A serene marble shrine and silver portrait of Baba sit beneath its shade today. Devotees light incense here and sit quietly to remember Baba’s earliest days.',
        hi: 'गुरुस्थान उस प्राचीन नीम वृक्ष के नीचे स्थित शांत स्थल है जहाँ सोलह वर्षीय साईं बाबा पहली बार शिरडी वासियों को गहन ध्यान में दिखाई दिए थे। आज इसकी छाया में बाबा का सुंदर मंदिर और चाँदी का चित्र स्थापित है। श्रद्धालु यहाँ अगरबत्ती जलाकर शांत मन से ध्यान करते हैं।',
      },
      historicalSignificance: {
        en: 'Sai Baba described this spot as the resting place of his own Guru. Devotees believe burning incense here brings inner calm, clarity, and relief from everyday worries.',
        hi: 'साईं बाबा ने इस स्थान को अपने गुरु का पावन स्थल बताया था। भक्तों की मान्यता है कि यहाँ धूप-अगरबत्ती जलाने से मन को शांति और चिंताओं से राहत मिलती है।',
      },
      isInsidePremises: true,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=19.7670,74.4770&travelmode=walking',
      recommendedPriority: 3,
      mapPosition: { x: 48, y: 22 },
    },
    {
      id: 'chavadi',
      name: {
        en: 'Chavadi',
        hi: 'चावड़ी',
      },
      category: {
        en: 'Heritage Shrine',
        hi: 'ऐतिहासिक स्थल',
      },
      latitude: 19.7654,
      longitude: 74.4758,
      image: '/src/assets/images/shirdi_chavadi_1795007686331.jpg',
      shortDescription: {
        en: 'The heritage stone hall where Sai Baba walked in procession and rested on alternate nights.',
        hi: 'वह ऐतिहासिक भवन जहाँ साईं बाबा शोभायात्रा के साथ आकर एक दिन छोड़कर विश्राम करते थे।',
      },
      explanation: {
        en: 'Chavadi is a quiet historic veranda just steps away from Dwarkamai. During his later years, Sai Baba walked here in a joyful evening procession with devotees and rested here on every alternate night. Today, the preserved wooden plank and Baba’s belongings offer a touching glimpse into his simple life.',
        hi: 'चावड़ी द्वारकामाई से कुछ ही कदम की दूरी पर स्थित एक शांत ऐतिहासिक भवन है। अपने अंतिम वर्षों में साईं बाबा शाम को भक्तों की शोभायात्रा के साथ यहाँ आते और एक दिन छोड़कर रात्रि विश्राम करते थे। आज भी यहाँ बाबा के पावन वस्त्र और वस्तुएँ सुरक्षित हैं।',
      },
      historicalSignificance: {
        en: 'Every Thursday evening, a ceremonial palkhi procession still travels from Dwarkamai to Chavadi in memory of Baba’s walks, keeping a century-old devotional tradition alive for visitors.',
        hi: 'बाबा की इस पावन परंपरा की स्मृति में आज भी हर गुरुवार शाम द्वारकामाई से चावड़ी तक भव्य पालकी यात्रा निकाली जाती है।',
      },
      isInsidePremises: true,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=19.7654,74.4758&travelmode=walking',
      recommendedPriority: 4,
      mapPosition: { x: 22, y: 66 },
    },
    {
      id: 'lendi-garden',
      name: {
        en: 'Lendi Garden',
        hi: 'लेंडी बाग',
      },
      category: {
        en: 'Sacred Garden',
        hi: 'पवित्र उद्यान',
      },
      latitude: 19.7681,
        longitude: 74.4779,
      image: '/src/assets/images/shirdi_lendi_garden_1795007686817.jpg',
      shortDescription: {
        en: 'A tranquil green garden planted and watered daily by Sai Baba with an eternal stone lamp.',
        hi: 'साईं बाबा द्वारा स्वयं लगाया और सींचा गया शांत हरा-भरा बगीचा और अखंड नंदा दीप।',
      },
      explanation: {
        en: 'Lendi Baug is a peaceful, shaded garden located just beside the main temple grounds. Sai Baba visited here every morning and afternoon to water the trees and tend flowering plants with his own hands. Inside stands the Nanda Deep, an eternal stone lamp that burns calmly beneath large banyan and neem trees.',
        hi: 'लेंडी बाग मुख्य मंदिर परिसर के ठीक बगल में स्थित एक शांत और छायादार उद्यान है। साईं बाबा प्रतिदिन सुबह और दोपहर यहाँ आकर अपने हाथों से पेड़-पौधों को पानी देते थे। यहाँ घने वृक्षों के नीचे पवित्र अखंड नंदा दीप आज भी शांत भाव से प्रज्वलित है।',
      },
      historicalSignificance: {
        en: 'Baba personally cared for this garden and lit the Nanda Deep lamp here, making it a quiet sanctuary for unhurried walking, rest, and gentle reflection away from crowds.',
        hi: 'बाबा ने स्वयं इस उद्यान की देखभाल की और यहाँ नंदा दीप जलाया। भीड़ से दूर शांत टहलने और आत्मिक चिंतन के लिए यह एक अत्यंत सुखद स्थान है।',
      },
      isInsidePremises: false,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=19.7681,74.4779&travelmode=walking',
      recommendedPriority: 5,
      mapPosition: { x: 80, y: 31 },
    },
    {
      id: 'khandoba-temple',
      name: {
        en: 'Khandoba Temple',
        hi: 'खंडोबा मंदिर',
      },
      category: {
        en: 'Historic Temple',
        hi: 'ऐतिहासिक मंदिर',
      },
      latitude: 19.7615,
      longitude: 74.4762,
      image: '/src/assets/images/shirdi_khandoba_temple_1795007686731.jpg',
      shortDescription: {
        en: 'The historic roadside shrine where priest Mhalsapati first greeted Baba with the name Sai.',
        hi: 'मुख्य मार्ग पर स्थित प्राचीन मंदिर जहाँ पुजारी म्हालसापति ने पहली बार बाबा को "साईं" कहकर पुकारा था।',
      },
      explanation: {
        en: 'Khandoba Temple stands along the main road a short walk south of the Samadhi Mandir complex. When young Sai Baba first arrived in Shirdi with a marriage party, priest Mhalsapati welcomed him at these steps with the words "Ya Sai" ("Welcome, Sai"). The temple remains peaceful and uncrowded for visitors.',
        hi: 'खंडोबा मंदिर समाधि मंदिर परिसर से दक्षिण की ओर मुख्य मार्ग पर थोड़ी ही दूरी पर स्थित है। जब युवा साईं बाबा बारात के साथ पहली बार शिरडी आए, तब पुजारी म्हालसापति ने इन्हीं सीढ़ियों पर "या साईं" कहकर उनका स्वागत किया था। यह मंदिर अत्यंत शांत और दर्शनीय है।',
      },
      historicalSignificance: {
        en: 'This sacred temple is where the beloved name "Sai" was first spoken to Baba. Visiting here connects devotees with the very beginning of Sai Baba’s story in Shirdi.',
        hi: 'यहीं पहली बार बाबा को प्रिय नाम "साईं" मिला था। इस मंदिर के दर्शन करने से भक्त शिरडी में साईं बाबा के आगमन के प्रारंभिक इतिहास से जुड़ते हैं।',
      },
      isInsidePremises: false,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=19.7615,74.4762&travelmode=walking',
      recommendedPriority: 6,
      mapPosition: { x: 52, y: 88 },
    },
  ],
};

export const TEMPLES: Record<string, TempleConfig> = {
  [SHIRDI_TEMPLE_CONFIG.id]: SHIRDI_TEMPLE_CONFIG,
};

export const DEFAULT_TEMPLE_ID = SHIRDI_TEMPLE_CONFIG.id;
