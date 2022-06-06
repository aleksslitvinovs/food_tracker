import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="page not-found">
      <h1>How did you get here?</h1>
      
      <Button
        text="Go home"
        icon={<Icon name="caret" />}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default NotFound;
