import moment from "moment";

export const shortenName = (name: string) => {
  if (!name || !name.length) return "";
  return name.length < 10
    ? name.length
    : name.slice(0, 4) + "..." + name.slice(-3);
};

export const shortenAddress = (address: string) => {
  if (!address || !address.length) return "";
  return address.length < 20
    ? address.length
    : address.slice(0, 15) + "..." + address.slice(-15);
};

export const getTimeAgo = (timestamp: Date) => {
  return moment(timestamp).format("h:mm a");
};

export const getColor = (cashPoint: number) => {
  if (cashPoint < 1) return "#ff0000";
  if (cashPoint >= 8) return "#ECBC5E";
  if (cashPoint >= 4) return "#D14BBC";
  if (cashPoint >= 2) return "#29C7A1";
  return "#6D6D8F";
};

export const f = (x: number) => {
  x -= 5;
  if (x < 0) {
    return Math.pow(1 - (x * x) / 5 / 5, 0.4);
  }
  return Math.pow(x / 10, 2.5) + 1;
};
