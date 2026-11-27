# Thay đổi do Claude thực hiện (27/11/2026)

Bản gốc để so sánh: thư mục `Downloads/ngotanphat-live` (code lấy từ web đang chạy).

1. Khung video: TVC quay dọc (Traveloka) có nền mờ thay cho hai dải đen. (style.css, script.js)
2. Logo TH true FOOD, vivo, Traveloka: bấm vào là mở đúng TVC trong phần Sản phẩm tiêu biểu. (script.js, style.css)
3. Trình phát mẫu giọng mới: nút phát lớn, sóng âm bấm để tua, thời gian. (script.js, style.css)
4. Nghe trên web bằng MP3 nhẹ (~1,3–1,6 MB) thay vì WAV (~8–9,5 MB); nút tải vẫn là WAV gốc. (projects.js, en/index.html, vi/index.html, assets/audio/*/*.mp3)
5. Sửa lỗi không tua được audio: máy chủ hiện không hỗ trợ tải từng đoạn, nên khi khách bấm, trình phát tải trọn MP3 rồi mới tua. (script.js)
