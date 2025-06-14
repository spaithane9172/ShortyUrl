import jwt from "jsonwebtoken";

const authenticateUser = (request, response, next) => {
  try {
    const { accessToken } = request.cookies;
    if (!accessToken) {
      return response.status(401).json({ message: "Unautherized." });
    }
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (error, user) => {
      if (error) {
        return response.status(401).json({ message: "Unautherized User." });
      }

      request.user = { id: user.id };
      next();
    });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

export default authenticateUser;
