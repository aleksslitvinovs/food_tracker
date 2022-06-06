import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { User } from "../../types/user";
import Category from "../category/Category";
import {
  Category as CategoryT,
  Categories as CategoriesT,
  FoodItem as FoodItemT,
} from "../../types/categories";
import Home from "../home/Home";
import Login from "../login/Login";
import NotFound from "../notFound/NotFound";
import Header from "../../components/header/Header";
import FoodItem from "../foodItem/FoodItem";
import DailyConsumption from "../dailyConsumption/DailyConsumption";
import { getCategories } from "../../db/categories";

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const [categories, setCategories] = useState<CategoriesT>({} as CategoriesT);
  const [categoryName, setCategoryName] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");

  const getCategory = (categoryName: string): CategoryT => {
    return categories[categoryName as keyof CategoriesT];
  };

  const getFoodItem = (categoryName: string, foodName: string): FoodItemT => {
    const category = getCategory(categoryName) || [];
    console.log("category", category)

    return category?.items?.filter((item) => item.name === foodName)[0];
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setIsLoggedIn(true);
    }

    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
    }

    getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  const renderPublicRoute = (): JSX.Element => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              user={user}
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };

  const renderPrivateRoutes = (): JSX.Element => {
    return (
      <>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                user={user}
                isLoggedIn={isLoggedIn}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/categories/:categoryName"
            element={
              <Category
                category={getCategory(categoryName)}
                setCategory={setCategoryName}
              />
            }
          />
          <Route
            path="/categories/:categoryName/:foodName"
            element={
              <FoodItem
                user={user}
                foodItem={getFoodItem(categoryName, foodName)}
                setFoodItemName={setFoodName}
              />
            }
          />
          <Route
            path="daily-consumption"
            element={<DailyConsumption user={user} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>@All rights reserved ADA Eats</footer>
      </>
    );
  };

  return isLoggedIn ? renderPrivateRoutes() : renderPublicRoute();
};

export default App;
