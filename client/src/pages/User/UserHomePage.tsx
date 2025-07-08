 import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const serviceCards = [
  {
    id: 1,
    title: "Electrician",
    image: "/electrician.png",
  },
  {
    id: 2,
    title: "Plumber",
    image: "/plumber.png",
  },
  {
    id: 3,
    title: "Pest Control",
    image: "/pest-control.png",
  },
  {
    id: 4,
    title: "House Paint",
    image: "/house-paint.png",
  },
  {
    id: 5,
    title: "HVAC Technicians",
    image: "/hvac.png",
  },
  {
    id: 6,
    title: "Carpenter",
    image: "/carpenter.png",
  },
  {
    id: 7,
    title: "Appliance Repair Technicians",
    image: "/appliance.png",
  },
  {
    id: 8,
    title: "Security System Technicians",
    image: "/security.png",
  },
];

const serviceDescriptions = [
  {
    id: "electricians",
    title: "ELECTRICIANS",
    image: "/electrician-desc.png",
    description: [
      "We offer all kinds of electrical services for homes and businesses.",
      "From fixing lights and switches to setting up new wiring and appliances — we do it all.",
      "Need a safety check or want to install smart home devices? We've got you covered.",
      "Our electricians are trained, reliable, and ready to help.",
      "Fast service, fair prices, and quality work you can trust.",
    ],
  },
  {
    id: "plumbers",
    title: "PLUMBERS",
    image: "/plumber-desc.png",
    description: [
      "Got a leak, clog, or pipe problem? We're on it.",
      "Our plumbing services cover everything from small repairs to full installations.",
      "We fix dripping taps, blocked drains, broken toilets, and more — fast and clean.",
      "Whether it's your kitchen, bathroom, or a full plumbing upgrade, we're ready to help.",
    ],
  },
  {
    id: "pest-control",
    title: "PEST CONTROL",
    image: "/pest-control-desc.png",
    description: [
      "Unwanted pests? We eliminate the problem at its source.",
      "Rodents, cockroaches, termites, ants, or bed bugs — whatever's bugging you, we've got the solution.",
      "Our treatments are safe, effective, and designed to protect your home or workplace.",
      "We don't just get rid of pests — we keep them from coming back.",
    ],
  },
];

const UserHomePage: React.FC = () => {
  const [animatedWord, setAnimatedWord] = useState("VERIFIED");
  const words = ["VERIFIED", "REALISTIC", "REAL"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setAnimatedWord(words[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <main className="w-full overflow-hidden">
      <section className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-inter font-semibold text-[#FF5454] leading-tight">
                Your City's Home Service Network
                <span className="ml-1.5 text-2xl md:text-4xl lg:text-5xl font-itim text-[#9747FF] transition-all duration-1000">{animatedWord}</span>
              </h1>
            </div>

            <p className="text-base md:text-xl lg:text-2xl font-inter font-medium">Helping You Find the Right Help, Right at Home</p>
            <div className="w-full max-w-[474px] space-y-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search.."
                  className="w-full h-[45px] md:h-[55px] lg:h-[67px] border border-black rounded-[30px] pl-12 md:pl-14 pr-4 text-sm md:text-base lg:text-lg placeholder-[#E2E2E2]"
                />
                <FaSearch className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-[#E2E2E2] text-lg md:text-xl" />
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="text-sm md:text-base lg:text-lg font-inter font-medium whitespace-nowrap">Popular search</span>
                <div className="flex flex-wrap gap-2">
                  {["Electrician", "Plumber", "Pest Control"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#D9D9D9] rounded-[20px] text-xs md:text-sm font-inter font-medium whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full  transform -translate-y-1/2 translate-x-8 top-1/2 right-0" />
            <img
              src="/bg-image.png"
              alt="Professional Service Provider"
              className="relative z-10 w-full max-w-[280px] md:max-w-[380px] lg:max-w-[450px] h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-inter font-bold">OUR SERVICES</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {serviceCards.map((service) => (
              <Link to="/services" key={service.id} className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square border border-black rounded-[15px] shadow-[2px_2px_2px_rgba(0,0,0,0.25)] p-2 hover:shadow-md transition-shadow">
                  <img src={service.image} alt={service.title} className="w-full h-full object-contain p-1" />
                </div>
                <span className="text-[15px] sm:text-xs font-inter font-semibold text-center">{service.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
          {serviceDescriptions.map((service, index) => (
            <div key={service.id} className="space-y-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-inter font-extrabold">{service.title}</h3>
              <div
                className={`flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full lg:w-[400px] h-[200px] md:h-[250px] lg:h-[300px] object-cover rounded-lg shadow-md"
                />
                <div className="flex-1 border border-black rounded-[20px] shadow-[2px_3px_3px_rgba(0,0,0,0.25)] p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base lg:text-lg font-inter font-semibold">
                    {service.description.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default UserHomePage;