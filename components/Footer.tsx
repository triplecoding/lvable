export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
        © {new Date().getFullYear()} HeyMariner. Built for maritime professionals.
      </div>
    </footer>
  );
}
