import {
  DataSnapshot,
  get,
  getDatabase,
  push,
  ref,
  update,
} from "firebase/database";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import { FoodItem as FoodItemT } from "../../types/categories";
import { User } from "../../types/user";
import dayjs from "dayjs";
import { Consumption, ConsumptionItem } from "../../types/consumption";
import Button from "../../components/button/Button";
import { addSpaceBetweenWords, urlize } from "../../utils/method";

interface IProps {
  user: User;
  foodItem: FoodItemT;
  setFoodItemName: Dispatch<SetStateAction<string>>;
}

const FoodItem: FC<IProps> = ({
  user,
  foodItem,
  setFoodItemName,
}): JSX.Element => {
  const navigate = useNavigate();
  const { categoryName, foodName } = useParams();

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const name = addSpaceBetweenWords(foodName || "", "-");

    setFoodItemName(name.charAt(0).toUpperCase() + name.slice(1));
  }, [foodName, setFoodItemName]);

  const handleBack = (): void => {
    navigate(`/categories/${urlize(categoryName as string)}`);
  };

  const handleInputChange = (event?: ChangeEvent<HTMLInputElement>): void => {
    const { value = "" } = event?.target || {};

    setQuantity(parseInt(value));
  };

  const handleAddProduct = async (event?: React.MouseEvent): Promise<void> => {
    const db = getDatabase();

    const consumptionRef = (await get(
      ref(db, `users/${user.uid}/consumption`)
    ).catch((err) => console.error(err))) as DataSnapshot;

    const consumption: Consumption[] = consumptionRef.val() || {};

    console.log(consumption);

    const date = dayjs().format("DD-MM-YYYY");

    console.log("food item", foodItem);
    const newConsumption: ConsumptionItem = {
      quantity,
      name: foodItem.name,
      calories: foodItem.calories,
    };

    const { key } = push(ref(db, `users/${user.uid}/consumption/${date}`));

    update(
      ref(db, `users/${user.uid}/consumption/${date}/${key}`),
      newConsumption
    );
  };

  return (
    <div className="food-item">
      <Button
        className="go-back"
        onClick={handleBack}
        text="Back"
        textAlign="left"
        icon={<Icon name="caret" />}
      />

      <Icon name="food" className="food-item-icon" />
      <h1>{addSpaceBetweenWords(foodName as string, "-")}</h1>
      <h2>Average {foodItem?.calories} calories per 100g</h2>
      <input
        type="number"
        placeholder="Amount in gramms"
        onChange={handleInputChange}
      />
      <button onClick={handleAddProduct}>
        Add product to today's consuption
      </button>
    </div>
  );
};

export default FoodItem;
