import { FaBell } from "react-icons/fa6";
import { Alert } from "flowbite-react";

const Message = ({ children, color }) => {
  return (
    <Alert color={color} icon={FaBell}>
      <span className="text-cyan-900 font-semibold"> {children}</span>
    </Alert>
  );
};

Message.defaultProps = {
  color: "info",
};
export default Message;
