const express = require("express");
const router = express.Router();
const { getSliders, addSlider } = require("./../controllers/sliderController");
const { validateSliderInput } = require("./../middleware/sliderValidation");

router.get("/", getSliders);
router.post("/", validateSliderInput, addSlider);

module.exports = router;
