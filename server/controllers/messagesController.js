const Message = require("../model/messageModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    // console.log(coming);
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    return res.json({ data });
  } catch (err) {
    next(err);
  }
};

//login
module.exports.getAllMessage = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
