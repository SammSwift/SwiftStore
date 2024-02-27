import { Spinner } from "flowbite-react";

const Loader = ({ msg }) => {
  return (
    <div className="text-center my-10">
      <Spinner size="xl" />
      <p className="font-semibold">{msg}</p>
    </div>
  );
};

export default Loader;
