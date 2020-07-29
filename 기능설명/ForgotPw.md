## 비밀번호 찾기 
- 가입시 기재 했던 이메일과 아이디를 비교하여 이메일로 비밀번호를 보내줌
- 단방향 암호화이기 때문에 임시방편 1234로 보냄

<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/views/User/forgotPw.vue">[비밀번호 찾기 소스]</a>
```
async checkId() {
      try {
        const result = await checkId({ USER_ID: this.idInput });
        if (result.data[0].TOTAL == 0) {
          this.idCheckMsg = '해당하는 아이디가 없습니다.';
          return false;
        } else {
          this.idCheckMsg = '';
          return true;
        }
      } catch (error) {
        alert(error);
      }
    },
    async checkEmail() {
      try {
        const result = await checkEmail({
          USER_ID: this.idInput,
          USER_EMAIL: this.emailInput,
        });
        if (result.data[0].TOTAL == 0) {
          this.emailCheckMsg = '가입 시 기재 했던 이메일을 입력 해주세요.';
          return false;
        } else {
          this.emailCheckMsg = '';
          return true;
        }
      } catch (error) {
        alert(error);
      }
    },
```

```
async searchPw() {
      let idCheck = Validation.isNull(this.idInput);
      if (!idCheck) {
        alert('아이디를 입력 해주세요.');
        return;
      }
      idCheck = Validation.isLength(this.idInput, 50);
      if (!idCheck) {
        alert('아이디를 확인해주세요.');
        return;
      }
      let emailCheck = Validation.isNull(this.emailInput);
      if (!emailCheck) {
        alert('이메일을 입력해주세요.');
        return;
      }
      emailCheck = Validation.isLength(this.emailInput, 100);
      if (!emailCheck) {
        alert('이메일을 확인해주세요.');
        return;
      }
      try {
        const id = await this.checkId();
        const email = await this.checkEmail();
        if (id && email) {
          const result = await getPw({
            USER_ID: this.idInput,
            USER_EMAIL: this.emailInput,
          });
          if (result.data.result == 1) {
            alert('해당 이메일로 비밀번호를 발송 했습니다.');
            this.$router.push('/');
          } else {
            alert('알수없는 오류가 발생 하였습니다. 다시 시도해주세요.');
          }
        } else {
          alert('아이디 및 이메일을 확인 해주세요.');
          return;
        }
      } catch (error) {
        alert(error);
      }
    },
```

<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js">[비밀번호 찾기 서버 소스]</a>

```
router.post('/checkId', async(req,res) => {
    console.log(req.body);
    const query = MybatisMapper.getStatement('userMapper', 'checkId', req.body, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        } else {
            return res.status(200).send(results);
        }
    });
});

router.post('/checkEmail', async (req, res) => {
    const query = MybatisMapper.getStatement('userMapper', 'checkEmail', req.body, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        } else {
            return res.status(200).send(results);
        }
    });
});

```


```
router.post('/getPw', async (req, res) => {
    const reqData = req.body;
    console.log(reqData);
    mailOptions.to = reqData.USER_EMAIL;
    mailOptions.subject = '안녕하세요. 쇼핑몰입니다.';
    mailOptions.text = '안녕하세요. 쇼핑몰입니다. 회원님의 임시 비밀번호는 1234 입니다.';

    const USER_PW = '1234';
    bcrypt.hash(USER_PW, 10, async (error, hashedPassword) => { 
        transpoter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
                return res.status(500).send(error);
            }
            else {
                reqData.USER_PW = hashedPassword;
                const query = MybatisMapper.getStatement('userMapper', 'updateUserPw', reqData, format);
                connection.query(query, (error, results2, fields) => {
                    if(error){
                        console.log(error);
                        return res.status(500).send(error);
                    }
                    return res.status(200).send({ result: 1 });
                });
                
            }
        })
    });
});
```

![이메일](https://user-images.githubusercontent.com/42566975/88802877-a0485680-d1e6-11ea-8d89-e89fe2b25614.gif)
