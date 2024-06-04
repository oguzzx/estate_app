import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params; // Kullanıcı ID'si URL'den alınır.
  const { password, email, username,avatar } = req.body;

  try {
    const user = await User.findById(id); // Mevcut kullanıcı bilgileri çekilir.

    if (!user) {
      return res.status(404).send("User not found"); // Kullanıcı bulunamazsa hata dönülür.
    }

    // Şifre girilmişse yeni şifre hash'lenir.
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // E-mail ve username güncellenirse yeni değerler atanır.
    if (email) {
      user.email = email;
    }

    if (username) {
      user.username = username;
    }
    if (avatar) {
        user.avatar = avatar;  // Avatar güncellenir.
      }

    await user.save(); // Güncellenmiş kullanıcı bilgileri kaydedilir.

    res.status(200).send(user); // Başarı durumunda mesaj gönderilir.
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user"); // Hata durumunda hata mesajı dönülür.
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
