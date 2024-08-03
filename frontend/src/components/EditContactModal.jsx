import React, { useEffect, useRef, useState } from "react";
import { editContact } from "../utils/contactActions";

const EditContactModal = ({
  openModal,
  closeModal,
  onContactEdited,
  contactId,
}) => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    name: "",
  });
  const { number, name } = formData;
  const userToken = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.name !== "" && formData.number !== "") {
      try {
        await editContact(contactId, userToken, formData);
        // const { data } = await editContact(contactId, userToken, formData);
        setLoading(false);
        closeModal();
        await onContactEdited(true);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      alert("Fill all details bruh");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="p-4 rounded-md shadow-lg"
    >
      <div>
        <label className="block text-xl">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
          className="bg-light-purple w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-dark-gray"
        />
      </div>
      <div>
        <label className="block text-xl">Number</label>
        <input
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
          required
          className="bg-light-purple w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-dark-gray"
        />
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </dialog>
  );
};

export default EditContactModal;
