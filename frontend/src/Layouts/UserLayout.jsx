export default function UserLayout({ children }) {
  return (
    <>
      <header>
        <h1>USER LAYOUT</h1>
      </header>
      <main className="flex h-svh w-full items-center justify-between">
        {children}
      </main>
    </>
  );
}
