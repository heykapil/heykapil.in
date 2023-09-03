export default function LikeButtonSkelton() {
  return (
    <div className='flex items-center justify-center h-fit gap-2 overflow-hidden transition-transform bg-[var(--brand)] text-[var(--brandforeground)] disabled:bg-[var(--muted)] disabled:text-[var(--primary)] rounded-lg'>
      <div className='flex h-6 w-10 items-center justify-between gap-2 px-4 py-2 bg-neutral-200 dark:bg-neutral-800'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
