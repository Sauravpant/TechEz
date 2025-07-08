import React from "react";

interface ReviewCardProps {
  darkMode: boolean;
}

const reviews = [
  {
    name: "Samir Shrestha",
    rating: 5,
    date: "2 days ago",
    comment:
      "Very professional and quick! Saurav arrived right on time and fixed our leaking kitchen sink within 30 minutes. He explained everything clearly. Highly recommend her!",
  },
  {
    name: "Swastika Dhakal",
    rating: 4,
    date: "1 week ago",
    comment:
      "Great service, but a bit late! The work was solid and the tools were clean, but he arrived 90 minutes late. Still, he fixed the bathroom tap perfectly. Will back again.",
  },
  {
    name: "Pratik Shahi",
    rating: 5,
    date: "3 weeks ago",
    comment: "Excellent work. He was polite and fixed the electrical issue efficiently. Will definitely hire again.",
  },
  {
    name: "Anisha Karki",
    rating: 4,
    date: "1 month ago",
    comment: "Good service overall, but the pricing was slightly higher than expected. Work quality was top-notch though.",
  },
  {
    name: "Bikash Rai",
    rating: 5,
    date: "2 months ago",
    comment: "Highly skilled technician. Fixed multiple plumbing issues in one visit. Very satisfied!",
  },
];

const ReviewCard: React.FC<ReviewCardProps> = ({ darkMode }) => (
  <>
    {reviews.map((review, idx) => (
      <div
        key={idx}
        className={`p-4 md:p-5 rounded-xl transition-all ${
          darkMode ? "bg-gray-700" : "bg-white"
        } border ${darkMode ? "border-gray-600" : "border-gray-200"} shadow-md hover:shadow-lg`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{review.name}</h3>
            <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{review.date}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-400" : darkMode ? "text-gray-600" : "text-gray-300"}`}>
                {i < review.rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
        <p className={`text-xs md:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>"{review.comment}"</p>
      </div>
    ))}
  </>
);

export default ReviewCard;
