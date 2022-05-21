import GoogleLogin from "../../components/googleLogin/GoogleLogin";
import Icon from "../../components/icon/Icon";

const Login = (): JSX.Element => {
  // TODO: Check if logged in
  return (
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
  );
};

export default Login;
