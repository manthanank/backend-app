const express = require("express");
const router = express.Router();
const districtsController = require("../controllers/districtsController");

router.get("/districts", districtsController.getDistricts);
router.post("/districts", districtsController.createDistrict);
router.put("/districts/:id", districtsController.updateDistrict);
router.delete("/districts/:id", districtsController.deleteDistrict);

module.exports = router;
