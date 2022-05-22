import { FC, PropsWithChildren } from "react";
import Header from "../components/header/Header";

interface IProps {
  children?: PropsWithChildren<Node>;
}

const WithHeader: FC<IProps> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
    </>
  );
};

export default WithHeader;
