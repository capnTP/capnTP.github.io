export function timer(second, counter) {
  second > 0 ? second -= 1 : second;
  if (second === 0) {
    return;
  } else {
    setTimeout(this, counter);
  }
}