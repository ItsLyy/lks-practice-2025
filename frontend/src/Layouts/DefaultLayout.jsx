export default function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <h1>DEFAULT LAYOUT</h1>
      </header>
      <main className="flex h-svh w-full items-center justify-center">
        {children}
      </main>
    </>
  );
}
