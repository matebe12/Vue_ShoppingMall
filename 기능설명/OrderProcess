## 주문하기 프로세스

- 카트에 담겨있는 상품들을 주문
- 주문 현황 페이지에서 확인
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/Cart/OrderInfo.vue">[주문하기 소스]</a>
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/Cart/OrderList.vue">[주문현황 소스]</a>
```
async orderGoods() {
      const check = this.checkedItem.length;
      for (let i = 0; i < check; i++) {
        this.checkedItem[i].CART_STOCK *= 1;
        this.checkedItem[i].GDS_STOCK *= 1;
        this.checkedItem[i].ORDER_ID = this.getOrderId();
      }

      const reqData = {
        USER_ID: this.$store.state.user.USER_ID,
        ORDER_RECIEVE: this.ORDER_RECIEVE,
        USER_ADDR1: this.USER_ADDR1,
        USER_ADDR2: this.USER_ADDR2,
        ORDER_PHONE: this.ORDER_PHONE,
        TOTAL_PRICE: this.totalPrice,
        ITEM: this.checkedItem,
      };
      let checkITEM = Validation.isNull(this.checkedItem);
      if (!checkITEM || Validation.isLength(this.checkedItem, 0)) {
        alert('주문할 상품을 선택해주세요.');
        return;
      }
      try {
        await insertOrder(reqData);
        this.$emit('refreshCart');
      } catch (error) {
        alert(error);
      }
    },
```

```
 router.post('/insertOrder', async (req, res) => {
    const reqData = req.body;
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    if (req.body == null || req.body.USER_ID == '' || req.body.ORDER_RECIEVE == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    try {
        let result1 = await Method(mapperId, 'orderInfo', reqData, format);
        let result2 = await Method(mapperId, 'orderInfo_Details', reqData, format);
        let result3 = [];
        let result4 = [];
        for (let i = 0; i < reqData.ITEM.length; i++) {
            result3.push(await Method(mapperId, 'updateGoodsStock', reqData.ITEM[i], format));
        }
        for (let i = 0; i < reqData.ITEM.length; i++) {
            result4.push(await Method(mapperId, 'deleteCart', reqData.ITEM[i], format));
        }
        return res.status(200).send({ result1, result2, result3, result4});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
```

<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/Cart/cart.js">[서버 소스]</a>

![order](https://user-images.githubusercontent.com/42566975/88784811-703f8a00-d1cb-11ea-9487-39868505babb.gif)
