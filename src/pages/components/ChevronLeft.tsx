import React from "react";

const ChevronLeft : React.FC<{size?: string, color?: string}> = (props: {size?: string, color?: string})=> {
  const { size = 'large', color = '#222836' } = props;

  if (size !== 'large') {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M16 5L8 11.5L16 19' stroke={color} />
      </svg>
    );
  }

  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M23 4L9 15.1429L23 28' stroke={color} strokeWidth='3.0' />
    </svg>
  );
};

export default ChevronLeft;
