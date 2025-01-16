const AddReview = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newReview = {
      name: form.name.value,
      company: form.company.value,
      comment: form.comment.value,
      image: form.image.value,
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Review added:", data);
        form.reset();
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  return (
    <div className="add-review-form mx-auto my-10 w-[70%] bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            name="company"
            placeholder="Your Company"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            name="comment"
            placeholder="Your Review"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255]"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            name="image"
            placeholder="Image URL"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#309255] text-white py-3 rounded-lg hover:bg-green-800 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
