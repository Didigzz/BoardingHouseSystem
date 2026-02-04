import { redirect } from "next/navigation";

export default function AuthHome() {
  // Redirect to login page by default
  redirect("/login");
}
