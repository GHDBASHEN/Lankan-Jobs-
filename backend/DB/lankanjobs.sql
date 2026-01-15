-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: lankanjobs
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `seeker_id` int NOT NULL,
  `application_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Pending','Accepted','Rejected') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`application_id`),
  UNIQUE KEY `unique_application` (`job_id`,`seeker_id`),
  KEY `fk_app_seeker` (`seeker_id`),
  CONSTRAINT `fk_app_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_app_seeker` FOREIGN KEY (`seeker_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (9,6,1,'2025-08-17 17:07:32','Pending');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `employer_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `job_type` enum('Full-time','Part-time','Remote','Contract','Internship') NOT NULL,
  `posted_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Open','Closed') NOT NULL DEFAULT 'Open',
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `fk_jobs_employer` (`employer_id`),
  CONSTRAINT `fk_jobs_employer` FOREIGN KEY (`employer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (6,2,'Assistant Lecturer – IT','Deadline :- 23rd August 2025\r\n\r\nTEACH THE FUTURE OF IT!\r\nJoin IEBT CAMPUS as an Assistant Lecturer in IT\r\n\r\nHND or equivalent qualification\r\n1+ year teaching experience\r\nExcellent communication skills\r\nReady to inspire students and grow your career?\r\n\r\nApply now by sending your resume and cover letter to hr@iebtcampus.lk\r\n\r\nMawanella Job Vacancy\r\n\r\nsri Lanka IT job vacancy\r\n\r\nIEBT Campus\r\n\r\nSri Lanka lecturer Job Vacancy','Mawanella',20000.00,'Full-time','2025-08-17 17:02:46','Open','/uploads/1755430366765-IMG-20250816-WA0055-1009x1024.jpg'),(7,2,'Internship – Web Developer','Deadline:- 25th August 2025\r\n\r\nWe’re Hiring – Web Developer Intern (Hybrid, Batticaloa, Sri Lanka)\r\n\r\nAre you passionate about web development and eager to kickstart your career?\r\n\r\nApply here: – https://docs.google.com/forms/d/e/1FAIpQLSeDnGPSnh9LlVNPKD-Oxt37G0n7N0_4ETqi7R101DoKj95byQ/viewform\r\n\r\nLet’s build the future together!\r\n\r\nBatticaloa Sri Lanka\r\n\r\nsri Lanka internship job vacancy\r\n\r\nSri Lanka remote , Onsite Job Vacancy\r\n\r\nAt INXCODE PVT LTD, we value creativity, adaptability, and teamwork. This is your opportunity to gain real-world experience, work with modern frameworks like React & Tailwind, and learn directly from experienced developers.\r\n\r\nWhat we’re looking for:-\r\n\r\nUndergraduate students in CS/IT/Software Engineering\r\n\r\nBasic knowledge of React.js, Bootstrap, and Tailwind CSS\r\n\r\nFamiliarity with HTML5, JavaScript & responsive design\r\n\r\nAdaptability and eagerness to learn\r\n\r\nWhat we offer:\r\n\r\nHands-on project experience\r\n\r\nMentorship from industry experts\r\n\r\nA collaborative and innovative work culture\r\n\r\nA clear pathway to a permanent role\r\n\r\nApplication Deadline: 25th August 2025','Batticaloa',75000.00,'Full-time','2025-08-17 17:05:53','Open','/uploads/1755430553319-Screenshot_2025-08-17-09-59-49-94_254de13a4bc8758c9908fff1f73e37252-1024x1021.jpg');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resumes`
--

DROP TABLE IF EXISTS `resumes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resumes` (
  `resume_id` int NOT NULL AUTO_INCREMENT,
  `seeker_id` int NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`resume_id`),
  KEY `fk_resume_seeker` (`seeker_id`),
  CONSTRAINT `fk_resume_seeker` FOREIGN KEY (`seeker_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resumes`
--

LOCK TABLES `resumes` WRITE;
/*!40000 ALTER TABLE `resumes` DISABLE KEYS */;
INSERT INTO `resumes` VALUES (1,1,'/uploads/1755416403843-Resume.pdf','2025-08-13 15:54:50');
/*!40000 ALTER TABLE `resumes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `user_type` enum('Job Seeker','Employer','Admin') NOT NULL,
  `date_joined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ghdb ashen','ghdbashen@gmail.com','$2a$10$QLnkBXAnkKnC6i0ekThmLOpUoFTZ4I7v86A8zmBNa6EeEEtuG5KSq','0779754633','Job Seeker','2025-08-13 01:03:59',NULL),(2,'Dasun Perera','ghdbashen1@outlook.com','$2a$10$uSU7E7DewOyaN5c8RV4Ce.BqAN1nhxVXm6r1iup0qw1Z3f0lIUHGq','0754257494','Employer','2025-08-13 01:04:41',NULL),(3,'Sandali Anushka Wickramasinghe','sandali_20211020@fot.ruh.ac.lk','$2a$10$rstby8Bnb9FJgkCN3DI/Zu1Pz//KWo4hkmQRX3atsUCGaYx.wu5lq','0742315099','Employer','2025-08-17 13:55:54',NULL),(5,'Ashoka','bashithashen2021@gmail.com','$2a$10$j0oMlf1WSsAcyz4f.adkVOLiwSaRwXnTUzJddGfS4eTYCCq.dZbP2','0774943389','Admin','2025-08-18 17:26:25',NULL),(6,'dilshan','earangierangi@gmail.com','$2a$10$Omc8hJmvHqhLkHK011mjXe8Cz7zZstvyxJsAZBN20GuGUPw1CjDcO','0742315099','Admin','2025-08-18 19:46:28',NULL),(7,'raviya','ghdbashe@outlook.com','$2a$10$Wdc/pxTdqq2c2T1UUnDleulwcrg2wKzAQgpYXOUDfp1d5ZSBb5TUS','0754257494','Employer','2025-08-22 16:06:59',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-15 13:47:27
