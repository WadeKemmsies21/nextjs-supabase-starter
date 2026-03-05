import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
const supabase = await createSupabaseServerClient();
const { data } = await supabase.auth.getUser();


if (!data.user) {
  redirect("/login");
}

return (
  <main className="flex min-h-screen items-center justify-center">
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Logged in as:</p>
      <p className="font-mono">{data.user.email}</p>

      <form
action={async () => {
  "use server";
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return;

  const { error } = await supabase
  .from("profiles")
  .update({ full_name: "Hacker Attempt" })
  .eq("id", "5c560e4b-75d2-4ac6-84fc-d1300c5c7346");

  console.log("UPDATE ERROR:", error);
}}
>
<button className="bg-black text-white px-4 py-2 rounded">
  Update My Profile
</button>
</form>
    </div>
    <form
action={async () => {
  "use server";
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}}
>
<button className="bg-red-500 text-white px-4 py-2 rounded">
  Sign Out
</button>
</form>
  </main>
);
}