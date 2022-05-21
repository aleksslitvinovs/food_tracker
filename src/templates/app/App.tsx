import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/user";
import { objectEmpty } from "../../utils/method";
import Header from "../../components/header/Header";
import Categories from "../../components/categories/Categories";

const App = (): JSX.Element => {
  const navigate = useNavigate();
  // const [categories,setCategories] = useEffect<Categories>({} as Categories)

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user") as string) || {};

    if (objectEmpty(user)) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="page">
        <h1>Home</h1>
        <h2>Add consumed products</h2>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </span>
      </div>
      <Categories />
    </div>
  );
};

export default App;
