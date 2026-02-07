import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick?:
    | ((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void)
    | (() => void);
  href?: string;
  target?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  href,
  target,
  className = "",
  icon,
}) => {
  const baseClass = `btn btn-${variant} ${className}`;
  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={
          onClick as
            | ((e: React.MouseEvent<HTMLAnchorElement>) => void)
            | undefined
        }
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClass}
      onClick={
        onClick as
          | ((e: React.MouseEvent<HTMLButtonElement>) => void)
          | undefined
      }
    >
      {content}
    </button>
  );
};
