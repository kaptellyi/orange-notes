let start: number;
export const delayedClick = <
  DelFunc extends () => void,
  IniFunc extends () => void
>(
  el: HTMLElement,
  delayedClickHandler: DelFunc,
  initClickHandler?: IniFunc,
  time = 0
) => {
  if (time === 0) return delayedClickHandler();
  const elPosY = el.getBoundingClientRect().y;
  let counter = 0;

  function countToExecute() {
    if (counter === time) {
      // return if user wanted to scroll
      if (el.getBoundingClientRect().y !== elPosY) return;
      delayedClickHandler();
    } else {
      counter += 1;
      start = requestAnimationFrame(countToExecute);
    }
  }

  start = window.requestAnimationFrame(countToExecute);

  el.ontouchend = () => {
    window.cancelAnimationFrame(start);
    if (
      !initClickHandler ||
      counter === time ||
      el.getBoundingClientRect().y !== elPosY
    )
      return;
    initClickHandler();
  };
};
