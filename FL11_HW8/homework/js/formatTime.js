function formatTime(x) {
  let days = Math.trunc(x / 1440),
      hours = Math.trunc(x / 60) % 24,
      minutes = x % 60;

  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}

formatTime(120);
formatTime(59);
formatTime(3601);