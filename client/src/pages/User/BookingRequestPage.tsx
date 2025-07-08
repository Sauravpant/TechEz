import React, { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaBolt,
  FaArrowRight,
  FaChevronLeft,
  FaTag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

interface BookingDetails {
  date: string;
  time: string;
  serviceDetails: string;
  offerPrice: number;
}

const BookingModel: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: "",
    time: "",
    serviceDetails: "",
    offerPrice: 0,
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
  });
  const [activeStep, setActiveStep] = useState<number>(1);
  const [priceError, setPriceError] = useState<string>("");

  const MINIMUM_SERVICE_PRICE = 1500;
  const navigate=useNavigate();
  const technician = {
    name: "Saurav Pant",
    serviceType: "Electrician",
    location: "Sanepa, Lalitpur",
    rating: 4.8,
    experience: 5,
    jobsCompleted: 127,
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    hourlyRate: "NPR 850/hr",
    responseTime: "<1 hour response",
    certification: "Licensed & Insured",
    basePrice: MINIMUM_SERVICE_PRICE,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bookingDetails.offerPrice < MINIMUM_SERVICE_PRICE) {
      setPriceError(`Offer must be at least NPR ${MINIMUM_SERVICE_PRICE}`);
      return;
    }
    console.log("Booking confirmed:", { ...bookingDetails, contactInfo });
    toast.success("Booking confirmed.");
    navigate("/services");
  };

  const nextStep = () => {
    if (activeStep === 1 && bookingDetails.offerPrice < MINIMUM_SERVICE_PRICE) {
      setPriceError(`Offer must be at least NPR ${MINIMUM_SERVICE_PRICE}`);
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, 3));
    setPriceError("");
  };

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBookingDetails({ ...bookingDetails, offerPrice: isNaN(value) ? 0 : value });
    if (value >= MINIMUM_SERVICE_PRICE) {
      setPriceError("");
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-800">
      {/* Progress Steps */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                      ${activeStep >= step ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-600"}`}
                  >
                    {step}
                  </div>
                  {step < 3 && <div className={`h-1 w-16 mx-1 transition-all ${activeStep > step ? "bg-blue-600" : "bg-gray-200"}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-72px)]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 h-full">
          {/* Technician Profile */}
          <div className="bg-white rounded-xl p-6 shadow-lg h-fit lg:sticky lg:top-24 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="relative mr-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-20"></div>
                <img
                  src={technician.imageUrl}
                  alt={technician.name}
                  className="relative w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{technician.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                    <FaBolt className="mr-1" />
                    {technician.serviceType}
                  </span>
                  <div className="flex items-center text-amber-400">
                    <FaStar className="mr-1" />
                    <span className="text-sm text-gray-600">{technician.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-1.5" />
                  <span>{technician.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="text-lg font-semibold text-gray-800">{technician.experience}+ years</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Jobs Completed</p>
                  <p className="text-lg font-semibold text-gray-800">{technician.jobsCompleted}+</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Hourly Rate</p>
                  <p className="text-lg font-semibold text-gray-800">{technician.hourlyRate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Response Time</p>
                  <p className="text-lg font-semibold text-gray-800">{technician.responseTime}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600">Minimum Service Price</p>
                <p className="text-lg font-semibold text-blue-700 flex items-center">
                  <FaTag className="text-blue-500 mr-2" />
                  NPR {technician.basePrice.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500">Certification</p>
                <p className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  {technician.certification}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Service Description</h3>
                <p className="text-gray-600 text-sm">
                  Professional {technician.serviceType} services including installations, repairs, and maintenance for both residential and commercial
                  properties.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Schedule Your Service</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              {activeStep === 1 && (
                <div className="animate-fadeIn">
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      Select Date & Time
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="time"
                        required
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Details</label>
                    <textarea
                      rows={5}
                      required
                      value={bookingDetails.serviceDetails}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, serviceDetails: e.target.value })}
                      placeholder="Example: 'Need 3 ceiling lights installed in living room with dimmer switches'"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-2 text-xs text-gray-500">Detailed descriptions help us provide better service estimates</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaTag className="mr-2 text-blue-500" />
                      Your Offer Price (Minimum: NPR {MINIMUM_SERVICE_PRICE.toLocaleString()})
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">NPR</span>
                      </div>
                      <input
                        type="number"
                        required
                        min={MINIMUM_SERVICE_PRICE}
                        value={bookingDetails.offerPrice || ""}
                        onChange={handlePriceChange}
                        className="w-full pl-14 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {priceError && <p className="mt-1 text-sm text-red-600">{priceError}</p>}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {activeStep === 2 && (
                <div className="animate-fadeIn">
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FaUser className="mr-2 text-blue-500" />
                      Your Contact Information
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="Phone number"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email address"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 - Confirmation */}
              {activeStep === 3 && (
                <div className="animate-fadeIn">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-center text-green-600 mb-4">
                      <FaCheckCircle className="text-4xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-green-800 mb-2">Ready to Confirm</h3>
                    <p className="text-sm text-center text-green-700">Review your details below and confirm your booking with {technician.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
                    <h4 className="font-medium text-gray-800 mb-4">Service Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{bookingDetails.serviceDetails.substring(0, 30)}...</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date & Time:</span>
                        <span className="font-medium">
                          {new Date(bookingDetails.date).toLocaleDateString()} at {bookingDetails.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Your Offer:</span>
                        <span className="font-medium text-blue-600">NPR {bookingDetails.offerPrice.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200 flex justify-between">
                        <span className="text-gray-600">Minimum Price:</span>
                        <span className="font-medium">NPR {MINIMUM_SERVICE_PRICE.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{contactInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{contactInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{contactInfo.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaChevronLeft className="mr-2" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                {activeStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center transition-all shadow-lg hover:shadow-blue-500/20"
                  >
                    Continue <FaArrowRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium flex items-center transition-all shadow-lg hover:shadow-green-500/20"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingModel;
