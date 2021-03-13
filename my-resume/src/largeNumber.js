function largeNumber(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let ret = 0;
  let res = '';
  while (i >= 0 || j >= 0) {
    let tem_a = 0;
    if (i >= 0) {
      tem_a = a[i] - 0;
      i--;
    }

    let tem_b = 0;
    if (j >= 0) {
      tem_b = b[j] - 0;
      j--;
    }

    const sum = tem_a + tem_b + ret;
    if (sum >= 10) {
      res = (sum - 10) + res;
      ret = 1;
    } else {
      res = sum + res;
      ret = 0;
    }
  }

  if (ret) res = ret + res;
  return res;
}