 import Review from "../models/Review.js";
 

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
    .populate("userId", "name email")     
    .populate("productId", "name price");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

 const existingReview = await Review.findOne({ 
      userId: req.user.id, 
      productId
    
    }); if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      comment,
    });


    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
