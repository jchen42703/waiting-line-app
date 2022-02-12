/**
 * Parses profile object from OAuth2 Google
 * @param {*} Admin
 * @returns
 */
const addGoogleAdmin =
  (Admin) =>
  ({ id, email, firstName, lastName, profilePhoto }) => {
    const admin = new Admin({
      id,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: "google",
    });
    return admin.save();
  };

const getAdmins = (Admin) => () => {
  return Admin.find({});
};

const getAdminByEmail =
  (Admin) =>
  async ({ email }) => {
    return await Admin.findOne({ email });
  };

module.exports = (Admin) => {
  return {
    addGoogleAdmin: addGoogleAdmin(Admin),
    getAdmins: getAdmins(Admin),
    getAdminByEmail: getAdminByEmail(Admin),
  };
};
