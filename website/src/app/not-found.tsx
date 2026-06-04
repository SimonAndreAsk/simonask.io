import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24 sm:px-8">
      <h1 className="font-display text-3xl tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted leading-relaxed">
        That article doesn&apos;t exist, or it may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-accent transition-colors hover:text-accent-hover"
      >
        ← Back home
      </Link>
    </main>
  );
}
