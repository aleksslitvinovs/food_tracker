import { useEffect, useState } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { Categories as CategoriesT } from "../../types/categories";
import { objectEmpty } from "../../utils/method";
import Icon from "../icon/Icon";

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoriesT>({} as CategoriesT);

  const getCategories = (): any => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, "categories"))
      .then((res) => {
        if (!res.exists()) {
          return;
        }

        const categories = res.val() as CategoriesT;
        console.log(categories);

        setCategories(categories);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const renderCategories = (): JSX.Element[] => {
    return Object.keys(categories).map((name) => (
      <div key={name} className="category">
        {
          // TODO: Implement category icon
        }

        {/* <span className="icon">{items.icon}</span> */}
        <span className="name">{name}</span>

        {Object.keys(categories).includes(name) ? (
          <Icon name={name} className="icon" />
        ) : (
          <Icon name="food" className="icon" />
        )}
      </div>
    ));
  };

  return (
    <div className="categories">
      {!objectEmpty(categories) && renderCategories()}
    </div>
  );
};

export default Categories;
