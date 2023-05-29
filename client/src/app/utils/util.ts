export const shortenName = (name: string) => {
  if (!name || !name.length) return "";
  return name.length < 10
    ? name.length
    : name.slice(0, 4) + "..." + name.slice(-3);
};

export const getTimeAgo = (timestamp: Date) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds

  const elapsedSeconds =
    currentTimestamp - Math.floor(new Date(timestamp).getTime() / 1000);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} seconds ago`;
  } else if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(elapsedSeconds / 86400);
    return `${days} days ago`;
  }
};

export const getColor = (cashPoint: number) => {
  if (cashPoint < 1) return "#ff0000";
  if (cashPoint >= 8) return "#ECBC5E";
  if (cashPoint >= 4) return "#D14BBC";
  if (cashPoint >= 2) return "#29C7A1";
  return "#6D6D8F";
};
