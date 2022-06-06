import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { icons } from "../../assets/icons/icons";
import Button from "../../components/button/Button";
import FoodCard from "../../components/foodCard/FoodCard";
import Icon from "../../components/icon/Icon";
import { Category as CategoryT } from "../../types/categories";
import {
  addSpaceBetweenWords,
  convertToCamelCase,
  urlize,
} from "../../utils/method";

interface IProps {
  category: CategoryT;
  setCategory: Dispatch<SetStateAction<string>>;
}

const Category: FC<IProps> = ({ category, setCategory }): JSX.Element => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCategory(convertToCamelCase(categoryName as string) || "");
  }, [categoryName, setCategory, category]);

  const handleBack = (): void => {
    navigate("/");
  };

  const handleClick = (categoryName: string, foodName: string): void => {
    navigate(`/categories/${urlize(categoryName)}/${urlize(foodName, " ")}`);
  };

  const renderItems = (): JSX.Element => {
    const { items = [] } = category || {};

    return (
      <div className="category-items">
        {items.map((item, index) => {
          const iconName = icons[item.icon as keyof typeof icons]
            ? item.icon
            : "food";

          return (
            <FoodCard
              key={index}
              iconName={iconName}
              name={item.name}
              handleClick={() => handleClick(categoryName as string, item.name)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`category ${categoryName}`}>
      <Button
        className="go-back"
        onClick={handleBack}
        text="Back"
        textAlign="left"
        icon={<Icon name="caret" />}
      />
      <h1>{addSpaceBetweenWords(categoryName as string, "-")}</h1>

      {renderItems()}
    </div>
  );
};

export default Category;
