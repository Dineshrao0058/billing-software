const express = require("express");
const router = express.Router();
const controllers = require("../manager/managerController");
const authenticateToken = require("../middlewares/adminAuthentication");
const cors = require("cors");

let corsOptions = {
  origin: ["http://localhost:5000"],
};
router.post("/addmanager", cors(corsOptions), controllers.addManager);
router.post("/managerlogin", cors(corsOptions), controllers.ManagerLogin);
router.get(
  "/managerProfile/:id",
  cors(corsOptions),
  authenticateToken,
  controllers.getmanagerProfile
);

module.exports = router;
