export default function Page() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="min-h-[50vh] rounded-xl bg-muted/50 w-full" />
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 w-full">
        <div className="aspect-video rounded-xl bg-muted/50 w-full" />
        <div className="aspect-video rounded-xl bg-muted/50 w-full" />
      </div>
    </div>
  );
}
