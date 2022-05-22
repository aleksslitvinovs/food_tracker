import { useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="header" onClick={handleClick}>
      <Icon name="logo" className="header-logo" />
    </div>
  );
};

export default Header;
