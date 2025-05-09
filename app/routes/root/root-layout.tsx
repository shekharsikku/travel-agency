import type { Route } from "./+types/root-layout";
import { Outlet, redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { RootNavbar } from "~/components";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Tourvisto - Travel Agency Platform" },
    { name: "description", content: "Travel Agency Platform" },
  ];
}

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error fetching user:", error)
    return redirect("/sign-in")
  }
}

const RootLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  )
}

export default RootLayout;