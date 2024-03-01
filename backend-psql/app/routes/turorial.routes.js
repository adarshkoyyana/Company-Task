module.exports = app => {
  const records = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  router.post("/", records.create);

  router.get("/", records.findAll);

  router.get("/:id", records.findOne);

  router.put("/:id", records.update);

  router.delete("/:id", records.delete);

  router.delete("/", records.deleteAll);

  app.use("/api/records", router);
};
