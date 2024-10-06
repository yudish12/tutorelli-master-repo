import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GlobalRole = {
  SuperAdmin: "super_admin",
  Admin: "admin",
  student: "student",
  tutor: "tutor",
  parent: "parent",
};

export const paymentClickHandler = async (session_id: string) => {
  try {
    const res = await fetch("/api/book-session/", {
      method: "POST",
      body: JSON.stringify({ session_id }),
    });
    window.location.href = res.url;
  } catch (error) {
    console.log(error);
  }
};

export function mergeDateAndTime(dateString: string, timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number); // Split the time string into hours and minutes
  const date = new Date(dateString); // Create a Date object from the date string

  // Set the hours and minutes on the date object
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);

  return date.toISOString(); // Return the updated date in ISO format
}

export const generateUUID = () => uuidv4();

export const getRecurrenceType = (interval?: string) => {
  if (!interval) return null;
  switch (interval) {
    case "daily":
      return 1;
    case "weekly":
      return 2;
    case "monthly":
      return 3;
    default:
      return null;
  }
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
};
