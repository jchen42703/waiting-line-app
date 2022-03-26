/**
 * Parses profile object from OAuth2 Google
 * @param {*} Admin
 * @returns
 */
const addAdmin =
  (Admin) =>
  ({ id, email, firstName, lastName, source }) => {
    const admin = new Admin({
      id,
      email,
      firstName,
      lastName,
      source,
    });
    return admin.save();
  };

const getAdmins = (Admin) => () => {
  return Admin.find({});
};

const validateAdmin =
  (Admin) =>
  async ({ adminId }) => {
    const admin = await Admin.findById(adminId);

    return (
      admin !== undefined &&
      admin !== null &&
      admin["_id"].toString() == adminId
    );
  };

const getAdminByEmail =
  (Admin) =>
  async ({ email }) => {
    return await Admin.findOne({ email });
  };

export const AdminService = (Admin) => {
  return {
    addAdmin: addAdmin(Admin),
    getAdmins: getAdmins(Admin),
    getAdminByEmail: getAdminByEmail(Admin),
    validateAdmin: validateAdmin(Admin),
  };
};
