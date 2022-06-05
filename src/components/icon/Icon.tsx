import { cloneElement, FC } from "react";

import { icons } from "../../assets/icons/icons";

interface IProps {
  className?: string;
  name: string;
  onClick?: (event?: React.MouseEvent) => void;
}

const Icon: FC<IProps> = ({
  className,
  name,
  onClick = () => {},
}): JSX.Element => {
  const newProps = {
    className: className || `icon-${name}`,
    name,
    onClick,
  };

  const renderIcon = (): JSX.Element => {
    const element = icons[name as keyof typeof icons];

    if (!element) {
      // throw new Error(`Icon ${name} not found`);
      console.error("Icon", name, "not found");
    }

    return element;
  };

  return cloneElement(renderIcon(), newProps);
};

export default Icon;
