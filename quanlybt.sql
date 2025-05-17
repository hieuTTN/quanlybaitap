-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3307
-- Thời gian đã tạo: Th5 17, 2025 lúc 12:07 AM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlybt`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `asignment`
--

CREATE TABLE `asignment` (
  `id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `language` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `dua_time` time DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `asignment`
--

INSERT INTO `asignment` (`id`, `content`, `due_date`, `file`, `language`, `name`, `subject_id`, `created_date`, `dua_time`, `updated_date`) VALUES
(1, '<p>y&ecirc;u cầu thử</p>', '2025-04-28', '', 0, 'bài tập làm thử buổi 1', 1, '2025-04-26 16:47:11', '06:44:00', '2025-04-26 17:13:45'),
(2, '', '2025-04-29', '', 0, 'Bài tập lập trình buổi 1', 1, '2025-04-26 16:51:27', '20:00:00', NULL),
(3, '<p>hướng dẫn tr&igrave;nh b&agrave;y</p>\n<p>code file main, dao, entity</p>', '2025-05-04', 'http://res.cloudinary.com/dlkhzppmb/raw/upload/v1745983698/DanhSachHoiVien.xlsx', 1, 'Bài tập lập trình với enum', 1, '2025-04-26 17:05:42', '22:00:00', '2025-04-30 10:34:01'),
(4, '<p>tạo folder</p>', '2025-04-28', '', 0, 'bài tập mở đầu', 1, '2025-04-26 17:12:44', '06:44:00', NULL),
(5, '<p>y&ecirc;u cầu về string</p>', '2025-04-22', '', 0, 'bài tập với String', 1, '2025-04-26 17:15:13', '22:00:00', '2025-04-26 17:15:54'),
(6, '<p>nội dung hướng dẫn</p>\n<p><em><strong>tạo file bước 1</strong></em></p>', '2025-04-28', '', 1, 'Lập trình với biến căn bản', 3, '2025-04-26 21:12:00', '22:00:00', NULL),
(7, '<p>fewfwef</p>', '2025-04-28', 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745676419/dd5fosztykks0q4t9foe.webp', 0, 'Lập trình với enum', 3, '2025-04-26 21:12:38', '23:00:00', NULL),
(8, '<p>nội dung hd n&egrave;</p>', '2025-04-29', '', 0, 'Lập trình tìm sản phẩm', 3, '2025-04-26 21:13:29', '18:20:00', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `authority`
--

CREATE TABLE `authority` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `authority`
--

INSERT INTO `authority` (`name`) VALUES
('ROLE_ADMIN'),
('ROLE_STUDENT'),
('ROLE_TEACHER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blog`
--

CREATE TABLE `blog` (
  `id` bigint NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_date` date DEFAULT NULL,
  `created_time` time DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `num_view` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `blog`
--

INSERT INTO `blog` (`id`, `content`, `created_date`, `created_time`, `description`, `image`, `num_view`, `title`, `user_id`) VALUES
(1, '<h3 id=\"qmenu1\">I. C&aacute;ch tải Microsoft Teams tr&ecirc;n m&aacute;y t&iacute;nh</h3>\n<h4 id=\"subqmenu1\">1. Hướng dẫn nhanh</h4>\n<ul>\n<li>Truy cập trang&nbsp;<a title=\"Microsoft Teams\" href=\"https://www.microsoft.com/vi-vn/microsoft-365/microsoft-teams/group-chat-software\" target=\"_blank\" rel=\"nofollow noopener\"><strong>Microsoft Team</strong></a></li>\n<li>Chọn&nbsp;<strong>Tải xuống cho m&aacute;y t&iacute;nh</strong>.</li>\n<li>Chọn&nbsp;<strong>Tải xuống Teams</strong>.</li>\n</ul>\n<h4 id=\"subqmenu2\">2. Hướng dẫn chi tiết</h4>\n<p><strong>Bước 1:</strong>&nbsp;<a title=\"Truy cập trang Microsoft Teams\" href=\"https://www.microsoft.com/vi-vn/microsoft-teams/download-app\" target=\"_blank\" rel=\"nofollow noopener\">Truy cập trang&nbsp;<strong>Microsoft Teams</strong></a>&nbsp;&gt; Chọn&nbsp;<strong>Tải xuống cho m&aacute;y t&iacute;nh</strong>.</p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/1-3-800x377.jpg\" alt=\"Chọn Tải xuống cho m&aacute;y t&iacute;nh\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/1-3-800x377.jpg\"></p>\n<p><strong>Bước 2:</strong>&nbsp;Chọn&nbsp;<strong>Tải xuống Teams</strong>.</p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/1-4-800x359.jpg\" alt=\"Chọn Tải xuống Teams\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/1-4-800x359.jpg\"></p>\n<div class=\"infobox\">\n<p>Đối với m&aacute;y t&iacute;nh đ&atilde; c&oacute; phần mềm&nbsp;<a title=\"Internet Download Manager (IDM)\" href=\"https://www.internetdownloadmanager.com/\" target=\"_blank\" rel=\"nofollow noopener\"><strong>Internet Download Manager (IDM)</strong></a>, sau khi chọn&nbsp;<strong>Tải xuống Teams</strong>&nbsp;hệ thống sẽ hiện hộp thoại t&ugrave;y chọn tải, bạn chỉ việc nhấn&nbsp;<strong>Download</strong>&nbsp;để tải&nbsp;<strong>Teams</strong>&nbsp;về m&aacute;y.</p>\n</div>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/1-5-800x333.jpg\" alt=\"Nhấn Download\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/1-5-800x333.jpg\"></p>\n<h3 id=\"qmenu2\">II. C&aacute;ch đăng k&yacute; Microsoft Teams tr&ecirc;n m&aacute;y t&iacute;nh</h3>\n<h4 id=\"subqmenu3\">1. Hướng dẫn nhanh</h4>\n<ul>\n<li>Truy cập trang&nbsp;<strong>Microsoft Teams&nbsp;</strong>&gt; Chọn&nbsp;<strong>Đăng nhập</strong>.</li>\n<li>Chọn&nbsp;<strong>H&atilde;y tạo t&agrave;i khoản</strong>.</li>\n<li>Nhập&nbsp;<strong>t&agrave;i khoản email</strong>&nbsp;muốn tạo &gt; Chọn&nbsp;<strong>t&ecirc;n miền email</strong>.</li>\n<li>Nhập&nbsp;<strong>Mật khẩu</strong>&nbsp;&gt; Nhập&nbsp;<strong>k&yacute; tự x&aacute;c thực</strong>.</li>\n</ul>\n<h4 id=\"subqmenu4\">2. Hướng dẫn chi tiết</h4>\n<p><strong>Bước 1:</strong>&nbsp;<a title=\"Truy cập trang Microsoft Teams\" href=\"https://www.microsoft.com/vi-vn/microsoft-365/microsoft-teams/group-chat-software\" target=\"_blank\" rel=\"nofollow noopener\">Truy cập trang&nbsp;<strong>Microsoft Teams</strong></a>&nbsp;&gt; Chọn&nbsp;<strong>Đăng nhập</strong>&nbsp;g&oacute;c tr&ecirc;n b&ecirc;n phải.</p>\n<p class=\"img\"><img class=\"lazy\" style=\"margin: auto; padding: 0px; box-sizing: border-box; border: 0px; word-break: break-word; display: block; max-width: 100%; height: auto; max-height: 600px; width: auto; opacity: 1;\" title=\"Truy cập trang Microsoft Teams&nbsp;&gt; Chọn Đăng nhập g&oacute;c tr&ecirc;n b&ecirc;n phải\" src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug3121-53-13-800x614.jpg\" alt=\"Truy cập trang Microsoft Teams&nbsp;&gt; Chọn Đăng nhập g&oacute;c tr&ecirc;n b&ecirc;n phải\" width=\"800\" height=\"614\" data-src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug3121-53-13-800x614.jpg\"></p>\n<p class=\"titleOfImages\">Truy cập trang Microsoft Teams&nbsp;&gt; Chọn Đăng nhập g&oacute;c tr&ecirc;n b&ecirc;n phải</p>\n<p><strong>Bước 2:</strong>&nbsp;Chọn&nbsp;<strong>H&atilde;y tạo t&agrave;i khoản</strong>.</p>\n<p class=\"img\"><img class=\"lazy\" title=\"Chọn H&atilde;y tạo t&agrave;i khoản\" src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug3121-53-28-723x475.jpg\" alt=\"Chọn H&atilde;y tạo t&agrave;i khoản\" width=\"723\" height=\"475\" data-src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug3121-53-28-723x475.jpg\"></p>\n<p class=\"titleOfImages\">Chọn H&atilde;y tạo t&agrave;i khoản</p>\n<p><strong>Bước 3:</strong>&nbsp;Chọn&nbsp;<strong>Nhận địa chỉ email mới</strong>.</p>\n<p class=\"img\"><img class=\"lazy\" title=\"Nhận địa chỉ email mới\" src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug3122-05-57-657x414.jpg\" alt=\"Nhận địa chỉ email mới\" width=\"657\" height=\"414\" data-src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug3122-05-57-657x414.jpg\"></p>\n<p class=\"titleOfImages\">Nhận địa chỉ email mới</p>\n<div class=\"infobox\">\n<p><strong>Lưu &yacute;:</strong>&nbsp;Ngo&agrave;i c&aacute;ch đăng k&yacute; bẳng email, bạn cũng c&oacute; thể sử dụng số điện thoại để đăng k&yacute; t&agrave;i khoản Microsoft Teams.</p>\n</div>\n<h3 id=\"qmenu3\">III. Hướng dẫn sử dụng Microsoft Teams&nbsp;</h3>\n<h4 id=\"subqmenu5\"><strong>1. C&aacute;ch tạo, chia sẻ ph&ograve;ng họp, học online tr&ecirc;n Microsoft Teams</strong></h4>\n<p><strong>Bước 1:</strong>&nbsp;Tại giao diện ch&iacute;nh của Microsoft Teams, chọn mục&nbsp;<strong>Nh&oacute;m.</strong></p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/1-800x500-2.jpg\" alt=\"Chọn Nh&oacute;m\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/1-800x500-2.jpg\"></p>\n<p><strong>Bước 2:</strong>&nbsp;Chọn&nbsp;<strong>Tham gia hoặc tạo nh&oacute;m&nbsp;</strong>để tiến h&agrave;nh tạo nh&oacute;m của bạn.</p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/2-800x388.jpg\" alt=\"Chọn Tham gia hoặc tạo nh&oacute;m\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/2-800x388.jpg\"></p>\n<p><strong>Bước 3:</strong>&nbsp;Để tạo nh&oacute;m mới cho m&igrave;nh, chọn&nbsp;<strong>Tạo nh&oacute;m (1)</strong>. Nếu bạn được mời tham gia nh&oacute;m th&igrave; bạn c&oacute; thể&nbsp;<strong>nhập m&atilde; nh&oacute;m</strong>&nbsp;v&agrave;o &ocirc;&nbsp;<strong>Nhập m&atilde; b&ecirc;n phải (2)</strong>.</p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/3-800x438.jpg\" alt=\"Nhấn Tạo nh&oacute;m\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/3-800x438.jpg\"></p>\n<p><strong>Bước 4:</strong>&nbsp;Sau khi nhấn Tạo nh&oacute;m, hệ thống sẽ hiển thị hộp thoại y&ecirc;u cầu th&ocirc;ng tin nh&oacute;m của bạn. Bạn c&oacute; thể nhập&nbsp;<strong>T&ecirc;n nh&oacute;m (1)</strong>,&nbsp;<strong>M&ocirc; tả (2)</strong>&nbsp;v&agrave; thiết lập&nbsp;<strong>Quyền ri&ecirc;ng tư (3)&nbsp;</strong>của nh&oacute;m bằng c&aacute;ch chọn mũi t&ecirc;n b&ecirc;n phải để hiển thị 2 t&ugrave;y chọn quyền ri&ecirc;ng tư:&nbsp;<strong>C&ocirc;ng khai</strong>&nbsp;hoặc&nbsp;<strong>Ri&ecirc;ng tư.</strong></p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/4-800x514.jpg\" alt=\"Nhập Th&ocirc;ng tin nh&oacute;m\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/4-800x514.jpg\"></p>\n<p><strong>Bước 5:&nbsp;</strong>Tiếp theo h&atilde;y th&ecirc;m th&agrave;nh vi&ecirc;n v&agrave;o nh&oacute;m bằng c&aacute;ch nhập t&ecirc;n hoặc nh&oacute;m bạn muốn th&ecirc;m v&agrave;o, c&oacute; thể th&ecirc;m nhiều th&agrave;nh vi&ecirc;n, sau đ&oacute; nhấn&nbsp;<strong>Th&ecirc;m.&nbsp;</strong>Ngo&agrave;i ra bạn c&oacute; thể nhấn&nbsp;<strong>Bỏ qua</strong>&nbsp;nếu bạn muốn th&ecirc;m th&agrave;nh vi&ecirc;n sau.</p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/6-800x515.jpg\" alt=\"Th&ecirc;m th&agrave;nh vi&ecirc;n\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/6-800x515.jpg\"></p>\n<p><strong>Bước 6:</strong>&nbsp;T&ecirc;n c&aacute;c th&agrave;nh vi&ecirc;n mới sẽ hiển thị b&ecirc;n dưới sau khi bạn th&ecirc;m th&agrave;nh vi&ecirc;n. Cuối c&ugrave;ng nhấn&nbsp;<strong>Đ&oacute;ng</strong>&nbsp;để ho&agrave;n tất việc tạo nh&oacute;m.</p>\n<p class=\"img\"><img class=\"lazy\" src=\"https://cdn.tgdd.vn/2020/08/content/7-800x520.jpg\" alt=\"Bấm Đ&oacute;ng\" width=\"800\" data-src=\"https://cdn.tgdd.vn/2020/08/content/7-800x520.jpg\"></p>\n<p>Để chia sẻ ph&ograve;ng họp, học online tr&ecirc;n Microsoft Teams bạn chỉ cần nhấn v&agrave;o&nbsp;<strong>biểu tượng 3 dấu chấm</strong>&nbsp;ở b&ecirc;n phải t&ecirc;n ph&ograve;ng họp &gt; Chọn&nbsp;<strong>Nhận li&ecirc;n kết đến nh&oacute;m</strong>.</p>\n<p class=\"img\"><img class=\"lazy\" style=\"margin: auto; padding: 0px; box-sizing: border-box; border: 0px; word-break: break-word; display: block; max-width: 100%; height: auto; max-height: 600px; width: auto; opacity: 1;\" title=\"Nhấn v&agrave;o biểu tượng 3 dấu chấm ở b&ecirc;n phải t&ecirc;n ph&ograve;ng họp &gt; Chọn Nhận li&ecirc;n kết đến nh&oacute;m\" src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug1617-01-47-547x374.jpg\" alt=\"Nhấn v&agrave;o biểu tượng 3 dấu chấm ở b&ecirc;n phải t&ecirc;n ph&ograve;ng họp &gt; Chọn Nhận li&ecirc;n kết đến nh&oacute;m\" width=\"547\" height=\"374\" data-src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug1617-01-47-547x374.jpg\"></p>\n<p class=\"titleOfImages\">Nhấn v&agrave;o biểu tượng 3 dấu chấm ở b&ecirc;n phải t&ecirc;n ph&ograve;ng họp &gt; Chọn Nhận li&ecirc;n kết đến nh&oacute;m</p>\n<p>Chọn&nbsp;<strong>Sao ch&eacute;p</strong>&nbsp;v&agrave; gửi đường link đến những người m&agrave; bạn muốn chia sẻ ph&ograve;ng họp.</p>\n<p class=\"img\"><img class=\"lazy\" title=\"Chọn Sao ch&eacute;p v&agrave; gửi đường link đến những người m&agrave; bạn muốn chia sẻ ph&ograve;ng họp\" src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug1617-01-59-800x336.jpg\" alt=\"Chọn Sao ch&eacute;p v&agrave; gửi đường link đến những người m&agrave; bạn muốn chia sẻ ph&ograve;ng họp\" width=\"800\" height=\"336\" data-src=\"https://cdn.tgdd.vn//GameApp/1276883//ScreenshotatAug1617-01-59-800x336.jpg\"></p>\n<p class=\"titleOfImages\">Chọn Sao ch&eacute;p v&agrave; gửi đường link đến những người m&agrave; bạn muốn chia sẻ ph&ograve;ng họp</p>\n<h4 id=\"subqmenu6\">2. C&aacute;ch sử dụng c&aacute;c t&iacute;nh năng ch&iacute;nh tr&ecirc;n Microsoft Teams</h4>\n<p>Sau khi tạo hoặc v&agrave;o được ph&ograve;ng học, họp online. Bạn sẽ thấy giao diện của Microsoft Teams với c&aacute;c biểu tượng tương ứng với c&aacute;c t&iacute;nh năng tr&ecirc;n thanh c&ocirc;ng cụ<strong>&nbsp;theo thứ tự từ tr&aacute;i sang phải</strong>&nbsp;như:</p>\n<ul>\n<li>Hiển thị danh s&aacute;ch th&agrave;nh vi&ecirc;n tham gia.</li>\n<li>Hiển thị cuộc hội thoại.</li>\n<li>Giơ tay.</li>\n<li>Chia nh&oacute;m cho lớp học, họp online.</li>\n<li>Bật/Tắt micro.</li>\n<li>Bật/Tắt camera hoặc webcam.</li>\n<li>Chia sẻ m&agrave;n h&igrave;nh.</li>\n<li>Kết th&uacute;c buổi học, họp online.</li>\n</ul>', '2025-04-24', '15:11:37', 'Hướng dẫn sử dụng hệ thống quản lý học tập', 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745481960/tnrhm5ex6pydzlzvamcj.png', 1, 'Thông báo tạo bài viết mới', 1),
(2, '<p>K&iacute;nh gửi Qu&yacute; kh&aacute;ch h&agrave;ng,</p>\n<p>VPBank xin ch&acirc;n th&agrave;nh cảm ơn Qu&yacute; kh&aacute;ch đ&atilde; quan t&acirc;m v&agrave; sử dụng c&aacute;c sản phẩm, dịch vụ của Ng&acirc;n h&agrave;ng!</p>\n<p>Ch&uacute;ng t&ocirc;i xin th&ocirc;ng b&aacute;o, nhằm mang tới những sản phẩm, dịch vụ phục vụ tốt hơn cho Qu&yacute; kh&aacute;ch, VPBank sẽ thực hiện n&acirc;ng cấp to&agrave;n bộ hệ thống trong khoảng từ&nbsp;<strong>1h00-1h30 s&aacute;ng (giờ Việt Nam) ng&agrave;y 01/03/2020 (Chủ Nhật)</strong>. Trong thời gian n&acirc;ng cấp, to&agrave;n bộ hệ thống của VPBank c&oacute; thể bị gi&aacute;n đoạn, bao gồm c&aacute;c dịch vụ tại c&acirc;y ATM, CDM tr&ecirc;n to&agrave;n quốc, c&aacute;c t&iacute;nh năng của ng&acirc;n h&agrave;ng điện tử, bao gồm t&iacute;nh năng cung cấp tr&ecirc;n c&aacute;c giao diện web, mobile web v&agrave; app.</p>\n<p>Ch&uacute;ng t&ocirc;i xin th&ocirc;ng b&aacute;o để Qu&yacute; kh&aacute;ch c&oacute; thể chủ động sắp xếp kh&ocirc;ng ảnh hưởng đến c&aacute;c kế hoạch t&agrave;i ch&iacute;nh c&aacute; nh&acirc;n trong thời gian n&agrave;y.</p>\n<p>Hết thời gian tr&ecirc;n, to&agrave;n bộ hệ thống VPBank sẽ trở lại hoạt động b&igrave;nh thường.</p>\n<p>Ng&acirc;n h&agrave;ng xin tr&acirc;n trọng cảm ơn v&agrave; ch&uacute;c Qu&yacute; kh&aacute;ch sẽ c&oacute; nhiều trải nghiệm th&uacute; vị với c&aacute;c sản phẩm, dịch vụ của VPBank!</p>', '2025-04-24', '15:14:00', 'Hệ thống sẽ được nâng cấp vào 9h ngày 30-4', 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745482103/feh8g4gpa1ipcv0zfvrm.png', 6, 'Thông báo nâng cấp hệ thống', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` bigint NOT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat`
--

CREATE TABLE `chat` (
  `id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `is_file` bit(1) DEFAULT NULL,
  `receiver` bigint DEFAULT NULL,
  `sender` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `chat`
--

INSERT INTO `chat` (`id`, `content`, `created_date`, `file_name`, `is_file`, `receiver`, `sender`) VALUES
(1, 'hehehe anh', '2025-04-25 19:49:15', NULL, b'0', 2, 3),
(2, 'anh nghe', '2025-04-25 19:49:25', NULL, b'0', 3, 2),
(3, 'alo', '2025-04-25 19:49:34', NULL, b'0', 3, 2),
(4, 'dạ', '2025-04-25 19:49:37', NULL, b'0', 2, 3),
(5, 'hihi', '2025-04-25 19:50:02', NULL, b'0', 2, 3),
(6, 'huhuh', '2025-04-25 19:50:10', NULL, b'0', 3, 2),
(7, 'em đây', '2025-04-25 19:52:03', NULL, b'0', 2, 3),
(8, 'anh đây', '2025-04-25 19:52:07', NULL, b'0', 3, 2),
(9, 'em chào cô', '2025-04-26 21:15:07', NULL, b'0', 2, 3),
(10, 'cô đây em', '2025-04-26 21:15:14', NULL, b'0', 3, 2),
(11, 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745676585/jjvfxibv81s37lyoycry.jpg', '2025-04-26 21:15:24', '8.jpeg', b'1', 2, 3),
(12, 'hi cô', '2025-04-29 12:06:58', NULL, b'0', 2, 3),
(13, 'cô đây', '2025-04-29 12:07:02', NULL, b'0', 3, 2),
(14, 'sao rồi em', '2025-04-29 12:32:49', NULL, b'0', 3, 2),
(15, 'dạ cô', '2025-04-29 12:32:52', NULL, b'0', 2, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat_room`
--

CREATE TABLE `chat_room` (
  `id` bigint NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_date` datetime DEFAULT NULL,
  `sender` bigint DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `chat_room`
--

INSERT INTO `chat_room` (`id`, `content`, `created_date`, `sender`, `subject_id`) VALUES
(1, '<p>c&ocirc; ch&agrave;o nh&oacute;m m&igrave;nh nha</p>', '2025-04-29 10:16:09', 2, 1),
(2, '<p>c&ocirc; ch&agrave;o nh&oacute;m m&igrave;nh nha hihih</p>', '2025-04-29 10:18:50', 2, 1),
(3, '<p>c&ocirc; ch&agrave;o nh&oacute;m m&igrave;nh nha hihih</p>', '2025-04-29 10:19:13', 2, 1),
(4, '<p>ehhehe aaaa</p>\n<p><img src=\"http://res.cloudinary.com/dlkhzppmb/image/upload/v1745899347/j7ndwcdqbvoivj0pkntr.jpg\" alt=\"\" width=\"259\" height=\"194\" /></p>', '2025-04-29 11:08:14', 2, 1),
(5, '<p>uuwuwu y cư hahahah</p>', '2025-04-29 11:20:09', 2, 1),
(6, '<p>fwefwef</p>', '2025-04-29 11:20:51', 2, 1),
(7, '<p>hehhe</p>', '2025-04-29 11:24:58', 2, 1),
(8, '<p>fwef</p>', '2025-04-29 11:32:32', 2, 1),
(9, '<p>cưce</p>', '2025-04-29 11:35:57', 2, 1),
(10, '<p>ccsc</p>', '2025-04-29 11:36:45', 2, 1),
(11, '<p>ccsc fwefwef</p>', '2025-04-29 11:36:51', 2, 1),
(12, '<p>huhuh</p>', '2025-04-29 12:12:35', 2, 1),
(13, '<p>cscs</p>', '2025-04-29 12:14:50', 2, 1),
(14, '<p>cscs fdwef</p>', '2025-04-29 12:14:57', 2, 1),
(15, '<p>dfwefwef</p>\n<p>&nbsp;</p>', '2025-04-29 12:16:52', 2, 1),
(16, '<p>dưqd</p>', '2025-04-29 12:18:05', 2, 1),
(17, '<p>cecec</p>', '2025-04-29 12:19:28', 2, 1),
(18, '<p>cececgr4g</p>', '2025-04-29 12:19:46', 2, 1),
(19, '<p>hehehe</p>', '2025-04-29 12:23:20', 2, 1),
(20, '<p>hehehe fdwefwef</p>', '2025-04-29 12:23:26', 2, 1),
(21, '<p>đw</p>', '2025-04-29 12:29:42', 2, 1),
(22, '<p>c</p>', '2025-04-29 12:31:27', 2, 1),
(23, '<p>h&iacute; h&iacute; h&iacute;</p>', '2025-04-29 12:33:07', 2, 1),
(24, '<p>c&ocirc; ch&agrave;o mọi người</p>', '2025-04-29 12:36:28', 2, 1),
(25, '<p>c&ocirc; y&ecirc;u c&aacute;c em</p>', '2025-04-29 12:39:36', 2, 1),
(26, '<p>c&ocirc; y&ecirc;u c&aacute;c em nhiều&nbsp;</p>', '2025-04-29 12:40:22', 2, 1),
(27, '<p>c&ocirc; y&ecirc;u c&aacute;c em nhiều&nbsp;</p>', '2025-04-29 12:40:34', 2, 1),
(28, '<p>c&ocirc; y&ecirc;u c&aacute;c em nhiều&nbsp;</p>', '2025-04-29 12:41:02', 2, 1),
(29, '<p>c&ocirc; y&ecirc;u c&aacute;c em nhiều&nbsp;</p>', '2025-04-29 12:41:20', 2, 1),
(30, '<p>c&ocirc; y&ecirc;u c&aacute;c em nhiều&nbsp;</p>', '2025-04-29 12:42:49', 2, 1),
(31, '<p>uhuhuhu</p>\n<p><img src=\"http://res.cloudinary.com/dlkhzppmb/image/upload/v1745913950/phxlfdugqjbftofdaltd.jpg\" alt=\"\" width=\"275\" height=\"183\" /></p>', '2025-04-29 15:11:35', 2, 1),
(32, '<p>ặc ặc<img src=\"http://res.cloudinary.com/dlkhzppmb/image/upload/v1745914999/iimvnngzculxydphteox.jpg\" alt=\"\" width=\"248\" height=\"203\" /></p>', '2025-04-29 15:29:04', 2, 1),
(33, '<p>ưeuwuw</p>', '2025-04-29 15:29:24', 2, 1),
(34, '<p>ahaha</p>', '2025-04-29 15:29:53', 2, 1),
(35, '<p>hihihi</p>', '2025-04-29 15:32:24', 2, 1),
(36, '<p>cứt thật</p>', '2025-04-29 15:32:31', 2, 1),
(37, '<p>u l&agrave; trời</p>', '2025-04-29 15:32:39', 2, 1),
(38, '<p>em ch&agrave;o c&ocirc; ạ</p>', '2025-04-29 16:55:26', 3, 1),
(39, '<p>ừm c&ocirc; ch&agrave;o em</p>', '2025-04-29 16:55:39', 2, 1),
(40, '<p>c&ocirc; c&oacute; điểm m&ocirc;n hướng đối tượng chưa ạ</p>', '2025-04-29 16:57:22', 3, 1),
(41, '<p>mấy th&aacute;ng rồi hả c&ocirc;</p>', '2025-04-29 16:59:13', 3, 1),
(42, '<p>c&ocirc; bịp v&atilde;i</p>', '2025-04-29 16:59:59', 3, 1),
(43, '<p>c&ocirc; xin lỗi nh&eacute;</p>', '2025-04-29 17:00:55', 2, 1),
(44, '<p>sao ấy nhỉ</p>', '2025-04-29 17:01:33', 3, 1),
(45, '<p>chuyện g&igrave; vậy</p>', '2025-04-29 17:01:59', 3, 1),
(46, '<p>hahaha</p>', '2025-04-29 17:02:37', 2, 1),
(47, '<p>bị lỗi rồi &agrave;</p>', '2025-04-29 17:03:06', 3, 1),
(48, '<p>test thử nh&eacute;</p>', '2025-04-29 17:15:24', 2, 1),
(49, '<p>oke c&ocirc;</p>', '2025-04-29 17:15:46', 3, 1),
(50, '<p>xin ch&agrave;o mọi người, t&ocirc;i l&agrave; hiếu trần</p>\n<ul>\n<li>\n<h2><span style=\"background-color: #e03e2d;\"><em><strong>heheeh</strong></em></span></h2>\n</li>\n</ul>', '2025-04-30 21:54:14', 4, 1),
(51, '<p>&ecirc; c&ocirc;</p>', '2025-05-13 09:11:56', 3, 1),
(52, '<p>hả em</p>', '2025-05-13 09:12:06', 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `id` bigint NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `notification`
--

INSERT INTO `notification` (`id`, `created_date`, `is_read`, `link`, `title`, `user_id`) VALUES
(1, '2025-04-26 09:48:51', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(2, '2025-04-26 10:30:57', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(3, '2025-04-26 10:31:51', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(4, '2025-04-26 10:32:57', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(5, '2025-04-26 15:37:34', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(6, '2025-04-26 15:39:50', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(7, '2025-04-26 21:09:48', b'0', '', 'Có yêu cầu tham gia môn học', 2),
(8, '2025-04-26 21:10:46', b'0', '', 'Có yêu cầu tham gia môn học', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject`
--

CREATE TABLE `subject` (
  `id` bigint NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `teacher_id` bigint DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `locked` bit(1) DEFAULT NULL,
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `subject`
--

INSERT INTO `subject` (`id`, `code`, `created_date`, `name`, `teacher_id`, `image`, `locked`, `updated_date`) VALUES
(1, 'TH03111', NULL, 'Lập trình java cơ bản', 2, 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745548277/l8lxaefnhs6jxaim6wur.webp', b'0', NULL),
(2, 'TH09887', NULL, 'Lập trình C++ cơ bản', 2, 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745548438/di59n8dqmqytwefrylqc.png', b'1', '2025-04-25'),
(3, 'LT098123', '2025-04-26', 'Lập trình java web', 2, 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745676174/yhhj7ihhtfmyi5jqpm8a.webp', b'0', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject_student`
--

CREATE TABLE `subject_student` (
  `id` bigint NOT NULL,
  `subject_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `accepted` bit(1) DEFAULT NULL,
  `join_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `subject_student`
--

INSERT INTO `subject_student` (`id`, `subject_id`, `user_id`, `accepted`, `join_date`) VALUES
(1, 2, 3, b'1', '2025-04-25 15:30:06'),
(2, 2, 4, b'1', '2025-04-25 15:42:22'),
(12, 1, 4, b'1', '2025-04-26 15:28:35'),
(14, 1, 3, b'1', '2025-04-26 15:39:59'),
(16, 3, 3, b'0', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `submission`
--

CREATE TABLE `submission` (
  `id` bigint NOT NULL,
  `source_path` varchar(255) DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  `version` int DEFAULT NULL,
  `assignment_id` bigint DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `commit_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `submission`
--

INSERT INTO `submission` (`id`, `source_path`, `submit_time`, `version`, `assignment_id`, `student_id`, `commit_name`) VALUES
(1, NULL, '2025-04-30 17:18:16', NULL, 3, 3, 'commit 1'),
(2, NULL, '2025-04-30 21:47:49', NULL, 3, 3, 'giao diện admin'),
(4, NULL, '2025-05-01 09:41:32', NULL, 3, 3, 'quản lý cc');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `submission_file`
--

CREATE TABLE `submission_file` (
  `id` bigint NOT NULL,
  `code` text,
  `file_name` varchar(255) DEFAULT NULL,
  `submission_id` bigint DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `submission_file`
--

INSERT INTO `submission_file` (`id`, `code`, `file_name`, `submission_id`, `link`) VALUES
(1, NULL, NULL, 1, 'http://res.cloudinary.com/dwfciuqmd/raw/upload/v1746007952/script.sql'),
(2, NULL, NULL, 1, 'http://res.cloudinary.com/dwfciuqmd/raw/upload/v1746007953/shop-dien-thoai.zip'),
(3, NULL, NULL, 2, 'http://res.cloudinary.com/dwfciuqmd/raw/upload/v1746024124/webdatsan.sql'),
(4, NULL, NULL, 2, 'http://res.cloudinary.com/dwfciuqmd/raw/upload/v1746024126/WebsiteFashion.rar'),
(7, NULL, NULL, 4, 'http://res.cloudinary.com/dwfciuqmd/raw/upload/v1746066947/quanlychungcu.zip');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `test_case`
--

CREATE TABLE `test_case` (
  `id` bigint NOT NULL,
  `expected_output` varchar(255) DEFAULT NULL,
  `input` varchar(255) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `assignment_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `test_case`
--

INSERT INTO `test_case` (`id`, `expected_output`, `input`, `score`, `assignment_id`) VALUES
(2, 'họ tên: trần văn hiếu', 'trần hiếu up', 45, 3),
(4, '76', '40', 11, 3),
(5, '12', '60', 10, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `test_result`
--

CREATE TABLE `test_result` (
  `id` bigint NOT NULL,
  `actual_output` varchar(255) DEFAULT NULL,
  `earned_score` int DEFAULT NULL,
  `passed` bit(1) DEFAULT NULL,
  `submission_id` bigint DEFAULT NULL,
  `test_case_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `test_result`
--

INSERT INTO `test_result` (`id`, `actual_output`, `earned_score`, `passed`, `submission_id`, `test_case_id`, `user_id`) VALUES
(10, 'đã đạt', 10, NULL, NULL, 5, 3),
(11, 'oke', 11, NULL, NULL, 4, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `activation_key` varchar(255) DEFAULT NULL,
  `actived` bit(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remember_key` varchar(255) DEFAULT NULL,
  `token_fcm` varchar(255) DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `authority_name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `activation_key`, `actived`, `avatar`, `created_date`, `email`, `fullname`, `password`, `phone`, `remember_key`, `token_fcm`, `user_type`, `username`, `authority_name`, `code`) VALUES
(1, NULL, b'1', NULL, '2025-04-21', 'admin@gmail.com', 'ADMIN', '$2a$10$UregiCIgE4.evlgL9kKMKeMo4B7rKADvCxeWDrsmzlm1gjy/Wiqw2', NULL, NULL, NULL, 1, 'admin@gmail.com', 'ROLE_ADMIN', NULL),
(2, NULL, b'1', 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745583658/ndjbppc7bbbkwssykkfk.jpg', '2025-04-22', 'hieutran02102804@gmail.com', 'Hoàng thị tú', '$2a$10$LzlW2JPU6If6iSNm5LUkauZW5H.TvAalCTqPByW6n5VIc4RVo0S0e', '0976123123', NULL, NULL, NULL, 'hieutran02102804@gmail.com', 'ROLE_TEACHER', NULL),
(3, NULL, b'1', 'http://res.cloudinary.com/dlkhzppmb/image/upload/v1745584162/nzlhfslylutfoteuevxf.jpg', '2025-04-25', 'dev002102@gmail.com', 'Trần văn hiếu', '$2a$10$94ziAdcfh6fgPt0HG1rFEe6AjMSGecu6m9IxkeA09JThX7OidBJju', '0976123432', '245966', NULL, NULL, 'dev002102@gmail.com', 'ROLE_STUDENT', '654311'),
(4, NULL, b'1', NULL, '2025-04-25', 'hieutran2102000@gmail.com', 'Trần văn nam', '$2a$10$vIX.M9ClrYpWAY3EnRI5r.LDI.yCmcgIOSrj78egTB3Vy8VKTtnoO', '0976123123', NULL, NULL, NULL, 'hieutran2102000@gmail.com', 'ROLE_STUDENT', '8761231');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `asignment`
--
ALTER TABLE `asignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2dvgvog5w8o9959l4t5kvlq9s` (`subject_id`);

--
-- Chỉ mục cho bảng `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`name`);

--
-- Chỉ mục cho bảng `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkr2fy24puc3x3sdnla4r1iok1` (`user_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKassi1e8b64hoj61bb710c8oq4` (`receiver`),
  ADD KEY `FKj5nm89ig7glfvk1ksfmqdsydo` (`sender`);

--
-- Chỉ mục cho bảng `chat_room`
--
ALTER TABLE `chat_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8w9fc1tk1b9lqiboes8eq6j0s` (`sender`),
  ADD KEY `FKm44gyq5pv1m3xvmiy73sclhtb` (`subject_id`);

--
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnk4ftb5am9ubmkv1661h15ds9` (`user_id`);

--
-- Chỉ mục cho bảng `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK35n9b2av660anfttfh9rlhxek` (`teacher_id`);

--
-- Chỉ mục cho bảng `subject_student`
--
ALTER TABLE `subject_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKaofq137ktpj28dariq084g0w1` (`subject_id`),
  ADD KEY `FKh0qgnetvww9682vncxse8gfvw` (`user_id`);

--
-- Chỉ mục cho bảng `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8tuu490fcw9wokm2op4mm5u7c` (`assignment_id`),
  ADD KEY `FKjlg2bff2kbwi7yof7yc7fbokn` (`student_id`);

--
-- Chỉ mục cho bảng `submission_file`
--
ALTER TABLE `submission_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKtl06hyqfb54pe4evyq6omcb0n` (`submission_id`);

--
-- Chỉ mục cho bảng `test_case`
--
ALTER TABLE `test_case`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgd1dewllvvg24xwd29s3h0cro` (`assignment_id`);

--
-- Chỉ mục cho bảng `test_result`
--
ALTER TABLE `test_result`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmcokumtauiop1p52ox5l19np9` (`submission_id`),
  ADD KEY `FKmxikqh6fak167jn6xvdlowd64` (`test_case_id`),
  ADD KEY `FK7q1xfjwuj28swdna3b0b5lcol` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq6r7e19l5xjmty0j0w6i2inlv` (`authority_name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `asignment`
--
ALTER TABLE `asignment`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `blog`
--
ALTER TABLE `blog`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `chat_room`
--
ALTER TABLE `chat_room`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `subject`
--
ALTER TABLE `subject`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `subject_student`
--
ALTER TABLE `subject_student`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `submission`
--
ALTER TABLE `submission`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `submission_file`
--
ALTER TABLE `submission_file`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `test_case`
--
ALTER TABLE `test_case`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `test_result`
--
ALTER TABLE `test_result`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `asignment`
--
ALTER TABLE `asignment`
  ADD CONSTRAINT `FK2dvgvog5w8o9959l4t5kvlq9s` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`);

--
-- Các ràng buộc cho bảng `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `FKkr2fy24puc3x3sdnla4r1iok1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FKassi1e8b64hoj61bb710c8oq4` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKj5nm89ig7glfvk1ksfmqdsydo` FOREIGN KEY (`sender`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `chat_room`
--
ALTER TABLE `chat_room`
  ADD CONSTRAINT `FK8w9fc1tk1b9lqiboes8eq6j0s` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKm44gyq5pv1m3xvmiy73sclhtb` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`);

--
-- Các ràng buộc cho bảng `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FKnk4ftb5am9ubmkv1661h15ds9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `FK35n9b2av660anfttfh9rlhxek` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `subject_student`
--
ALTER TABLE `subject_student`
  ADD CONSTRAINT `FKaofq137ktpj28dariq084g0w1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `FKh0qgnetvww9682vncxse8gfvw` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `submission`
--
ALTER TABLE `submission`
  ADD CONSTRAINT `FK8tuu490fcw9wokm2op4mm5u7c` FOREIGN KEY (`assignment_id`) REFERENCES `asignment` (`id`),
  ADD CONSTRAINT `FKjlg2bff2kbwi7yof7yc7fbokn` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `submission_file`
--
ALTER TABLE `submission_file`
  ADD CONSTRAINT `FKtl06hyqfb54pe4evyq6omcb0n` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`id`);

--
-- Các ràng buộc cho bảng `test_case`
--
ALTER TABLE `test_case`
  ADD CONSTRAINT `FKgd1dewllvvg24xwd29s3h0cro` FOREIGN KEY (`assignment_id`) REFERENCES `asignment` (`id`);

--
-- Các ràng buộc cho bảng `test_result`
--
ALTER TABLE `test_result`
  ADD CONSTRAINT `FK7q1xfjwuj28swdna3b0b5lcol` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKmcokumtauiop1p52ox5l19np9` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`id`),
  ADD CONSTRAINT `FKmxikqh6fak167jn6xvdlowd64` FOREIGN KEY (`test_case_id`) REFERENCES `test_case` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKq6r7e19l5xjmty0j0w6i2inlv` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
