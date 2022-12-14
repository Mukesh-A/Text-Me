const User = require("../model/userModel");
const brcypt = require("bcrypt");

//Register
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already in used", status: false });
    const emailCheck = await User.findOne({ username });
    if (emailCheck)
      return res.json({ msg: "Email already in used", status: false });

    //password encryption
    //10 is the salt value to round off
    const hashedPassword = await brcypt.hash(password, 10);

    //push to DB
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

//login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        msg: "Incorrect username or password",
        status: false,
      });

    //password decryption
    //compare password
    const isPasswordValid = await brcypt.compare(password, user.password);

    //check password
    if (!isPasswordValid) {
      return res.json({
        msg: "Incorrect username or password",
        status: false,
      });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

//avart

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = await req.params.id;
    const avatarImage = await req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    // console.log(userData);

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const currentUser = await req.params.id;
    const users = await User.find({ _id: { $ne: currentUser } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
