import React from "react";
const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='mx-auto  mt-10 px-4 lg:px-0 w-full max-w-2xl relative z-999'>
        {children}
      </div>
    </>
  );
};
export default BlogLayout;
