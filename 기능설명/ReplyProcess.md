## 댓글 프로세스

- 댓글은 로그인 필수!
- 댓글에 본인만 수정 삭제 가능
- 삭제된 댓글에 답글을 달 수 있음. 삭제된 댓글은 '삭제된 댓글입니다.' 출력
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_front/src/components/Goods/reply.vue">[댓글 소스]</a>
```
<div class="comment-body">
            <div class="comment-heading">
              <h4 class="user">{{ data.USER_ID }}</h4>
              <a
                href="javascript:void(0);"
                v-if="compareUser(data.USER_ID) && data.IS_DELETE == 0"
              >
                <h5 class="time">
                  <i
                    class="fas fa-edit fa-1x"
                    @click="showUpdateForm(data.REPLY_NUM)"
                  ></i
                  >수정
                </h5></a
              >
              <a
                href="javascript:void(0);"
                v-if="compareUser(data.USER_ID) && data.IS_DELETE == 0"
                @click="deleteReply(data.REPLY_NUM)"
              >
                <h2 class="time"><i class="fas fa-trash fa-1x"></i>삭제</h2>
              </a>
              <a
                href="javascript:void(0);"
                @click="showRelpyForm(data)"
                v-if="data.REPLY_DEPTH == 0"
                ><h5 class="time">
                  <i class="fas fa-edit fa-1x"></i
                  ><span>&nbsp;&nbsp;&nbsp;답글 </span>
                </h5></a
              >
            </div>
            <p :id="`reply_${data.REPLY_NUM}`">{{ data.REPLY_CONTENT }}</p>
            <div :id="`reply_content${data.REPLY_NUM}`" style="display:none;">
              <input
                type="text"
                :value="data.REPLY_CONTENT"
                :id="`reply_input${data.REPLY_NUM}`"
              />
              <button
                class="btn btn-warning"
                @click="updateReply(data.REPLY_NUM)"
              >
                수정
              </button>
            </div>
            <div
              :id="`re_reply_content${data.REPLY_NUM}`"
              style="display:none;"
            >
              <input
                type="text"
                :id="`re_reply_input${data.REPLY_NUM}`"
                @keyup.enter="insertReply(data)"
              />
              <button class="btn btn-warning" @click="insertReply(data)">
                작성
              </button>
            </div>
          </div>
```

```
async insertReply(data) {
      if (!Validation.isNull(data.REPLY_NUM)) {
        if (this.$store.state.user.USER_ID == '') {
          alert('로그인을 해주세요');
          return;
        }
        if (this.REPLY_CONTENT == '') {
          alert('댓글을 입력해주세요');
          return;
        }
        if (!Validation.isLength(this.REPLY_CONTENT, 200)) {
          alert('댓글은 200자 내로 입력해주세요.');
          return;
        }
      } else {
        let inputValue = document.getElementById(
          're_reply_input' + data.REPLY_NUM,
        ).value;
        if (this.$store.state.user.USER_ID == '') {
          alert('로그인을 해주세요');
          return;
        }
        if (inputValue == '') {
          alert('댓글을 입력해주세요');
          return;
        }
        if (!Validation.isLength(inputValue, 200)) {
          alert('댓글은 200자 내로 입력해주세요.');
          return;
        }
      }

      try {
        let reqData;
        if (!Validation.isNull(data.REPLY_NUM)) {
          reqData = {
            REPLY_CONTENT: this.REPLY_CONTENT,
            GDS_NUM: this.item.GDS_NUM,
            USER_ID: this.$store.state.user.USER_ID,
            REPLY_DEPTH: 0,
            REPLY_PARENT: 0,
            REPLY_GROUP: null,
          };
        } else {
          reqData = {
            REPLY_CONTENT: document.getElementById(
              're_reply_input' + data.REPLY_NUM,
            ).value,
            GDS_NUM: this.item.GDS_NUM,
            USER_ID: this.$store.state.user.USER_ID,
            REPLY_DEPTH: data.REPLY_DEPTH + 1,
            REPLY_GROUP: data.REPLY_GROUP,
            REPLY_PARENT: data.REPLY_NUM,
          };
        }
        await addReply(reqData);
        if (Validation.isNull(data.REPLY_NUM)) this.showRelpyForm(data);
        this.viewReply();
      } catch (error) {
        alert(error);
      }
    },
    
    async updateReply(REPLY_NUM) {
      try {
        const replyInput = document.getElementById('reply_input' + REPLY_NUM)
          .value;
        if (this.$store.state.user.USER_ID == '') {
          alert('로그인을 해주세요');
          return;
        }
        if (replyInput == '') {
          alert('댓글을 입력해주세요');
          return;
        }
        if (!Validation.isLength(replyInput, 200)) {
          alert('댓글은 200자 내로 입력해주세요.');
          return;
        }

        const reqData = {
          REPLY_NUM: REPLY_NUM,
          REPLY_CONTENT: replyInput,
        };
        await updateReply(reqData);
        this.showUpdateForm(REPLY_NUM);
        this.viewReply();
      } catch (error) {
        alert(error);
      }
    },
async deleteReply(REPLY_NUM) {
      try {
        const confirmDelete = confirm('댓글을 삭제 하시겠습니까?');
        if (confirmDelete) {
          const reqData = {
            REPLY_NUM,
          };
          await deleteReply(reqData);
          this.viewReply();
        }
      } catch (error) {
        alert(error);
      }
    },
```
<a href="https://github.com/matebe12/Vue_ShoppingMall/blob/master/project_server/api/Reply/reply.js">[댓글 서버 소스]</a>
```
router.post('/insertReply', async(req,res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;
    try {
        let result = await Method(mapperId, 'insertReply', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/updateReply', async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;

    try {
        let result = await Method(mapperId, 'updateReply', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/deleteReply', async (req, res) => {
    if (!Validation.isNull(req.headers.authorization)) {
        console.log('Auth error');
        return res.status(401).json('Auth error 토큰 정보가 없습니다.');
    }
    const reqData = req.body;

    try {
        let result = await Method(mapperId, 'deleteReply', reqData, format);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
```

![reply](https://user-images.githubusercontent.com/42566975/88797768-d255ba80-d1de-11ea-989e-8dda0569d6b6.gif)
