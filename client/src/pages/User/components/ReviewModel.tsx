import { useState } from "react";
import { FaStar, FaRegStar, FaTimes } from "react-icons/fa";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  technicianName: string;
  serviceName: string;
}

const ReviewModal = ({ isOpen, onClose, onSubmit, technicianName, serviceName }: ReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(rating, reviewText);
    // The parent component should handle closing after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Rate Your Experience</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Service: <span className="font-medium">{serviceName}</span>
            </p>
            <p className="text-gray-600">
              Technician: <span className="font-medium">{technicianName}</span>
            </p>
          </div>

          {/* Star Rating */}
          <div className="mb-6">
            <p className="text-gray-700 mb-3">How would you rate this service?</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-3xl focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {star <= (hoverRating || rating) ? <FaStar className="text-amber-400" /> : <FaRegStar className="text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label htmlFor="review" className="block text-gray-700 mb-2">
              Share your experience (optional)
            </label>
            <textarea
              id="review"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
              placeholder="How was your experience with the technician? Was the service satisfactory?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow hover:shadow-md transition-all ${
              rating === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
