import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { HiMail, HiKey } from "react-icons/hi";
import { toast } from "react-toastify";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged In");
      navigate(redirect);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <h1 className="font-serif font-semibold text-center text-3xl text-gray-900 my-10">
        Sign In
      </h1>

      <div className="flex justify-center">
        <Card className="w-80">
          <form className="flex flex-col gap-5" onSubmit={submitHandler}>
            <div>
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
            </div>
            <div>
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
            </div>

            <Button
              isProcessing={isLoading}
              type="submit"
              disabled={isLoading}
              outline
              gradientDuoTone="tealToLime"
            >
              Sign In
            </Button>
            <div className="flex justify-center">
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                <span className="font-semibold">Register</span>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default SignInScreen;
