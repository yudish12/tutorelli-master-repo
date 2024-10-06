"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean;
  containerClasses?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClasses, type, showPasswordToggle = false, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn("relative", containerClasses)}>
        <input
          type={showPassword ? "text" : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            showPasswordToggle && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
