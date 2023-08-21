import React from "react";
const PaperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto mt-10 px-4 lg:px-0 w-full container'>
      {children}
    </div>
  );
};
export default PaperLayout;
