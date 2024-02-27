import { Button, Card } from "flowbite-react";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";
import ModalPopup from "./ModalPopup";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

function ProfileCard({ user, content }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const handleConfirm = async () => {
    setOpenModal2(false);
    toast.success("Profile Deleted");
  };

  return (
    <Card className="max-w-sm">
      <div className="flex flex-col items-center pb-5">
        <img
          alt={user.name}
          height="96"
          src={user.profileImage}
          width="100"
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{user.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-10">
          <Button
            size="sm"
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center rounded-lg"
            color="light"
          >
            <FaEdit className="mr-1 h-4 w-4" />
            Edit Profile
          </Button>
          {
            <ProfileUpdateModal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              content={content}
            />
          }
          <Button
            size="sm"
            onClick={() => setOpenModal2(true)}
            className="inline-flex items-center rounded-lg"
            color="dark"
          >
            <FaTrash className="mr-1 h-4 w-4" />
            Delete Profile
          </Button>
          {
            <ModalPopup
              isOpen={openModal2}
              onClose={() => setOpenModal2(false)}
              onCancel={() => setOpenModal2(false)}
              onConfirm={() => handleConfirm()}
              message="Are you sure you want to delete your account"
            />
          }
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
