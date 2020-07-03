import Grid from 'tui-grid';

function createGrid(el) {
  const UserGrid = new Grid({
    el: el,
    columns: [
      {
        header: 'USER_ID',
        name: 'USER_ID',
      },
      {
        header: '전화번호',
        name: 'USER_PHONE',
      },
      {
        header: '가입일자',
        name: 'CRETED_DT',
      },
      {
        header: '유저 권한',
        name: 'USER_VERIFY',
        formatter: function(value) {
          switch (value) {
            case 0:
              return '일반 회원';
            case 1:
              return '우수 회원';
            case 2:
              return '특별 회원';
            case 3:
              return 'VIP 회원';
            case 4:
              return 'VVIP 회원';
            case 5:
              return 'VVVIP 회원';
            case 6:
              return 'VIP관리 회원';
            case 7:
              return '운영자';
            case 8:
              return '관리자';
            case 9:
              return '최고 관리자';
            default:
              return '알 수 없는 사용자';
          }
        },
      },
    ],
  });
  return UserGrid;
}

export { createGrid };
