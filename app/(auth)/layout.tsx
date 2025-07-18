export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="flex-1 p-6 bg-gradient-to-tr from-blue-100 to-white">
        {children}
      </main>
    </div>
  );
}
