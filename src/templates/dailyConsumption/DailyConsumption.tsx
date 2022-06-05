import { DataSnapshot, get, getDatabase, ref, set } from "firebase/database";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import { Consumption } from "../../types/consumption";
import { User } from "../../types/user";
import { objectEmpty } from "../../utils/method";

interface IProps {
  user: User;
}

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
      ref(db, `users/${user.uid}/consumption`)
    ).catch((err) => console.error(err)))! as DataSnapshot;

    console.log("consumption value", consumptionRef.val());
    setConsumption(consumptionRef.val() || {});
  };

  useEffect(() => {
    getConsumption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemDelete = async (
    date: string,
    id: string,
    event?: React.MouseEvent
  ) => {
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

  const renderDailyConsumption = (): JSX.Element[] => {
    const dates = Object.keys(consumption);

    return dates.map((date) => {
      const dateItems = consumption[date];

      const itemRefs = Object.keys(dateItems);

      return (
        <div className="daily-consumption__item" key={date}>
          <div className="name">{date}</div>

          <div className="items">
            {itemRefs.map((itemRef) => {
              const item = dateItems[itemRef];

              return (
                <div className="item-container" key={itemRef}>
                  <div className="item">
                    {item.name}-{item.calories}
                  </div>
                  <Icon
                    name="cross"
                    className="delete-item"
                    onClick={(event) => handleItemDelete(date, itemRef, event)}
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
