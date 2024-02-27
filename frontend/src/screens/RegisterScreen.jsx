import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { HiMail, HiKey, HiUser } from "react-icons/hi";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          profileImage: "/images/avater.png",
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <>
      <h1 className="font-serif font-semibold text-center text-3xl text-gray-900 my-10">
        Sign Up
      </h1>
      <div className="flex justify-center">
        <Card className="w-80 ">
          <form className="flex flex-col gap-5" onSubmit={submitHandler}>
            <div className="space-y-2">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Username" />
              </div>
              <TextInput
                id="name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Josh Bush"
                required
                icon={HiUser}
              />
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your Email" />
              </div>
              <TextInput
                id="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
                icon={HiMail}
              />
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                icon={HiKey}
              />
              <div className="mb-2 block">
                <Label
                  htmlFor="Confirm Password"
                  value="Confirm Your Password"
                />
              </div>
              <TextInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={HiKey}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              isProcessing={isLoading}
              outline
              gradientDuoTone="tealToLime"
            >
              Register
            </Button>
            {isLoading && <Loader />}
            <div className="flex justify-center">
              Already have an account?
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                <span className="font-semibold">Login</span>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default RegisterScreen;
