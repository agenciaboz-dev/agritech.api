-- MySQL dump 10.19  Distrib 10.3.39-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: agritech
-- ------------------------------------------------------
-- Server version	10.3.39-MariaDB-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` (`id`, `street`, `district`, `number`, `cep`, `city`, `uf`, `adjunct`, `userId`, `tillageId`) VALUES (1,'Cumque doloremque si','In ipsa do nemo vel','388','34554','Ipsa minus eligendi','AP','',1,NULL),(2,'','','','80.230-085','Tempor asperiores du','','',NULL,1),(3,'Ut impedit irure ad','Ab dolor possimus a','796','34634','Labore rerum labore ','AL','',3,NULL),(4,'Qui quia deserunt ev','Sit quibusdam minim','478','35532','Tempore ut dicta do','AC','',4,NULL),(5,'Sapiente et delectus','Tempor perspiciatis','24','3254355','Suscipit anim volupt','AC','',5,NULL);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Bank`
--

LOCK TABLES `Bank` WRITE;
/*!40000 ALTER TABLE `Bank` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Calendar`
--

LOCK TABLES `Calendar` WRITE;
/*!40000 ALTER TABLE `Calendar` DISABLE KEYS */;
INSERT INTO `Calendar` (`id`, `name`, `employeeId`, `kitId`) VALUES (1,'Calendário do Kit Abraham Wallace',NULL,1);
/*!40000 ALTER TABLE `Calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Call`
--

LOCK TABLES `Call` WRITE;
/*!40000 ALTER TABLE `Call` DISABLE KEYS */;
INSERT INTO `Call` (`id`, `open`, `finish`, `kitId`, `init`, `producerId`, `approved`, `comments`, `userId`, `status`, `stage`, `totalPrice`, `forecast`, `talhaoId`) VALUES (3,'1707137555500','',1,'1707140098286',1,1,'',5,'INPROGRESS','STAGE1',0,'',1),(4,'1707137767260','',NULL,'',1,0,'',5,'OPEN','STAGE0',0,'',1),(5,'1707137775750','',NULL,'',1,0,'',5,'OPEN','STAGE0',0,'',2),(6,'1707139176458','',NULL,'',1,0,'',5,'OPEN','STAGE0',0,'',3);
/*!40000 ALTER TABLE `Call` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Chat`
--

LOCK TABLES `Chat` WRITE;
/*!40000 ALTER TABLE `Chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `Chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Coordinate`
--

LOCK TABLES `Coordinate` WRITE;
/*!40000 ALTER TABLE `Coordinate` DISABLE KEYS */;
INSERT INTO `Coordinate` (`id`, `x`, `y`, `tillageId`, `talhaoId`) VALUES (1,'-25.43557694131659','-49.2732983285805',1,NULL),(2,'-25.43644865213271','-49.275508468808766',1,NULL),(3,'-25.4356544269779','-49.27331978625262',1,NULL),(4,'-25.431625106507994','-49.27357727831805',1,NULL);
/*!40000 ALTER TABLE `Coordinate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` (`id`, `rg`, `gender`, `relationship`, `nationality`, `voter_card`, `work_card`, `military`, `residence`, `office`, `userid`) VALUES (1,'15586902700','Feminino','Casado(a)','Reprehenderit dolor','Quia consequuntur ne','Autem tempor sint pa','','','',3),(2,'61691567946','Feminino','Casado(a)','Facilis magni evenie','Voluptatem dolore do','Debitis quae in qui ','','','',4),(3,'8116107770','Feminino','Casado(a)','Saepe non qui cupidi','Nulla laboriosam te','Enim eos sunt aut a','','','',5);
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Flight`
--

LOCK TABLES `Flight` WRITE;
/*!40000 ALTER TABLE `Flight` DISABLE KEYS */;
/*!40000 ALTER TABLE `Flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Gallery`
--

LOCK TABLES `Gallery` WRITE;
/*!40000 ALTER TABLE `Gallery` DISABLE KEYS */;
/*!40000 ALTER TABLE `Gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `GalleryImage`
--

LOCK TABLES `GalleryImage` WRITE;
/*!40000 ALTER TABLE `GalleryImage` DISABLE KEYS */;
/*!40000 ALTER TABLE `GalleryImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Kit`
--

LOCK TABLES `Kit` WRITE;
/*!40000 ALTER TABLE `Kit` DISABLE KEYS */;
INSERT INTO `Kit` (`id`, `name`, `description`, `image`, `active`, `hectareDay`) VALUES (1,'Dji Inspire','Asperiores animi al',NULL,1,258);
/*!40000 ALTER TABLE `Kit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Material`
--

LOCK TABLES `Material` WRITE;
/*!40000 ALTER TABLE `Material` DISABLE KEYS */;
/*!40000 ALTER TABLE `Material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Object`
--

LOCK TABLES `Object` WRITE;
/*!40000 ALTER TABLE `Object` DISABLE KEYS */;
INSERT INTO `Object` (`id`, `name`, `description`, `quantity`, `kitId`) VALUES (1,'Signe Frazier','In placeat modi ips',817,1);
/*!40000 ALTER TABLE `Object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Operation`
--

LOCK TABLES `Operation` WRITE;
/*!40000 ALTER TABLE `Operation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Operation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Producer`
--

LOCK TABLES `Producer` WRITE;
/*!40000 ALTER TABLE `Producer` DISABLE KEYS */;
INSERT INTO `Producer` (`id`, `cnpj`, `contract`, `userid`, `employeeId`, `hectarePrice`) VALUES (1,'23456',0,1,NULL,85);
/*!40000 ALTER TABLE `Producer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Professional`
--

LOCK TABLES `Professional` WRITE;
/*!40000 ALTER TABLE `Professional` DISABLE KEYS */;
/*!40000 ALTER TABLE `Professional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Report`
--

LOCK TABLES `Report` WRITE;
/*!40000 ALTER TABLE `Report` DISABLE KEYS */;
/*!40000 ALTER TABLE `Report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Stage`
--

LOCK TABLES `Stage` WRITE;
/*!40000 ALTER TABLE `Stage` DISABLE KEYS */;
INSERT INTO `Stage` (`id`, `name`, `date`, `start`, `finish`, `duration`, `comments`, `callId`) VALUES (1,'STAGE1',NULL,NULL,NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `Stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Talhao`
--

LOCK TABLES `Talhao` WRITE;
/*!40000 ALTER TABLE `Talhao` DISABLE KEYS */;
INSERT INTO `Talhao` (`id`, `name`, `area`, `tillageId`) VALUES (1,'Rama Kline',28,1),(2,'Gabriel Duffy',589,1),(3,'Zena Glenn',256,1);
/*!40000 ALTER TABLE `Talhao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `TechReport`
--

LOCK TABLES `TechReport` WRITE;
/*!40000 ALTER TABLE `TechReport` DISABLE KEYS */;
/*!40000 ALTER TABLE `TechReport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Tillage`
--

LOCK TABLES `Tillage` WRITE;
/*!40000 ALTER TABLE `Tillage` DISABLE KEYS */;
INSERT INTO `Tillage` (`id`, `name`, `area`, `owner`, `ceo`, `manager`, `agronomist`, `technician`, `pilot`, `others`, `comments`, `producerId`) VALUES (1,'Yetta Leon',250,'Chaim Sloan','Dicta ut debitis vol','Consequuntur distinc','Sequi at atque assum','Harum nostrum ea eos','','Aperiam enim ea dele','',1);
/*!40000 ALTER TABLE `Tillage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Treatment`
--

LOCK TABLES `Treatment` WRITE;
/*!40000 ALTER TABLE `Treatment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` (`id`, `name`, `cpf`, `birth`, `phone`, `image`, `username`, `email`, `password`, `isAdmin`, `approved`, `rejected`, `office`) VALUES (1,'Chaim Sloan','87455454546','1987-02-21','1253543',NULL,'cliente','jotivunu@mailinator.com','123',0,1,NULL,''),(3,'Driscoll Fisher','588787','1987-02-21','435345',NULL,'nyjife','gizobil@mailinator.com','Pa$$w0rd!',0,1,NULL,'pilot'),(4,'Miranda Franklin','424565','1987-02-21','34523',NULL,'employee','wosywo@mailinator.com','123',0,1,NULL,'copilot'),(5,'ADM','878455454','1987-02-21','345234',NULL,'adm','vezaxa@mailinator.com','123',1,0,NULL,'seller');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `_ChatToUser`
--

LOCK TABLES `_ChatToUser` WRITE;
/*!40000 ALTER TABLE `_ChatToUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `_ChatToUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `_EmployeeToKit`
--

LOCK TABLES `_EmployeeToKit` WRITE;
/*!40000 ALTER TABLE `_EmployeeToKit` DISABLE KEYS */;
INSERT INTO `_EmployeeToKit` (`A`, `B`) VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `_EmployeeToKit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES ('04005354-8f92-42c6-881e-aa2b9dea99b6','db76a436db172e6a99bc410d6a9f4e27d289e23df5219961c97c741029e68dd5','2024-02-05 12:44:57.802','20240130114359_',NULL,NULL,'2024-02-05 12:44:57.645',1),('042a73e4-eebd-4c9f-b5d8-28d9ccf5e96d','7675b65e1e4652ebefefe22e51ac67f68a9bf489f9a86adc05c640cdfc9f907e','2024-02-05 12:44:54.038','20240104162440_',NULL,NULL,'2024-02-05 12:44:53.927',1),('047a8da6-d55c-471e-8e54-5a24a40cca1f','416ef127155c9f7b35a8f1ef5dbbca272aee9f392f6fe30105d2f7670e94b4b1','2024-02-05 12:44:59.128','20240201142853_',NULL,NULL,'2024-02-05 12:44:59.011',1),('07e52fbd-482a-4a6f-9acc-9e4b054eb6b7','0b11461d0df9e842a1c122aca034a84354336739277cba694f411a3d7289acc5','2024-02-05 12:44:56.805','20240126113843_types_material',NULL,NULL,'2024-02-05 12:44:56.734',1),('0a6380e0-bef7-46d2-8206-f9f027abaf29','9afb48c436e66ad4d493a74f444a0f4b27aa555ae7757e16e07a6421b5cf3c80','2024-02-05 12:44:52.950','20231227190251_',NULL,NULL,'2024-02-05 12:44:51.587',1),('0ae5bf1c-235c-4a6c-9a46-0fdd4731b533','55910eddae0a9c633c6e8e830ac44f4db98c733072c421269266352f8734c16e','2024-02-05 12:44:54.392','20240109120853_added_producer_id',NULL,NULL,'2024-02-05 12:44:54.310',1),('0bd343e3-6f8c-4592-a593-dd89375fe10a','49f699999bca53859c5e527051617d81b733afdf818666848043e8adb1f787d3','2024-02-05 12:44:58.992','20240201132920_',NULL,NULL,'2024-02-05 12:44:58.751',1),('0d2c4754-4d0e-4246-9b80-09fd71c866e2','a3753bef2e76c2b6e855f89f2e8207e724f2a620b707500df29f69af66da9ec4','2024-02-05 12:44:56.928','20240126114437_int_hectare_price',NULL,NULL,'2024-02-05 12:44:56.821',1),('10798f6a-20fe-4280-b342-62943155dede','ada91d01ba21b2213868a6b89556bc91fa3041f2577f25c6791dd41edb5d4f96','2024-02-05 12:44:53.592','20240102173533_',NULL,NULL,'2024-02-05 12:44:53.526',1),('1dad0d7e-376e-4c1d-bc39-65ca8bba0977','277f5515571ed81d56e88e9a9028b44ab06e05f17805917e5f8b2f6a00bc0ded','2024-02-05 12:44:58.638','20240131175918_date_hour_techreport',NULL,NULL,'2024-02-05 12:44:58.514',1),('23038067-959e-4999-94ac-78e9e94c158e','d60149cd8943da3ca3ddf7711f6fa615a68531c00ee425ddbf95085caaf1f22a','2024-02-05 12:44:57.350','20240129112425_comment_material',NULL,NULL,'2024-02-05 12:44:57.285',1),('247912f6-21c1-4e27-9540-8c78d1f207b0','a25f6511dec2537a361633dbede23ceb0a2d2f18aa956d9bcf76d52d3bd5c0c3','2024-02-05 12:44:55.310','20240112104347_fix_nxm_kit_id_employee',NULL,NULL,'2024-02-05 12:44:55.143',1),('25dadf55-d08d-403a-9c7d-0bd2dd766d4e','cd56fa84a452f35cf1a557f643faefd3dac84856551481c639d837079f0061ac','2024-02-05 12:44:57.925','20240130175726_add_date_hour_report',NULL,NULL,'2024-02-05 12:44:57.877',1),('2e9c8dbc-b591-4bb6-953b-f74396e3bc05','fe56bcf994b64a1341ffe56a7c2eee39bcacae5f8c5a71e18f83ea1101c3be2b','2024-02-05 12:44:56.540','20240122170322_',NULL,NULL,'2024-02-05 12:44:56.458',1),('36e05a1f-e6e9-479d-a586-4196cd076651','57447a4cb4f59259239284b565c56db9075cbad987f2fad238691d29a2fb2fb1','2024-02-05 12:44:54.779','20240111175230_added_kit_id',NULL,NULL,'2024-02-05 12:44:54.685',1),('3ee3ed8a-a7d8-47aa-9d13-41a897ecddd0','c33ee48641e74b5e90c77cdc33ac5280e6821ce62ed3f80cb4e8cae0ddd0fb7e','2024-02-05 12:44:58.254','20240131125411_add_area_t',NULL,NULL,'2024-02-05 12:44:58.203',1),('41103cff-a12d-4546-94e4-1476a7e42ac2','25828dc319452b960e99f86c32b768b207bc528fe41af8a89fe8ef9b50f58e5d','2024-02-05 12:44:56.006','20240116110929_added_relation_call_tillage',NULL,NULL,'2024-02-05 12:44:55.920',1),('457973bb-1f6d-4d60-88e4-4fdaac6a9937','8f6a4f1ffcf9b0141f69cf309425f1f86d5d19b7932b90e3715c529913b23f27','2024-02-05 12:44:55.130','20240112101952_many_to_many_k_it_employee',NULL,NULL,'2024-02-05 12:44:54.967',1),('4d4cc257-6064-44f3-9b00-2d15214aa773','0e73bee9827f2ac12f4f1887409a3b1dae9f1bdd7c373812b3d6d610c20f81b8','2024-02-05 12:44:55.612','20240115160116_added_approved_comments',NULL,NULL,'2024-02-05 12:44:55.566',1),('514e9b63-8047-47c9-91c3-f5fcf0305c88','ac72427f3e34439f5b3b918c5287b8e46a17f44c5e20ab0adabe99f0ac465fc4','2024-02-05 12:44:58.410','20240131140457_date_hour_call',NULL,NULL,'2024-02-05 12:44:58.268',1),('51cf5b40-ac9d-4549-ad6d-7e49d063885a','4943652d242aabbf6d31e526b73902ffd73a1bd9f349dbdb0fc8ee2e0588cc50','2024-02-05 12:44:56.720','20240125121913_add_unit_products',NULL,NULL,'2024-02-05 12:44:56.678',1),('5c22fb85-621e-43e9-995c-a0077597e1f0','880a0c6c5cceed0dc934d592d7ab4a2dc0c7e2d2bb10828505342eb5e0b67978','2024-02-05 12:44:54.118','20240109105340_remove_tillage_id_temporaly',NULL,NULL,'2024-02-05 12:44:54.052',1),('60bec79f-48c2-45cd-8309-1129240c3972','6e0f1218af5dcb0515cf82795fba998bd663e9e92f5295972d96d21bca985a71','2024-02-05 12:45:11.786','20240205124511_rv_unique',NULL,NULL,'2024-02-05 12:45:11.709',1),('66843e5f-f991-47ca-8f30-374873e8f2f5','5e58b30c44b714e5317e0b2e1ae5c9d81920b643113b319d3f588adcc2ce2967','2024-02-05 12:44:53.411','20231228140817_',NULL,NULL,'2024-02-05 12:44:53.365',1),('670a1e85-1ae1-486a-8e1f-e4ed217dfc54','9608ccbe8a62961677b4875c57d084e07e7d93417d4c01fe017234c33550c5a6','2024-02-05 12:44:54.953','20240112095458_added_kit_id',NULL,NULL,'2024-02-05 12:44:54.876',1),('6b5f0cb6-186a-453a-a771-be7f8226c14e','5d07757a69d39fe75bbe7a001a61af81a58eeb14bf26c828ac9a277a278d0467','2024-02-05 12:44:57.568','20240129141523_',NULL,NULL,'2024-02-05 12:44:57.457',1),('6bda22f3-cc7c-4684-9035-2aab20430474','b6bc644b226cf36239e1bd594a83b9471237dc28c29e00bb731f88587f81744b','2024-02-05 12:44:55.905','20240116101158_added_active_kit',NULL,NULL,'2024-02-05 12:44:55.858',1),('6d34b26d-6638-4c6f-b5b2-db291c7089f3','8c7709e163e3fc46e9c189695c5a5b581f36694dbd1236a7827c5a8c581f5b3d','2024-02-05 12:44:58.187','20240131124542_rv_temporaly_area_t',NULL,NULL,'2024-02-05 12:44:58.121',1),('701bfe07-e251-4cf6-8266-817dde159f3f','8c25cb0738069cdc03bb5a63bad35d1aa0210d0f920cce287f4248e66e74e37c','2024-02-05 13:35:04.455','20240205122254_is_manager_added_to_user_model',NULL,NULL,'2024-02-05 13:35:03.867',1),('78abab65-fb39-4ad2-8dc4-22b0f2d25cbd','4bb2ff27b2d71bf03bcdd7cc6065f1ecfc091944f82c1a458e92d3a3ae75f763','2024-02-05 12:44:53.910','20240104155601_',NULL,NULL,'2024-02-05 12:44:53.826',1),('78fdce4a-e1eb-4d59-a87e-8a8e20e974b4','e8ed96e9461fb67923bddf70f42098996dc7ad4a5fee80056e65fafba0386392','2024-02-05 13:36:50.315','20240205133649_',NULL,NULL,'2024-02-05 13:36:49.872',1),('7aeaea52-a5b0-474c-92b8-a6bf380f44e4','eca339a2503c84bcbb0d84bcdbe58be306c9bfc246a6b313e80a90b47339890a','2024-02-05 12:44:56.444','20240118165039_',NULL,NULL,'2024-02-05 12:44:56.401',1),('7c5e742a-1dd9-47f1-b930-5ec38336b391','46e1ca96b2198bda33aa8a20f734d47ddf2a8ca8b35a454fbc78395295333da1','2024-02-05 12:44:54.580','20240111104250_added_emplyee_id',NULL,NULL,'2024-02-05 12:44:54.493',1),('7e308adb-d7d1-4a62-b2ee-586431c142dd','197142795954fea328038099d4dfd4f73d8be92b5a3b7c006abac4d0c82ca70c','2024-02-05 12:44:57.094','20240126180558_removeproducer_report',NULL,NULL,'2024-02-05 12:44:57.026',1),('88e763c0-b982-40c2-81ba-6660e15b3810','2aef2485180f1e683cd994d2781f925e9d0467cb97c6b68321796b43bb806d2b','2024-02-05 12:44:53.679','20240104131739_',NULL,NULL,'2024-02-05 12:44:53.607',1),('8be49b6a-5c28-42a8-8e77-d73c9180c86c','d3dd19350d6df64cf7e0105e7924a9efe53af41c9d5e06edad9ac2d698413435','2024-02-05 12:44:59.221','20240201160655_',NULL,NULL,'2024-02-05 12:44:59.150',1),('947916f0-6b15-4a68-af4a-87f7170adb0d','e038b9dbea2c8516d4e60e4b4220fe5707b37bbeff0a2b5281917748f833bd65','2024-02-05 12:44:54.858','20240112095405_remove_unique_kit_id',NULL,NULL,'2024-02-05 12:44:54.795',1),('97f9ddfa-713d-4f20-a1d3-5cb3b7ca170d','c33ee48641e74b5e90c77cdc33ac5280e6821ce62ed3f80cb4e8cae0ddd0fb7e','2024-02-05 12:44:57.864','20240130172812_add_area_trabalhada',NULL,NULL,'2024-02-05 12:44:57.818',1),('99fa76dd-70ab-48fe-904e-20a0baf9a530','eb22bf229ee1c98c6afe2315f6171b4bd2587040d1ac0a31db78a7b84125ebe8','2024-02-05 12:44:57.444','20240129112540_remove_unique',NULL,NULL,'2024-02-05 12:44:57.364',1),('9baada90-5bdf-4ae6-aaec-e31c107377ee','1c4b649009f22df2c82342802d039135255a9deb5bd08c7eb536b9ec8ddba675','2024-02-05 12:44:57.629','20240129164535_added_hectare_day',NULL,NULL,'2024-02-05 12:44:57.584',1),('a322ac80-3019-4250-aad1-a2f4ae4dd3d2','ef7b5294c4c9fbebf8230bcef802f0ded12920dfb8abf148ad6907d89ba70f06','2024-02-05 12:44:59.355','20240202124843_area_float_tillage_talhao',NULL,NULL,'2024-02-05 12:44:59.235',1),('a4bef2cc-054a-4621-91f6-d711c287ce2e','d1203fff33b093f9626b6a157378d7fe4dcedc1130ee9f16abfa5427a5468168','2024-02-05 12:44:58.501','20240131140649_date_hour_optional_call',NULL,NULL,'2024-02-05 12:44:58.426',1),('b320acdb-ac8b-47a7-8c23-615cba8b534a','f517e815969144481c0043994cead3153766e41966f8914eb6645b386e774ae2','2024-02-05 12:44:55.843','20240115161739_fix_user_id_call',NULL,NULL,'2024-02-05 12:44:55.751',1),('b72e2ed2-1d22-46d6-927e-d23aa421a7d2','9376ab3676168587f2fee6042f630b2aab0adbf2e92e55b7a6636ddfe60abffd','2024-02-05 12:44:57.012','20240126132509_',NULL,NULL,'2024-02-05 12:44:56.942',1),('bd4c3927-fdcc-4756-8acb-7d710b8e036e','547f1746dec43b6e1d916ec955a090d4e193a06316c2fbd3cea0d34d26d69297','2024-02-05 12:44:54.670','20240111175148_remove_unique_kit_id_temporaly',NULL,NULL,'2024-02-05 12:44:54.594',1),('be61f324-2f21-4259-acbc-3a43a9cee725','a1170ec9c57ba538c348ef0ef760d9880787dd6fff01c61a13c320b38f974a76','2024-02-05 12:44:54.296','20240109120736_remove_unique_producer_id_temporaly',NULL,NULL,'2024-02-05 12:44:54.232',1),('c0db3f71-880c-45f4-9a8e-6077b11a1fb9','6eb80455bd1de19bd51e60a1e0f205c039059dea009b5ecd77e20edbb14dd224','2024-02-05 12:44:55.372','20240115143053_added_init_call',NULL,NULL,'2024-02-05 12:44:55.326',1),('c190e35b-2548-45f1-9372-aae7ded170b2','e90bee992348736591347a60b103eaa797557d68e7a7b230a521adb2fec9a9b9','2024-02-05 12:44:55.704','20240115161324_remove_user_id',NULL,NULL,'2024-02-05 12:44:55.629',1),('c486d5eb-de84-4267-a6b9-d50388fe621f','270f34e1187d93fe8c0bc0e72cb12f61995c5efc6a04e455ec0b8ed32e8b7c0d','2024-02-05 12:44:58.028','20240130180215_add_date_hour_optional_report',NULL,NULL,'2024-02-05 12:44:57.938',1),('c570cd68-868a-4647-b19e-0601807c33b4','54b7c2107a20bb90a773c160c56579965fbb441435623f7e13c21ae1a3efc99f','2024-02-05 12:44:59.463','20240202135359_',NULL,NULL,'2024-02-05 12:44:59.370',1),('c59031a6-4a08-4986-9b2d-3c803e93e0e5','eab86b2e453f1ded4cbb47941697497b2597462422befba8cc524944eaf5637d','2024-02-05 12:44:53.512','20240102150431_typo_fix',NULL,NULL,'2024-02-05 12:44:53.425',1),('c8709e8e-b3f5-462e-ac33-884924e30155','5495da5d23a9099bdcb22d23a5f8833d4a9f65cc177d3865754e62d7d6bb01f9','2024-02-05 12:44:54.479','20240111104152_remove_unique_emplyee_id',NULL,NULL,'2024-02-05 12:44:54.406',1),('c9759e77-d490-49d9-9d16-69d24acedce1','2cc95c6c103f076622d604a7e82215367b900594927a818b9382833cd2eecd6b','2024-02-05 12:44:58.103','20240131103316_add_forecast_call',NULL,NULL,'2024-02-05 12:44:58.042',1),('d1efb0f8-21dd-4e2c-8912-7b51ad4d2cbd','ff9ba9843d5f027e68d87b46f4a4d44ee19e4864eb15c4285208ea7630f67a7d','2024-02-05 12:44:58.735','20240131180133_techreport',NULL,NULL,'2024-02-05 12:44:58.658',1),('d574315a-13d5-4571-a486-ca89b8282229','4ba24a1605b460ce6afc310e16137f2fb58a9ff4a3feae976ea4901365d97e10','2024-02-05 12:44:53.349','20231228123548_kit_optional',NULL,NULL,'2024-02-05 12:44:52.987',1),('d827fb3a-dcb6-4e41-87bd-a104d2855b69','c5c901db66ddf40fdb4ada44333c93f505ad9cd56c4218e740ebbd5fc3fb3a1c','2024-02-05 12:44:56.662','20240125111650_add_inputs_price_and_products',NULL,NULL,'2024-02-05 12:44:56.553',1),('dc5e5f40-ce70-4e4c-89f3-19ac211b4578','d7dd48ff0db804c9d2d0e2182c9592b12c582021a2746d1f260b6cf7de49f460','2024-02-05 12:44:56.152','20240116112020_added_relation_call_tillage',NULL,NULL,'2024-02-05 12:44:56.020',1),('dde1caba-b3e8-45db-b78b-62165649ce96','6d8024005328ed1432cf680a17385372c311f9d75af6a6d17e216682161037ff','2024-02-05 12:44:55.550','20240115155618_added_producer_id',NULL,NULL,'2024-02-05 12:44:55.465',1),('e2b3b3ca-257d-4ff0-a19e-c0e5b6ea1f58','8252a4b79cbb8f3be97709729f6e1600c3185f5c20ce930eccbafcb07b550004','2024-02-05 12:44:59.811','20240202181536_',NULL,NULL,'2024-02-05 12:44:59.648',1),('e69ff162-36a9-4451-acda-6634101b8747','c83ae7690817e38d79f0b2de76a8e43f430246ead905c5230a438f9813a54786','2024-02-05 12:44:59.630','20240202145559_',NULL,NULL,'2024-02-05 12:44:59.479',1),('e7acbdda-8ae0-4922-9d78-7b055b8552ea','eb6f70e234553d132a5657bdcc74c352162207fc813086c667681fdc83ed21c0','2024-02-05 12:44:56.385','20240117131613_added_dbtext_in_comments',NULL,NULL,'2024-02-05 12:44:56.165',1),('e8faccc3-2488-4d33-9194-e5b399f2b2cc','6273854112c18c3eeaf300af0c6147a7ed042750335ceac6df48aa13a99fec5f','2024-02-05 12:44:57.178','20240129105837_comment_tempor',NULL,NULL,'2024-02-05 12:44:57.108',1),('f399695e-0de1-441c-a609-c3ebbba593c8','d13771e62211834e133d686a23f5e91706e9e88e415322725c07240565d3f10b','2024-02-05 12:44:55.449','20240115155430_remove_unique_producer_id',NULL,NULL,'2024-02-05 12:44:55.385',1),('f6f64d32-ac84-4513-a5db-17500f33e416','61a6265c618e38bf1783b66e11238aa403cbd495c5ec1a308c96fa1cabe8fdb3','2024-02-05 12:44:53.812','20240104142841_',NULL,NULL,'2024-02-05 12:44:53.695',1),('f8b12fff-5d27-4c05-ad4a-2ee576885224','3a473ce9fc5d3bbc6043a0d1bfcc06bd488d080be770ee56db1ce8f2fe86abd8','2024-02-05 12:46:24.556','20240205124624_added',NULL,NULL,'2024-02-05 12:46:24.439',1),('fa458aea-7371-48cc-b020-67904c45309f','8eecaf9e6741cff0633e81a8036cb49d0887faac3579859d763ba05e4343b75b','2024-02-05 12:44:57.271','20240129105941_remove_unique_flight_tech',NULL,NULL,'2024-02-05 12:44:57.194',1),('fd638046-ea80-4462-b1fd-9bb3eed75ca7','e5c1307e9c0651d3eb7c1a360dd030c208d93327c32806321a0da43c9da76a4a','2024-02-05 12:44:54.215','20240109105637_added_tillage_id',NULL,NULL,'2024-02-05 12:44:54.134',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-05 14:25:24
