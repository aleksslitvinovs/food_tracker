import {
  DataSnapshot,
  getDatabase,
  orderByKey,
  ref,
  set,
  query,
  get,
} from "firebase/database";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import { Consumption, ConsumptionItem } from "../../types/consumption";
import { User } from "../../types/user";
import { formatDate, objectEmpty } from "../../utils/method";

interface IProps {
  user: User;
}

type ConsumptionItemWithRef = ConsumptionItem & {
  ref: string;
};

const DailyConsumption: FC<IProps> = ({ user }): JSX.Element => {
  const navigate = useNavigate();

  const [consumption, setConsumption] = useState<Consumption>(
    {} as Consumption
  );

  const handleBack = (): void => {
    navigate("/");
  };

  const getConsumption = async (): Promise<void> => {
    const db = getDatabase();

    const consumptionRef = (await get(
      query(ref(db, `users/${user.uid}/consumption`), orderByKey())
    ).catch((err) => console.error(err)))! as DataSnapshot;

    const rawConsumption: Consumption = consumptionRef.val() || {};

    const orderderedConsumption: Consumption = {};

    Object.keys(rawConsumption)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .forEach((key) => {
        orderderedConsumption[key] = rawConsumption[key];
      });

    console.log("consumption", orderderedConsumption);

    setConsumption(orderderedConsumption);
  };

  useEffect(() => {
    getConsumption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemDelete = async (date: string, id: string) => {
    const db = getDatabase();

    await set(
      ref(db, `users/${user.uid}/consumption/${date}/${id}`),
      null
    ).catch((err) => console.error(err));

    setConsumption((consumption) => {
      const copyConsumption = { ...consumption };

      delete copyConsumption[date][id];

      if (objectEmpty(copyConsumption[date])) {
        delete copyConsumption[date];
      }

      return copyConsumption;
    });
  };

  const getDailyItems = (date: string): ConsumptionItemWithRef[] => {
    const dateItems = consumption[date];

    const itemRefs = Object.keys(dateItems);

    const items: ConsumptionItemWithRef[] = [];

    itemRefs.forEach((ref) => {
      console.log("item refs", ref);
      const item = dateItems[ref];

      items.push({ ...item, ref });
    });

    return items;
  };

  const getTotalCalories = (items: ConsumptionItemWithRef[]): number => {
    return items.reduce((acc, item) => acc + item.calories, 0);
  };

  const renderDailyConsumption = (): JSX.Element[] => {
    const dates = Object.keys(consumption);

    return dates.map((date) => {
      const dailyItems = getDailyItems(date);

      return (
        <div className="daily-consumption__item" key={date}>
          <div className="date">{formatDate(date)}</div>
          <div className="date-total-calories">
            {getTotalCalories(dailyItems)} calories
          </div>

          <div className="items">
            {dailyItems.map((item) => {
              return (
                <div className="item-container" key={item.ref}>
                  <div className="item">
                    {item.name} -{" "}
                    {parseFloat(item.calories.toString()).toFixed(2)} calories (
                    {item.quantity}
                    grams)
                  </div>
                  <Icon
                    name="cross"
                    className="delete-item"
                    onClick={() => handleItemDelete(date, item.ref)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="daily-consumption">
      <Button
        className="go-back"
        onClick={handleBack}
        text="Back"
        textAlign="left"
        icon={<Icon name="caret" />}
      />

      <h1>Daily consumption</h1>

      {objectEmpty(consumption) ? (
        <div>No items added in daily consumption</div>
      ) : (
        renderDailyConsumption()
      )}
    </div>
  );
};

export default DailyConsumption;
