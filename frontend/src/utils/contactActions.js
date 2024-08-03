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

export const editContact = async (contactId, token, formData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(
      `http://localhost:3969/api/contacts/${contactId}`,
      formData,
      config
    );

    return data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const getContacts = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:3969/api/contacts",
      config
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
