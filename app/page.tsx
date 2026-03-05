import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function HomePage() {

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Next.js + Supabase Starter
        </h1>

        <p>
          {data.user ? "Logged in" : "Not logged in"}
        </p>
      </div>
    </main>
  );
}