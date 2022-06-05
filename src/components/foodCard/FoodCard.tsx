import { MouseEvent, FC } from "react";
import { addSpaceBetweenWords } from "../../utils/method";
import Icon from "../icon/Icon";

interface IProps {
  name: string;
  iconName?: string;
  handleClick?: (event: MouseEvent<HTMLDivElement>, name?: string) => void;
}

const FoodCard: FC<IProps> = ({
  name,
  iconName = name,
  handleClick = () => {},
}): JSX.Element => {
  return (
    <div
      key={name}
      className="food-card"
      onClick={(event) => handleClick(event, name)}
    >
      <Icon name={iconName || "food"} className="icon" />
      <span className="name">{addSpaceBetweenWords(name)}</span>
    </div>
  );
};

export default FoodCard;
