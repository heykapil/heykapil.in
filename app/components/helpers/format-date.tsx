export function formatDate(date: string) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);
  let timeDiff = currentDate.getTime() - targetDate.getTime();
  let daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (daysDiff) {
    if (daysDiff >= 365) {
      years++;
      daysDiff -= 365;
    } else if (daysDiff >= 30) {
      months++;
      daysDiff -= 30;
    } else if (daysDiff >= 7) {
      weeks++;
      daysDiff -= 7;
    } else {
      days++;
      daysDiff--;
    }
  }
  let formattedDate = "";
  if (years > 0) {
    formattedDate = `${years}y ago`;
  } else if (months > 0) {
    formattedDate = `${months}mo ago`;
  } else if (weeks > 0) {
    formattedDate = `${weeks}w ago`;
  } else if (days > 0) {
    formattedDate = `${days}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export function formatShortDate(date: string) {
  let currentDate = new Date();
  if (!date.toString().includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);
  let timeDiff = currentDate.getTime() - targetDate.getTime();
  let daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (daysDiff) {
    if (daysDiff >= 365) {
      years++;
      daysDiff -= 365;
    } else if (daysDiff >= 30) {
      months++;
      daysDiff -= 30;
    } else if (daysDiff >= 7) {
      weeks++;
      daysDiff -= 7;
    } else {
      days++;
      daysDiff--;
    }
  }
  let formattedDate = "";
  if (years > 0) {
    formattedDate = `${years}y ago`;
  } else if (months > 0) {
    formattedDate = `${months}mo ago`;
  } else if (weeks > 0) {
    formattedDate = `${weeks}w ago`;
  } else if (days > 0) {
    formattedDate = `${days}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
  });

  return `${fullDate}`;
}
