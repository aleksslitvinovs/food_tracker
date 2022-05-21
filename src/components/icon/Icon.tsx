import { cloneElement, FC } from "react";

import { icons } from "../../assets/icons/icons";

interface IProps {
  className?: string;
  name: string;
}

const Icon: FC<IProps> = ({ className, name }): JSX.Element => {
  const newProps = {
    className: className || `icon-${name}`,
    name,
  };

  const renderIcon = (): JSX.Element => {
    const element = icons[name as keyof typeof icons];

    if (!element) {
      throw new Error(`Icon ${name} not found`);
    }

    return element;
  };

  return cloneElement(renderIcon(), newProps);
};

export default Icon;
