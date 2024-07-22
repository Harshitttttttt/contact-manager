const express = require("express");
const {
  createAContact,
  fetchAllContacts,
  getSingleContact,
  updateAContact,
  deleteAContact,
} = require("../controller/contactsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createAContact).get(protect, fetchAllContacts);
router
  .route("/:id")
  .get(protect, getSingleContact)
  .put(protect, updateAContact)
  .delete(protect, deleteAContact);

module.exports = router;
