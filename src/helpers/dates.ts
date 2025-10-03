import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export function formatDuration(d?: number) {
  if (d === undefined) {
    return "";
  }
  return dayjs.duration(d).format("D") + " days";
}

export function formatDate(d: dayjs.ConfigType) {
  if (!d) {
    return "";
  }

  return dayjs(d).format("DD/MM/YYYY");
}

export function formatDateTime(d: dayjs.ConfigType) {
  if (!d) {
    return "";
  }

  return dayjs(d).format("DD/MM/YYYY h:mm A");
}

export function getISODateTime(): string {
  return dayjs().toISOString();
}
