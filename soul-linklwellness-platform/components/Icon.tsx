
import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return <i data-lucide={name} className={className} {...props}></i>;
};

export default Icon;
