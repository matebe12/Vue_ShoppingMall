## 로그인 프로세스 
- 일반 로그인 <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js"> [서버 소스]</a>
```
bcrypt.compare(req.body.USER_PW, results[0].USER_PW, (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json('Internal Server Error');
                    } else {
                        resultData.searchUser = true;
                        resultData.isMatchedPw = result;
                        if (!resultData.searchUser || !resultData.isMatchedPw){
                            res.status(400).json('비밀번호를 확인해주세요.');
                        } else {
                            if (result){
                                const token = jwt.sign({
                                    USER_ID: result[0],  //페이로드
                                },jwtObj.secret, {
                                 expiresIn: '30m' // 토큰 유지 시간 
                                });
                                res.cookie('token', token);
                                res.cookie('verify', results[0].USER_VERIFY);
                                res.cookie('user', JSON.stringify(results[0]));
                                 return res.status(200).send({
                                    resultData,
                                    token,
                                    results
                                });
                                
```
- node js express router에 아이디와 비밀번호를 req.body로 받는다.

- 먼저 아이디가 존재하는지 SELECT 조회 하고 results배열이 1 미만인 경우 resultData.searchUser = false가 되고 400(bad request)를 프론트엔드에 보낸다.

- 아이디가 있는 경우 bcrypt.compare을 통해 암호화 후 조회한 아이디의 비밀번호와 비교하고 다른경우는 400 에러로 응답을 보낸다.
- 일치하는 경우 jwt로 token생성 후 프론트엔드에 사용자 정보와 함께 쿠키를 저장한다.

```
this.$store.commit('login', response.data);

```
- vuex를 활용해 state에 유저 정보와 토큰을 저장한다. <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/store/User/User.js">[VUEX 소스]</a>
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/User/LoginForm.vue">[로그인 폼 소스]</a>


![project-front-Chrome-2020-07-29](https://user-images.githubusercontent.com/42566975/88769789-d4f0e980-d1b7-11ea-92fc-f08e718a48c9.gif)


- 카카오 로그인 <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js"> [서버 소스]</a>
```
loginKakao(data) {
      window.Kakao.API.request({
        url: '/v2/user/me',

        success: res => {
          let reqData = {
            USER_ID: res.id,
            USER_NAME: res.properties.nickname,
            USER_THUMNAIL: res.properties.thumbnail_image_url,
            ACCESS_TOKEN: data.access_token,
          };
          this.loginKakaoCallBack(reqData);
        },
      });
    },
    async loginKakaoCallBack(reqData) {
      try {
        const response = await loginKakao(reqData);
        this.$store.state.user.USER_ID = response.data.USER_ID;
        this.$store.state.user.USER_NAME = response.data.USER_NAME;
        this.$store.state.user.USER_VERIFY = response.data.USER_VERIFY;
        this.$store.state.user.USER_ADDR1 = response.data.USER_ADDR1;
        this.$store.state.user.USER_ADDR2 = response.data.USER_ADDR2;
        this.$store.state.user.ISSNS = response.data.ISSNS;
        Cookie.set('token', reqData.ACCESS_TOKEN);
        Cookie.set('user', response.data);
        Cookie.set('verify', this.$store.state.user.USER_VERIFY);
        alert('로그인 되었습니다.');

        this.$router.push('/');
      } catch (error) {
        alert(error);
      }
```

```
 if (results.length < 1) {
                req.body.ISSNS = 'kakao';
                insertUserKakao('userMapper', 'insertUserKakao', req.body, format);
            } 

            const query1 = MybatisMapper.getStatement('userMapper', 'selectLoginUserKakao', req.body, format);
            let resData = {};
            connection.query(query1, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    resData.error = error
                    res.status(500).send(resData.error);
                }

                resData.success = results;
                res.cookie('token', req.body.ACCESS_TOKEN);
                res.cookie('verify', resData.success[0].USER_VERIFY);
                res.cookie('user', JSON.stringify(resData));
                return res.status(200).send(resData.success[0]);
            });
```

- 카카오로 로그인하기 클릭 후 카카오 api /v2/user/me 호출 하여 카카오 유저 정보를 얻어온다.
- 정보를 얻어오면 콜백함수 호출하고 콜백함수에는 서버와 통신 한다.
- 로그인 정보가 DB에 존재하지 않는다면 user-table에 insert 시키고 select를 하여 로그인한다.
- 토큰 쿠키는 일반 로그인과 같다.
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/User/LoginForm.vue">[로그인 폼 소스]</a>

![bandicam-2020-07-29-17-26-08-146](https://user-images.githubusercontent.com/42566975/88776458-f0acbd80-d1c0-11ea-9432-98acb4aaa9af.gif)


-로그아웃 <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/store/User/User.js">[VUEX 소스]</a>
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/main/ToolBar.vue">[VUE 소스]</a>
```

  logout(state) {
    state.USER_ID = '';
    state.USER_NAME = '';
    state.USER_VERIFY = '';
    state.USER_ADDR1 = '';
    state.USER_ADDR2 = '';
    state.USER_PHONE = '';
    state.ISSNS = '';
    state.USER_THUMBNAIL = '';
    state.USER_TOKEN = '';
    Cookie.remove('token');
    Cookie.remove('user');
    Cookie.remove('verify');
    Cookie.remove('_karmtea');
    Cookie.remove('_karmt');
    Cookie.remove('_kawlt');
    Cookie.remove('webid');
    Cookie.remove('webid_ts');
    Cookie.remove('_TI_NID');
    Cookie.remove('_kadu');
    Cookie.remove('TIARA');

    store.state.cart.cart = null;
    store.state.order.order = null;
```

```
logout() {
      this.$store.commit('logout');
      //eslint-disable-next-line
      this.$router.push({ path: '/' }).catch(error => {});
    },
```
- 로그아웃시 쿠키삭제 및 홈으로 이동
![logout](https://user-images.githubusercontent.com/42566975/88777371-1ab2af80-d1c2-11ea-8815-452da8269e9b.gif)
