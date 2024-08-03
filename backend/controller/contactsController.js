// createAContact;
// fetchAllContacts;
// getSingleContact;
// updateAContact;
// deleteAContact;

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");

// @desc Create a new contact
// @route POST /api/contacts
// @access PRIVATE

const createAContact = asyncHandler(async (req, res) => {
  try {
    const { number, name } = req.body;

    if (!number || !name) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    const contact = await Contact.create({
      user: req.user.id,
      number: number,
      name: name,
    });

    res.status(200).json(contact);
  } catch (error) {
    throw new Error(error);
  }
});

// @desc Fetch all contacts
// @route GET /api/contacts
// @access Private

const fetchAllContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(200).json(contacts);
  } catch (error) {
    throw new Error(error);
  }
});

// @desc Create a new contact
// @route POST /api/contacts/:id
// @access

const getSingleContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    // console.log(req.user.id);

    if (!contact || contact.user.toString() !== req.user.id) {
      res.status(404);
      throw new Error("Contact not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update details of a contact
// @route PUT /api/contacts/:id
// @access Private

const updateAContact = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const contact = await Contact.findById(req.params.id);
    // console.log(contact);

    if (!contact || contact.user.toString() !== req.user.id) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        number: req.body.number,
        name: req.body.name,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Private

const deleteAContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact || contact.user.toString() !== req.user.id) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    await contact.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createAContact,
  getSingleContact,
  fetchAllContacts,
  deleteAContact,
  updateAContact,
};
