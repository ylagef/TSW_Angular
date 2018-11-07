-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2018 at 01:11 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `areufree`
--
DROP DATABASE IF EXISTS `areufree`;
CREATE DATABASE IF NOT EXISTS `areufree` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `areufree`;

-- --------------------------------------------------------

--
-- Table structure for table `assignations`
--

DROP TABLE IF EXISTS `assignations`;
CREATE TABLE IF NOT EXISTS `assignations` (
  `assignation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `gap_id` int(11) NOT NULL,
  PRIMARY KEY (`assignation_id`),
  KEY `gap_id` (`gap_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assignations`
--

INSERT INTO `assignations` (`assignation_id`, `user_id`, `gap_id`) VALUES
(1, 1, 1),
(2, 1, 14),
(3, 1, 3),
(4, 1, 4),
(5, 1, 6),
(6, 1, 8),
(7, 1, 10),
(8, 1, 11),
(9, 2, 1),
(10, 2, 3),
(11, 2, 5),
(12, 2, 7),
(13, 3, 1),
(14, 3, 2),
(15, 3, 4),
(16, 3, 7),
(17, 4, 2),
(18, 4, 3),
(19, 5, 2),
(20, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `gaps`
--

DROP TABLE IF EXISTS `gaps`;
CREATE TABLE IF NOT EXISTS `gaps` (
  `gap_id` int(11) NOT NULL AUTO_INCREMENT,
  `poll_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`gap_id`),
  KEY `poll_id` (`poll_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gaps`
--

INSERT INTO `gaps` (`gap_id`, `poll_id`, `start_date`, `end_date`) VALUES
(1, 1, '2018-11-06 22:00:00', '2018-11-06 23:59:00'),
(2, 1, '2018-11-07 22:00:00', '2018-11-07 23:59:00'),
(3, 1, '2018-11-08 22:00:00', '2018-11-08 23:59:00'),
(4, 1, '2018-11-09 22:00:00', '2018-11-09 23:59:00'),
(5, 2, '2018-11-10 10:00:00', '2018-11-10 12:00:00'),
(6, 2, '2018-11-10 16:00:00', '2018-11-10 18:00:00'),
(7, 3, '2018-11-01 18:00:00', '2018-11-01 20:00:00'),
(8, 3, '2018-11-02 18:00:00', '2018-11-02 20:00:00'),
(9, 4, '2018-11-03 10:00:00', '2018-11-03 21:00:00'),
(10, 4, '2018-11-04 11:00:00', '2018-11-04 21:00:00'),
(11, 5, '2018-11-10 20:00:00', '2018-11-10 22:00:00'),
(12, 5, '2018-11-11 22:00:00', '2018-11-11 23:00:00'),
(13, 6, '2018-11-20 18:00:00', '2018-11-20 22:00:00'),
(14, 6, '2018-11-22 10:00:00', '2018-11-22 14:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

DROP TABLE IF EXISTS `polls`;
CREATE TABLE IF NOT EXISTS `polls` (
  `poll_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `place` varchar(255) DEFAULT NULL,
  `author` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`poll_id`),
  UNIQUE KEY `url` (`url`),
  KEY `author` (`author`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `polls`
--

INSERT INTO `polls` (`poll_id`, `title`, `place`, `author`, `url`) VALUES
(1, 'Cena de Navidad', 'Graduado', 1, '75A75A50327C82B073970AEC7CA4A891'),
(2, 'Examen teórico TSW', 'ESEI', 2, 'DCD14BB11DD2323815D3FCA3C3E23993'),
(3, 'Solteros vs Casados', NULL, 1, 'F18773A6C56819253AD4723F79D70AE7'),
(4, 'Foro Empleo', 'Universidad de Vigo', 3, '69CC56944036C23D1DF5E5BFD7C885F9'),
(5, 'Cumpleaños Arturo', NULL, 4, 'F783FD3A37BDA054972B73608E477EAA'),
(6, 'Final Liga Universitaria', 'Gimnasio Uvigo', 3, '85D958AC151EF0695FDAF79CB013A2D5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `name`, `email`, `password`) VALUES
(1, 'ylagef', 'Yeray Lage', 'ylagef@gmail.com', '$2y$10$IREYLr/UASL47YBjmZjOfubY9EF5aX16NZTg.eLbfw4YepP7E1Ure'),
(2, 'ivanf', 'Iván Fernández', 'ivanf@gmail.com', '$2y$10$uwhCOnikRus.4DP7uGzc3OHi884j0wmxybvfKSWFn7SmZ4fxSsWqK'),
(3, 'josemim', 'Josemi Morán', 'josemim@gmail.com', '$2y$10$mp7dLV62IVQsBkJ3DyxlJOrtq0jr9LYyVmwVqGhJCQZkAC4Ez6L4W'),
(4, 'arturog', 'Arturo González', 'arturog@gmail.com', '$2y$10$GwBFRSN5oyy0pz/8rDnVa.SGJP9yHFTnAcrspqaF4SjuDP02yKP/O'),
(5, 'root', 'Ruth', 'root@root.com', '$2y$10$xtCMMIHQAS7Zm7qe8CejkuSNbFQ4WVr2SX4ys2ulUBMu9AKY08F3S');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignations`
--
ALTER TABLE `assignations`
  ADD CONSTRAINT `assignations_ibfk_1` FOREIGN KEY (`gap_id`) REFERENCES `gaps` (`gap_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `gaps`
--
ALTER TABLE `gaps`
  ADD CONSTRAINT `gaps_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`poll_id`) ON DELETE CASCADE;

--
-- Constraints for table `polls`
--
ALTER TABLE `polls`
  ADD CONSTRAINT `polls_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
