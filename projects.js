/* Shared portfolio videos. Audio remains language-specific. */
window.PHAT_PROJECTS = [
  {
    "id": "traveloka",
    "title": "Traveloka",
    "studio": "",
    "languages": [
      "vi",
      "en"
    ],
    "video": "assets/video/vi/traveloka5.5.mp4",
    "poster": "assets/images/traveloka-poster.jpg",
    "vi": {
      "category": "Quảng cáo",
      "description": "Mẫu giọng đọc tiếng Việt cho Traveloka.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Quảng cáo truyền hình"
    },
    "en": {
      "category": "Commercial",
      "description": "Vietnamese voice sample for Traveloka.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "TVC / Commercial"
    },
    "playlist": "assets/stream/traveloka/index.m3u8"
  },
  {
    "id": "th-true-food",
    "title": "TH true FOOD",
    "studio": "",
    "languages": [
      "vi",
      "en"
    ],
    "video": "assets/video/vi/TH true Food - tvc.mp4",
    "poster": "",
    "vi": {
      "category": "Quảng cáo",
      "description": "Mẫu giọng đọc tiếng Việt cho TH true FOOD.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Quảng cáo truyền hình"
    },
    "en": {
      "category": "Commercial",
      "description": "Vietnamese voice sample for TH true FOOD.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "TVC / Commercial"
    },
    "playlist": "assets/stream/th-true-food/index.m3u8"
  },
  {
    "id": "the-coffee-house",
    "title": "The Coffee House",
    "studio": "",
    "languages": [
      "vi",
      "en"
    ],
    "video": "assets/video/vi/the-coffee-house.mp4",
    "poster": "",
    "vi": {
      "category": "Quảng cáo",
      "description": "Demo tự thu (spec) theo phong cách quảng cáo The Coffee House, không phải job thực hiện cho nhãn hàng.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Demo tự thu (spec)"
    },
    "en": {
      "category": "Commercial",
      "description": "Self-produced spec demo in the style of a The Coffee House commercial, not a client job.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "Spec demo"
    },
    "playlist": "assets/stream/the-coffee-house/index.m3u8"
  },
  {
    "id": "bamboo-airways",
    "title": "Bamboo Airways",
    "studio": "",
    "languages": [
      "vi",
      "en"
    ],
    "video": "assets/video/vi/[DEMO]Bamboo-Airways_tvc.mp4",
    "poster": "",
    "vi": {
      "category": "Quảng cáo",
      "description": "Demo tự thu (spec) theo phong cách quảng cáo Bamboo Airways, không phải job thực hiện cho nhãn hàng.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Demo tự thu (spec)"
    },
    "en": {
      "category": "Commercial",
      "description": "Self-produced spec demo in the style of a Bamboo Airways commercial, not a client job.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "Spec demo"
    },
    "playlist": "assets/stream/bamboo-airways/index.m3u8"
  },
  {
    "id": "vivo-y39",
    "title": "vivo Y39 5G",
    "studio": "",
    "languages": [
      "vi",
      "en"
    ],
    "video": "assets/video/vi/vivo Y39 5G_tvc - NTP.mp4",
    "poster": "",
    "vi": {
      "category": "Quảng cáo",
      "description": "Mẫu giọng đọc tiếng Việt cho vivo Y39 5G.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Quảng cáo truyền hình"
    },
    "en": {
      "category": "Commercial",
      "description": "Vietnamese voice sample for vivo Y39 5G.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "TVC / Commercial"
    },
    "playlist": "assets/stream/vivo-y39/index.m3u8"
  }
];
window.PHAT_DEMO = {
  // source: bản MP3 nhẹ để nghe trên web; download: bản WAV gốc cho khách tải.
  // peaks: độ lớn âm thanh đo sẵn từ file gốc, dùng để vẽ sóng âm.
  vi: {provider: "local", source: "assets/audio/vi/metro-Phat_TV.mp3", type: "audio/mpeg", download: "assets/audio/vi/metro-Phat_TV.wav",
       peaks: [0.05, 1.0, 0.67, 0.83, 0.89, 0.4, 0.67, 0.87, 0.59, 0.82, 0.81, 0.61, 0.58, 0.71, 0.51, 0.77, 0.56, 0.54, 0.94, 0.75, 0.52, 0.39, 0.68, 0.57, 0.36, 0.75, 0.85, 0.78, 0.69, 0.56, 0.53, 0.43, 0.6, 0.65, 0.58, 0.87, 0.64, 0.56, 0.62, 0.81, 0.67, 0.04, 0.69, 0.62, 0.57, 0.73, 0.59, 0.7, 0.53, 0.93, 0.67, 0.46, 0.03, 0.65, 0.6, 0.67, 0.58, 0.33, 0.9, 0.71, 0.53, 0.89, 0.57, 0.66, 0.92, 0.42, 0.89, 0.78, 0.7, 0.74, 0.54, 0.1]},
  en: {provider: "local", source: "assets/audio/en/metro_.mp3", type: "audio/mpeg", download: "assets/audio/en/metro_.wav",
       peaks: [0.13, 0.76, 0.69, 0.68, 0.48, 0.59, 0.45, 0.35, 0.7, 0.63, 0.59, 0.55, 0.48, 0.61, 0.48, 0.64, 0.47, 0.47, 0.63, 0.43, 0.64, 0.57, 0.54, 0.6, 0.14, 0.75, 0.63, 0.55, 0.52, 0.61, 0.49, 0.73, 0.59, 0.64, 0.4, 0.65, 0.58, 0.45, 0.59, 0.51, 0.49, 0.83, 0.73, 0.3, 0.56, 0.56, 0.47, 0.81, 0.51, 0.58, 0.54, 0.53, 0.62, 0.59, 0.66, 0.65, 0.68, 0.66, 0.84, 0.53, 0.69, 1.0, 0.62, 0.5, 0.72, 0.79, 0.72, 0.76, 0.75, 0.6, 0.65, 0.09]}
};

// Thư viện demo theo thể loại. kind: aired = TVC đã phát sóng, demo = demo, spec = demo tự thu (không phải job thật).
window.PHAT_LIBRARY = [{"id": "tvc-vi", "vi": "Quảng cáo · Tiếng Việt", "en": "Commercial · Vietnamese", "items": [{"id": "traveloka", "src": "assets/audio/library/traveloka.mp3", "duration": 15.8, "kind": "aired", "title": "Traveloka", "vi": "TVC khuyến mãi 5.5", "en": "Promo TVC, 5.5 sale", "peaks": [0.0, 0.02, 0.09, 0.24, 0.28, 0.29, 0.49, 0.45, 0.72, 0.55, 0.59, 0.39, 0.19, 0.17, 1.0, 0.41, 0.45, 0.37, 0.79, 0.6, 0.45, 0.51, 0.2, 0.75, 0.67, 0.57, 0.36, 0.43, 0.49, 0.3, 0.41, 0.54, 0.34, 0.35, 0.32, 0.4, 0.33, 0.42, 0.48, 0.36, 0.34, 0.43, 0.17, 0.43, 0.32, 0.51, 0.35, 0.36, 0.43, 0.31, 0.44, 0.42, 0.17, 0.19, 0.38, 0.36, 0.15, 0.39, 0.33, 0.27, 0.38, 0.28, 0.26, 0.28, 0.14, 0.06, 0.05, 0.03, 0.01, 0.0, 0.0, 0.0]}, {"id": "vivo-y39", "src": "assets/audio/library/vivo-y39.mp3", "duration": 49.0, "kind": "aired", "title": "vivo Y39 5G", "vi": "TVC điện thoại, trẻ trung", "en": "Smartphone TVC, young and upbeat", "peaks": [0.59, 0.55, 0.45, 0.6, 0.45, 0.41, 0.46, 0.56, 0.73, 0.65, 0.19, 0.49, 0.29, 0.44, 0.66, 0.65, 0.54, 0.38, 0.4, 0.43, 0.43, 0.07, 0.11, 0.6, 0.52, 0.57, 0.8, 0.41, 0.41, 0.67, 0.58, 0.7, 0.64, 0.29, 0.28, 0.33, 0.16, 0.32, 0.98, 1.0, 0.61, 0.46, 0.53, 0.5, 0.27, 0.14, 0.53, 0.29, 0.32, 0.19, 0.3, 0.36, 0.21, 0.11, 0.26, 0.26, 0.32, 0.29, 0.36, 0.31, 0.23, 0.34, 0.26, 0.18, 0.51, 0.65, 0.06, 0.06, 0.06, 0.08, 0.04, 0.0]}, {"id": "th-true-food", "src": "assets/audio/library/th-true-food.mp3", "duration": 15.6, "kind": "aired", "title": "TH true FOOD", "vi": "TVC gia đình, ấm áp", "en": "Family TVC, warm", "peaks": [0.0, 0.18, 0.17, 0.39, 0.31, 0.27, 0.32, 0.5, 0.42, 0.33, 0.49, 0.42, 0.32, 0.47, 0.2, 0.41, 0.4, 0.23, 0.47, 0.63, 0.22, 0.35, 0.31, 0.37, 0.56, 0.44, 0.27, 0.45, 0.47, 0.46, 0.65, 0.36, 0.44, 0.54, 0.34, 1.0, 0.35, 0.17, 0.28, 0.37, 0.24, 0.36, 0.42, 0.26, 0.36, 0.28, 0.11, 0.62, 0.32, 0.4, 0.24, 0.4, 0.06, 0.3, 0.27, 0.2, 0.45, 0.59, 0.06, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, {"id": "metro-vi", "src": "assets/audio/vi/metro-Phat_TV.mp3", "duration": 54.1, "kind": "demo", "title": "Metro", "vi": "Giọng quảng cáo trầm ấm", "en": "Warm, grounded commercial read", "peaks": [0.05, 1.0, 0.67, 0.83, 0.89, 0.4, 0.67, 0.87, 0.59, 0.82, 0.81, 0.61, 0.58, 0.71, 0.51, 0.77, 0.56, 0.54, 0.94, 0.75, 0.52, 0.39, 0.68, 0.57, 0.36, 0.75, 0.85, 0.78, 0.69, 0.56, 0.53, 0.43, 0.6, 0.65, 0.58, 0.87, 0.64, 0.56, 0.62, 0.81, 0.67, 0.04, 0.69, 0.62, 0.57, 0.73, 0.59, 0.7, 0.53, 0.93, 0.67, 0.46, 0.03, 0.65, 0.6, 0.67, 0.58, 0.33, 0.9, 0.71, 0.53, 0.89, 0.57, 0.66, 0.92, 0.42, 0.89, 0.78, 0.7, 0.74, 0.54, 0.1]}, {"id": "bamboo-airways", "src": "assets/audio/library/bamboo-airways.mp3", "duration": 30.1, "kind": "spec", "title": "Bamboo Airways", "vi": "Hàng không, tin cậy", "en": "Airline, trustworthy", "peaks": [0.16, 0.17, 0.5, 0.91, 0.82, 0.47, 0.13, 1.0, 0.75, 0.63, 0.69, 0.1, 0.1, 0.12, 0.53, 0.86, 0.5, 0.73, 0.64, 0.51, 0.11, 0.11, 0.12, 0.69, 0.46, 0.62, 0.71, 0.34, 0.51, 0.13, 0.12, 0.33, 0.69, 0.27, 0.67, 0.44, 0.3, 0.27, 0.08, 0.05, 0.01, 0.72, 0.75, 0.73, 0.7, 0.45, 0.6, 0.16, 0.15, 0.14, 0.18, 0.16, 0.16, 0.76, 0.86, 0.79, 0.16, 0.68, 0.79, 0.45, 0.51, 0.33, 0.17, 0.18, 0.14, 0.08, 0.06, 0.05, 0.04, 0.04, 0.03, 0.02]}, {"id": "the-coffee-house", "src": "assets/audio/library/the-coffee-house.mp3", "duration": 138.7, "kind": "spec", "title": "The Coffee House", "vi": "Đồ uống, đời thường", "en": "Coffee brand, conversational", "peaks": [0.07, 0.16, 0.18, 0.29, 0.18, 0.2, 0.27, 0.17, 0.74, 0.66, 0.46, 0.09, 0.09, 0.52, 0.4, 0.6, 0.43, 0.18, 0.16, 0.49, 0.35, 0.5, 0.46, 0.24, 0.77, 0.69, 0.57, 0.34, 0.31, 0.44, 0.82, 0.71, 0.44, 0.27, 0.64, 0.45, 0.53, 0.21, 0.68, 0.72, 0.7, 0.71, 0.76, 0.36, 0.3, 0.34, 0.24, 0.35, 0.3, 0.27, 0.62, 0.96, 0.52, 0.58, 0.68, 0.63, 0.65, 0.34, 0.65, 0.8, 0.42, 0.78, 0.79, 1.0, 0.93, 0.88, 0.44, 0.14, 0.07, 0.08, 0.06, 0.02]}]}, {"id": "commercial-en", "vi": "Quảng cáo · Tiếng Anh", "en": "Commercial · English", "items": [{"id": "metro-en", "src": "assets/audio/en/metro_.mp3", "duration": 66.6, "kind": "demo", "title": "Metro", "vi": "Quảng cáo tiếng Anh", "en": "English commercial read", "peaks": [0.13, 0.76, 0.69, 0.68, 0.48, 0.59, 0.45, 0.35, 0.7, 0.63, 0.59, 0.55, 0.48, 0.61, 0.48, 0.64, 0.47, 0.47, 0.63, 0.43, 0.64, 0.57, 0.54, 0.6, 0.14, 0.75, 0.63, 0.55, 0.52, 0.61, 0.49, 0.73, 0.59, 0.64, 0.4, 0.65, 0.58, 0.45, 0.59, 0.51, 0.49, 0.83, 0.73, 0.3, 0.56, 0.56, 0.47, 0.81, 0.51, 0.58, 0.54, 0.53, 0.62, 0.59, 0.66, 0.65, 0.68, 0.66, 0.84, 0.53, 0.69, 1.0, 0.62, 0.5, 0.72, 0.79, 0.72, 0.76, 0.75, 0.6, 0.65, 0.09]}]}, {"id": "corporate-en", "vi": "Doanh nghiệp · Tiếng Anh", "en": "Corporate · English", "items": [{"id": "afic", "src": "assets/audio/library/afic-corporate-en.mp3", "duration": 54.9, "kind": "demo", "title": "AFIC", "vi": "Giới thiệu doanh nghiệp", "en": "Corporate narration", "peaks": [0.07, 0.75, 0.22, 0.7, 0.45, 0.54, 0.53, 0.49, 0.03, 0.64, 0.77, 0.78, 0.27, 0.54, 0.65, 0.55, 0.4, 0.27, 0.57, 0.08, 0.79, 0.56, 1.0, 0.66, 0.69, 0.65, 0.74, 0.42, 0.73, 0.57, 0.53, 0.41, 0.02, 0.89, 0.88, 0.55, 0.52, 0.73, 0.31, 0.7, 0.79, 0.51, 0.52, 0.03, 0.4, 0.67, 0.79, 0.67, 0.59, 0.68, 0.53, 0.58, 0.06, 0.77, 0.64, 0.79, 0.89, 0.69, 0.79, 0.63, 0.51, 0.96, 0.62, 0.58, 0.62, 0.21, 0.83, 0.68, 0.74, 0.87, 0.67, 0.08]}]}];
