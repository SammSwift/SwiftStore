import AdminNav from "../components/AdminNav";
import { Table, Button } from "flowbite-react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ModalPopup from "../components/ModalPopup";
import { useState } from "react";

const UsersScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setUserId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = async (id) => {
    handleCloseModal();
    // Handle confirmation logic
    try {
      await deleteUser(id);
      refetch();
      toast.success("User Deleted Successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <>
      <AdminNav />;
      <h1 className="text-center font-bold text-2xl tracking-tight mt-10 mb-3">
        Manage Users
      </h1>
      <div className="flex justify-center ">
        {isLoading ? (
          <Loader msg={"Retrieving all users..."} />
        ) : error ? (
          <Message color="failure">{error}</Message>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y"></Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {user._id}
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Link to={`mailto: ${user.email}`}>
                    <Table.Cell>{user.email}</Table.Cell>
                  </Link>

                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="flex gap-3">
                    <Link to={`/admin/updateuser/${user._id}/edit`}>
                      <Button color="light" size="sm">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      color="light"
                      size="sm"
                      onClick={() => handleOpenModal(user._id)}
                    >
                      <FaTrash />
                    </Button>

                    {openModal && (
                      <ModalPopup
                        isOpen={openModal}
                        onClose={handleCloseModal}
                        onCancel={handleCancel}
                        onConfirm={() => handleConfirm(userId)}
                        message="Are you sure you want to delete this user?"
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersScreen;
