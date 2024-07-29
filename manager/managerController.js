const Manager = require("./managerModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretKey";

exports.addManager = async (req, res) => {
  try {
    console.log(req.body);
    const managers = new Manager(req.body);
    await managers.save();
    res.status(201).json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add manager" });
  }
};
exports.ManagerLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const manager = await Manager.findOne({ username, password });
      if (manager) {
        const token = jwt.sign({ username: manager.username }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: "Login successful",
          token: token,
          manager: manager,
        });
      } else {
        res.status(401).json({ error: "Invalid Credintials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.getmanagerProfile = async (req, res) => {
    try {
      const manager = await Manager.findById(req.params.id);
      if (!manager) {
        return res.status(404).json({ error: "Manager not found" });
      }
      res.json(manager);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
