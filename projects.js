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
      "description": "Mẫu giọng đọc tiếng Việt cho The Coffee House.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Quảng cáo truyền hình"
    },
    "en": {
      "category": "Commercial",
      "description": "Vietnamese voice sample for The Coffee House.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "TVC / Commercial"
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
      "description": "Mẫu giọng đọc tiếng Việt cho Bamboo Airways.",
      "role": "Diễn viên giọng nói",
      "language": "Tiếng Việt",
      "format": "Quảng cáo truyền hình"
    },
    "en": {
      "category": "Commercial",
      "description": "Vietnamese voice sample for Bamboo Airways.",
      "role": "Voice talent",
      "language": "Vietnamese",
      "format": "TVC / Commercial"
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
