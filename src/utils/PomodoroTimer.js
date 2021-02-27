// found: https://github.com/P3trur0/vuemodoro/blob/master/src/lib/timer.js
export const PomodoroTimer = {
  startCountdown: (minutes, seconds, callback) => {
    minutes = minutes || 0;
    seconds = seconds || 0;
    seconds = seconds + minutes * 60;

    const immutableseconds = seconds

    let end = new Date()
    end.setSeconds(end.getSeconds() + immutableseconds)

    let interval = null;

    function countdown() {
      const current = new Date();
      const count = end - current;

      const secs = Math.floor((count / 1000) % 60);
      const mins = Math.floor((count / 1000 / 60) % 60);
      const remainingSeconds = secs + mins * 60;

      callback(seconds);
      seconds = remainingSeconds;
      if (seconds <= 0) {
        clearInterval(interval);
      }
    }

    // Setting the interval to run every 100ms increases the accuracy of the passing seconds.
    // This is because sometimes the program's 1000ms are slower or faster than the system clock's 1000ms.
    // When this happens, the displayed time might skip a second due to the discrepancy.
    interval = setInterval(countdown, 100);

    countdown();
    return interval;
  },

  pauseCountdown: (intervalId) => {
    clearInterval(intervalId);
  },

  stopCountdown: (intervalId) => {
    clearInterval(intervalId);
  },

  remainingTime: (seconds) => {
    return {
      mm: (seconds / 60) | 0,
      ss: seconds % 60 | 0,
      running: seconds > 0,
    };
  },
};
