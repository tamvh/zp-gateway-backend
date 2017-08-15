-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 17, 2017 at 06:07 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zp_gateway`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(64) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `account_type` tinyint(3) NOT NULL DEFAULT '0',
  `app_id` int(11) NOT NULL DEFAULT 0,
  `reset` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
   PRIMARY KEY (`account_id`),
   UNIQUE KEY `account_name_app_id` (`account_name`, `app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_name`, `app_id`) VALUES
(1, 'tamvohuy', 33);

-- --------------------------------------------------------

--
-- Table structure for table `merchants`
--

CREATE TABLE `merchants` (
  `app_id` int(9) NOT NULL DEFAULT '0',
  `app_user` varchar(100) NOT NULL DEFAULT '',
  `key1` varchar(200) NOT NULL DEFAULT '',
  `key2` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `active` int(3) NOT NULL DEFAULT '0',
  `callback_url` varchar(255) NOT NULL,
  `hmac_algorithm` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `merchants`
--

INSERT INTO `merchants` (`app_id`, `app_user`, `key1`, `key2`, `description`, `active`, `callback_url`, `hmac_algorithm`) VALUES
(10, 'vpos', '', '', '', 1, 'http://test.com', 'HmacSHA256'),
(32, 'CGV Cinema', '', '', '', 1, 'http://test.com/test/cb', 'HmacSHA256'),
(33, 'Zalopay Integration', '', '', '', 1, 'http://test.com/test/cb', 'HmacSHA256'),
(34, 'SBCorp', '', '', '', 1, 'http://payment.socialtraining.vn/zalopay/ordercalback', 'HmacSHA256'),
(35, 'Giao Hàng Nhanh', '', '', '', 1, '', 'HmacSHA256'),
(36, 'Atadi', '', '', '', 1, 'http://test.com', 'HmacSHA256'),
(37, 'Máy bán hàng tự động IoT', '', '', '', 1, '', 'HmacSHA256'),
(38, 'IoT Maker', '', '', '', 1, '', 'HmacSHA256'),
(39, 'Viễn thông A', '', '', '', 1, '', 'HmacSHA256'),
(40, 'Vạn Khang', '', '', '', 1, '', 'HmacSHA256'),
(42, 'Độc đắc', '', '', '', 1, '', 'HmacSHA256'),
(43, 'Helio', '', '', '', 1, 'http://api.payment.mycafe.co/zalopay/callback', 'HmacSHA256');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(10) NOT NULL,
  `app_id` int(9) NOT NULL,
  `app_user` varchar(100) NOT NULL,
  `app_time` timestamp NULL DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `app_trans_id` varchar(50) NOT NULL,
  `zptransid` varchar(64) NOT NULL,
  `description` varchar(100) NOT NULL,
  `item` varchar(256) NOT NULL DEFAULT '',
  `embed_data` varchar(1024) NOT NULL DEFAULT '',
  `mac` varchar(256) NOT NULL,
  `create_order_time` timestamp NULL DEFAULT NULL,
  `payment_time` timestamp NULL DEFAULT NULL,
  `payment_status` int(3) NOT NULL DEFAULT '-1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `app_id`, `app_user`, `app_time`, `amount`, `app_trans_id`, `zptransid`, `description`, `item`, `embed_data`, `mac`, `create_order_time`, `payment_time`, `payment_status`) VALUES
(1, 33, 'Zalopay Integration', '2017-04-17 16:08:01', '2000', '170404120630', '170404000000350', 'hello', 'cơm', '123456', '7cb893e443f0f9ed73467479ecb3b98227789418fb4bab153891b20ac74bb54c', '2017-04-17 05:08:56', '2017-04-17 09:12:43', 1),
(2, 33, 'Zalopay Integration', '2017-04-17 05:08:56', '10000', '170404120631', '170404000000351', 'description', 'cơm', '123456', '7cb893e443f0f9ed73467479ecb3b98227789418fb4bab153891b20ac74bb54c', '2017-04-17 05:08:56', '2017-04-17 05:08:56', 1),
(3, 33, 'Zalopay Integration', '2017-04-17 05:09:56', '10000', '170404120632', '170404000000352', 'description', 'cơm', '123456', '7cb893e443f0f9ed73467479ecb3b98227789418fb4bab153891b20ac74bb54c', '2017-04-17 05:09:56', '2017-04-17 05:09:56', 1),
(4, 33, 'Zalopay Integration', '2017-04-17 05:10:56', '10000', '170404120633', '170404000000353', 'description', 'cơm', '123456', '7cb893e443f0f9ed73467479ecb3b98227789418fb4bab153891b20ac74bb54c', '2017-04-17 05:10:56', '2017-04-17 05:10:56', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `merchants`
--
ALTER TABLE `merchants`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
