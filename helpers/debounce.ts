const debounce = <T>(func: (e: T) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (event: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, delay, event);
  };
};

export default debounce;
