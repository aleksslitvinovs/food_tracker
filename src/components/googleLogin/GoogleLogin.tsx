import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithGoogle } from "../../firebase";
import { User } from "../../types/user";
import Icon from "../icon/Icon";
// import Icon from "../icon/Icon";

interface IProps {
  setUser: Dispatch<SetStateAction<User>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const GoogleLogin: FC<IProps> = ({ setUser, setIsLoggedIn }): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = async () => {
    signInWithGoogle().then(({ user }) => {
      localStorage.setItem("loggedIn", "true");

      setIsLoggedIn(true);

      const userInfo = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      } as User;

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

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
