import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);

  res.status(200).send("You are logged in");
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("You are not logged in");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid");
    if (!payload.isAdmin) return res.status(403).send("You are not authorized");
  });

  res.status(200).send("You are an admin");
};
