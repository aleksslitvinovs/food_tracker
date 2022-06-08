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
import {
  addSpaceBetweenWords,
  convertToCamelCase,
  convertToSentenceCase,
  urlize,
} from "../../utils/method";
import { icons } from "../../assets/icons/icons";
import { toast } from "react-toastify";

interface IProps {
  user: User;
  foodItem: FoodItemT;
  setFoodItemName: Dispatch<SetStateAction<string>>;
  setCategoryName: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const FoodItem: FC<IProps> = ({
  user,
  foodItem,
  setFoodItemName,
  setCategoryName,
  isLoading,
}): JSX.Element => {
  const navigate = useNavigate();
  const { categoryName, foodName } = useParams();
  const [errorClass, setErrorClass] = useState("");

  const [quantity, setQuantity] = useState<number | string>("");

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setCategoryName(convertToCamelCase(categoryName as string));
    setFoodItemName(convertToSentenceCase(foodName as string));
  }, [isLoading, foodName, setFoodItemName, setCategoryName, categoryName]);

  const handleBack = (): void => {
    navigate(`/categories/${urlize(categoryName as string)}`);
  };

  const handleInputChange = (event?: ChangeEvent<HTMLInputElement>): void => {
    const { value = "" } = event?.target || {};

    if (value.length > 4) {
      return;
    }

    setErrorClass("");
    setQuantity(parseFloat(value));
  };

  const handleAddProduct = async (event?: React.MouseEvent): Promise<void> => {
    const db = getDatabase();

    if (quantity < 1 || isNaN(quantity as number)) {
      setErrorClass("food-item-input__error");

      return;
    }

    setErrorClass("");

    const consumptionRef = (await get(
      ref(db, `users/${user.uid}/consumption`)
    ).catch((err) => console.error(err))) as DataSnapshot;

    const consumption: Consumption[] = consumptionRef.val() || {};

    console.log(consumption);

    const date = dayjs().format("DD-MM-YYYY");

    console.log("food item", foodItem);
    const newConsumption: ConsumptionItem = {
      quantity: quantity as number,
      name: foodItem.name,
      calories: Math.trunc((foodItem.calories / 100) * (quantity as number)),
    };

    const { key } = push(ref(db, `users/${user.uid}/consumption/${date}`));

    update(
      ref(db, `users/${user.uid}/consumption/${date}/${key}`),
      newConsumption
    );

    toast.success("Product added");

    setQuantity("");
  };

  console.log("item ", foodItem);
  const iconName = icons[foodItem?.icon as keyof typeof icons]
    ? foodItem?.icon
    : "food";

  const renderItem = (): JSX.Element => (
    <div className="food-item">
      <Button
        className="go-back"
        onClick={handleBack}
        text="Back"
        textAlign="left"
        icon={<Icon name="caret" />}
      />

      <Icon name={iconName} className="food-item-icon" />

      <h1>{addSpaceBetweenWords(foodName as string, "-")}</h1>

      <h2>Average {foodItem?.calories} calories per 100g</h2>

      <input
        type="number"
        maxLength={4}
        placeholder="Amount in gramms"
        value={quantity}
        className={`food-item-input ${errorClass}`}
        onChange={handleInputChange}
      />

      {errorClass && (
        <p className="food-item-input__error-text">
          Please enter a valid amount
        </p>
      )}

      <button className="add-food-item" onClick={handleAddProduct}>
        Add product to today's consuption
      </button>
    </div>
  );

  return isLoading ? <div className="food-item">Loading...</div> : renderItem();
};

export default FoodItem;
