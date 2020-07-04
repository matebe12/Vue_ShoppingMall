function isNull(data) {
  if (data == null || data == undefined || data == '') {
    return false;
  } else {
    return true;
  }
}

function isNum(data) {
  const isNumRegex = /^[0-9]*$/;
  console.log(data);

  if (!isNumRegex.test(data)) {
    return false;
  } else {
    return true;
  }
}

function isEmail(data) {
  const isEmailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!isEmailRegex.test(data)) {
    return false;
  } else {
    return true;
  }
}

function isPhone(data) {
  const isPhoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  if (!isPhoneRegex.test(data)) {
    return false;
  } else {
    return true;
  }
}

function isPw(data) {
  const isPw = data.length;
  if (isPw < 6) {
    return false;
  } else {
    return true;
  }
}

function isPrice(data) {
  if (data < 1000 || data > 5000000) {
    return false;
  } else {
    return true;
  }
}

function isLength(data, length) {
  if (data.length > length) {
    return false;
  } else {
    return true;
  }
}

function isStock(data) {
  if (data < 10 || data > 5000) {
    return false;
  } else {
    return true;
  }
}

export default {
  isNull,
  isNum,
  isEmail,
  isPhone,
  isPw,
  isPrice,
  isLength,
  isStock,
};
