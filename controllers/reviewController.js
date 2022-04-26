const createReview = async (req,res) => {
    console.log("works");
    res.status(200).json({msg:"hello"})
}

const getAllReviews = async (req, res) => {
  console.log("works");
};

const getSingleReview = async (req, res) => {
  console.log("works");
};

const updateReview = async (req, res) => {
  console.log("works");
};

const deleteReview = async (req, res) => {
  console.log("works");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview
};