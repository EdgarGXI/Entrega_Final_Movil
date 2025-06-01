import { parse } from "date-fns";
import { enUS } from "date-fns/locale";

export default function dateParser(dateString) {
  if (!dateString || typeof dateString !== "string") {
    throw new Error("Invalid date string provided");
  }
  const eventDate = parse(dateString.toString(), "MMMM dd, yyyy, h:mm a", new Date(), {
    locale: enUS
  });
  return eventDate;
}
