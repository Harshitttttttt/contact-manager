import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles.css";
import Modal from "./addAContactModal";
import { deleteContact, editContact } from "../utils/contactActions";
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

  const createANewConctact = () => {
    alert("Button clicked");
  };

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     try {
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       };

  //       const { data } = await axios.get(
  //         "http://localhost:3969/api/contacts",
  //         config
  //       );
  //       console.log(contacts);
  //       setContacts(data);
  //     } catch (error) {
  //       setError(error.response.data.message || error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchContacts();
  // }, []);

  const fetchContacts = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3969/api/contacts",
        config
      );
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex text-4xl">Contacts</div>
        <div className=" bg-dark-blue mb-1 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <button onClick={openModal}>Add a contact</button>
          <div>
            <Modal
              openModal={isModalOpen}
              closeModal={closeModal}
              onContactCreated={handleRefresh}
            >
              {/* <h1>Modal Content</h1>
              <p>This is the content inside the modal</p> */}
            </Modal>
          </div>
        </div>
      </div>
      <hr className="pb-1" />
      <ul className="space-y-4">
        {/* {contacts.map((contact) => ( */}
        {/* <li key={contact._id} className="border p-3 rounded-lg"> */}
        {/* <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold underline">{contact.name}</h3>
                <p>{contact.number}</p>
              </div>
              <div className="">
                <button className="p-2">
                  <span className="material-symbols-outlined delete-icon">
                    delete
                  </span>
                </button>
                <button className="p-2">
                  <span className="material-symbols-outlined edit-icon">
                    edit
                  </span>
                </button>
              </div>
            </div> */}
        <div>
          {contacts.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {/* </li> */}
        {/* ))} */}
      </ul>
    </div>
  );
};

export default ContactsList;
