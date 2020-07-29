## 회원가입 프로세스

- 회원가입 폼에서 정보들을 입력하고 서버에 보낸다.
- 회원정보와 비밀번호를 단방향 암호화해서 db에 insert시킨다.

<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js">[서버 소스]</a>
```
 try {
        let reqData = req.body;
        if (req.body == null) {
            res.status(400);
        }
        bcrypt.hash(reqData.USER_PW, 10, async (error, hashedPassword) => {
            if (error) {
                console.log(error);
            } else {
                reqData.USER_PW = hashedPassword;
                let result = await Method(mapperId, 'insertUser', reqData, format);
                return res.status(200).send(result);
            }
    })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
```
- 아이디 입력시 중복체크
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/User/SignUpForm.vue">[회원가입 폼 소스]</a>
```
 async checkId() {
      const result = await checkId({ USER_ID: this.USER_ID });
      if (result.data[0].TOTAL == 0) {
        this.checkIdMsg = '사용 가능한 아이디 입니다.';
        return true;
      } else {
        this.checkIdMsg = '이미 존재하는 아이디 입니다.';
        return false;
      }
    },
```
![signup](https://user-images.githubusercontent.com/42566975/88779288-901f7f80-d1c4-11ea-8516-09ffbb77e7a4.gif)
