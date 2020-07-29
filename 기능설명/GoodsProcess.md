## 상품 CRUD 프로세스

- 관리자 페이지에서 상품등록 -> 상품 목록 -> 상품 수정 -> 상품 삭제

<a href="">[상품등록 소스]</a>
```
   async goodsRegist() {
      try {
        const result = this.checkValidation();
        if (result) {
          const form = this.$refs.form;
          const formData = new FormData(form);
          if (formData.get('category2') === '') {
            formData.append('GDS_CATEGORY_CODE', this.goods.CATEGORY_CODE1);
          } else {
            formData.append('GDS_CATEGORY_CODE', this.goods.CATEGORY_CODE2);
          }
          formData.append('GDS_DESC', this.goods.GDS_DESC);
          await InsertGoods(formData);
          alert('상품이 등록 되었습니다.');
        }
      } catch (error) {
        alert(error);
      }
    },
```
<a href="">[상품등록 서버 소스]</a>
```
router.post('/InsertGoods', upload.any(), async (req,res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    reqData.GDS_IMG = `${req.files[0].filename}`;
    try {
        let result = await Method(mapperId, 'insertGoods', reqData, format);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


```

![goodsre](https://user-images.githubusercontent.com/42566975/88793048-26f53780-d1d7-11ea-87e1-da15a83f1fd2.gif)




<a href="">[상품수정 소스]</a>
```
async updateGoods() {
      try {
        // 상품 카테고리도 수정 해야함
        const form = this.$refs.form;
        const formData = new FormData(form);
        if (formData.get('category2') === '') {
          formData.append('GDS_CATEGORY_CODE', this.selected);
        } else {
          formData.append('GDS_CATEGORY_CODE', this.selected2);
        }
        formData.append('GDS_DESC', this.item.GDS_DESC);
        await updateGoods(formData);
        alert('상품 수정완료');
        this.closeModal();
        this.$emit('refresh');
      } catch (error) {
        alert(error);
      }
    },
```
<a href="">[상품수정 서버 소스]</a>
```
router.post('/updateGoods', upload.any(), async (req,res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    console.log(reqData);
    if(req.files.length > 0){
        reqData.GDS_IMG = `${req.files[0].filename}`;    
    }
    reqData.GDS_IMG = '';
    try {
        const result = await Method(mapperId, 'updateGoods', reqData, format); 
        res.status(200).send(result);  
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
```


<a href="">[상품삭제 소스]</a>
```
async deleteGoods() {
      try {
        const selectEvent = confirm('상품을 삭제 하시겠습니까? ');
        if (selectEvent) {
          const reqData = {
            GDS_NUM: this.item.GDS_NUM,
          };
          await deleteGoods(reqData);
          alert('상품이 삭제 되었습니다.');
          this.closeModal();
          this.$emit('refresh');
        }
      } catch (error) {
        alert(error);
      }
    },
```

<a href="">[상품삭제 서버 소스]</a>
```
router.post('/deleteGoods', async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    try {
        const result = await Method(mapperId, 'deleteReply', req.body, format);
        const result1 = await Method(mapperId, 'deleteGoods', req.body, format);
        res.status(200).send({result,result1});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
```

![goodsupde](https://user-images.githubusercontent.com/42566975/88792996-15ac2b00-d1d7-11ea-962a-86ca44e11e0e.gif)
