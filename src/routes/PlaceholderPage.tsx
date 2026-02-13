export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">Vista por implementar.</p>
    </main>
  )
}
