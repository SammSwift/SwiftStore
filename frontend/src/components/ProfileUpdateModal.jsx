import { Modal } from "flowbite-react";

function ProfileUpdateModal({ isOpen, onClose, content }) {
  return (
    <>
      <Modal show={isOpen} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              Update Profile
            </h3>
            {content}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileUpdateModal;
