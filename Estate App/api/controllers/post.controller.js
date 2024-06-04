import Post from "../models/post.js";
import PostDetail from "../models/postDetail.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postDetail") // PostDetail bilgilerini getir
      .populate({
        path: "user", // User modeline yapılan referansı çözümle
        select: "username email -_id", // Örnek olarak, kullanıcı adı ve e-mail bilgisini getir ve _id'yi hariç tut
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id)
      .populate("postDetail") // PostDetail bilgilerini getir
      .populate({
        path: "user", // User modeline yapılan referansı çözümle
        select: "username email -_id", // Örnek olarak, kullanıcı adı ve e-mail bilgisini getir ve _id'yi hariç tut
      })
      .exec();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
export const addPost = async (req, res) => {
    const session = await mongoose.startSession(); // MongoDB transaction başlatılıyor
    session.startTransaction();
  
    try {
      // Post verisini oluştur
      const newPost = new Post({
        title: req.body.postData.title,
        price: req.body.postData.price,
        images: req.body.postData.images,
        address: req.body.postData.address,
        city: req.body.postData.city,
        bedroom: req.body.postData.bedroom,
        bathroom: req.body.postData.bathroom,
        latitude: req.body.postData.latitude,
        longitude: req.body.postData.longitude,
        type: req.body.postData.type,
        property: req.body.postData.property,
        user: req.body.user // Kullanıcı ID'si
      });
  
      // Post'u kaydet
      const savedPost = await newPost.save({ session });
  
      // PostDetail verisini oluştur
      const newPostDetail = new PostDetail({
        desc: req.body.postDetail.desc,
        utilities: req.body.postDetail.utilities,
        pet: req.body.postDetail.pet,
        income: req.body.postDetail.income,
        size: req.body.postDetail.size,
        school: req.body.postDetail.school,
        bus: req.body.postDetail.bus,
        restaurant: req.body.postDetail.restaurant,
        post: savedPost._id // Oluşturulan Post'un ID'si
      });
  
      // PostDetail'i kaydet
      const savedPostDetail = await newPostDetail.save({ session });
  
      // İlişkili verileri güncelle
      savedPost.postDetail = savedPostDetail._id;
      await savedPost.save({ session });
  
      // Transaction tamamlanıyor
      await session.commitTransaction();
      session.endSession();
  
      // Başarılı kayıt sonrası bir yanıt dön
      res.status(201).json({ post: savedPost, postDetail: savedPostDetail });
    } catch (error) {
      // Transaction iptal ediliyor
      await session.abortTransaction();
      session.endSession();
  
      // Hata durumunda bir hata mesajı gönder
      res.status(400).json({ message: error.message });
    }
};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
