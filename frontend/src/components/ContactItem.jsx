import React from "react";
import "../styles.css"; // Import the CSS file
import { deleteContact, editContact } from "../utils/contactActions"; // Adjust the path as needed

const ContactItem = ({ contact, onDelete }) => {
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
        <button
          onClick={() => editContact(contact)}
          className="py-2 pl-2 pr-4 mr-4"
        >
          <span className="material-symbols-outlined edit-icon">edit</span>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
