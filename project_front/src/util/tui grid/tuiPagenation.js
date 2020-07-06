import PageNation from 'tui-pagination';
import Validation from '@/util/data/Validation.js';

function createPageNation(el, _perPage, _totalCnt, _visiblePage, _startPage) {
  return new PageNation(document.querySelector(el), {
    totalItems: _totalCnt,
    itemsPerPage: _perPage,
    visiblePage: Validation.isNull(_visiblePage) ? _visiblePage : 10,
    page: Validation.isNull(_startPage) ? _startPage : 1,
    usageStatistics: false,
  });
}

export { createPageNation };
