import React, { useEffect, useState } from "react";
import "../styles.css"; // Import the CSS file
import EditContactModal from "./EditContactModal";

const ContactItem = ({ contact, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   fetchContacts();
  // }, [refresh]);

  const handleRefresh = async () => {
    setRefresh((prev) => !prev); // Toggle refresh state to trigger useEffect
    await onEdit();
  };

  return (
    <div className="flex justify-between items-center border rounded-lg m-2">
      <div className="p-2">
        <h3 className="text-xl font-bold underline">{contact.name}</h3>
        <p>{contact.number}</p>
        {/* <p>{contact._id}</p> */}
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onDelete(contact._id)} className="p-2">
          <span className="material-symbols-outlined delete-icon">delete</span>
        </button>
        <div>
          <button onClick={openModal} className="py-2 pl-2 pr-4 mr-4">
            <span className="material-symbols-outlined edit-icon">edit</span>
          </button>
          <div>
            <EditContactModal
              openModal={isModalOpen}
              closeModal={closeModal}
              onContactEdited={onEdit}
              contactId={contact._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
