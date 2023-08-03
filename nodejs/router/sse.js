const express = require("express");

const router = express.Router();

router.get("/", async function (req, res) {
  res.render("sse", {});
});

router.get("/events", (req, res) => {
  //header
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  res.flushHeaders();

  let interval = setInterval(() => {
    res.write(`data: ${Math.random()}\n\n`);
  }, 1000);

  //sse끊기면
  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

module.exports = router;
