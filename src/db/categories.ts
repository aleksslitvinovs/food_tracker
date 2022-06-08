import { get, getDatabase, ref } from "firebase/database";
import { Categories } from "../types/categories";

export const getCategories = async (): Promise<Categories> => {
  const db = getDatabase();

  return new Promise((resolve, reject) => {
    get(ref(db, "categories"))
      .then((res) => {
        if (!res.exists()) {
          return;
        }

        const categories = res.val() as Categories;

        console.log("categories fetch", categories);
        resolve(categories);
      })
      .catch((err) => reject(err));
  });
};
