import { MouseEvent, FC } from "react";
import Icon from "../icon/Icon";

interface IProps {
  name?: string;
  handleClick?: (event: MouseEvent<HTMLDivElement>, name?: string) => void;
}

const FoodCard: FC<IProps> = ({
  name,
  handleClick = () => {},
}): JSX.Element => {
  return (
    <div
      key={name}
      className="food-card"
      onClick={(event) => handleClick(event, name)}
    >
      <Icon name={name || "food"} className="icon" />
      <span className="name">{name}</span>
    </div>
  );
};

export default FoodCard;
