## 장바구니 프로세스

- 상품 목록화면에서 카트에 담을 수 있다.(1개) -> 상품의 수량이 0개라면 담을 수 없다.
- 상품 상세보기 페이지에서 여러개를 담을 수 있다. -> 상품의 수량이 0개라면 담을 수 없다.ah
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/common/GoodsList.vue">[상품목록 소스]</a>
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/views/shop/GoodsView.vue">[상품상세보기 소스]</a>
```
async addGoodsCart(goods) {
      if (this.$store.state.user.USER_ID == '') {
        alert('로그인을 해주세요. ');
        return;
      }
      if (goods.GDS_STOCK < 1) {
        alert('상품의 수량이 없습니다.');
        return;
      }
      try {
        const reqData = {
          USER_ID: this.$store.state.user.USER_ID,
          GDS_NUM: goods.GDS_NUM,
          CART_STOCK: 1,
        };
        await addGoodsCart(reqData);
        alert(`${goods.GDS_NAME} 상품 1개가 담겼습니다.`);
        const response1 = await getCartList(this.$store.state.user.USER_ID);
        this.$store.state.cart.cart = response1.data;
      } catch (error) {
        alert(error);
      }
    },
```

<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/Cart/cart.js">[서버 소스]</a>

```
    const reqData = req.body;
        let result = await Method(mapperId, 'addGoodsCart', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
```

![cart](https://user-images.githubusercontent.com/42566975/88782699-db3b9180-d1c8-11ea-9a2e-32b62bb6bf10.gif)
