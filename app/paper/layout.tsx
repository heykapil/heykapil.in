import React from "react";
const PaperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=' container mx-auto mt-10 px-4 lg:px-0 w-full'>
      {children}
    </div>
  );
};
export default PaperLayout;
