"use client";

export default function ScrolltoTop() {
  return (
    <button
      className='hover:text-blue-500 hover:underline flex items-center gap-x-1.5 text-sm transition-opacity opacity-100'
      type='button'
      onClick={() => window.scrollTo({ top: 0 })}
    >
      Scroll to top{" "}
      <svg
        className='with-icon_icon__MHUeb'
        fill='none'
        height='20'
        shapeRendering='geometricPrecision'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        viewBox='0 0 24 24'
        width='20'
      >
        <circle cx='12' cy='12' r='10'></circle>
        <path d='M16 12l-4-4-4 4'></path>
        <path d='M12 16V8'></path>
      </svg>
    </button>
  );
}
