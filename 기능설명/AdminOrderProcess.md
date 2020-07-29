## 관리자 주문 프로세스

- grid를 이용해 리스트 구현
- 상품 주문 현황 수정
- 삭제는 취소요청 된 것만 가능
<a href="">[상태 수정 소스]</a>
```
async updateState() {
      const checkRow = instance.getCheckedRows();
      if (checkRow.length < 1) {
        alert('주문 상품을 선택 해주세요.');
        return;
      } else {
        for (let i = 0; i < checkRow.length; i++) {
          let rowItem = checkRow[i].STATUS;
          switch (rowItem) {
            case '신규주문':
              checkRow[i].STATUS = 0;
              break;
            case '발송대기':
              checkRow[i].STATUS = 1;
              break;
            case '배송중':
              checkRow[i].STATUS = 2;
              break;
            case '배송완료':
              checkRow[i].STATUS = 3;
              break;
            case '구매확정':
              checkRow[i].STATUS = 4;
              break;
            case '취소요청':
              checkRow[i].STATUS = 5;
              break;
          }
        }

        try {
          await this.$store.dispatch('updateOrderList', checkRow);
          alert('주문상태가 변경 되었습니다.');
          document.querySelector('#searchBtn').click();
        } catch (error) {
          alert(error);
        }
      }
    },
```

<a href="">[상태 수정 서버 소스]</a>
```
router.post('/updateOrderList', async (req, res) => {
    if (!Validation.isNull(req.body)) {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    try {
        let result =[];
        for (let i = 0; i < reqData.length; i++) {
            result.push(await Method(mapperId, 'updateOrderList', reqData[i], format));
        }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
       return res.send(500).send(error);
    }
});
```

![jumoon](https://user-images.githubusercontent.com/42566975/88794177-0332f100-d1d9-11ea-8643-8de66d128db0.gif)


