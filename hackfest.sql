-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2024 at 10:30 AM
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
  `DETAIL_ADDRESS` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`ADDRESSID`, `USERID`, `ADDRESS`, `DETAIL_ADDRESS`) VALUES
('address-vtgTcYYdTW', 'user-gh1z2hp0wG', 'Jl. Merdeka Timur No.80, Cirebon', 'Depan bank BTN');

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
  `TRASHID` varchar(50) NOT NULL,
  `USERID` varchar(30) NOT NULL,
  `DONATE_WEIGHT` float DEFAULT NULL,
  `DONATE_ADDRESS` text NOT NULL,
  `DONATE_ADDRESS_DETAIL` text DEFAULT NULL,
  `DONATE_METHOD` varchar(30) NOT NULL,
  `DONATE_STATUS` varchar(50) NOT NULL,
  `DONATE_POINT` int(11) DEFAULT NULL,
  `DONATE_TIME` datetime NOT NULL,
  `CREATED_AT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donate`
--

INSERT INTO `donate` (`DONATEID`, `TRASHID`, `USERID`, `DONATE_WEIGHT`, `DONATE_ADDRESS`, `DONATE_ADDRESS_DETAIL`, `DONATE_METHOD`, `DONATE_STATUS`, `DONATE_POINT`, `DONATE_TIME`, `CREATED_AT`) VALUES
('donate_bmaNJBFCNOQq2AAo', 'trash-ano-1', 'user-gh1z2hp0wG', NULL, 'Jl. Merdeka Timur No.80, Cirebon', 'Depan bank BTN', 'Pick Up', 'Waiting To Be Picked Up', 0, '2024-01-11 03:11:12', '2024-01-11 01:11:12'),
('donate_gLGswCSU9o_5kf3t', 'trash-ano-1', 'user-gh1z2hp0wG', NULL, 'Jl. Merdeka Timur No.80, Cirebon', 'Depan bank BTN', 'Pick Up', 'Waiting To Be Picked Up', 0, '2024-01-06 23:16:13', '2024-01-06 21:16:13');

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
  `LINK` text NOT NULL,
  `SOURCE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutorial`
--

INSERT INTO `tutorial` (`TUTORIALID`, `IDEASID`, `LINK`, `SOURCE`) VALUES
('tutorial-1', 'idea-1', 'https://www.youtube.com/watch?v=nfVcmIpGB8M', 'Youtube');

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
  ADD KEY `FK_DONATE_TRASH_DON_TRASH` (`TRASHID`),
  ADD KEY `FK_DONATE_USER_DONA_USER` (`USERID`);

--
-- Indexes for table `ideas`
--
ALTER TABLE `ideas`
  ADD PRIMARY KEY (`IDEASID`),
  ADD KEY `FK_IDEAS_TRASH_IDE_TRASH` (`TRASHID`);

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
  ADD CONSTRAINT `FK_DONATE_TRASH_DON_TRASH` FOREIGN KEY (`TRASHID`) REFERENCES `trash` (`TRASHID`),
  ADD CONSTRAINT `FK_DONATE_USER_DONA_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Constraints for table `ideas`
--
ALTER TABLE `ideas`
  ADD CONSTRAINT `FK_IDEAS_TRASH_IDE_TRASH` FOREIGN KEY (`TRASHID`) REFERENCES `trash` (`TRASHID`);

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
