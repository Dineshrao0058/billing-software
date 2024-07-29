const Admin = require("../Admin/adminModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretKey";

exports.addAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "admin error" });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username: admin.username }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        message: "Login successful",
        token: token,
        admin: admin,
      });
    } else {
      res.status(401).json({ error: "Invalid Credintials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
