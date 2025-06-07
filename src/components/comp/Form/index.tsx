import React, { FormEventHandler, ReactNode } from 'react';

type FormProps = {
  className?: string;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const Form = ({ className, children, onSubmit }: FormProps) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}