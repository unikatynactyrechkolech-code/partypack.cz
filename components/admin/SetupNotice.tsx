export function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-2xl font-semibold">Administrace ještě není propojená s databází</h1>
      <p className="mt-4 leading-relaxed">
        Doplňte do proměnných prostředí klíče k Supabase (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY a
        SUPABASE_SERVICE_ROLE_KEY), spusťte SQL ze složky supabase a restartujte web. Postup je v README.
      </p>
    </div>
  );
}
