import 'tui-grid/dist/tui-grid.css';
import Grid from 'tui-grid';
import Validation from '@/util/data/Validation.js';
function createdGrid(el, _columns, _option) {
  let bodyHeight = 350; // 그리드 높이
  let bodyRowHeight = 35; // 그리드 행 높이
  let scrollX = false; // 그리드 가로 스크롤 생성 여부
  let scrollY = false; // 그리드 세로 스크롤 생성 여부
  let multiCheck = false; // 그리드의 첫 Cell에 체크박스 생성 여부
  let rowHeaders = null;
  if (Validation.isNull(_option)) {
    // 그리드 옵션이 있을 경우
    if (Validation.isNull(_option.bodyHeight)) {
      bodyHeight = _option.bodyHeight;
    }
    if (Validation.isNull(_option.bodyRowHeight)) {
      bodyRowHeight = _option.bodyRowHeight;
    }
    if (Validation.isNull(_option.scrollX) && _option.scrollX) {
      scrollX = true;
    }
    if (Validation.isNull(_option.scrollY) && _option.scrollY) {
      scrollY = true;
    }
    if (Validation.isNull(_option.multiCheck) && _option.multiCheck) {
      multiCheck = true;
    }

    if (Validation.isNull(_option.rowHeaders)) {
      rowHeaders = _option.rowHeaders;
    }
  }
  const instance = {
    el: document.querySelector(el),
    scrollX: scrollX,
    scrollY: scrollY,
    bodyHeight: bodyHeight, // Grid 높이
    rowHeight: bodyRowHeight, // Row 높이
    focusDefault: false, // 헤더 선택시 default로 선택되는 행을 제거
    usageStatistics: false, // Google Analytics에 호스트 이름 보내기 차단
    columns: _columns,
  };

  if (multiCheck) {
    instance.rowHeaders = ['checkbox'];
  }

  if (Validation.isNull(rowHeaders)) {
    instance.rowHeaders = rowHeaders;
  }

  return new Grid(instance);
}
export { createdGrid };
