CREATE TABLE `user_table` (
  `USER_ID` varchar(50) NOT NULL,
  `USER_PW` varchar(200) DEFAULT NULL,
  `USER_PHONE` varchar(20) DEFAULT NULL,
  `USER_ADDR1` varchar(50) DEFAULT NULL,
  `USER_ADDR2` varchar(50) DEFAULT NULL,
  `CREATED_DT` datetime DEFAULT CURRENT_TIMESTAMP,
  `USER_VERIFY` varchar(45) NOT NULL DEFAULT '0',
  `USER_NAME` varchar(45) DEFAULT NULL,
  `USER_BIRTH` varchar(45) DEFAULT NULL,
  `USER_GENDER` varchar(45) DEFAULT NULL,
  `USER_THUMBNAIL` varchar(200) DEFAULT NULL,
  `ISSNS` varchar(45) DEFAULT NULL,
  `USER_EMAIL` varchar(100) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='유저 테이블';