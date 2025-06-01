import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export default function dateFormatter(dateObject) {
  return format(dateObject, "MMMM dd, yyyy, h:mm a", { locale: enUS });
}