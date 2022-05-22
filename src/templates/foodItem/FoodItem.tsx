import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import { FoodItem as FoodItemT } from "../../types/categories";

interface IProps {
  foodItem: FoodItemT;
  setFoodItemName: Dispatch<SetStateAction<string>>;
}

const FoodItem: FC<IProps> = ({ foodItem, setFoodItemName }): JSX.Element => {
  const navigate = useNavigate();
  const { categoryName, foodName } = useParams();

  useEffect(() => {
    setFoodItemName(foodName || "");
  }, [foodName, setFoodItemName]);

  const handleClick = (): void => {
    navigate(`/categories/${categoryName}`);
  };

  return (
    <div className="food-item">
      <button onClick={handleClick} className="back-button">
        Back
      </button>

      <Icon name="food" className="food-item-icon" />
      <h1>{foodName}</h1>
      <h2>Average {foodItem?.calories} calories per 100g</h2>
      <input type="number" placeholder="Amount in gramms" />
      <button>Add product to today's consuption</button>
    </div>
  );
};

export default FoodItem;
