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
-- Table structure for table `programmi`
--

DROP TABLE IF EXISTS `programmi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `programmi` (
  `code` varchar(1000) DEFAULT NULL,
  `help` varchar(10000) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programmi`
--

LOCK TABLES `programmi` WRITE;
/*!40000 ALTER TABLE `programmi` DISABLE KEYS */;
INSERT INTO `programmi` VALUES (',A,V\n,B,fromM\n,b,clear\n,D,clear,\n,a,V\n,/,print\n,,S\n,B,V\n,C,fromM\n,c,clear\n,,toA\n,/,Y\n,b,toA\n,d,Z\n,B,toA\n,b,V\n9,a,fromM\n,d,clear\n,,div\n,R,toA\n,d,V\n,,toA\n,,div\n,e,V\n,A,div\n,D,fromM\n,,exchange\n,c,fromM\n,,sub\n,r,V\n5,a,fromM\n,d,sub\n,C,W\n,f,V\n,D,toA\n2,a,fromM\n,d,fromM\n,,sub\n,/,W\n,B,toA\n,,sub\n,b,sub\n,d,W\n,C,Y\n,a,W\n,,sub\n,c,W\n,C,W\n,b,W\n,,sub\n,r,W\n,A,exchange\n,/,Y\n,e,W\n3,a,fromM\n,d,exchange\n,C,W\n,f,W\n,,sum\n,D,exchange\n,B,W\n,c,fromM\n,a,Y\n,B,Y\n7,a,fromM\n,d,div\n,,toA\n,C,sub\n,c,Y\n,D,Z\n,b,Y\n,D,sub\n,A,exchange\n,d,Y\n,D,Z\n,e,Y\n,C,toA\n,D,sub\n,A,exchange\n,/,Z\n,e,Z\n,E,Z\n,c,toA\n,r,Y\n,a,div\n,C,V\n,f,Y\n,D,exchange\n,a,Z\n,c,toA\n,r,Z\n,b,toA\n,C,sum\n,b,exchange\n,B,toA\n,D,V\n,,S\n,,S\n,E,V\n,b,sub\n,c,V\n,b,print\n,R,V\n,f,Z\n,D,print\n,b,toA\n,D,sum\n,b,exchange\n,b,print\n,B,toA\n,b,sub\n,/,V\n,F,V\n,/,print\n,,S\n','Il programma del gioco è stato realizzato negli Stati Uniti in occasione del lancio della Programma 101 al BEMA show di New York del 1965.\nBenché di contenuto scherzoso non era un programma banale né in termini di gioco perché la macchina vinceva (quasi) sempre, né in termini di implementazione in quanto saturava completamente la memoria disponibile della macchina.\nNon è stato facile, a suo tempo, realizzarlo in 120 istruzioni e utilizzando solo i 5 registri numerici restanti della macchina per i dati memorizzati.<br><br>\n\n<strong>Regole del gioco</strong><br>\nSi fissa una meta da raggiungere senza superarla: un numero compreso tra 30 e 50.\nIl limite inferiore è definito solo per evitare di intuire più facilmente qualche passo dell\'algoritmo vincente, quello superiore per non rendere il gioco troppo lungo.\nL\'Avversario della P101 comincia a giocare puntando un valore corrispondente a una faccia del dado: da 1 a 6. La P101 risponde con analoga puntata\nNon è ammesso giocare la puntata precedente della controparte, né il valore corrispondente alla faccia opposta del dado, ad esempio: 1 – 6, 2 – 5, 3 – 4.\nSolo la prima puntata dell\'Avversario può essere vuota (o 0) facendo così iniziare il gioco alla P101.<br>\nVince chi raggiunge per primo esattamente la meta.<br>\nPerde chi la supera o rinuncia.<br><br>\n\n<strong>Esecuzione</strong><br>\nAccertarsi che il numero di decimali impostato a destra sia 0.<br>\nIntrodurre la meta con la tastiera e poi avviare il programma con V.<br>\nInserire la propria giocata e attendere la giocata della P101.<br>\nDopo l\'introduzione e stampa della Meta, ad ogni giocata, vengono stampate sul rotolo separate da una interlinea le terne di dati:<br>\n•	Puntata dell\'Avversario<br>\n•	Puntata della P101<br>\n•	Punteggio Totale<br>\nIl programma segnala se l\'Avversario bara, la P101 ovviamente non bara.<br>\nIl controllo di correttezza del gioco è realizzato accendendo la Luce Rossa che blocca il programma e segnalando la puntata non valida da ripetere.<br>\nNel caso di errore basta digitare il tasto clear.<br><br><br>\n\n<strong>Versioni</strong><br>\nIl programma Angela Game è stato realizzato in due versioni.<br>\nLa prima riproduce il programma realizzato per il lancio della P101 al BEMA di New York nell\'ottobre 1965. È stata sviluppata utilizzando l\'algoritmo delle puntate della P101 ricostruito dal dr. Santo, responsabile del lancio della P101 in USA,  in occasione della Mostra Per Fili e per segni tenutasi a Genova nel 2004 (v. doc. Angela_Game_algoritmo_originale).\nIl programma, denominato Angela_Game_orig, utilizza 112 istruzioni P101 su 120 disponibili.<br><br>\n\nLa seconda, si basa su una strategia di gioco più forte che riduce al minimo (quasi) assoluto il numero di casi favorevoli per le puntate dell\'avversario della macchina. Strategia e algoritmo delle puntate della P101 sono stati definiti nel marzo 2013 dall\'ing. Caprara, all\'epoca al MKTG Olivetti (vedi doc. Analisi Angela_Game e Angela_Game_algoritmo modificato).\nIl programma, denominato Angela_Game, utilizza 115 istruzioni P101 su 120 disponibili.<br><br>\n\n<strong>Programma</strong><br>\nIl programma utilizza il registro D sia per memorizzare la puntata della P101 che per contenere parte del codice.<br>\nUna caratteristica interessante della P101 è infatti la possibilità di contenere in un singolo registro sia dati che istruzioni. Ad es. il registro D (lungo 24 caratteri) può contenere un 1 carattere numerico seguito da 1 separatore e 22 istruzioni, oppure 2 caratteri numerici seguiti da 1 separatore e 21 istruzioni, ecc.\nQuesta caratteristica di fatto è stata determinante per la realizzazione del Programma Angela Game.<br>\nOggi queste particolarità fanno sorridere; le tecnologie elettroniche e informatiche dei PC ci hanno portato in un altro mondo e resi inconsciamente estremamente più esigenti.<br>\n<br>\n										G. D. S\n										30/3/2013\n','Angela Game'),(',A,W\n,B,fromM\n2,a,fromM\n,d,fromM\n,E,fromM\n10,a,fromM\n,r,S\n,D,toA\n,e,fromM\n,C,V\n,A,V\n,B,fromM\n10,a,fromM\n,r,S\n,D,toA\n,E,fromM\n2,a,fromM\n,d,fromM\n,e,fromM\n,B,V\n1,a,fromM\n,d,toA\n,D,fromM\n,C,clear\n,B,toA\n,a,V\n,e,div\n,B,exchange\n,R,toA\n,D,mult\n,C,sum\n,C,exchange\n,D,toA\n,E,mult\n,D,exchange\n,B,toA\n,/,V\n,C,print\n,C,sum\n,,S\n','Il programma è stato scritto da Giovanni De Sandre e consente di convertire numeri decimali in numeri binari e viceversa.<br>\n<strong>Range disponibili:</strong><br>\nRange dei numeri interi positivi intervallo [0, 32767].<br>\nRange dei numeri binari fino a 15 bit [0, 111111111111111].<br>\n<strong>Come si avvia</strong><br>\nImpostare il numero di decimali a zero.\nScrivere un valore decimale e digitare V; scrivere un valore binario e digitare W. Alternando V e W si vedrà lo stesso numero stampato alternativamente in decimale e in binario.\n','Convertitore Binario-Decimale'),(',A,V\n,,S\n,,toA\n,A,sum\n,A,sub\n,b,fromM\n,B,fromM\n,,S\n,,toA\n,A,sub\n,,sub\n,A,sub\n,c,fromM\n,C,fromM\n,d,fromM\n,,S\n,,toA\n,A,sum\n,D,exchange\n,A,sub\n,c,exchange\n,A,mult\n,c,exchange\n,A,sub\n,b,exchange\n,D,mult\n,D,exchange\n,A,sub\n,c,exchange\n,D,sub\n,c,V\n,A,sub\n,,sub\n,c,W\n,e,exchange\n,C,exchange\n,B,div\n,A,print\n,A,sub\n,,V\n,b,V\n,A,sqrt\n,e,exchange\n,C,exchange\n,e,sum\n,B,div\n,A,print\n,A,sub\n,d,exchange\n,e,sub\n,B,div\n,A,print\n,A,sub\n,,V\n,b,W\n,/,print\n,/,print\n,,V\n','Il programma è stato scritto da due ragazzi che stanno partecipando al progetto P101@Unicas ed è in grado di calcolare le radici di una equazione di secondo grado.<br>\n<strong>Come si avvia</strong><br>\nIl programma si avvia con il tasto V. Andranno poi inseriti in sequenza i coefficienti di una equazione del tipo ax^2 + bx + c = 0 (prima a, poi b e infine c).\n\nIl programma stamperà:\n- le soluzioni per le equazioni con discrimimante >= 0<br>\n- due linee vuote per indicare il caso di discriminante < 0 (ovvero soluzioni immaginarie)<rb>\n','Equazione di secondo grado'),(',A,V\n,,S\n,,toA\n,,mult\n,,S\n,A,print\n,b,exchange\n,,toA\n,,mult\n,A,print\n,b,sum\n,A,print\n,A,sqrt\n,A,print\n,/,print\n,,S\n','Il programma consente di applicare il teorema di pitagora per il calcolo dell\'ipotenusa, dati i cateti.<br>\nPer avviare il programma fare click su V (etichetta di avvio del programma) e poi digitare due numeri (i cateti del triangolo) seguiti da Start.<br>\nAlla fine si otterrà l\'ipotenusa.\n','Pitagora');
/*!40000 ALTER TABLE `programmi` ENABLE KEYS */;
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
