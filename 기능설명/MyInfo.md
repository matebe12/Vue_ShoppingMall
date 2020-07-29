## 내 정보 보기 및 수정

- 드롭다운 메뉴에서 내 정보 클릭
- 모달창으로 정보창 나옴
- 프로필 사진, 이름, 주소등 수정 가능
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/common/UserInfoModal.vue">[내 정보 소스]</a>
```
async updateUser() {
      try {
        const form = this.$refs.form;
        const formData = new FormData(form);
        const result = this.checkValidation(formData);
        if (result) {
          await updateUser(formData);
          alert('수정이 완료 되었습니다. 다시 로그인 해주세요.');
          this.$store.state.isModal = !this.$store.state.isModal;
          this.$emit('refresh');
        }
      } catch (error) {
        alert(error);
      }
    },
```
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js">[서버 소스]</a>

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
