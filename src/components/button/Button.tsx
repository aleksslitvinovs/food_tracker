import React, { FC } from "react";

interface IProps {
  className?: string;
  filled?: boolean;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  onClick?: (event?: React.MouseEvent) => void;
  textAlign?: "left" | "center" | "right";
  text: string;
}

const Button: FC<IProps> = ({
  className = "",
  filled = false,
  icon,
  iconPosition,
  onClick = () => {},
  textAlign = "center",
  text = "",
}): JSX.Element => {
  return (
    <button
      className={`button${
        filled ? "button-filled" : " "
      }button-text__${textAlign} ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className={`button-icon button-icon__${iconPosition}`}>{icon}</div>
      )}
      {text}
    </button>
  );
};

export default Button;
