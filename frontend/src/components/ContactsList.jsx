import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles.css";
import Modal from "./addAContactModal";
import {
  deleteContact,
  editContact,
  getContacts,
} from "../utils/contactActions";
import ContactItem from "./ContactItem";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(false);
  const userToken = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const fetchContacts = async () => {
  //   try {
  //     const userToken = localStorage.getItem("token");
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     };
  //     const { data } = await axios.get(
  //       "http://localhost:3969/api/contacts",
  //       config
  //     );
  //     setContacts(data);
  //   } catch (error) {
  //     console.error("Error fetching contacts:", error);
  //   }
  // };

  const fetchContacts = async () => {
    try {
      setContacts(await getContacts(userToken));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh state to trigger useEffect
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (contactId) => {
    const success = await deleteContact(contactId, userToken);
    if (success) {
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } else {
      alert("Failed to delete contact...");
    }
  };

  const handleEdit = async (success) => {
    console.log(success);
    if (success) {
      await fetchContacts();
    } else {
      alert("Failed to delete contact...");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex text-4xl">Contacts</div>
        <div className=" bg-dark-blue mb-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <button className="" onClick={openModal}>
            Add a contact
          </button>
          <div>
            <Modal
              openModal={isModalOpen}
              closeModal={closeModal}
              onContactCreated={handleRefresh}
            />
          </div>
        </div>
      </div>
      <hr className="pb-1" />
      <ul className="space-y-4">
        <div>
          {contacts.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ContactsList;
