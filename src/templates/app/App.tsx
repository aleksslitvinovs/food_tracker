import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { User } from "../../types/user";
import { objectEmpty } from "../../utils/method";
import Category from "../category/Category";
import {
  Category as CategoryT,
  Categories as CategoriesT,
  FoodItem as FoodItemT,
} from "../../types/categories";
import { child, get, getDatabase, ref } from "firebase/database";
import Home from "../home/Home";
import Login from "../login/Login";
import NotFound from "../notFound/NotFound";
import Header from "../../components/header/Header";
import FoodItem from "../foodItem/FoodItem";

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoriesT>({} as CategoriesT);
  const [categoryName, setCategoryName] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");

  const getCategories = (): any => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, "categories"))
      .then((res) => {
        if (!res.exists()) {
          return;
        }

        const categories = res.val() as CategoriesT;
        console.log("From DB", categories);

        setCategories(categories);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const getCategory = (categoryName: string): CategoryT => {
    return categories[categoryName as keyof CategoriesT];
  };

  const getFoodItem = (categoryName: string, foodName: string): FoodItemT => {
    const category = getCategory(categoryName) || [];

    return category?.items?.filter((item) => item.name === foodName)[0];
  };

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user") as string) || {};

    if (!objectEmpty(user)) {
      setIsLoggedIn(true);
      getCategories();
    }
  }, []);

  const renderPublicRoute = (): JSX.Element => {
    return (
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };

  const renderPrivateRoutes = (): JSX.Element => {
    return (
      <>
        <Header />

        <Routes>
          <Route path="/" element={<Home categories={categories} />} />
          <Route path="/login" element={<Login />} />
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
                foodItem={getFoodItem(categoryName, foodName)}
                setFoodItemName={setFoodName}
              />
            }
          />
          ;
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>@All rights reserved ADA Eats</footer>
      </>
    );
  };

  return isLoggedIn ? renderPrivateRoutes() : renderPublicRoute();
};

export default App;
