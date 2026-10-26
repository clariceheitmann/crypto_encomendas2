-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_logistica
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cargas`
--

DROP TABLE IF EXISTS `cargas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargas` (
  `codCarga` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `peso` varchar(100) NOT NULL,
  `volume` varchar(100) NOT NULL,
  `codigoRastreio` varchar(100) NOT NULL,
  `idMotorista` int NOT NULL,
  PRIMARY KEY (`codCarga`),
  KEY `idMotorista` (`idMotorista`),
  CONSTRAINT `cargas_ibfk_1` FOREIGN KEY (`idMotorista`) REFERENCES `motoristas` (`codMotorista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargas`
--

LOCK TABLES `cargas` WRITE;
/*!40000 ALTER TABLE `cargas` DISABLE KEYS */;
INSERT INTO `cargas` VALUES (1,'Peças automotivas','12 kg','0.5 m3','100001',2),(2,'Equipamentos eletrônicos','25 kg','1.2 m3','100002',2),(3,'Materiais de escritório','20 kg','0.8 m3','100003',3);
/*!40000 ALTER TABLE `cargas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `cidadeDestino` varchar(100) NOT NULL,
  `statusAtual` enum('ENTREGUE','TRANSITO') NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `idCarga` int NOT NULL,
  PRIMARY KEY (`codEntrega`),
  KEY `idCarga` (`idCarga`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idCarga`) REFERENCES `cargas` (`codCarga`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,'Itapema','ENTREGUE','2026-10-25','14:00:00',1),(2,'São Paulo','TRANSITO','2026-10-05','10:30:00',2),(3,'Rio de Janeiro','TRANSITO','2026-10-15','16:00:00',3);
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `codFuncionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`codFuncionario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Marcos','marcos@gmail.com','U2FsdGVkX1/m/iABlqgLlT12C8dLx/jRxN9a1eE8RB0='),(2,'Ana','ana@gmail.com','U2FsdGVkX1/PvxFX9bhTJYoWGTtX6imVtn3aZYRGY9I='),(3,'Roberto','roberto@gmail.com','U2FsdGVkX1+fYotZuaP6tfRnvj0YFNsBiiaNp60KwJ8=');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motoristas`
--

DROP TABLE IF EXISTS `motoristas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motoristas` (
  `codMotorista` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cnh` varchar(200) NOT NULL,
  `cpf` varchar(200) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  PRIMARY KEY (`codMotorista`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motoristas`
--

LOCK TABLES `motoristas` WRITE;
/*!40000 ALTER TABLE `motoristas` DISABLE KEYS */;
INSERT INTO `motoristas` VALUES (1,'Lucas','U2FsdGVkX19pDtY1KkI+pCh2PTinA+FJSkneH7KsMYs=','U2FsdGVkX187qMSbDHCBiWmPgxoUHEM6GbbqOhPsE6s=','47999123456'),(2,'Gabriel','U2FsdGVkX18spHIjBNRj9UPZEbfTUMVxh+upeP4nF2c=','U2FsdGVkX1/mwjj9bKfWStEQjsXwoAYwyvEcj+8jEHc=','47999098765'),(3,'Murilo','U2FsdGVkX18v1AY5iuTE4HTBVTsmhO3oPOoCbku4vY8=','U2FsdGVkX196NK3n8sfyBxNy7DUqnOwau6QVMNmgtbs=','47999097643');
/*!40000 ALTER TABLE `motoristas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-26 19:47:07
