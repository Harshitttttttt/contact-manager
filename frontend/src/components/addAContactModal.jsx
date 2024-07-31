import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ openModal, closeModal, children, onContactCreated }) {
  const ref = useRef();
  const [formData, setFormData] = useState({
    number: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true); // Set loading state to true when the request starts
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const userInputData = {
        name: name,
        number: number,
      };

      const { data } = await axios.post(
        "http://localhost:3969/api/contacts",
        userInputData,
        config
      );

      console.log(data);
      setLoading(false);
      closeModal();
      onContactCreated();
    } catch (error) {
      console.error("Error during contact creations:", error);
      alert("Contact creation failed :("); // Display error message to the user
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
      {children}
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
}

export default Modal;
