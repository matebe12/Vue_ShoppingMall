## 관리자 유저관리 프로세스

- tui grid로 유저 목록 구현
- 수정은 유저 한명만 가능
- 삭제는 여러명 가능
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/Admin/modal.vue"> [관리자 유저수정 소스]</a>
```
async updateUser() {
      try {
        const result = this.checkValidation();
        if (result) {
          let reqData = {
            USER_ID: this.item.USER_ID,
            USER_NAME: this.item.USER_NAME,
            USER_PHONE: this.item.USER_PHONE,
            USER_VERIFY: this.item.USER_VERIFY,
            USER_GENDER: this.item.USER_GENDER,
          };
          await updateUser(reqData);
          alert('유저 정보가 업데이트 되었습니다.');
          this.$emit('refreshData');
          this.closeModal();
        }
      } catch (error) {
        alert(error);
      }
    },
```
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js">[관리자 유저수정 서버 소스]</a>
```
router.post('/updateUser', upload.any(), async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    let reqData = req.body;
    console.log(req.files);
    if (req.hasOwnProperty('files'))
    reqData.USER_THUMBNAIL = `${req.files[0].filename}`;   
    console.log('reqData : ', req);

    const query = MybatisMapper.getStatement('userMapper', 'updateUser', reqData, format);
    connection.query(query, (error, results2, fields) => {
        console.log(query);
        if (error) {
            console.log(error);
            return 500;
        }
        console.log(results2);
        return res.status(200).send({
            results2
        });
    });
});
```

<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/Admin/UserList.vue"> [관리자 유저삭제 소스]</a>
```
async deleteUser() {
      const rows = instance.getCheckedRows();
      if (rows.length < 1) {
        alert('유저를 선택해주세요.');
        return;
      } else {
        try {
          const result = confirm(
            `${rows[0].USER_ID} 외 ${rows.length -
              1}개의 유저를 삭제 하시겠습니까?`,
          );
          if (result) {
            let reqData = {
              ITEM: rows,
            };
            await deleteUser(reqData);
            alert(
              `${rows[0].USER_ID} 외 ${rows.length -
                1}개의 유저를 삭제 했습니다.`,
            );
            this.refreshData();
          } else {
            return;
          }
        } catch (error) {
          alert(error);
        }
      }
    },
```
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js">[관리자 유저삭제 서버 소스]</a>
```
router.post('/deleteUser', async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body.ITEM;
    let resData = [];
    
    for(let i =0; i< reqData.length; i++){    
        console.log(reqData[i].USER_ID);    
        const query = MybatisMapper.getStatement('userMapper', 'deleteUser', reqData[i], format);
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            resData.push(results);
        });
    };
        return res.status(200).send({
            resData
        });
    
});
```
