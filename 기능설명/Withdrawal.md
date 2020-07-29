## 회원탈퇴

- 로그인 상태에서 드롭다운 메뉴에서 회원탈퇴 클릭
- 확인창 출력
- 서버에서 회원 delete
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js">[서버 소스]</a>
```
async deleteUser() {
      const result = confirm('회원 탈퇴 하시겠습니까?');
      if (result) {
        try {
          let reqData = { ITEM: [{ USER_ID: this.$store.state.user.USER_ID }] };
          await deleteUser(reqData);
          alert('회원 탈퇴 됐습니다.');
          this.logout();
        } catch (error) {
          alert(error);
        }
      }
    },
```
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/main/ToolBar.vue">[VUE 소스]</a>
```
console.log(reqData[i].USER_ID);    
        const query = MybatisMapper.getStatement('userMapper', 'deleteUser', reqData[i], format);
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            resData.push(results);
        });
```

![withdrwa](https://user-images.githubusercontent.com/42566975/88780993-be9e5a00-d1c6-11ea-981d-06cd67781924.gif)
