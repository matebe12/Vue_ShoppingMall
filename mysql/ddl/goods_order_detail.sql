CREATE TABLE `goods_order_detail_table` (
  `ORDER_DETAIL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ORDER_ID` varchar(50) NOT NULL,
  `GDS_NUM` int(11) NOT NULL,
  `CART_STOCK` int(11) NOT NULL,
  `USER_ID` varchar(50) NOT NULL COMMENT '주문자 아이디',
  `STATUS` int(11) NOT NULL DEFAULT '0' COMMENT '주문 상태  0 신규 주문 \n1 발송대기\n2 배송중\n3 배송완료\n4 구매확정\n5 취소요청',
  PRIMARY KEY (`ORDER_DETAIL_ID`),
  KEY `orderId_idx` (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8 COMMENT='상품 주문 디테일';
