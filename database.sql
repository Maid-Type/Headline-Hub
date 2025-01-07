-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: newsletter
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `post_ID` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `author_name` varchar(25) NOT NULL,
  `created_at` date DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `image_url` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`post_ID`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`ID`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (65,'Breaking News: Tech Advances','Artificial Intelligence continues to revolutionize industries as companies adopt machine learning to optimize operations. Experts predict a significant surge in AI-driven technologies over the next decade.',1,'John Doe','2025-01-07','approved',NULL,'Technology'),(66,'Sports Update: Championship','In a nail-biting finish, the underdog team claimed the championship title after a thrilling overtime match. Fans across the globe celebrated the unexpected victory.',2,'Jane Smith','2025-01-07','approved',NULL,'Sports'),(67,'Health Alert: Flu Season','Health authorities are urging citizens to get vaccinated as flu season approaches. Officials have also advised practicing good hygiene to minimize the spread of illness.',3,'Dr. Emily White','2025-01-07','approved',NULL,'Health'),(68,'Entertainment: New Movie Release','The highly anticipated blockbuster of the year hit theaters this weekend, drawing record-breaking crowds. Critics are praising its stunning visuals and compelling storyline.',4,'Maid Mesic','2025-01-07','approved',NULL,'Entertainment'),(69,'Finance: Market Trends','The stock market saw unprecedented gains this week, driven by strong corporate earnings and investor optimism. Analysts caution, however, that volatility may still be on the horizon.',5,'Prvi Kolega','2025-01-07','approved',NULL,'Finance'),(70,'Climate Change: Rising Sea Levels','Scientists warn that rising sea levels could threaten coastal cities globally. Immediate action is required to curb carbon emissions and mitigate the impact of climate change.',1,'John Doe','2025-01-07','pending',NULL,'Environment'),(71,'Tech: New Smartphone Launch','The latest smartphone features cutting-edge technology, including an advanced camera system, longer battery life, and a sleek design, captivating tech enthusiasts worldwide.',2,'Jane Smith','2025-01-07','pending',NULL,'Technology'),(72,'World News: Diplomatic Talks','World leaders met this week to discuss international trade agreements and strategies for addressing global economic challenges.',3,'Dr. Emily White','2025-01-07','pending',NULL,'World'),(73,'Education: Online Learning Growth','The demand for online learning platforms continues to grow as students and professionals embrace flexible education opportunities from the comfort of their homes.',4,'Maid Mesic','2025-01-07','pending',NULL,'Education'),(74,'Travel: Top Destinations for 2025','Travel experts have revealed the top destinations to visit in 2025, including scenic spots, vibrant cities, and cultural landmarks.',5,'Prvi Kolega','2025-01-07','pending',NULL,'Travel'),(75,'Health: Mental Wellness Tips','Mental health professionals recommend regular exercise, mindfulness practices, and maintaining social connections to enhance mental wellness in today’s fast-paced world.',1,'John Doe','2025-01-07','pending',NULL,'Health'),(76,'Economy: Inflation Concerns','Rising inflation rates have prompted economists to urge central banks to adopt tighter monetary policies to stabilize the economy.',2,'Jane Smith','2025-01-07','pending',NULL,'Economy'),(77,'Space Exploration: Mars Mission','NASA has announced new advancements in its mission to explore Mars, including plans for a manned mission within the next decade.',3,'Dr. Emily White','2025-01-07','pending',NULL,'Science'),(78,'Local News: Community Cleanup Drive','Residents participated in a successful community cleanup drive, showcasing collective efforts to improve their neighborhood’s environment.',4,'Maid Mesic','2025-01-07','pending',NULL,'Local'),(79,'Technology: Cybersecurity Threats','Cybersecurity experts are raising alarms about increasing threats from ransomware attacks and the importance of robust security measures.',5,'Prvi Kolega','2025-01-07','pending',NULL,'Technology'),(80,'World News: Peace Agreements','Two countries reached a historic peace agreement, ending decades of conflict and opening doors to future cooperation.',1,'John Doe','2025-01-07','pending',NULL,'World'),(81,'Sports: Record-Breaking Athlete','An athlete set a new world record in the 100-meter sprint, earning praise and admiration from fans around the globe.',2,'Jane Smith','2025-01-07','pending',NULL,'Sports'),(82,'Fashion: Trends for the New Year','The fashion industry is buzzing with excitement over new trends, including sustainable materials and bold designs for 2025.',3,'Dr. Emily White','2025-01-07','pending',NULL,'Lifestyle'),(83,'Technology: Breakthrough in Quantum Computing','A major breakthrough in quantum computing is set to revolutionize data processing, with potential applications in science, medicine, and AI.',4,'Maid Mesic','2025-01-07','pending',NULL,'Science'),(84,'Entertainment: Iconic Concert Tour','A legendary musician has announced an international concert tour, thrilling fans who have been waiting for years to see them perform live.',5,'Prvi Kolega','2025-01-07','pending',NULL,'Entertainment');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(20) NOT NULL,
  `prezime` varchar(25) NOT NULL,
  `korisnicko_ime` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `sifra` varchar(255) NOT NULL,
  `is_admin` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Doe','John Doe','johndoe@gmail.com','$2y$10$OzAnzKDCnAz4cR/kH0lwfOqsk7Br9HC23iec/tEV1kwQWG9/kfMHe',0),(2,'Jane','Smith','Jane Smith','janesmith@hotmail.com','$2y$10$BZ9tacPi5Z8eke5JrCmkKuMvXJRGWS86dOp0A7yLXtQ5DXexXowAO',0),(3,'Emily ','White','Emily White','emilywhite@yahoo.com','$2y$10$6OXGQfsKG45JT6CPWrZChOaZ788Od9z.gs4d0wDY6wO865Hl5uS42',0),(4,'Maid','Mesic','Maid Mesic','maidmesic@gmail.com','$2y$10$A1tjw3PN9fhyHcvyLRQdhu5bAFa1GgrgPIFkeuoEeUZG59MhFBHGC',1),(5,'Prvi','Kolega','prvikolega','prvikolega@gmail.com','$2y$10$/hx/IPi6nI/0tVJwCOZoY.iupiUsos8EKseG9E/2Bo0GVVXG5ZmD2',0);
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

-- Dump completed on 2025-01-07 18:37:08
