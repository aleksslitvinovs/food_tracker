import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithGoogle } from "../../firebase";
import Icon from "../icon/Icon";
// import Icon from "../icon/Icon";

const GoogleLogin: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = async () => {
    signInWithGoogle().then(({ user }) => {
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    });
  };

  return (
    <div className="login">
      <button onClick={handleClick} className="login-button">
        Sign in with Google
      </button>
      <Icon name="google" className="login-logo" />
    </div>
  );
};

export default GoogleLogin;
