import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GoogleLogin from "../../components/googleLogin/GoogleLogin";
import Icon from "../../components/icon/Icon";
import { User } from "../../types/user";

interface IProps {
  user: User;
  isLoggedIn: boolean;
  setUser: Dispatch<SetStateAction<User>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<IProps> = ({
  isLoggedIn,
  setUser,
  setIsLoggedIn,
}): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return !isLoggedIn ? (
    <div className="login-container">
      <div className="header">
        <Icon name="logo" />

        <div className="header-title"></div>
        <div className="header-title__text">
          <h1>Welcome to our food tracking app</h1>
          <div>
            Track you calories and receive instant suggestions how to <br></br>
            improve your daily ration
          </div>
        </div>
      </div>

      <GoogleLogin setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
    </div>
  ) : (
    <></>
  );
};

export default Login;
