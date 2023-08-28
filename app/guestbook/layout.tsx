import React from "react";
const GuestbookLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto mt-10 px-4 lg:px-0 w-full max-w-2xl'>
      {children}
    </div>
  );
};
export default GuestbookLayout;
