import dayjs from "dayjs";

export default function formatDate(d: dayjs.ConfigType) {
  return dayjs(d).format("MMM D, YYYY h:mm A");
}
