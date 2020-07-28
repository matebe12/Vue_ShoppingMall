
# Vue_ShoppingMall
### Project
#### develop tool
<img alt="IDE" src="https://img.shields.io/badge/visual studio code -996600.svg" />

#### BackEnd Frame Work & DB
<img src="https://img.shields.io/badge/Node-v10.16.3-green.svg" /> <img src="https://img.shields.io/badge/express-v4.17.1-red.svg" />
<img src="https://img.shields.io/badge/mysql-v5.7.10-red.svg" />
#### BackEnd Library
<img src="https://img.shields.io/badge/bcrypt-v3.0.5-green.svg" /> <img src="https://img.shields.io/badge/bodyparser-v1.19.0-green.svg" />
<img src="https://img.shields.io/badge/connect_history_api_fallback-v1.6.0-green.svg" /> <img src="https://img.shields.io/badge/cookieparser-v1.4.5-green.svg" />
<img src="https://img.shields.io/badge/cors-v2.8.5-green.svg" /> <img src="https://img.shields.io/badge/dotenv-v8.2.0-green.svg" />
<img src="https://img.shields.io/badge/jsonwebtoken-v8.5.1-green.svg" /> <img src="https://img.shields.io/badge/multer-v1.4.2-green.svg" />
<img src="https://img.shields.io/badge/mybatismapper-v0.6.5-green.svg" /> <img src="https://img.shields.io/badge/mysql-v2.18.1-green.svg" />
<img src="https://img.shields.io/badge/nodemailer-v6.4.10-green.svg" />
<img src="https://img.shields.io/badge/nodemon-v2.0.4-green.svg" />

#### FrontEnd Frame Work
<img src="https://img.shields.io/badge/vue-v2.6.10-green.svg" /> <img src="https://img.shields.io/badge/vue_router-v3.1.2-red.svg" />
<img src="https://img.shields.io/badge/vuex-v5.7.10-blue.svg" />

#### FrontEnd Library
<img src="https://img.shields.io/badge/tui_date_picker-v4.1.0-blue.svg" /> <img src="https://img.shields.io/badge/ckeditor4_vue-v1.0.0-blue.svg" />
<img src="https://img.shields.io/badge/js_cookie-v2.2.1-blue.svg" /> <img src="https://img.shields.io/badge/tui_grid-v4.14.0-blue.svg" />
<img src="https://img.shields.io/badge/tui_pagination-v3.4.0-blue.svg" /> <img src="https://img.shields.io/badge/vue_excel_export-v0.1.3-blue.svg" />
<img src="https://img.shields.io/badge/vue_kakao_login-v1.0.5-blue.svg" /> <img src="https://img.shields.io/badge/vuejs_daum_postcode-v1.0.4-blue.svg" />

## What is Vue_ShoppingMall?
Vue_ShoppingMall은 vue와 nodejs를 활용한 간단한 쇼핑몰 사이트 입니다.
일반 사용자 페이지와 관리자 페이지로 나뉘어져 있으며 실제 쇼핑몰 사이트 처럼 구현을 했습니다.

## PROJECT 구성

- 팀 구성 : 1인 (개인 프로젝트)
- 개발일정
<table>
  <tr>
    <td>일정</td>
    <td>진행상황</td>
  </tr>
  
  <tr>
    <td>1~3일</td>
    <td>
      <ul>
        <li>필요기능 분석</li>
        <li>테이블 설계</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>4~5일</td>
    <td>
      <ul>
        <li>nodejs exprss 프로젝트 구축 및 mysql 연동/li>
        <li>vuejs vue-cli로 프로젝트 구축</li>
        <li>부트스트랩 템플릿 적용</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>6일</td>
    <td>
      <ul>
        <li>mysql 연동 오류 및 pool오류 개선</li>
        <li>회원가입폼과 로그인 폼 기본틀 완료</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>7~8일</td>
    <td>
      <ul>
        <li>회원가입 구현</li>
        <li>로그인 구현</li>
        <li>JWT와 cookie를 이용해 기존 localstrorage -> cookie로 토큰 발행 수정</li>
        <li>관리자 페이지 추가 </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>9~13일</td>
    <td>
      <ul>
        <li>관리자 페이지 -> 상품등록 구현 상품 설명에 ckEditor 추가</li>
        <li>관리자 페이지 -> 상품수정 모달창 구현</li>
        <li>관리자 페이지 -> 상품수정 모달창 수정, 삭제 구현 상품 설명에 ckeditor 적용 </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>14일</td>
    <td>
      <ul>
        <li>Multer를 추가하여 파일 업로드 구현 (상품 이미지)</li>
        <li>업로드를 프론트 프로젝트 디렉토리 assets에 저장</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>15~18일</td>
    <td>
      <ul>
        <li>Multer를 추가하여 파일 업로드 구현 (상품 이미지)</li>
        <li>업로드를 프론트 프로젝트 디렉토리 assets에 저장</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>18~19일</td>
    <td>
      <ul>
        <li>메인페이지 퍼블리싱</li>
        <li>메인페이지 상품목록 및 상세보기 조회 구현</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>20~21일</td>
    <td>
      <ul>
        <li>상품 조회 화면 댓글 부트스트랩 템플릿 적용</li>
        <li>댓글 등록 삭제 구현</li>
      </ul>
    </td>
  </tr>
 <tr>
    <td>22일</td>
    <td>
      <ul>
        <li>상품 장바구니에 담기 구현</li>
        <li>총 가격 계산</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>23일</td>
    <td>
      <ul>
        <li>상품 카테고리 조회</li>
        <li>상품 카테고리 해당 상품들 조회</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>24일</td>
    <td>
      <ul>
        <li>장바구니 상품 삭제</li>
        <li>유효성 추가 및 버그 픽스</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>25~28일</td>
    <td>
      <ul>
        <li>상품 주문하기 구현</li>
        <li>상품 주문 후 상태 업데이트 주문 한 상품은 장바구니에서 삭제</li>
      </ul>
    </td>
  </tr>
  <tr>
  <td>29일</td>
  <td>
    <ul>
      <li>상품 목록 페이징 처리</li>
      <li>상품 댓글 버그 픽스</li>
    </ul>
  </td>
  </tr>
  <tr>
  <td>30~32일</td>
  <td>
    <ul>
      <li>tui grid, tui date picker, daum postcode 추가</li>
      <li>관리자 페이지 -> 유저관리 tui grid 적용, 검색조건 추가, 유저 삭제 수정</li>
      <li>유저 가입 쿼리 수정</li>
      <li>회원가입 daum post code를 적용 하여 주소입력 추가</li>
      <li>장바구니에 담긴 물품의 수량이 1개 미만일 때 체크해제</li>
    </ul>
  </td>
  </tr>
  <tr>
  <td>33~34일</td>
  <td>
    <ul>
      <li>주문목록 구현</li>
      <li>주문 후 상품 삭제</li>
      <li>주문상태 변경</li>
    </ul>
  </td>
  </tr>
  
  <tr>
  <td>33~34일</td>
  <td>
    <ul>
      <li>주문목록 구현</li>
      <li>주문 후 상품 삭제</li>
      <li>주문상태 변경</li>
    </ul>
  </td>
  </tr>
  
  <tr>
  <td>34일</td>
  <td>
    <ul>
      <li>상품검색기능 추가</li>
    </ul>
  </td>
  </tr>
  
  <tr>
  <td>35일</td>
  <td>
    <ul>
      <li>주문목록 검색 및 페이징처리</li>
      <li>상품목록 페이징처리</li>
    </ul>
  </td>
  </tr>
  
  <tr>
  <td>36일</td>
  <td>
    <ul>
      <li>router link replace 수정(query를 유동적으로 바꾸는 작업)</li>
    </ul>
  </td>
  </tr>
  
  <tr>
  <td>37일</td>
  <td>
    <ul>
      <li>카카오 회원가입 로그인 로그아웃 구현</li>
      <li>이미지 업로드 front 디렉토리 -> C드라이브 > upload로 수정</li>
      <li>네비게이션 가드 수정</li>
    </ul>
  </td>
  </tr>
  
  <tr>
  <td>38일</td>
  <td>
    <ul>
      <li>회원탈퇴 구현</li>
      <li>내 정보 수정 구현</li>
      <li>backend에 첫 빌드</li>
    </ul>
  </td>
  </tr>
  <tr>
  <td>39일</td>
  <td>
    <ul>
      <li>댓글 답글기능 구현</li>
      <li>기타 편의 기능 추가</li>
      <li>프로필 사진 추가</li>
    </ul>
  </td>
  </tr>
   <tr>
  <td>40~41일</td>
  <td>
    <ul>
      <li>코드 리팩토링</li>
      <li>주문하기 유효성 추가</li>
      <li>주문시 내 주소 체크박스 추가</li>
      <li>이메일로 비밀번호 찾기 및 회원가입 이메일란 추가</li>
      <li>프로젝트 마무리</li>
    </ul>
  </td>
  </tr>
</table>

## ERD 및 테이블 설명

![mysql ERD](https://user-images.githubusercontent.com/42566975/88548297-e328f380-d059-11ea-8aab-501f3f855ff9.PNG)


