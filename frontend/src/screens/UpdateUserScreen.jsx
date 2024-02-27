import { Button, TextInput, Checkbox, Label } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { toast } from "react-toastify";

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../slices/userApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UpdateUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [updateUser, { isLoading: LoadingUserUpdate }] =
    useUpdateUserMutation();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  console.log(user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const updateUserHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      });
      toast.success("User Updated Succesfully!");
      refetch();
      navigate("/admin/users");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader msg="Retrieving User..." />
      ) : error ? (
        <Message color={"red"}>{error}</Message>
      ) : (
        <>
          <h1 className="font-serif font-semibold tracking-tight text-center text-xl mt-8 mb-3">
            Update User
          </h1>
          <div className="flex justify-center">
            <Card className="w-80">
              <form
                className="flex flex-col gap-4"
                onSubmit={updateUserHandler}
              >
                <div className="space-y-3">
                  <TextInput
                    id="name"
                    value={name}
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <TextInput
                    id="email"
                    value={email}
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="admin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <Label htmlFor="admin" className="font-bold">
                      Is Admin
                    </Label>
                  </div>
                </div>
                <Button
                  type="submit"
                  gradientDuoTone="tealToLime"
                  onClick={() =>
                    toast("Updating User...", {
                      position: toast.POSITION.TOP_CENTER,
                    })
                  }
                  isProcessing={LoadingUserUpdate}
                >
                  Update User
                </Button>
              </form>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateUserScreen;
