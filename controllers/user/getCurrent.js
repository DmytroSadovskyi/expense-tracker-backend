const getCurrent = (req, res) => {
  const { name, email } = req.user;

  return res.json({ name, email });
};

export default getCurrent;
