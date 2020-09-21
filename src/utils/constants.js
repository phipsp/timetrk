const timerState = {
  RUNNING: 'running',
  PAUSED: 'paused',
  STOPPED: 'stopped',
};

const timerNotificationTitle = 'timetrk'

const timerNotificationOptions = {

  DONE_SESSION_START_SHORT_BREAK: {
    title: timerNotificationTitle,
    body: 'Well done. Have a short break!',
  },
  DONE_SESSION_START_LONG_BREAK: {
    title: timerNotificationTitle,
    body: 'Good job. Take a longer break now, you earned it 🔥',
  },
  DONE_BREAK_START_SESSION: {
    title: timerNotificationTitle,
    body: 'Get back to work!'
  }
}

export { timerState, timerNotificationTitle, timerNotificationOptions };
