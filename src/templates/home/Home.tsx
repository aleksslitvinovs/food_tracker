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
          Eating a healthy, balanced diet is one of the most important things
          you can do to protect your health. In fact, up to 80% of premature
          heart disease and stroke can be prevented through your life choices
          and habits, such as eating a healthy diet and being physically active.
          A healthy diet can help lower your risk of heart disease and stroke
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
