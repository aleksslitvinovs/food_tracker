import { Dispatch, MouseEvent, FC, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/user";
import { objectEmpty, urlize } from "../../utils/method";
import { Categories, Categories as CategoriesT } from "../../types/categories";
import FoodCard from "../../components/foodCard/FoodCard";
import Button from "../../components/button/Button";
import { getCategories } from "../../db/categories";

interface IProps {
  user: User;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  categories: CategoriesT;
  setCategories: Dispatch<SetStateAction<Categories>>;
}

const Home: FC<IProps> = ({
  user,
  isLoggedIn,
  setIsLoggedIn,
  categories,
  setCategories,
}): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (objectEmpty(categories)) {
      getCategories()
        .then((cat) => setCategories(cat))
        .catch((err) => console.log(err));
    }
  }, [categories, isLoggedIn, navigate, setCategories, setIsLoggedIn]);

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

  const handleLogOut = (event?: MouseEvent): void => {
    if (event) {
      event.preventDefault();
    }

    setIsLoggedIn(false);
    localStorage.setItem("loggedIn", "false");
    navigate("/login");
  };

  const renderCategories = (): JSX.Element[] => {
    return Object.keys(categories).map((name, index) => (
      <FoodCard key={index} name={name} handleClick={handleClick} />
    ));
  };

  return (
    <div>
      <div className="page">
        <div className="user-info">
          <img className="user-info__photo" src={user.photoURL} alt="user" />
          <div className="user-info__details">
            <div className="user-info__name">{user.name}</div>
            <div className="user-info__email">{user.email}</div>
          </div>
          <button onClick={handleLogOut}>Log out</button>
        </div>
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
