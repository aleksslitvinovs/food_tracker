import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleLogin from "../../components/googleLogin/GoogleLogin";
import Icon from "../../components/icon/Icon";
import { objectEmpty } from "../../utils/method";
import { User } from "../../types/user";

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user") as string) || {};
    setUser(user);

    if (!objectEmpty(user)) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return objectEmpty(user) ? (
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

      <GoogleLogin />
    </div>
  ) : (
    <></>
  );
};

export default Login;
