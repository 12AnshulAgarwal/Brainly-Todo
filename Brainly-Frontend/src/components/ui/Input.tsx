import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        className="px-4 py-2 border rounded m-2 w-full"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
