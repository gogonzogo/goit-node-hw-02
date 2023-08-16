const { User } = require('../../models');
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');

const userAvatarUpdate = async (req) => {
  const user = await User.findById(req.session.userId);
  const { path: temporaryName } = req.file;
  console.log(temporaryName)
  const avatarStorage = path.join(process.cwd(), 'public/avatars');
  const fileName = path.join(avatarStorage, user.email + '.jpg');
  try {
    await Jimp.read(temporaryName)
      .then((avatar) => {
        return avatar
          .resize(250, 250)
          .write(fileName)
      });
    fs.unlink(temporaryName);
    const updateUserAvatar = await User.findByIdAndUpdate(
      user._id,
      { avatarURL: `/avatars/${path.basename(fileName)}` },
      { new: true }
    )
    return updateUserAvatar;
  } catch (error) {
    console.log(error);
    fs.unlink(temporaryName);
  };
};

module.exports = userAvatarUpdate;