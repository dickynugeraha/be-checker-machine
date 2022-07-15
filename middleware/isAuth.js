const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeaders = req.get("Authorization");

  if (!authHeaders) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  const token = authHeaders.split(" ")[1];

  let decodeToken;
  try {
    decodeToken = jwt.verify(token, "tokensupersecret");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (!decodeToken) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  req.userId = decodeToken.userId;
  next();
};
