# PHÁT — Website Anh–Việt

## Mở trong VS Code

Giải nén, mở thư mục `phat-voice-bilingual` bằng VS Code và chạy `index.html` ở thư mục gốc bằng Live Server. Lần đầu trang mở bằng tiếng Anh; các lần sau ưu tiên ngôn ngữ đã chọn. Không cần npm hoặc bước build.

Đây là bộ file mới đầy đủ. Nên mở riêng để review trước khi thay website cũ. Nếu đã điền email trong bản cũ, chép giá trị đó vào `site-config.js` ở thư mục gốc của bản này.

## Nút EN | VI

- Hiện trên thanh menu của cả sáu trang, kể cả điện thoại.
- Chuyển đúng trang tương ứng và giữ mục đang xem.
- Giữ sản phẩm video đang chọn khi đổi ngôn ngữ.
- Nhớ lựa chọn trên trình duyệt khi mở lại trang gốc.
- Link trực tiếp `/en/…` hoặc `/vi/…` luôn dùng ngôn ngữ của link, không bị chuyển bởi lựa chọn đã lưu.
- Nếu trình duyệt chặn lưu dữ liệu, các link ngôn ngữ vẫn hoạt động; trang gốc dùng tiếng Anh.
- Các link điều hướng trong trang tiếp tục dùng cùng ngôn ngữ.

## Cấu trúc

| Đường dẫn                                 | Nội dung                                         |
| ----------------------------------------- | ------------------------------------------------ |
| `index.html`                              | Chọn ngôn ngữ từ lần truy cập trước, mặc định EN |
| `en/index.html` / `vi/index.html`         | Trang thuê giọng                                 |
| `en/direction.html` / `vi/direction.html` | Trang đạo diễn                                   |
| `en/coaching.html` / `vi/coaching.html`   | Trang đào tạo                                    |
| `style.css`                               | Thiết kế chung                                   |
| `script.js`                               | Chức năng chung, thông báo theo ngôn ngữ         |
| `site-config.js`                          | Email liên hệ công khai                          |
| `projects.js`                             | Danh sách video, thông tin Anh–Việt              |
| `assets/`                                 | Media dùng chung                                 |

Các đường dẫn tương đối nên có thể đặt toàn bộ website trong thư mục con. Không đổi tên riêng lẻ các trang nếu chưa sửa các link tương ứng. Khi đưa lên nơi lưu website, tải toàn bộ cấu trúc này, gồm hai thư mục ngôn ngữ và các file chung. README không cần công khai.

## Thêm video

Chép MP4 vào `assets/video/`, rồi sao chép một mục trong mảng `window.PHAT_PROJECTS` ở `projects.js`. Mỗi mục có:

- `id`: mã không dấu, không trùng, ví dụ `du-an-moi`.
- `title`, `studio`: tên sản phẩm và đơn vị thu âm.
- `video`, `poster`: đường dẫn tính từ thư mục gốc. `poster` có thể để rỗng.
- `vi`: nhóm, mô tả, vai trò, ngôn ngữ và loại hình bằng tiếng Việt.
- `en`: các thông tin tương ứng bằng tiếng Anh.

Không cần sửa HTML khi thêm video. Hai ngôn ngữ dùng chung file media, thứ tự và số lượng sản phẩm. Mục đầu tiên trong HTML là Traveloka dự phòng khi tắt JavaScript. Khi thay sản phẩm đầu tiên, cập nhật phần HTML dự phòng trong cả hai trang chủ nếu muốn hỗ trợ đầy đủ khi JavaScript tắt.

Hiện chỉ có một video thật nên hai nút trái/phải mờ ở trạng thái 01 / 01. Thêm mục thứ hai sẽ tự bật điều hướng. Chuyển video sẽ dừng video cũ; video mới chờ khách bấm phát.

## Liên hệ đã cấu hình

Email: `tanphatngo@hotmail.com`. Điện thoại: `+84 362 947 507` (Zalo, gọi và SMS). Bốn nút liên hệ xuất hiện ở mỗi trang. Email và số điện thoại mở ứng dụng tương ứng trên thiết bị; Zalo dùng `https://zalo.me/84362947507`. Kiểm tra link Zalo bằng điện thoại thật trước khi đưa trang lên mạng, vì quyền tìm kiếm bằng số điện thoại của tài khoản có thể ảnh hưởng việc mở hồ sơ.

Form mở ứng dụng email với nội dung đã điền; khách vẫn cần bấm Gửi trong ứng dụng email. Nội dung dài được lưu ra file để đính kèm. Không có máy chủ gửi email tự động. Các nút email và điện thoại vẫn hoạt động khi JavaScript tắt.

## Dùng video và MP3 từ Google Drive

### Chuẩn bị quyền chia sẻ

1. Tải MP4 hoặc MP3 lên Google Drive.
2. Với từng file, chọn **Chia sẻ / Share** → **Quyền truy cập chung / General access** → **Bất kỳ ai có đường liên kết / Anyone with the link** → **Người xem / Viewer**.
3. Sao chép link của **file**, không phải link thư mục.
4. Mở link bằng cửa sổ ẩn danh để kiểm tra khách chưa đăng nhập có xem/nghe được hay không. Với video mới, chờ Drive xử lý xong trước khi dùng.

Link thường có dạng `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`. Website tự chuyển thành đường dẫn `/preview` để nhúng. Link `https://drive.google.com/open?id=FILE_ID` cũng được nhận. Nếu link có `resourcekey`, website giữ tham số đó.

### Thêm một sản phẩm Drive vào bộ điều hướng

Trong `projects.js`, thêm mục dưới đây vào mảng `window.PHAT_PROJECTS`, sau mục Traveloka và trước `];`. Thay `FILE_ID` hoặc toàn bộ `driveLink` bằng link thật. Ví dụ này nằm trong hướng dẫn, chưa được đưa vào danh sách sản phẩm đang chạy:

```js
{
  id: "du-an-moi",
  provider: "drive",
  kind: "video", // Dùng "audio" nếu là MP3.
  driveLink: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
  title: "Tên dự án",
  studio: "Tên đơn vị thu âm",
  vi: {
    category: "Quảng cáo",
    description: "Mô tả ngắn bằng tiếng Việt.",
    role: "Diễn viên giọng nói",
    language: "Tiếng Việt",
    format: "Quảng cáo truyền hình"
  },
  en: {
    category: "Commercial",
    description: "A short English description.",
    role: "Voice Talent",
    language: "Vietnamese",
    format: "TV commercial"
  }
},
```

Các mục trong mảng ngăn cách bằng dấu phẩy. Mỗi `id` cần duy nhất. Không cần tải video vào thư mục website khi dùng Drive. Hai ngôn ngữ dùng chung link và thứ tự.

### Đổi bản nghe thử đầu trang sang MP3 trên Drive

Ở cuối `projects.js`, thay `window.PHAT_DEMO` bằng:

```js
window.PHAT_DEMO = {
  provider: "drive",
  driveLink: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
};
```

Thay bằng link MP3 thật. Bản nghe thử sẽ dùng trình xem Drive, không còn thanh audio gốc hay nút tải MP3 của website. Muốn quay lại bản MP3 hiện có:

```js
window.PHAT_DEMO = {
  provider: "local",
  source: "assets/audio/commercial.mp3",
};
```

### Khi cập nhật sau này

- **Thêm sản phẩm mới:** tải file lên Drive, thiết lập quyền chia sẻ, thêm mục trong `projects.js`, rồi cập nhật file cấu hình lên nơi đang lưu website. Website không tự liệt kê file mới trong thư mục Drive.
- **Thay nội dung file hiện có, giữ cùng ID:** có thể dùng quản lý phiên bản của Drive nếu giao diện/tài khoản hỗ trợ. Link website không cần đổi khi ID giữ nguyên; chờ xử lý rồi kiểm tra lại.
- **Xóa file cũ và tải file mới:** thường tạo ID mới, cần sửa `driveLink` và cập nhật cấu hình website.
- **Sửa tên/mô tả/vai trò:** sửa hai phần `vi` và `en` trong cùng mục.

### Cách trình phát hoạt động và giới hạn

Nút **Phát trên trang** tải trình xem Drive. Khách có nút **Mở trên Google Drive** dự phòng. Khi chuyển sản phẩm hoặc bắt đầu phát media khác từ website, khung Drive được gỡ để dừng nội dung cũ.

Trình phát nằm trên miền Google nên website không đọc được trạng thái đang phát, tiến độ hay lỗi bên trong iframe. Chức năng phát thực tế phụ thuộc quyền chia sẻ, việc xử lý file, cookie và giới hạn lượt xem của Drive. MP3 cũng dùng giao diện xem trước của Drive, không phải trình phát tùy biến của website. Hãy kiểm tra bằng tài khoản không đăng nhập và bằng điện thoại.

Chưa có link Drive thật được cung cấp nên các file Traveloka và MP3 hiện có vẫn dùng bản local. Các kiểm tra nhúng dùng dữ liệu mô phỏng để xác nhận logic; chưa xác nhận playback của file Drive thuộc tài khoản Phát.

Tham khảo chính thức:

- [Chia sẻ file và quyền truy cập](https://support.google.com/drive/answer/2494822?hl=en)
- [Lưu và phát video, thời gian xử lý, cookie và giới hạn](https://support.google.com/drive/answer/2423694?hl=en)
- [Xem video và file audio trong Drive](https://support.google.com/drive/answer/2423485?hl=en)

## Nội dung đã cập nhật theo xác nhận của Phát

- Giọng nam trẻ đến trung niên; dày, trầm ấm, năng lượng, tin cậy, chuyên nghiệp. Thế mạnh vai nam chính cương trực/nghĩa hiệp và phản diện cần nhiều kỹ thuật.
- Quảng cáo truyền hình, narration, phim truyền hình/điện ảnh/chiếu rạp và game. Thu âm tại nhà hoặc studio khách chọn.
- Bàn giao bản thu TVC trong 48 giờ sau khi chốt nội dung và phạm vi công việc; dự án dài hoặc cần phối hợp studio thống nhất thời gian riêng; tối đa hai vòng sửa miễn phí. Sau hai vòng, tính theo tỷ lệ số chữ sửa; vượt 50% số chữ tính như job mới. Không tự đặt bảng giá phần trăm cụ thể.
- Nhận đạo diễn, casting, dịch–biên tập, thu âm và mix. Đạo diễn/casting trực tiếp phụ trách; các khâu còn lại xây đội ngũ theo dự án.
- Coaching online 1:1 hoặc nhóm 5–7; học trực tiếp liên hệ Đạt Phi Academy. Luyện giọng tập trung kết nối người nói–người nghe; lồng tiếng tập trung diễn xuất tâm lý và hóa thân.
- Đạo diễn Đạt Phi Media từ 06/2025; giảng viên giọng nói Đạt Phi Academy từ 09/2025.
- Vai Soo Hyun trong Genie, Make a Wish; Park Kyong Nam trong Boyfriend On Demand. Credit đạo diễn ba phim được ghi theo xác nhận mới nhất của Phát, gồm Can This Love Be Translated, Boyfriend On Demand, Our Sticky Love.

Link Dubbing Wiki được thêm để người xem mở hồ sơ. Trang Fandom chặn truy cập trực tiếp. Tiểu sử và các credit bổ sung đã được chọn lọc từ nội dung hồ sơ do Phát sao chép vào cuộc trò chuyện; chưa xác minh độc lập nội dung trang.

## Trước khi công khai

Kiểm tra email, gọi/SMS/Zalo trên thiết bị thật; duyệt lại cách ghi credit và chính sách chỉnh sửa. Chưa có học phí, lịch học cụ thể, testimonial hoặc tên miền thật. Khi chốt tên miền sẽ bổ sung canonical, sitemap và ảnh chia sẻ với URL tuyệt đối. Bản này chưa xuất bản lên mạng.

## Chọn lọc hồ sơ nghề nghiệp

Dùng các mốc học lồng tiếng năm 2006, làm nghề chuyên nghiệp năm 2013, giai đoạn Canada 2018–2024, trở lại Việt Nam cuối 2024 và các vai trò mới năm 2025. Không đồng nhất năm bắt đầu học với năm làm nghề chuyên nghiệp. Không đưa ngày sinh vào trang bán dịch vụ.

Sáu credit chính trên trang chủ: Jackson Storm (Cars 3), Hitpig (Hitpig!), Mojo Jojo (The Powerpuff Girls, bản POPS), Kevin Levin (Ben 10: Omniverse / Ultimate Alien), Soo Hyun (Genie, Make a Wish), Park Kyong Nam (Boyfriend On Demand). Các vai Mike, Johnny Bravo và Spyro nằm trong mục mở rộng. Mộc Thạnh và Đinh Lễ nằm trong nhóm tác phẩm Việt.

Hồ sơ WikiDub tiếng Việt do Phát cung cấp xác nhận tên Bình Ngô đại chiến; bản Anh ghi kèm The Pacification of the Wu. Chưa có clip mới nên các credit bổ sung là nội dung giới thiệu, không phải mục video có thể phát.

## Cập nhật từ WikiDub tiếng Việt

Các tên phim và vai chính dùng bản hồ sơ Phát cung cấp. Phi vụ nghìn cân / Quý Hợi tương ứng Hitpig! / Hitpig; Bình Ngô đại chiến tương ứng The Pacification of the Wu. Vai Ông Hòe trong Trạng Quỳnh nhí: Truyền thuyết Kim Ngưu được xếp vào tác phẩm gốc Việt Nam theo xác nhận trực tiếp của Phát.

Dùng các tên Việt cho phim có tên được cung cấp; ở bản Anh giữ các tên tiếng Anh đã có nguồn trong cuộc trò chuyện. Một số phim mới chỉ có tên Việt vẫn giữ tên đó, không tự đặt tên tiếng Anh. Đổi Park Kyong Nam thành Park Kyeong Nam theo hồ sơ mới; chưa thêm vai Yeong II vì cách viết tên chưa thống nhất với các nguồn trước. Không đưa dòng lỗi chữ Big Hero 6, credit không có vai, hay bản Bí kíp luyện rồng bị lặp vào danh sách mở rộng.

Nút lên đầu trang xuất hiện sau khi cuộn quá 80 px và ẩn ở vùng đầu trang. Có nhãn Việt/Anh, hỗ trợ bàn phím và chế độ giảm chuyển động. Hai cặp block đạo diễn/sản xuất và luyện giọng/lồng tiếng cùng nền sáng; hover bằng chuột hoặc focus bàn phím chuyển sang đỏ rượu vang hiện có. Trên thiết bị cảm ứng không hỗ trợ hover, nền không bị giữ màu sau thao tác chạm.

### Cập nhật nút và thời gian bàn giao

- Chỉ bỏ mũi tên trang trí ở các nút kêu gọi hành động; giữ mũi tên trên các link đường dẫn.
- Nút chuyển video giữ mũi tên trái / phải; nút lên đầu trang giữ biểu tượng mũi tên hướng lên.


## Media theo ngôn ngữ (bản cập nhật)
- Trang VI: 5 video trong assets/video/vi và audio metro-Phat_TV.wav.
- Trang EN: audio metro_.wav; chưa có video EN nên hiện thông báo.
- projects.js: thêm mục mới với languages: ["en"] và video trỏ tới assets/video/en/tên-file.mp4. Nội dung mô tả dùng trường en. Không tự động lấy video VI cho trang EN.
- PHAT_DEMO.vi và PHAT_DEMO.en chọn audio tương ứng.
- Video The Coffee House đã chuyển sang MP4 H.264/AAC để phát trên trình duyệt. File MOV gốc nằm trong bộ file mày đã cung cấp; bản web dùng MP4 đã tối ưu.


## Giao diện trực quan — 29/10/2026
- Audio đặt ngay đầu trang, chọn VI/EN theo projects.js.
- 8 logo nhãn hàng; 9 logo studio lớn trong dải chạy liên tục từ phải sang trái, có tên phía dưới; 12 poster vai diễn, hiện trước 6 vai.
- Bấm poster để xem hình lớn; Escape để đóng.
- Chỉ bộ sưu tập hình vai diễn và hành trình nghề nghiệp có mục bấm mở; dịch vụ, quy trình, chính sách, FAQ và form liên hệ hiện trực tiếp.
- Hình gốc giữ trong brands/roles/studios; file web nhẹ hơn nằm trong images/web.
- Trang EN hiển thị cùng danh sách sản phẩm với VI, với mô tả tiếng Anh và nhãn ngôn ngữ của video.

## Tinh chỉnh sau review
- Bỏ chú thích và danh sách credit lặp dưới hình vai diễn.
- Studio: rê chuột hoặc đặt focus vào dải logo để tạm dừng; nút Tạm dừng/Tiếp tục điều khiển chủ động.
- Nếu thiết bị bật giảm chuyển động, dải logo chuyển sang kéo ngang thủ công.


## Cập nhật 30/10/2026
- 12 poster có chú thích nhân vật - tên phim (năm phát hành bản phim/mùa phim).
- Các vai diễn khác: 13 credit tiêu biểu chưa có poster, không lặp với hình phía trên.
- Profile dùng khung chữ nhật bo nhẹ, chú thích nằm bên dưới.
- Quy trình có một đường kẻ mỗi bước. Dải studio hỗ trợ giữ chuột kéo trái/phải; chuột rời đi thì tự chạy lại, trừ khi chủ động tạm dừng.
- Sản phẩm tiêu biểu có mặt ở cả Anh–Việt. Video là bản tiếng Việt, mô tả theo ngôn ngữ web; audio đầu trang vẫn chọn đúng VI/EN.
- Video dùng HLS chia đoạn để tua tới vị trí bất kỳ mà không tải toàn bộ MP4. Chất lượng hình/âm thanh được giữ bằng stream copy. assets/stream cần được tải lên hosting cùng website.
- hls.js 1.7.4 được lưu sẵn ở assets/vendor, kèm giấy phép. Không phụ thuộc CDN ngoài. media-loader.js có phương án MP4 dự phòng.
- Khi thêm/thay video mới, cập nhật video và playlist trong projects.js. MP4 gốc vẫn được giữ để tải về/dự phòng.
- Năm trên poster theo bản phim gốc hoặc mùa phim cụ thể; Hitpig! ra mắt quốc tế năm 2024 (bản chiếu Việt Nam 2025). Nguồn: https://www.vivafilmco.com/news/tag/International%2Bfilm%2Bdistribution ; https://about.netflix.com/en/news/the-east-palace-premieres-july-17 ; https://www.netflix.com/tudum/articles/the-night-agent-season-3-now-streaming
