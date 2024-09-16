const { Admin } = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

// admin registration
const createAdmin = async (req, res) => {
  try {
    // get admin data from req.body
    const { email, ...rest } = req.body;
    // check if required fields are present
    if (!email || Object.keys(rest).length === 0) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // check if admin already exists
    const isAdminExist = await Admin.findOne({ email });
    if (isAdminExist) {
      return res.status(409).json({ message: "admin already exists" });
    }
    // admin password hashing
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(rest.password, saltRounds);
    // Create admin and save in database
    const admin = new Admin({ email, ...rest, password: hashedPassword });
    await admin.save();

    // generate token
    const token = generateToken({
      _id: admin.id,
      email: admin.email,
      role: "admin",
    });
    res.cookie("token", token);
    // send response
    res.json({
      success: true,
      message: "Create admin",
      admin,
    });
  } catch (error) {
    console.log(404).json({ error });
  }
};
// admin login
const loginAdmin = async (req, res) => {
  try {
    // destructuring fields
    const { email, password } = req.body;
    // check if required fields are present
    if ((!email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check the admin signed or not
    const isadminExist = await Admin.findOne({ email });
    if (!isadminExist) {
      return res
        .status(401)
        .json({ success: false, message: "Admin does not exist" });
    }
    // compare password for login
    const passwordMatch = bcrypt.compareSync(password, isadminExist.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Unatherised access" });
    }
    // generate token
    const token = generateToken(isadminExist._id); // generate token
    res.cookie("token", token); // pass the token as cookie
    res.json({ success: true, message: "admin logged in" });
  } catch (error) {
    res.status(404).json({ message: "faild to admin login" });
  }
};
// admin logout
const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "admin logged out" });
  } catch (error) {
    res.json({ error });
  }
};
// check admin
const checkAdmin = async (req, res) => {
    const admin = req.admin
    if (!admin) {
        return res.status(401).json({success: false, message: "admin not autherised"})
    }
    res.json({success: true, message: "admin autherised"})
}
// update admin
const updateAdmin = async (req, res) => {
  try {
    // destructure admin from req.admin
    const admin = req.admin;
    console.log(admin, "admin");
    // destructur the id from req.params
    const { id } = req.params;
    // get datas from req.body
    const updateData = req.body;
    // if your update user password then hash new password
    if (updateData.password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    // new updated user data
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    // if have updated user or not
    if (!updatedAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }
    // send response user updated data
    res.json({
      success: true,
      message: "admin profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
module.exports = {
  createAdmin,
  loginAdmin,
  updateAdmin,
  logoutAdmin,
  checkAdmin
};
