-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: shoes_station
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuarios` int NOT NULL,
  `codigo` varchar(200) NOT NULL,
  `total_compras` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_carritos_usuarios` (`id_usuarios`),
  CONSTRAINT `fk_carritos_usuarios` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_productos`
--

DROP TABLE IF EXISTS `compras_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras_productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_carrito` int NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `nombre_producto` varchar(200) NOT NULL,
  `cantidad` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_compras_productos_carritos` (`id_carrito`),
  CONSTRAINT `fk_compras_productos_carritos` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_productos`
--

LOCK TABLES `compras_productos` WRITE;
/*!40000 ALTER TABLE `compras_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `img` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Adidas','logo-adidas.png'),(2,'Nike','logo-nike.png'),(3,'Under Armour','logo-UnderArmour.png');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `descuento` decimal(10,0) DEFAULT NULL,
  `genero` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(100) NOT NULL,
  `stock` decimal(10,0) NOT NULL,
  `id_marca` int NOT NULL,
  `recomendado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_marcas` (`id_marca`),
  CONSTRAINT `fk_productos_marcas` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'Zapatillas Adidas Grand Court Base       ',11999,'                                                            Diseñadas y pensadas en el deporte blanco, las zapatillas adidas Grand Court Base inspiradas en el tenis de los años 70 están confeccionadas en cuero sintético duradero y cómodo, su media suela liviana de EVA te da una amortiguación suave que te garantiza la comodidad necesaria para salir a caminar la ciudad. Además, las 3 tiras cocidas al lateral te proporcionan un look urbano y moderno característico de la marca..\r\n                                                                                                                                                                                     \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                ',0,'Hombre','img-1650378052933.jpg',45,1,1),(3,'Zapatillas Adidas X9000L3',21499,'El par más cómodo y ligero para running. Las Zapatillas adidas Coreracer ofrecen la combinación ideal de sujeción para correr y estilo urbano. Tus pisadas serán livianas en todo momento. Su diseño clásico te permitirá combinarlo con diferentes prendas y fueron confeccionados con materiales transpirables para mantener tus pies frescos.\r\n                \r\n                \r\n                ',0,'Hombre','img-1650378273554.jpg',50,1,NULL),(4,'Zapatillas Adidas X9000L2',20499,'Las Zapatillas Adidas X9000L2 son resistentes y amortiguan tus pasos para una carrera segura y amena. Tienen una capellada de mesh para permitir una mayor respiración y suela de goma, que mejora la adherencia a las superficies para que sumes kilómetros en cada salida.\r\n                ',0,'Hombre','img-1650378398730.jpg',50,1,NULL),(5,'Zapatillas Adidas Showtheway    ',10499,'Las Zapatillas Adidas Showtheway te impulsan hacia nuevos caminos a la hora de correr. El ajuste con cordones aporta estabilidad y te permite acomodarlas a vos. La capellada de malla es elástica y transpirable para mantenerte fresco durante todas tus carreras y cuenta con un refuerzo Fitframe en el mediopié para aportar durabilidad. La mediasuela de EVA mejora la comodidad de tus pasos y los amortigua para transformarse en tu calzado de running favorito.\r\n                \r\n                \r\n                \r\n                ',0,'Hombre','img-1650376050559.jpg',20,1,NULL),(6,'Zapatillas Adidas Grand Court    ',16499,'                    Las Zapatillas Adidas  te impulsan hacia nuevos caminos a la hora de correr. El ajuste con cordones aporta estabilidad y te permite acomodarlas a vos. La capellada de malla es elástica y transpirable para mantenerte fresco durante todas tus carreras y cuenta con un refuerzo Fitframe en el mediopié para aportar durabilidad. La mediasuela de EVA mejora la comodidad de tus pasos y los amortigua para transformarse en tu calzado de running favorito.\r\n                \r\n                \r\n                \r\n                ',0,'Hombre','img-1650377258451.jpg',25,1,NULL),(7,'Zapatillas Adidas Eq21 Run   ',15999,'Las Zapatillas Adidas Eq21 Run están diseñadas para los corredores más exigentes. La malla transpirable de la capellada favorece la ventilación y te ayuda a sumar más kilómetros todos los días con una comodidad superior. Su amortiguación ligera ayuda a mejorar todos tus pasos y la suela de goma aporta mayor tracción. Para mantener la estabilidad y evitar accidentes cuentan con estabilizadores de TPU en el talón y el lateral. El estilo te permite combinarlas con todo y hasta usarlas en tu día a día.\r\n                \r\n                \r\n                ',0,'Hombre','img-1650377812710.jpg',25,1,NULL),(8,'Zapatillas Adidas X9000L2   ',18499,'Las Zapatillas Adidas X9000L2 están confeccionadas en su exterior con material textil y una amortiguación Bounce flexible en la mediasuela para usarlas todo el día con el máximo confort. Este diseño se inspira en la cultura running con una pizca importante de compromiso por parte de Adidas para tener un mejor planeta. La plantilla está hecha a base de algas, ayudando a limpiar litros de agua contaminada proveniente de lagos\r\n                \r\n                \r\n                ',0,'Hombre','img-1650377907472.jpg',50,1,NULL),(9,' Zapatillas Nike Air Max Sc',17999,'                                                                                                    El clásico look Air Max se hace presente en las Zapatillas Nike Air Max Sc, pensado para lucirte con todos tus outfits. El look combina elementos deportivos y urbanos que otorgan una durabilidad única. La amortiguación Air visible mejora cada uno de tus pasos y están diseñadas para aportan una ventilación eficaz que te permitirá seguir moviéndote sin límites hacia tu próximo destino.\r\n                \r\n                \r\n                \r\n                \r\n                ',0,'Mujer','img-1650379549015.jpg',50,2,0),(10,'Zapatillas Nike ZoomX Vaporfly Next 2',45900,'                                                                                Las Zapatillas Nike ZoomX Vaporfly Next 2 contienen una espuma Nike ZoomX que proporciona un mejor retorno de energía y una respuesta inmediata para los runners más exigentes. La capellada de malla cuenta con un diseño pensado para brindar transpirabilidad en áreas donde más lo necesitas; el refuerzo a lo largo del antepié mejora el agarre y proporciona mayor estabilidad. Pensando en cuidarte, Nike incorpora una cápsula de espuma interna en el talón que mejora la amortiguación de cada uno de tus pasos, trayéndote el calzado de running perfecto\r\n                \r\n                \r\n                \r\n                ',0,'Mujer','img-1650379967146.jpg',50,2,0),(11,'Zapatillas Adidas Speedmotion',16499,'Las Zapatillas Adidas Speedmotion son perfectas para quienes aman el running en todas sus formas. Su diseño moderno combina colores claros y elegantes para optimizar tu look. La mediasuela LIGHTMOTION mejora la amortiguación y el cuello Geofit sujeta tus pies para asegurar tus pisadas siempre. El soporte en el antepié mejora tu estabilidad y te permite sumar kilómetros en pleno confort.',0,'Mujer','img-1650380129235.jpg',50,1,NULL),(12,'Zapatillas Adidas Supernova',23999,'Las Zapatillas Adidas Supernova tienen un diseño moderno y urbano, perfecto para correr por las calles de tu ciudad. La mediasuela combinada con tecnologías BOOST y Bounce optimiza la amortiguación y el retorno de energía para que tus pasos se sientan suaves y livianos. La malla de la capellada es transpirable y el talón cuenta con un detalle reflectante para que el horario no sea una limitación a la hora de preparar tus carreras',0,'Mujer','img-1650380296218.jpg',50,1,NULL),(13,'Zapatillas Adidas Showtheway',24999,'Inspiradas para deportistas, las Zapatillas adidas Showtheway son ideales para tus entrenamientos. El exterior de malla elástica en estas zapatillas es cómodo y transpirable, y la mediasuela con amortiguación ofrece apoyo al pie en cada pisada',0,'Mujer','img-1650380397053.jpg',50,1,NULL),(14,'Zapatillas Under Armour Charged      ',22499,'                                                                                                                        Para tus días de running son perfectas las Zapatillas Under Armour Charged Pursuit 2 por su diseño te harán rendir mejor en entrenamiento y carrera, mientras amortigua tus pisadas gracias a su media suela en espuma que te da estabilidad y firmeza a la hora de correr.\r\n                \r\n                \r\n                \r\n                \r\n                \r\n                \r\n                ',0,'Mujer','img-1650483570432.jpg',50,3,1),(15,'Zapatillas Under Armour Flow Velociti',21999,'Las zapatillas Under Armour Flow Velociti Wind nacieron para que alcances nuevos desafíos mientras corres. Confeccionadas con estructuras fuertes que se flexionan al momento de aplicar presión para un soporte más reactivo, generan una ligereza ideal para maratones medias y largas. La tecnología Flow bajo los pies no es más que una espuma suave que ofrece el máximo agarre en cualquier superficie. Su parte superior incluye UA Warp, una base flexible tejida con cintas de soporte inspiradas en los cinturones de seguridad.',0,'hombre','img-1650483857785.jpg',50,3,NULL),(16,'Zapatillas Under Armour Charged Pursuit 2  ',11999,'                                        Las zapatillas Under Armour Charged Pursuit 2 tienen una parte superior en Upper que brinda comodidad, flexibilidad y ligereza, mientras que en su parte posterior se compone de TPU sintético. La suela de goma facilita la tracción además de garantizar un desplazamiento y transición suave. La tecnología Charged Cushioning es más firme en el talón y más suave en el antepié para tener el nivel ideal de amortiguación y comodidad para un mejor rendimiento.\r\n                \r\n                ',0,'Hombre','img-1650483953563.jpg',45,3,NULL),(17,'Zapatillas Under Armour Ua W Charged Rogue 2  ',12599,'                                        Las zapatillas Under Armour Ua W Charged Rogue 2 son idóneas para los días que salís a entrenar, los que hacés carreras largas, incluso los que elegís descansar. Este modelo te ofrece una mayor amortiguación y comodidad, mejorando la pisada gracias a su talón superfirme que proporciona una gran sujeción y guía. Cuentan con mediasuela doble que combina Micro G® con Charged Cushioning® para conseguir el equilibrio perfecto entre comodidad y retorno de energía, suela de goma maciza que protege las zonas de mayor impacto y ofrece una mayor durabilidad. Incluye detalles reflectantes para los momentos de poca luz.\r\n                \r\n                ',12599,'Hombre','img-1650484166994.jpg',45,3,NULL),(18,'Zapatillas Under Armour Charged 2   ',22599,'                                                            Las zapatillas Under Armour Charged Pursuit 2 tienen una parte superior en Upper que brinda comodidad, flexibilidad y ligereza, mientras que en su parte posterior se compone de TPU sintético. La suela de goma facilita la tracción además de garantizar un desplazamiento y transición suave. La tecnología Charged Cushioning es más firme en el talón y más suave en el antepié para tener el nivel ideal de amortiguación y comodidad para un mejor rendimiento.\r\n                \r\n                \r\n                ',0,'Mujer','img-1650484271346.jpg',50,3,NULL),(21,'Zapatillas Nike Wildhorse 7 ',25999,'                    Las Zapatillas Nike  diseñadas para tramos cortos y entrenamiento, cuentan con una malla transpirable y una base de espuma para que cada una de tus pisadas sea más suave que la anterior. Su suela de goma aporta la tracción y estabilidad que necesitas en tu rutina.\r\n                \r\n                ',0,'Mujer','img-1650912159190.jpg',50,2,1),(22,'Zapatillas Nike Run Swift 2  ',18999,'                                        Las Zapatillas Nike  diseñadas para tramos cortos y entrenamiento, cuentan con una malla transpirable y una base de espuma para que cada una de tus pisadas sea más suave que la anterior. Su suela de goma aporta la tracción \r\n                \r\n                ',0,'Mujer','img-1650912215041.jpg',50,2,NULL),(23,'Botines Nike Zoom Vapor 14 Pro    ',23999,'                                                            Las Zapatillas Nike brindan soporte y estabilidad a tus pisadas, para que disfrutes a pleno de cada carrera y mejores tu rendimiento en cada entrenamiento. La capellada de malla y cuero sintético aporta transpirabilidad y es sumamente duradera. La tecnología Air Max ofrece una cámara de aire que amortigua y absorbe el impacto de cada paso que des para que tu andar sea más ligero y confortable.\r\n                \r\n                \r\n                ',0,'Hombre','img-1650912358394.jpg',150,2,1),(24,'Zapatillas Adidas Strutter  ',25999,'                                        El par más cómodo y ligero para running. Las Zapatillas Adidas ofrecen la combinación ideal de sujeción para correr y estilo urbano. Tus pisadas serán livianas en todo momento. Su diseño clásico te permitirá combinarlo con diferentes prendas y fueron confeccionados con materiales transpirables para mantener tus pies frescos. \r\n                \r\n                ',0,'Hombre','img-1650912421782.jpg',40,1,NULL),(25,'Zapatillas Adidas Air Max ',15899,'El par más cómodo y ligero para running. Las Zapatillas Adidas ofrecen la combinación ideal de sujeción para correr y estilo urbano. Tus pisadas serán livianas en todo momento. Su diseño clásico te permitirá combinarlo con diferentes prendas y fueron confeccionados con materiales transpirables para mantener tus pies frescos. \r\n                \r\n                \r\n                \r\n                ',0,'Hombre','img-1650912526680.jpg',80,1,NULL),(26,'Zapatillas Adidas Zoom Vapor ',24999,'El par más cómodo y ligero para running. Las Zapatillas Adidas ofrecen la combinación ideal de sujeción para correr y estilo urbano. Tus pisadas serán livianas en todo momento. Su diseño clásico te permitirá combinarlo con diferentes prendas y fueron confeccionados con materiales transpirables para mantener tus pies frescos. \r\n                \r\n                \r\n                ',0,'Mujer','img-1650912593081.jpg',90,1,NULL),(27,'Zapatillas Adidas Air Max Excee    ',17999,'                                                            El par más cómodo y ligero para running. Las Zapatillas Adidas ofrecen la combinación ideal de sujeción para correr y estilo urbano. Tus pisadas serán livianas en todo momento. Su diseño clásico te permitirá combinarlo con diferentes prendas y fueron confeccionados con materiales transpirables para mantener tus pies frescos. \r\n                \r\n                \r\n                \r\n                ',0,'Mujer','img-1650912739956.jpg',150,1,NULL),(28,'Zapatillas Under Armour Charged Vantage',18999,'Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar',0,'mujer','img-1650912969362.jpg',48,3,NULL),(29,'Zapatillas Adidas Response Run',15899,'fsfsdgdsg',0,'mujer','img-1650913039095.jpg',90,1,NULL),(30,'Zapatillas Under Armour Hovr Rise 3',16999,'Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar',0,'mujer','img-1650913232057.jpg',25,3,NULL),(31,'Zapatillas Under Armour Charged Vantage ',18999,'                    Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar\r\n                ',0,'Mujer','img-1650913317425.jpg',150,3,NULL),(32,'Zapatillas Under Armour HOVR Rise 2',16999,'Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar',0,'mujer','img-1650913411276.jpg',150,3,NULL),(33,'Zapatillas Under Armour HOVR Sonic 4 ',28999,'                    Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar\r\n                ',0,'Hombre','img-1650913478765.jpg',150,3,NULL),(34,'Zapatillas Under Armour HOVR Sonic 4',15800,'Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar',0,'hombre','img-1650914536330.jpg',150,3,NULL),(35,'Zapatillas Under Armour Charged ',14899,'Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar',0,'hombre','img-1650914588577.jpg',29,3,NULL),(36,'Zapatillas Under Armour HOVR ',18999,'                    Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar\r\n                ',0,'Mujer','img-1650914652190.jpg',80,3,0),(37,'Zapatillas Under Armour Sonic ',15999,'Supera tus propias marcas con las Zapatillas Under Armour Charged Vantage, diseñadas para lucir un estilo moderno en cualquier ocasión. Empuja tus límites hacia adelante con la tecnología Charged Cushioning®, que mejora la respuesta del calzado y su durabilidad. La malla de la capellada es liviana y transpirable y el mediopié con material sintéticos aporta estabilidad a cada uno de tus pasos. Para una tracción superior, la suela de goma cubre las zonas de alto impacto y te ayuda a lucirte en cualquier lugar',0,'hombre','img-1650914748144.jpg',35,3,NULL),(43,'Zapatillas Nike Pegasus Trail 3',28999,'Las Zapatillas Nike Pegasus Trail 3 te ayudan a volar en lugar de correr; son acolchadas, con un diseño moderno y veloz y una tracción única para que no pares de moverte. Están elaboradas para acompañarte en todo tipo de terrenos y cuentan con sostén extra en el mediopié para un agarre seguro y eficaz. La capellada cuenta con malla en áreas clave para favorecer la ventilación y la suela de goma tiene un patrón que imita las ruedas de de bicicletas de montaña para mejorar la tracción. La espuma Nike React va desde el talón hasta la punta de los pies para darte una amortiguación inigualable y una comodidad que no vas a encontrar en otro calzado de running.',0,'mujer','img-1651782443316.jpeg',10,2,NULL),(44,'Zapatillas Nike Air Max Excee S50 ',19999,'                    Lucí con estilo en tus entrenamientos o en tu día a día gracias a las Zapatillas Nike Air Max Excee S50, su tecnología Air max te brinda mejores y amortiguadas pisadas que te harán sentir seguro y confiado en cualquier momento que las lleves puestas.\r\n                ',0,'Hombre','img-1651782653635.jpeg',25,2,NULL),(45,'Zapatillas Nike Run Swift 2',15499,'Las Zapatillas Nike Run Swift 2, diseñadas para tramos cortos y entrenamiento, cuentan con una malla transpirable y una base de espuma para que cada una de tus pisadas sea más suave que la anterior. Su suela de goma aporta la tracción y estabilidad que necesitas en tu rutina.',0,'mujer','img-1652292398663.jpeg',20,2,NULL),(46,'Zapatillas Nike Downshifter 11',14499,'',0,'mujer','img-1652392377669.jpeg',50,2,NULL),(47,'Zapatillas Nike Revolution 6 Next Nature',13499,'Suma más y más kilómetros con tus Zapatillas Nike Revolution 6 Next Nature, que aportan amortiguación y confort a cada paso que des. Su capellada transpirable y suela diseñada por computadora para una mejor tracción son ideales hasta para los corredores más exigentes.',0,'hombre','img-1652985454173.jpeg',50,2,NULL),(48,'Zapatillas Nike Quest 4',16499,'Las Zapatillas Nike Quest 4 están diseñadas para transformarse en tu calzado de running favorito. Su capellada con malla transpirable mejora la sensación de contacto con tus pies. La tecnología Flywire integra filamento con las agujetas, mejorando el ajuste y con él tu estabilidad. Su entresuela de espuma agrega durabilidad y mejora la amortiguación para que sumes más y más kilómetros en pleno confort. La suela de goma aporta tracción y te ayuda a transformarte en el runner que siempre quisiste ser.',0,'hombre','img-1652986099178.jpeg',60,2,NULL),(49,'Zapatillas Nike Court Legacy S50',14498,'Un clásico modelo inspirado en el tenis y en las canchas llega para vos que tenés un look urbano y casual, las Zapatillas Nike Court Legacy Canvas construidas en lona con costuras tradicionales te da el aspecto vintage que te gusta. Los detalles de corcho en la lengüeta y la placa clásica de la licencia Swoosh en la cinta de la parte posterior del talón te dan un estilo único y característico de la marca.',0,'hombre','img-1652990674864.jpeg',50,2,1),(50,'Zapatillas Nike Zoom Winflo 8',21999,'\r\nLas zapatillas Nike Air Zoom Winflo 8 cuentan con espuma EVA para una comodidad y ligereza al contacto con la superficie. La unidad Zoom Air eleva el nivel de amortiguación para una mayor respuesta en cada paso y la suela de goma ofrece una tracción segura.',0,'hombre','img-1652991397614.jpeg',60,2,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_talles`
--

DROP TABLE IF EXISTS `productos_talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_talles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_talle` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_talles_productos` (`id_producto`),
  KEY `fk_productos_talles_talles` (`id_talle`),
  CONSTRAINT `fk_productos_talles_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `fk_productos_talles_talles` FOREIGN KEY (`id_talle`) REFERENCES `talles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=573 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_talles`
--

LOCK TABLES `productos_talles` WRITE;
/*!40000 ALTER TABLE `productos_talles` DISABLE KEYS */;
INSERT INTO `productos_talles` VALUES (147,4,2),(148,4,3),(149,4,4),(150,4,5),(151,5,10),(152,5,11),(153,5,12),(162,8,3),(163,8,4),(164,8,5),(165,8,6),(166,8,7),(176,11,2),(177,11,3),(178,11,4),(179,12,2),(180,12,3),(181,12,4),(182,13,1),(183,13,2),(184,13,4),(190,7,3),(191,7,5),(192,7,6),(193,7,8),(194,7,10),(195,6,3),(196,6,4),(197,6,5),(204,15,5),(205,15,6),(206,15,7),(285,28,2),(286,28,3),(287,28,4),(288,29,3),(289,29,4),(290,29,5),(291,30,3),(292,30,4),(293,30,5),(297,32,1),(298,32,3),(299,32,4),(300,32,5),(305,34,2),(306,34,3),(307,34,4),(308,35,1),(309,35,2),(310,35,3),(311,35,4),(315,37,3),(316,37,6),(317,37,9),(318,37,10),(319,37,11),(335,26,1),(336,26,2),(337,26,3),(338,26,5),(339,25,3),(340,25,5),(341,25,8),(342,25,12),(349,24,5),(350,24,6),(351,24,7),(352,24,8),(353,24,9),(354,24,10),(370,43,3),(371,43,1),(372,43,5),(373,43,4),(374,43,6),(375,43,2),(385,17,5),(386,17,6),(387,17,7),(407,18,3),(408,18,4),(409,18,5),(414,16,6),(415,16,7),(416,16,8),(417,16,9),(418,45,2),(419,45,3),(420,45,4),(421,45,5),(422,45,6),(423,33,2),(424,33,3),(425,33,4),(426,33,6),(427,44,5),(428,44,6),(429,44,9),(430,44,10),(431,44,11),(432,44,12),(433,31,3),(434,31,4),(435,31,5),(444,27,2),(445,27,3),(446,27,4),(447,27,5),(448,22,2),(449,22,3),(450,22,4),(451,22,5),(452,46,2),(453,46,3),(454,46,4),(455,46,5),(460,47,6),(461,47,7),(462,47,8),(463,47,9),(464,47,10),(465,48,7),(466,48,8),(467,48,9),(468,48,10),(469,48,12),(474,3,4),(475,3,7),(476,3,8),(477,3,9),(496,14,1),(497,14,2),(498,14,3),(499,14,4),(500,21,2),(501,21,3),(502,21,4),(503,21,5),(504,49,8),(505,49,9),(506,49,10),(507,49,11),(508,36,1),(509,36,3),(510,36,4),(521,23,5),(522,23,6),(523,23,7),(524,23,10),(525,23,11),(526,50,9),(527,50,10),(528,50,11),(529,50,12),(538,2,3),(539,2,4),(540,2,5),(541,2,10),(557,9,1),(558,9,3),(559,9,2),(560,9,4),(561,9,5),(569,10,1),(570,10,3),(571,10,2),(572,10,4);
/*!40000 ALTER TABLE `productos_talles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talles`
--

DROP TABLE IF EXISTS `talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talles`
--

LOCK TABLES `talles` WRITE;
/*!40000 ALTER TABLE `talles` DISABLE KEYS */;
INSERT INTO `talles` VALUES (1,35),(2,36),(3,37),(4,38),(5,39),(6,40),(7,41),(8,42),(9,43),(10,44),(11,45),(12,46);
/*!40000 ALTER TABLE `talles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `politicas` tinyint(1) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Administrador','1233','admin@email.com','$2a$10$B4LAfG3jm1dcCKDxB07TkeZwKwuYH5gv7v7dlPbsIFDRbkExeI6Ya',1,1),(2,'Pepito','Perez','123456','pepito@email.com','$2a$10$cLOJ9nRLQNgrQgLu4yhjguA0X2z.Udf0m7zEQpUjmeT/8eGdiqmbq',1,0),(3,'Julia','Alcazar','91142336','julia@email.com','$2a$10$2KOeZWC4aKRnObXPhqIASuihjN9QpZXlyrlRnLuup2nDmH8x6j0s2',1,0),(4,'as','dd','1','keila@gmail.com','$2a$10$sQF8ezgCBCXv0sb36YXGpe7eEeNstJ0itDf8QA/brJad0/jzOGoSa',0,0),(5,'','','','','$2a$10$wI//bapQbdDtquce2fH6neQK/2uQw/1cT5fLllUYy7KU4oS67GqMK',0,0),(6,'gd','gd','12345678945','sgds@email.com','$2a$10$L3WDu88vhoembBYsvSwQZ.VMLE3mNgT/lgT7XBTjI1.UEQQB/A1pe',1,0),(7,'fd','df','12345678912','fasfgasg@gmail.com','$2a$10$ZbJ/zfVV8F/sgy5NTQ3Z3OVEURdVbxvAWLgcULPNctCsCIB2NYsY2',1,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'shoes_station'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-25 17:37:38
