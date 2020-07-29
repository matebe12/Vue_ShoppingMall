## 로그인 프로세스 
- 일반 로그인 <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/user/user_sign.js"> 서버 소스</a>
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
- vuex를 활용해 state에 유저 정보와 토큰을 저장한다. <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/store/User/User.js">VUEX 소스</a>
 <a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/store/User/User.js">VUEX 소스</a>
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/User/LoginForm.vue">로그인 폼 소스</
