import Header from '@/app/components/shared/Navigation/Header';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" />
    </div>
  );
}
