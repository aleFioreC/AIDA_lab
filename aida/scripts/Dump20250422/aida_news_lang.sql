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
-- Table structure for table `news_lang`
--

DROP TABLE IF EXISTS `news_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `news_lang` (
  `id_news_lang` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1500) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `id_news` int(11) NOT NULL,
  PRIMARY KEY (`id_news_lang`),
  KEY `FK71u1sohni40dcqktfdjp0b4rr` (`id_news`),
  CONSTRAINT `FK71u1sohni40dcqktfdjp0b4rr` FOREIGN KEY (`id_news`) REFERENCES `news` (`id_news`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_lang`
--

LOCK TABLES `news_lang` WRITE;
/*!40000 ALTER TABLE `news_lang` DISABLE KEYS */;
INSERT INTO `news_lang` VALUES (9,'Crescono gli alloggi studenteschi nella città martire. Ieri, infatti, è uscito un nuovo bando Unicas che mette a disposizione ben 24 posti nel residence Janula, in via del Foro. Un\'occasione per portare gli studenti a vivere e ad alloggiare nel pieno centro della città martire. «L\'Università di Cassino e del Lazio meridionale, in qualità di soggetto attuatore, indice una selezione per l\'assegnazione di 24 posti-alloggio in camera doppia presso la residenza universitaria Janula Residence sita a Cassino», scrive l\'Ateneo in una nota.','it','Unicas, nuovi alloggi per gli studenti. Al bando 24 posti nel residence Janula in via Primule 33',5),(10,'Student accommodation is growing in the martyr city. Yesterday, in fact, a new Unicas tender was released which makes 24 places available in the Janula residence, in via del Foro. An opportunity to bring students to live and lodge in the heart of the martyr city. \"The University of Cassino and southern Lazio, as the implementing body, is announcing a selection for the assignment of 24 accommodation places in a double room at the Janula Residence located in Cassino\", writes the University in a note .\n','en','Unicas, new student accommodation. 24 places in the Janula residence are out for tender on Primule 33',5),(33,'È l’evento annuale di orientamento alla scelta universitaria rivolto agli studenti in uscita dalle scuole superiori e a tutti coloro che sono interessati ad iscriversi o a trasferirsi presso l’ateneo. L’evento, organizzato per favorire una scelta consapevole e oculatamente orientata, è organizzato dal Centro Universitario per l’Orientamento in collaborazione con l’Ufficio Comunicazione, il Centro di Ateneo per i Servizi Informatici e le associazioni studentesche. Gli studenti possono partecipare alle numerose attività organizzate ad hoc per introdurli alla vita accademica. L’offerta didattica UNICAS viene presentata nelle stanze fisiche e virtuali, con particolare attenzione ai cinque nuovi corsi di laurea e laurea magistrale in catalogo dal prossimo anno accademico: Industrial Engineering Technology, Economia e Management del Made in Italy, Economics with Data Science, Scienze della Formazione primaria, Ingegneria Gestionale (laurea triennale)','it','Cassino – Sessione di Aprile',17),(34,'It is the annual university choice orientation event aimed at students leaving high school and all those who are interested in enrolling or transferring to the university. The event, organized to encourage an informed and carefully oriented choice, is organized by the University Center for Orientation in collaboration with the Communication Office, the University Center for IT Services and student associations. Students can participate in the numerous activities organized ad hoc to introduce them to academic life. The UNICAS educational offer is presented in physical and virtual rooms, with particular attention to the five new degree and master\'s degree courses in the catalog from next academic year: Industrial Engineering Technology, Economics and Management of Made in Italy, Economics with Data Science, of Primary Education, Management Engineering (three-year degree)\n','en','Cassino - April Session',17),(35,'Descrizione nuovi servizi web','it','Nuovi servizi web',18),(36,'Description new web services','en','New web services',18);
/*!40000 ALTER TABLE `news_lang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 15:34:44
