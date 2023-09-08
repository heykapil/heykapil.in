import React from "react";
const SnippetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative mx-auto max-w-screen-2xl px-4 py-10 md:flex md:flex-row md:py-10'>
      {children}
    </div>
  );
};
export default SnippetLayout;
