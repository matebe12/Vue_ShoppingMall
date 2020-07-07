import DatePicker from 'tui-date-picker';

function createDatePicker(container, target) {
  const ctn = document.querySelector(container);
  const targetEl = document.querySelector(target);
  return new DatePicker(ctn, {
    date: new Date(),
    input: {
      element: targetEl,
      format: 'yyyy-MM-dd',
    },
    language: 'ko',
  });
}

export { createDatePicker };
