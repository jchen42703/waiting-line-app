import { Admin } from "./admin.model";

/**
 * Parses profile object from OAuth2 Google
 * @param {*} Admin
 * @returnsP
 */
const addAdmin = ({ id, email, firstName, lastName, source }) => {
  const admin = new Admin({
    id,
    email,
    firstName,
    lastName,
    source,
  });
  return admin.save();
};

const getAdmins = () => Admin.find({});

/**
 * Checks that an admin exists in the database
 *
 * @returns true if exists, false if it does not
 */
const validateAdmin = async ({ adminId }) => {
  const admin = await Admin.findById(adminId);

  return (
    admin !== undefined && admin !== null && admin._id.toString() === adminId
  );
};

const getAdminByEmail = async ({ email }) => {
  const adminDoc = await Admin.findOne({ email });
  return adminDoc;
};

export { addAdmin, getAdmins, getAdminByEmail, validateAdmin };
