import axios from "axios";

export const deleteContact = async (contactId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `http://localhost:3969/api/contacts/${contactId}`,
      config
    );

    console.log(`Deleted the contact with ID: ${contactId}`);
    return true;
  } catch (error) {
    console.error("Error deleting a contact: ", error);
    return false;
  }
};

export const editContact = (contactId) => {
  console.log(`Edited the contact with ID: ${contactId}`);
};
