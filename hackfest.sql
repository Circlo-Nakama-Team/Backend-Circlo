-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2024 at 08:29 AM
-- Server version: 10.4.24-MariaDB
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
  `DETAIL_ADDRESS` text DEFAULT NULL,
  `TITTLE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`ADDRESSID`, `USERID`, `ADDRESS`, `DETAIL_ADDRESS`, `TITTLE`) VALUES
('address-vtgTcYYdTW', 'user-gh1z2hp0wG', 'Jl. Merdeka Timur No.80, Cirebon', 'Depan bank BTN', 'Rumah');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CATEGORIESID` varchar(20) NOT NULL,
  `CATEGORIES_NAME` text DEFAULT NULL,
  `REWARD_POINT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `DONATE_ADDRESS_DETAIL` text DEFAULT NULL,
  `DONATE_METHOD` varchar(30) NOT NULL,
  `DONATE_DESCRIPTION` text DEFAULT NULL,
  `DONATE_STATUS` varchar(50) NOT NULL,
  `DONATE_POINT` int(11) DEFAULT NULL,
  `DONATE_DATE` date NOT NULL,
  `SCHEDULEID` varchar(30) NOT NULL,
  `CREATED_AT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donate`
--

INSERT INTO `donate` (`DONATEID`, `TRASHCATEGORIESID`, `USERID`, `DONATE_WEIGHT`, `DONATE_ADDRESS`, `DONATE_ADDRESS_DETAIL`, `DONATE_METHOD`, `DONATE_DESCRIPTION`, `DONATE_STATUS`, `DONATE_POINT`, `DONATE_DATE`, `SCHEDULEID`, `CREATED_AT`) VALUES
('donate_x8EwXE1A9SasGWYa', 'trashcat-1', 'user-gh1z2hp0wG', NULL, 'Jl. Merdeka Barat No.80, Cirebon', 'Depan Bank BRI', 'Self-Delivery', '2 Kg Botol Plastik', 'Waiting To Be Delivered To Circlo Point', 0, '2024-01-15', 'sch_1', '2024-01-14 11:16:41');

-- --------------------------------------------------------

--
-- Table structure for table `donate_schedule`
--

CREATE TABLE `donate_schedule` (
  `SCHEDULEID` varchar(30) NOT NULL,
  `START_TIME` time NOT NULL,
  `END_TIME` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donate_trash_image`
--

INSERT INTO `donate_trash_image` (`IMAGEID`, `DONATEID`, `LINK`) VALUES
('donate_x8EwXE1A9SasGWYa_sWUeib', 'donate_x8EwXE1A9SasGWYa', 'https://storage.cloud.google.com/circlo-bucket/Donate/donate_x8EwXE1A9SasGWYa_sWUeib9C81_pinpng.com-firebase-png-3488129.png'),
('donate_x8EwXE1A9SasGWYa_WHzEjf', 'donate_x8EwXE1A9SasGWYa', 'https://storage.cloud.google.com/circlo-bucket/Donate/donate_x8EwXE1A9SasGWYa_WHzEjfVEkp_Circlo Cloud Infrastructure.png');

-- --------------------------------------------------------

--
-- Table structure for table `ideas`
--

CREATE TABLE `ideas` (
  `IDEASID` varchar(20) NOT NULL,
  `TRASHID` varchar(50) DEFAULT NULL,
  `IDEAS_NAME` text DEFAULT NULL,
  `IMAGE` text DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ideas`
--

INSERT INTO `ideas` (`IDEASID`, `TRASHID`, `IDEAS_NAME`, `IMAGE`, `DESCRIPTION`) VALUES
('idea-1', 'trash_ano_botolplastik', 'Wadah Serbaguna', 'https://storage.cloud.google.com/circlo-bucket/Post/file_type_tailwind_icon_130128 (1).png', 'lorem ipsum');

-- --------------------------------------------------------

--
-- Table structure for table `ideas_benefit`
--

CREATE TABLE `ideas_benefit` (
  `IDEASID` varchar(20) NOT NULL,
  `DESCRIPTION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ideas_benefit`
--

INSERT INTO `ideas_benefit` (`IDEASID`, `DESCRIPTION`) VALUES
('idea-1', 'Mengurangi sampah botol plastik'),
('idea-1', 'Meningkatkan kreatifitas'),
('idea-1', 'Menjadi ladang bisnis/penghasilan tambahan baru');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `POST_ID` varchar(30) NOT NULL,
  `USERID` varchar(30) DEFAULT NULL,
  `POST_BODY` text DEFAULT NULL,
  `POST_TIME` datetime DEFAULT NULL,
  `POST_LIKES` int(11) DEFAULT NULL,
  `POST_IMAGE` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`POST_ID`, `USERID`, `POST_BODY`, `POST_TIME`, `POST_LIKES`, `POST_IMAGE`) VALUES
('post-LJnZ990P3UHXsr05', 'user-gh1z2hp0wG', 'HALOOOOO Bro 1', '2024-01-04 01:45:17', -1, 'https://storage.cloud.google.com/circlo-bucket/Post/file_type_tailwind_icon_130128 (1).png'),
('post-xw1ypM7Mu-grn8PA', 'user-gh1z2hp0wG', 'Lorem Ipstum Dolor', '2024-01-11 01:02:34', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `trash`
--

CREATE TABLE `trash` (
  `TRASHID` varchar(50) NOT NULL,
  `CATEGORIESID` varchar(20) DEFAULT NULL,
  `TRASH_TYPE` text DEFAULT NULL,
  `IMAGE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trash`
--

INSERT INTO `trash` (`TRASHID`, `CATEGORIESID`, `TRASH_TYPE`, `IMAGE`) VALUES
('trash-ano-1', 'trashcat-1', 'Plastik', ''),
('trash-b3-1', 'trashcat-3', 'Baterai', ''),
('trash-org-1', 'trashcat-2', 'Kertas', ''),
('trash_ano_botolplastik', 'trashcat-1', 'Botol Plastik', 'https://storage.googleapis.com/circlo-bucket/Trash/botolplastik.jpeg'),
('trash_org_cangkangtelur', 'trashcat-2', 'Cangkang Telur', 'https://storage.googleapis.com/circlo-bucket/Trash/cangkangtelur.jpeg');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutorial`
--

INSERT INTO `tutorial` (`TUTORIALID`, `IDEASID`, `TITLE`, `LINK`, `SOURCE`, `CREATOR`) VALUES
('tutorial-1', 'idea-1', 'Cara Membuat Wadah Sederhana dari Botol Plastik', 'https://www.youtube.com/watch?v=nfVcmIpGB8M', 'Youtube', 'Lista Tsurayya');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `USERID` varchar(30) NOT NULL,
  `FIRSTNAME` text NOT NULL,
  `LASTNAME` text DEFAULT NULL,
  `USERNAME` text NOT NULL,
  `EMAIL` text NOT NULL,
  `POINT` int(11) DEFAULT NULL,
  `MAIN_ADDRESSID` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`USERID`, `FIRSTNAME`, `LASTNAME`, `USERNAME`, `EMAIL`, `POINT`, `MAIN_ADDRESSID`) VALUES
('user-123', 'Lakia', NULL, 'Lakia', 'lakia@gmail.com', 0, NULL),
('user-BzfpIayMTe', 'Jennie', 'Blackpink', 'Jennie', 'jennie@gmail.com', 0, NULL),
('user-gh1z2hp0wG', 'Farras', 'Harry', 'BroRas2', 'bracenolimit@gmail.com', 0, NULL);

--
-- Indexes for dumped tables
--

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
