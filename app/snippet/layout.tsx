import React from 'react';
const SnippetLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
      return (
        <div className='mx-auto mt-10 w-full max-w-2xl'>
            {children}
        </div>
      )
}
export default SnippetLayout;