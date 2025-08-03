export const login = async (req, res) => {
  return res
    .status(200)
    .json({ message: "Login successful", status: "success" });
};

export const logout = async (req, res) => {
  return "This function is not implemented yet.";
};

export const register = async (req, res) => {
  return res.status(200).json({ message: "Register successful" });
};
