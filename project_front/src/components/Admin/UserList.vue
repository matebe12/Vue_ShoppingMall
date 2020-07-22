<template>
  <div class="container">
    <section class="condition">
      <div class="box_type1">
        <div class="search_area">
          <table class="sch_table">
            <colgroup>
              <col style="width:;" />
              <col style="width: 35%;" />
              <col style="width:;" />
              <col style="width:;" />
              <col style="width: 60px;" />
            </colgroup>
            <tr>
              <th title="ID">아이디</th>
              <td>
                <input
                  type="text"
                  id="searUserID"
                  v-model="inputData.USER_ID"
                  @keyup.enter="refreshData"
                />
              </td>
              <th title="Name">이름</th>
              <td>
                <input
                  type="text"
                  id="searUserNM"
                  v-model="inputData.USER_NAME"
                  @keyup.enter="refreshData"
                />
              </td>
              <th title="Name">권한</th>
              <td>
                <select v-model="inputData.USER_VERIFY" id="selectOption">
                  <option value="" selected>전체</option>
                  <option v-for="i in 10" :key="i" :value="i - 1">{{
                    i - 1
                  }}</option>
                </select>
              </td>
              <td class="ar">
                <div class="btn_search">
                  <a href="javascript:void(0);" id="searchBtn">검색</a>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="box_type1">
        <div class="gridbtn_area">
          <div class="btn_gridsearch_f">
            Total
            <strong><span id="totalCount">0</span></strong>
          </div>
          <div class="btn_gridsearch_fr">
            <a href="javascript:void(0);" id="delBtn" @click="deleteUser"
              ><span>삭제 </span></a
            >
          </div>
          <div class="btn_gridsearch_fr">
            <a href="javascript:void(0);" id="updBtn" @click="openModal()"
              ><span>수정 </span></a
            >
          </div>
          <div class="btn_gridsearch_fr">
            <export-excel :data="userData">
              <a href="javascript:void(0);"> <span> 엑셀 다운로드 </span></a>
            </export-excel>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="userGrid"></div>
      </div>
      <div id="pagination" class="tui-pagination"></div>
    </section>
    <Modal
      v-if="modalopen"
      :item="propsdata"
      @closeModal="closeModal"
      @refreshData="refreshData"
    ></Modal>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/User.js';
import { createdGrid } from '@/util/tui grid/tuiGrid';
import { createPageNation } from '@/util/tui grid/tuiPagenation';
import Validation from '@/util/data/Validation.js';
import Modal from './modal.vue';
var pagination;
var instance;
export default {
  components: {
    Modal,
  },
  data() {
    return {
      userData: null,
      modalopen: false,
      propsdata: '',
      instance: {},
      pagination: {},
      inputData: {
        USER_ID: '',
        USER_NAME: '',
        USER_VERIFY: '',
      },
      columns: [
        {
          header: '유저 아이디',
          name: 'USER_ID',
        },
        {
          header: '유저 이름',
          name: 'USER_NAME',
        },
        {
          header: '전화번호',
          name: 'USER_PHONE',
        },
        {
          header: '생년월일',
          name: 'USER_BIRTH',
        },
        {
          header: '성별',
          name: 'USER_GENDER',
        },
        {
          header: '유저 권한',
          name: 'USER_VERIFY',
          align: 'center',
        },
        {
          header: '가입날짜',
          name: 'CREATED_DT',
        },
      ],
      options: {
        scrollY: true,
        scrollX: true,
        bodyHeight: 430,
        multiCheck: true,
      },
    };
  },
  async mounted() {
    const getUserListData = async event => {
      var selectOption = document.querySelector('#selectOption').value;

      let reqData = {
        USER_NAME: document.querySelector('#searUserNM').value,
        USER_ID: document.querySelector('#searUserID').value,
        USER_VERIFY: selectOption,
        PAGE: Validation.isNull(event.page) ? event.page : 1,
      };
      reqData.PAGE_START = (reqData.PAGE - 1) * 10;
      reqData.PER_PAGE_NUM = 10; // 보여줄 상품 수

      const response = await getUserList(reqData);
      let userData = response.data.results1;
      instance.resetData(userData);
      let data = [];
      for (let i = 0; i < userData.length; i++) {
        delete userData[i].uniqueKey;
        delete userData[i]._attributes;
        delete userData[i]._disabledPriority;
        delete userData[i].rowSpanMap;
        delete userData[i]._relationListItemMap;
        delete userData[i].rowKey;
        delete userData[i].sortKey;
        data.push(userData[i]);
      }
      this.userData = data;
      pagination.setTotalItems(response.data.results2[0].TOTAL_COUNT);
      document.querySelector('#totalCount').innerHTML =
        response.data.results2[0].TOTAL_COUNT;
      pagination._paginate(reqData.PAGE);
    };
    instance = createdGrid('#userGrid', this.columns, this.options);

    pagination = createPageNation('#pagination', 10);
    pagination.on('beforeMove', async function(event) {
      getUserListData(event);
    });
    document
      .querySelector('#searchBtn')
      .addEventListener('click', getUserListData);
  },
  methods: {
    openModal() {
      const rows = instance.getCheckedRows();
      if (rows.length < 1) {
        alert('유저를 선택해주세요.');
        return;
      } else if (rows.length > 1) {
        alert('유저는 한명만 선택해주세요.');
        return;
      } else {
        this.propsdata = rows[0];
        this.modalopen = true;
      }
    },
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
    closeModal() {
      this.modalopen = false;
    },
    refreshData() {
      document.querySelector('#searchBtn').click();
    },
  },
};
</script>

<style scoped>
.gridbtn_area {
  display: inline-block;
  width: 100%;
}
.gridbtn_area > .btn_gridsearch_f {
  display: inline-block;
}
.btn_gridsearch_fr {
  float: right;
}
.search_area {
  padding: 15px 20px 15px;
  border: 1px solid #d1d2d4;
  border-radius: 10px;
  background: #f0f1f3;
}
.btn_gridsearch_fr a span {
  color: #000;
  text-decoration: none;
  padding: 10px;
}
.btn_search {
  background: url('../../assets/images/bg_Searchbtn_gray.png');
  border: 1px solid #201b1c;
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
  font-weight: bold;
}
.btn_search a {
  color: #000000;
  text-decoration: none;
}
.sch_table {
  width: 100%;
  table-layout: auto;
}
.sch_table > tbody > tr > th,
.sch_table > tbody > tr > td {
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: left;
  empty-cells: show;
}
.sch_table > tbody > tr > th:first-child,
.sch_table > tbody > tr > td:first-child {
  padding-left: 0 !important;
}
.sch_table > tbody > tr > th {
  width: 10px;
  max-width: 150px;
  padding-right: 10px;
  padding-left: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
  vertical-align: top;
  padding-top: 5px;
  padding-bottom: 5px;
  line-height: 25px;
  font-size: 13px;
}
.sch_table > tbody > tr > td {
  padding-left: 5px;
}
.sch_table > tbody > tr > td input[type='text'],
.sch_table > tbody > tr > td input[type='password'],
.sch_table > tbody > tr > td select,
.sch_table > tbody > tr > td textarea {
  width: 100%;
}
.sch_table > tbody > tr > td .calendar_input,
.sch_table > tbody > tr > td .poplist_input {
  width: 100%;
  vertical-align: middle;
}
.sch_table > tbody > tr > td table th {
  font-weight: normal;
}
</style>
