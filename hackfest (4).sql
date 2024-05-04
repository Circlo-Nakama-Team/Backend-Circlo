-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 34.101.218.217
-- Generation Time: May 04, 2024 at 08:39 PM
-- Server version: 8.0.31-google
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackfest`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `ADDRESSID` varchar(30) NOT NULL,
  `USERID` varchar(30) NOT NULL,
  `ADDRESS` text NOT NULL,
  `DETAIL_ADDRESS` text,
  `TITLE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CATEGORIESID` varchar(20) NOT NULL,
  `CATEGORIES_NAME` text,
  `REWARD_POINT` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CATEGORIESID`, `CATEGORIES_NAME`, `REWARD_POINT`) VALUES
('trashcat-1', 'Anorganik', 30),
('trashcat-2', 'Organik', 40),
('trashcat-3', 'B3', 50);

-- --------------------------------------------------------

--
-- Table structure for table `donate`
--

CREATE TABLE `donate` (
  `DONATEID` varchar(30) NOT NULL,
  `TRASHCATEGORIESID` varchar(20) NOT NULL,
  `USERID` varchar(30) NOT NULL,
  `DONATE_WEIGHT` float DEFAULT NULL,
  `DONATE_ADDRESS` text NOT NULL,
  `DONATE_ADDRESS_DETAIL` text,
  `DONATE_METHOD` varchar(30) NOT NULL,
  `DONATE_DESCRIPTION` text,
  `DONATE_STATUS` varchar(50) NOT NULL,
  `DONATE_POINT` int DEFAULT NULL,
  `DONATE_DATE` date NOT NULL,
  `SCHEDULEID` varchar(30) NOT NULL,
  `CREATED_AT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donate_schedule`
--

CREATE TABLE `donate_schedule` (
  `SCHEDULEID` varchar(30) NOT NULL,
  `START_TIME` time NOT NULL,
  `END_TIME` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `donate_schedule`
--

INSERT INTO `donate_schedule` (`SCHEDULEID`, `START_TIME`, `END_TIME`) VALUES
('sch_1', '08:00:00', '12:00:00'),
('sch_2', '12:00:00', '15:00:00'),
('sch_3', '15:00:00', '17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `donate_trash_image`
--

CREATE TABLE `donate_trash_image` (
  `IMAGEID` varchar(30) NOT NULL,
  `DONATEID` varchar(30) NOT NULL,
  `LINK` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fcm_token`
--

CREATE TABLE `fcm_token` (
  `ID_TOKEN` varchar(30) NOT NULL,
  `USERID` varchar(30) NOT NULL,
  `TOKEN` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ideas`
--

CREATE TABLE `ideas` (
  `IDEASID` varchar(20) NOT NULL,
  `TRASHID` varchar(50) DEFAULT NULL,
  `IDEAS_NAME` text,
  `IMAGE` text,
  `DESCRIPTION` text,
  `PRICE` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ideas`
--

INSERT INTO `ideas` (`IDEASID`, `TRASHID`, `IDEAS_NAME`, `IMAGE`, `DESCRIPTION`, `PRICE`) VALUES
('idea-1', 'trash_ano_botolplastik', 'Wadah Serbaguna', 'https://storage.googleapis.com/circlo-bucket/Ideas/DIY%20Rope%20Organizer%20Ideas%20_%20Rope%20craft%20ideas%20_%20Wadah%20serbaguna%20dari%20Botol%20Bekas%20dan%20Tali.jpg', 'Produk wadah serbaguna dari limbah plastik adalah inovasi cerdas untuk mengubah sampah botol plastik menjadi wadah serbaguna yang memenuhi berbagai kebutuhan penyimpanan di rumah atau tempat kerja Anda. Didesain dengan perhatian terhadap kualitas dan keberlanjutan, produk ini mewakili upaya nyata dalam mengurangi limbah plastik sambil memberikan solusi praktis untuk penggunaan sehari-hari.', 30000),
('idea-11', 'trash_ano_botolplastik', 'Pot Tanaman Gantung', 'https://storage.googleapis.com/circlo-bucket/Ideas/pot%20botol%20plastik%20(2).jpg', 'Pot Tanaman Gantung dari Sampah Plastik adalah solusi inovatif untuk membawa keindahan alam ke dalam rumah Anda, sambil memberikan kontribusi positif pada upaya pengurangan limbah plastik. Setiap pot tanaman ini merupakan wujud kreativitas dan kepedulian terhadap lingkungan.', 45000),
('idea-2', 'trash_ano_kaleng', 'Tempat Pensil', 'https://storage.googleapis.com/circlo-bucket/Ideas/tempat%20pensil%20kaleng.jpg', 'Tempat pensil merupakan benda yang penting bagi pelajar, selain itu dengan menggunakan tempat pensil dari limbah kaleng artinya kita juga mendukung perlawanan terhadap Climate Change. Menggabungkan keberlanjutan dengan fungsionalitas, produk ini memperlihatkan cara kreatif untuk mendaur ulang material dan menjadikannya bagian dari kehidupan sehari-hari Anda.', 20000),
('idea-21', 'trash_ano_kaleng', 'Lentera', 'https://storage.googleapis.com/circlo-bucket/Ideas/lentera%20kaleng.jpg', 'Lentera dapat menghidupkan suasana, baik suasana bahagia bahkan hingga suasana romantis, dengan menggunakan produk ini artinya kita mendukung program Go-Green dan produk ini juga bisa anda jadikan peluang bisnis dengan omset yang menarik. Produk ini menggabungkan keindahan desain, keberlanjutan, dan fungsionalitas pencahayaan untuk memberikan pengalaman yang unik dan bermakna.', 40000),
('idea-3', 'trash_ano_kresekplastik', 'Taplak Meja', 'https://storage.googleapis.com/circlo-bucket/Ideas/taplak%20meja%20kresek.jpg', 'Taplak Meja dapat melindungi meja dari noda, debu, dan goresan. Taplak meja yang terbuat dari plastik kresek memiliki semua merupakan taplak meja yang ideal untuk itu', 50000),
('idea-4', 'trash_org_cangkangtelur', 'Lampu Hias', 'https://storage.googleapis.com/circlo-bucket/Ideas/lampu%20telur.jpg', 'Lampu Hias dari cangkang telur adalah karya seni unik yang terinspirasi oleh keindahan alam dan keberlanjutan. Setiap lampu ini dibuat dengan menggunakan cangkang telur yang dipilih secara hati-hati, menciptakan efek pencahayaan yang memukau dan memberikan nuansa hangat di setiap ruangan. Dengan ukiran dan cat pada permukaan telur membuat lampu hias dapat memberikan pencahayaan dengan warna yang menarik', 40000),
('idea-41', 'trash_org_cangkangtelur', 'Pupuk Organik', 'https://storage.googleapis.com/circlo-bucket/Ideas/pupuk%20organik%20cangkang%20telur.jpg', 'Pupuk Organik dari cangkang telur adalah inovasi ramah lingkungan yang memanfaatkan sumber daya alami cangkang telur untuk memberikan nutrisi berkualitas tinggi kepada tanaman Anda. Dengan perpaduan antara kekuatan alami cangkang telur dan konsep daur ulang, produk ini menjadi solusi yang berkelanjutan untuk pertumbuhan tanaman yang sehat dan subur.', 20000),
('idea-5', 'trash_org_kertas', 'Dekorasi Dinding 3D', 'https://storage.googleapis.com/circlo-bucket/Ideas/dekorasi%20dinding%20kertas.jpg', 'Dekorasi Dinding 3D adalah karya seni unik yang menggabungkan keindahan desain dengan kemewahan tekstur dari kertas berkualitas tinggi. Setiap set dekorasi ini membawa nuansa elegan dan menciptakan dimensi visual yang memikat, memberikan sentuhan kreatif dan harmoni pada ruangan Anda.', 35000),
('idea-51', 'trash_org_kertas', 'Lampion', 'https://storage.googleapis.com/circlo-bucket/Ideas/lampion%20kertas.jpg', 'Lampion Kertas adalah produk dekoratif yang menghadirkan kehangatan dan keindahan tradisional dengan sentuhan modern. Terbuat dari kertas berkualitas tinggi, setiap lampion memancarkan cahaya lembut dan menciptakan suasana yang tenang di setiap sudut ruangan atau acara luar ruangan.', 70000),
('idea-6', 'trash_org_sisamakanan', 'Pupuk Organik', 'https://storage.googleapis.com/circlo-bucket/Ideas/PUPUK%20ORGANIK%20DARI%20NASI%20BASI.jpg', 'Pupuk Organik adalah solusi inovatif untuk mengubah sisa makanan menjadi sumber nutrisi berkualitas tinggi bagi tanaman Anda. Dengan konsep daur ulang yang bertanggung jawab, produk ini membantu mengurangi limbah makanan sambil memberikan dukungan optimal untuk pertumbuhan tanaman dan kesehatan tanah, melalui proses pengolahan yang cermat pupuk organik ini akan menjaga keberagaman nutrisi dan mikroorganisme yang diperlukan oleh tanaman.', 30000),
('idea-7', 'trash_org_kardus', 'Laci Mini', 'https://storage.googleapis.com/circlo-bucket/Ideas/laci_mini_kardus.jpeg', 'Kerajinan laci mini dari sampah kardus adalah produk seni dan kerajinan tangan yang dibuat dengan mengolah kardus bekas menjadi laci mini yang berfungsi sebagai tempat penyimpanan kecil. Kerajinan ini merupakan contoh nyata dari upcycling atau daur ulang kreatif, yang memberikan nilai tambah pada bahan bekas (kardus) dengan mengubahnya menjadi produk yang berguna dan estetis.', 75000);

-- --------------------------------------------------------

--
-- Table structure for table `ideas_benefit`
--

CREATE TABLE `ideas_benefit` (
  `IDEASID` varchar(20) NOT NULL,
  `DESCRIPTION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ideas_benefit`
--

INSERT INTO `ideas_benefit` (`IDEASID`, `DESCRIPTION`) VALUES
('idea-1', 'Mengurangi sampah botol plastik'),
('idea-1', 'Meningkatkan kreatifitas'),
('idea-1', 'Menjadi ladang bisnis/penghasilan tambahan baru'),
('idea-11', 'Meningkatkan estetika ruangan, memberikan kesempatan bagi tanaman hias tumbuh di dalam rumah.'),
('idea-11', 'Mengurangi limbah botol plastik.'),
('idea-11', 'Menjadi peluang bisnis'),
('idea-21', 'Mudah dibuat dan dapat menciptakan efek pencahayaan yang menarik.'),
('idea-21', 'Penggunaan fleksibel'),
('idea-21', 'Menjadi peluang bisnis yang memiliki omset besar'),
('idea-2', 'Kekuatan dan daya tahan kaleng membuatnya ideal sebagai tempat pensil yang tahan lama'),
('idea-2', 'Menjadi peluang bisnis yang memiliki omset besar'),
('idea-3', 'Perawatan taplak meja lebih mudah'),
('idea-3', 'Menjadi peluang bisnis'),
('idea-3', 'Bahan mudah didapatkan dan murah untuk membuat taplak meja'),
('idea-4', 'Menambah estetika ruangan dengan pencahayaan yang unik dan berkelas'),
('idea-4', 'Membantu mendukung praktik daur ulang dan keberlanjutan'),
('idea-4', 'Menjadi peluang bisnis yang menguntungkan'),
('idea-41', 'Membantu menyuburkan tanaman secara alami tanpa bahan kimia'),
('idea-41', 'Tanaman lebih aman untuk dikonsumsi manusia'),
('idea-41', 'Mendukung praktik daur ulang untuk kehidupan berkelanjutan'),
('idea-5', 'Menambah estetika ruangan'),
('idea-5', 'Biaya bahan baku produksi murah'),
('idea-5', 'Melatih kreatifitas'),
('idea-51', 'Menambah estetika ruangan dengan pencahayaan yang unik dan berkelas'),
('idea-51', 'Membantu mendukung praktik daur ulang dan keberlanjutan'),
('idea-51', 'Menjadi peluang bisnis yang menguntungkan'),
('idea-6', 'Mengurangi makanan yang terbuang secara percuma'),
('idea-6', 'Membantu menyuburkan tanaman secara alami tanpa bahan kimia'),
('idea-6', 'Tanaman relatif lebih aman untuk dikonsumsi'),
('idea-7', 'Produk ini cocok untuk digunakan sebagai hiasan rumah, tempat penyimpanan aksesori kecil seperti perhiasan, kunci, atau barang-barang kecil lainnya di meja kerja, meja rias, atau ruang tamu'),
('idea-7', 'Karena terbuat dari bahan daur ulang, kerajinan laci mini dari sampah kardus memiliki nilai ekologis yang tinggi, menarik bagi konsumen yang peduli lingkungan');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `POST_ID` varchar(30) NOT NULL,
  `USERID` varchar(30) DEFAULT NULL,
  `POST_BODY` text,
  `POST_TIME` datetime DEFAULT NULL,
  `POST_LIKES` int DEFAULT NULL,
  `POST_IMAGE` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trash`
--

CREATE TABLE `trash` (
  `TRASHID` varchar(50) NOT NULL,
  `CATEGORIESID` varchar(20) DEFAULT NULL,
  `TRASH_TYPE` text,
  `IMAGE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trash`
--

INSERT INTO `trash` (`TRASHID`, `CATEGORIESID`, `TRASH_TYPE`, `IMAGE`) VALUES
('trash_ano_botolplastik', 'trashcat-1', 'Botol Plastik', 'https://storage.googleapis.com/circlo-bucket/Trash/botolplastik.jpeg'),
('trash_ano_kaleng', 'trashcat-1', 'Kaleng', 'https://storage.googleapis.com/circlo-bucket/Trash/kaleng.jpeg'),
('trash_ano_kresekplastik', 'trashcat-1', 'Kresek Plastik', 'https://storage.googleapis.com/circlo-bucket/Trash/kresek.jpg'),
('trash_org_cangkangtelur', 'trashcat-2', 'Cangkang Telur', 'https://storage.googleapis.com/circlo-bucket/Trash/cangkangtelur.jpeg'),
('trash_org_kardus', 'trashcat-2', 'Kardus', 'https://storage.googleapis.com/circlo-bucket/Trash/kardus.jpg'),
('trash_org_kertas', 'trashcat-2', 'Kertas', 'https://storage.googleapis.com/circlo-bucket/Trash/kertas.jpg'),
('trash_org_sisamakanan', 'trashcat-2', 'Sisa Makanan', 'https://storage.googleapis.com/circlo-bucket/Trash/sisa%20makanan.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tutorial`
--

CREATE TABLE `tutorial` (
  `TUTORIALID` varchar(20) NOT NULL,
  `IDEASID` varchar(50) NOT NULL,
  `TITLE` text NOT NULL,
  `LINK` text NOT NULL,
  `SOURCE` text NOT NULL,
  `CREATOR` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tutorial`
--

INSERT INTO `tutorial` (`TUTORIALID`, `IDEASID`, `TITLE`, `LINK`, `SOURCE`, `CREATOR`) VALUES
('tutorial-1', 'idea-1', 'Cara Membuat Wadah Sederhana dari Botol Plastik', 'https://www.youtube.com/watch?v=nfVcmIpGB8M', 'Youtube', 'Lista Tsurayya'),
('tutorial-11', 'idea-11', 'Membuat Pot Gantung Unik Dari Botol Bekas | Ide Daur Ulang Botol Bekas', 'https://www.youtube.com/watch?v=12i38kutYq8', 'Youtube', 'Pashamran'),
('tutorial-2', 'idea-2', 'Membuat Tempat Pensil dari Kain Flanel dan Kaleng Bentuk Lebah || Ide Kreatif Tempat Pensil', 'https://www.youtube.com/watch?v=MnyFkMjjbE0', 'Youtube', 'Craft by Me'),
('tutorial-21', 'idea-21', 'DIY | LAMPU HIAS | LAMPU EMERGENCY LILIN | ANTI NYAMUK | AROMA THERAPY | KALENG MINUMAN BEKAS', 'https://www.youtube.com/watch?v=oJumKkuOi2s', 'Youtube', 'Hobi Kaleng'),
('tutorial-3', 'idea-3', 'Cara Membuat Karpet/Alas Meja dari Kantong Kresek II CatatanKakPoni', 'https://www.youtube.com/watch?v=0MeRmtClDgI', 'Youtube', 'CatatanKakPoni'),
('tutorial-4', 'idea-4', 'Cara Membuat Telur Burung Unta Menjadi Lampu! // Pengerjaan Kayu // DIY', 'https://www.youtube.com/watch?v=_jVDxWHyyYQ', 'Youtube', 'ENCurtis'),
('tutorial-41', 'idea-41', 'Kalsium ini 1000 kali lebih KUAT dari Cangkang Telur Biasa, ini KRIM CANGKANG TELUR!!', 'https://www.youtube.com/watch?v=DcDN9ZS0JZA', 'Youtube', 'BALI ORGANIK TV'),
('tutorial-5', 'idea-5', 'SIMPLE IDEAS WALL DECORATION OF PAPER-Ide Hiasan Dinding Dari Kertas', 'https://www.youtube.com/watch?v=X4mWw72RMMc', 'Youtube', 'ARKAN ALGIFARI'),
('tutorial-51', 'idea-51', 'DIY Paper Lantern | Easy Lamp with Tissue Paper | Recycle Craft Ideas', 'https://www.youtube.com/watch?v=_vhryZk7NQo&t=25s', 'Youtube', 'Craft Be 9'),
('tutorial-6', 'idea-6', 'LESTARI - Cara Mengompos Sisa Makanan di Rumah (Eps. 5)', 'https://www.youtube.com/watch?v=PkYgN3xfJ2I', 'Youtube', 'EIGER ADVENTURE'),
('tutorial-7', 'idea-7', 'cara membuat Laci Mini dari kardus', 'https://www.youtube.com/watch?v=8gtf6kOEIC0', 'Youtube', 'Dewi Ernawati');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `USERID` varchar(30) NOT NULL,
  `FIRSTNAME` text NOT NULL,
  `LASTNAME` text,
  `USERNAME` text NOT NULL,
  `EMAIL` text NOT NULL,
  `POINT` int DEFAULT NULL,
  `MAIN_ADDRESSID` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`ADDRESSID`),
  ADD KEY `FK_ADDRESS_USER_ADDR_USER` (`USERID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CATEGORIESID`);

--
-- Indexes for table `donate`
--
ALTER TABLE `donate`
  ADD PRIMARY KEY (`DONATEID`),
  ADD KEY `FK_DONATE_USER_DONA_USER` (`USERID`),
  ADD KEY `FK_DONATE.SCHEDULEID_DONATE_SCHEDULE.SCHEDULEID` (`SCHEDULEID`),
  ADD KEY `FK_DONATE.TRASHCATEGORIESID_CATEGORIES.CATEGORIESID` (`TRASHCATEGORIESID`);

--
-- Indexes for table `donate_schedule`
--
ALTER TABLE `donate_schedule`
  ADD PRIMARY KEY (`SCHEDULEID`);

--
-- Indexes for table `donate_trash_image`
--
ALTER TABLE `donate_trash_image`
  ADD PRIMARY KEY (`IMAGEID`),
  ADD KEY `FK_DONATE_TRASH_IMAGE.DONATEID_DONATE.DONATEID` (`DONATEID`);

--
-- Indexes for table `fcm_token`
--
ALTER TABLE `fcm_token`
  ADD PRIMARY KEY (`ID_TOKEN`),
  ADD KEY `FCM_TOKEN.USERID_USER.USERID` (`USERID`);

--
-- Indexes for table `ideas`
--
ALTER TABLE `ideas`
  ADD PRIMARY KEY (`IDEASID`),
  ADD KEY `FK_IDEAS_TRASH_IDE_TRASH` (`TRASHID`);

--
-- Indexes for table `ideas_benefit`
--
ALTER TABLE `ideas_benefit`
  ADD KEY `FK_IDEAS_BENEFIT.IDEASID_IDEAS.IDEASID` (`IDEASID`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`POST_ID`),
  ADD KEY `FK_POST_USER_POST_USER` (`USERID`);

--
-- Indexes for table `trash`
--
ALTER TABLE `trash`
  ADD PRIMARY KEY (`TRASHID`),
  ADD KEY `FK_TRASH_CATEGORIE_CATEGORI` (`CATEGORIESID`);

--
-- Indexes for table `tutorial`
--
ALTER TABLE `tutorial`
  ADD PRIMARY KEY (`TUTORIALID`),
  ADD KEY `FK_TUTORIAL.IDEASID_IDEAS.IDEASID` (`IDEASID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`USERID`),
  ADD KEY `FK_USER_MAIN_ADDRESSID_ADDRESS_ADDRESSID` (`MAIN_ADDRESSID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_ADDRESS_USER_ADDR_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Constraints for table `donate`
--
ALTER TABLE `donate`
  ADD CONSTRAINT `FK_DONATE.SCHEDULEID_DONATE_SCHEDULE.SCHEDULEID` FOREIGN KEY (`SCHEDULEID`) REFERENCES `donate_schedule` (`SCHEDULEID`),
  ADD CONSTRAINT `FK_DONATE.TRASHCATEGORIESID_CATEGORIES.CATEGORIESID` FOREIGN KEY (`TRASHCATEGORIESID`) REFERENCES `categories` (`CATEGORIESID`),
  ADD CONSTRAINT `FK_DONATE_USER_DONA_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Constraints for table `donate_trash_image`
--
ALTER TABLE `donate_trash_image`
  ADD CONSTRAINT `FK_DONATE_TRASH_IMAGE.DONATEID_DONATE.DONATEID` FOREIGN KEY (`DONATEID`) REFERENCES `donate` (`DONATEID`);

--
-- Constraints for table `fcm_token`
--
ALTER TABLE `fcm_token`
  ADD CONSTRAINT `FCM_TOKEN.USERID_USER.USERID` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Constraints for table `ideas`
--
ALTER TABLE `ideas`
  ADD CONSTRAINT `FK_IDEAS_TRASH_IDE_TRASH` FOREIGN KEY (`TRASHID`) REFERENCES `trash` (`TRASHID`);

--
-- Constraints for table `ideas_benefit`
--
ALTER TABLE `ideas_benefit`
  ADD CONSTRAINT `FK_IDEAS_BENEFIT.IDEASID_IDEAS.IDEASID` FOREIGN KEY (`IDEASID`) REFERENCES `ideas` (`IDEASID`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_POST_USER_POST_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Constraints for table `trash`
--
ALTER TABLE `trash`
  ADD CONSTRAINT `FK_TRASH_CATEGORIE_CATEGORI` FOREIGN KEY (`CATEGORIESID`) REFERENCES `categories` (`CATEGORIESID`);

--
-- Constraints for table `tutorial`
--
ALTER TABLE `tutorial`
  ADD CONSTRAINT `FK_TUTORIAL.IDEASID_IDEAS.IDEASID` FOREIGN KEY (`IDEASID`) REFERENCES `ideas` (`IDEASID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_USER_MAIN_ADDRESSID_ADDRESS_ADDRESSID` FOREIGN KEY (`MAIN_ADDRESSID`) REFERENCES `address` (`ADDRESSID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
