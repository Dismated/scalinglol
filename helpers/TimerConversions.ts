const timeFormatting = (time: number) => (time < 10 ? `0${time}` : time);

const timerToSeconds = (timer: string) => {
  const [minutes, seconds] = timer.split(":");
  const time = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return time;
};
const secondsToTimer = (wholeSeconds: number) => {
  const minutes = Math.trunc(wholeSeconds / 60);
  const seconds = Math.round((wholeSeconds / 60 - minutes) * 60);
  return `${timeFormatting(minutes)}:${timeFormatting(seconds)}`;
};
export { timerToSeconds, secondsToTimer };
