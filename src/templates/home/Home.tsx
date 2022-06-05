import { MouseEvent, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/user";
import { objectEmpty, urlize } from "../../utils/method";
import { Categories as CategoriesT } from "../../types/categories";
import FoodCard from "../../components/foodCard/FoodCard";
import Button from "../../components/button/Button";

interface IProps {
  categories: CategoriesT;
}

const Home: FC<IProps> = ({ categories }): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user") as string) || {};

    if (objectEmpty(user)) {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = (event?: MouseEvent, name?: string): void => {
    if (event) {
      event.preventDefault();
    }

    navigate(`/categories/${urlize(name as string)}`);
  };

  const handleConsumptionClick = (event?: MouseEvent): void => {
    if (event) {
      event.preventDefault();
    }

    navigate("/daily-consumption");
  };

  const renderCategories = (): JSX.Element[] => {
    return Object.keys(categories).map((name, index) => (
      <FoodCard key={index} name={name} handleClick={handleClick} />
    ));
  };

  return (
    <div>
      <div className="page">
        <h1>Home</h1>
        <h2>Add consumed products</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div className="categories">
        {!objectEmpty(categories) && renderCategories()}
      </div>

      <Button
        className="consumption-button"
        onClick={handleConsumptionClick}
        text="Daily consumption"
        textAlign="center"
      />
    </div>
  );
};

export default Home;
