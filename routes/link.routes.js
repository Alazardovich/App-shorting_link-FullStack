// @ts-nocheck
const { Router } = require("express");
const shortid = require("shortid");
const config = require("config");
const auth = require("../middleware/auth.middleware");
const Link = require("../models/Link");
const router = Router();
router.post("/generate", auth, async function (req, res) {
  try {
    const baseUrl = config.get("BASE_URL");
    const { from } = req.body;
    const code = shortid.generate();
    const exist = await Link.findOne({ from });
    if (exist) {
      return res.status(201).json({ link: exist });
    }
    const to = baseUrl + /t/ + code;
    const link = new Link({ code, from, to, owner: req.user.userId });
    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
});
router.get("/:id", auth, async (req, res) => {
  const linkId = req.params.id;
  try {
    const link = await Link.findById(linkId);
    if (!link) {
      throw new Error("Couldn't find");
    }
    res.status(201).json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const id = req.body.code;
    const data = await Link.findOneAndDelete(id);

    res.status(204).json({ message: "link delete", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
