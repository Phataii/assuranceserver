function auth(req, res, next) {
  try {
    if (!req.auth) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;
