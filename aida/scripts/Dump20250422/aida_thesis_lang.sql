-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: aida
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `thesis_lang`
--

DROP TABLE IF EXISTS `thesis_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `thesis_lang` (
  `id_thesis_lang` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1500) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `id_thesis` int(11) NOT NULL,
  PRIMARY KEY (`id_thesis_lang`),
  KEY `FKoejo2e4l5m9by0ir7h3t75xm2` (`id_thesis`),
  CONSTRAINT `FKoejo2e4l5m9by0ir7h3t75xm2` FOREIGN KEY (`id_thesis`) REFERENCES `thesis` (`id_thesis`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thesis_lang`
--

LOCK TABLES `thesis_lang` WRITE;
/*!40000 ALTER TABLE `thesis_lang` DISABLE KEYS */;
INSERT INTO `thesis_lang` VALUES (7,'L\'ingegneria del software è la disciplina tecnologica e gestionale che utilizza principi e metodologie scientifiche per la produzione e la manutenzione di prodotti software che vengono sviluppati e modificati nei tempi e nei costi preventivati. Il punto di partenza per lo sviluppo del prodotto è un\'opportunità identificata da un\'azienda per creare un prodotto con un buon potenziale commerciale. Il contratto tra il cliente e la società sviluppatrice include il documento dei requisiti che costituisce la specifica del software da produrre. Lo scopo della seguente tesi è quello di analizzare alcuni degli aspetti principali di queste metodologie e tecniche, con particolare attenzione agli aspetti più importanti: il tempo impiegato nella creazione e distribuzione del software agli utenti target e la sua qualità. In particolare verranno esplorate le fasi del ciclo di vita del software, dai requisiti alla progettazione, dalla codifica, al collaudo del prodotto e alla sua manutenzione. Nell\'ultimo capitolo verrà analizzato il caso studio della seguente tesi; costruire un\'applicazione web con Angular e Spring.','it','AIDA LAB: PROGETTAZIONE E SVILUPPO DI UNA WEB APPLICATION',4),(8,'The software engineering is the technological and managerial discipline that uses scientific principles and methodologies for the production and maintenance of soft- ware products that are developed and modified within the budgeted times and costs. The starting point for product development is an opportunity identified by a company to create a product with good commercial potential. The contract between the customer and the developer company includes the requirements doc- ument which constitutes the specification of the software to be produced. The purpose of the following thesis is to analyze some of the main aspects of these methodologies and techniques, with particular attention to the most important aspects: the time spent in the creation and distribution of the software to the target users and its quality. In particular, the phases of the software life cycle will be explored, from requirements to design, from coding, to product testing and its maintenance. In the last chapter the case study of the following thesis will be analysed; build a web application with Angular and Spring.','en','AIDA LAB: PROJECT AND DEVELOPEMENT WEB APPLICATION',4);
/*!40000 ALTER TABLE `thesis_lang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 15:34:43
