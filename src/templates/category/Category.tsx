import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FoodCard from "../../components/foodCard/FoodCard";
import { Category as CategoryT } from "../../types/categories";

interface IProps {
  category: CategoryT;
  setCategory: Dispatch<SetStateAction<string>>;
}

const Category: FC<IProps> = ({ category, setCategory }): JSX.Element => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCategory(categoryName || "");
  }, [categoryName, setCategory, category]);

  const handleBack = (): void => {
    navigate("/");
  };

  const handleClick = (categoryName: string, foodName: string): void => {
    navigate(`/categories/${categoryName}/${foodName}`);
  };

  const renderItems = (): JSX.Element => {
    const { items = [] } = category || {};

    return (
      <div className="category-items">
        {items.map((item, index) => (
          <FoodCard
            key={index}
            name={"food"}
            handleClick={() => handleClick(categoryName as string, item.name)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`category ${categoryName}`}>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
      <h1>{categoryName}</h1>

      {renderItems()}
    </div>
  );
};

export default Category;
