import { format } from "date-fns";

export const getDayLabel = (date: Date) => {
  return format(date, "EEEE"); // "EEEE" menghasilkan format hari yang lengkap (Friday, Saturday, dst)
};
