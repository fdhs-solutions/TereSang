import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const [gender, setGender] = useState("");
  const [ageFrom, setAgeFrom] = useState("");
  const [ageTo, setAgeTo] = useState("");
  const [religion, setReligion] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [errors, setErrors] = useState({});
  const ages = [...Array(43)].map((_, i) => i + 18);

  const navigate = useNavigate();

  const handleCardClick = (e) => {
    e.preventDefault();
    setShowContactDetails((prev) => !prev); // Toggle the contact details
  };

  const handleBeginClick = () => {
    const newErrors = {};

    if (!gender) newErrors.gender = "Please select a gender.";
    if (!ageFrom) newErrors.ageFrom = "Please select an age from.";
    if (!ageTo) newErrors.ageTo = "Please select an age to.";
    if (parseInt(ageFrom) > parseInt(ageTo))
      newErrors.ageTo = "Age To must be greater than or equal to Age From.";
    if (!religion) newErrors.religion = "Please select a religion.";
    if (!motherTongue)
      newErrors.motherTongue = "Please select a mother tongue.";

    setErrors(newErrors);

    // If no errors, proceed with the action
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      navigate("/login");
    }
  };

  useEffect(() => {
    setShowContactDetails(true);
  }, [gender, ageFrom, ageTo, religion, motherTongue]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    if (data) {
      if (data.data.gender === "male") {
        setGender("Male");
      } else if (data.data.gender === "female") {
        setGender("Female");
      }
    }
  }, []);

  return (

    <>

      <section className="main-background-image">
        <div className="overlay"></div>
      </section>

      <div
        className="flex justify-center w-full p-4 lg:p-8"
        style={{ marginTop: "-15%", position: "relative" }}
      >
        <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Find Your Match
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Gender Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                I’m looking for a
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                required
                disabled={gender}
              >
                <option value="">Select</option>
                <option value="Female">Bride</option>
                <option value="Male">Groom</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender}</p>}
            </div>

            {/* Age From Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Age From
              </label>
              <select
                value={ageFrom}
                onChange={(e) => setAgeFrom(e.target.value)}
                className="mt-1 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
              >
                <option value="">Select</option>
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              {errors.ageFrom && (
                <p className="text-red-500">{errors.ageFrom}</p>
              )}
            </div>

            {/* Age To Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Age To
              </label>
              <select
                value={ageTo}
                onChange={(e) => setAgeTo(e.target.value)}
                className="mt-1 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
              >
                <option value="">Select</option>
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              {errors.ageTo && <p className="text-red-500">{errors.ageTo}</p>}
            </div>

            {/* Religion Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Religion
              </label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="mt-1 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
              >
                <option value="">Select</option>
                {[
                  "Hindu",
                  "Muslim",
                  "Christian",
                  "Sikh",
                  "Parsi",
                  "Jain",
                  "Buddhist",
                  "Jewish",
                  "No Religion",
                  "Spiritual",
                  "Other",
                ].map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
              {errors.religion && (
                <p className="text-red-500">{errors.religion}</p>
              )}
            </div>

            {/* Mother Tongue Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mother Tongue
              </label>
              <select
                value={motherTongue}
                onChange={(e) => setMotherTongue(e.target.value)}
                className="mt-1 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
              >
                <option value="">Select</option>
                {[
                  "Bengali",
                  "English",
                  "Gujarati",
                  "Hindi",
                  "Kannada",
                  "Marathi",
                  "Marwari",
                  "Odia",
                  "Punjabi",
                  "Tamil",
                  "Telugu",
                  "Urdu",
                ].map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              {errors.motherTongue && (
                <p className="text-red-500">{errors.motherTongue}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4 flex items-end">
              <button
                onClick={handleBeginClick}
                disabled={loading}
                type="button"
                className="w-full max-w-xs max-h-12 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:ring-2 focus:ring-pink-600 transition"
              >
                {loading ? "Loading..." : "Find Your Match"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10 bg-white px-2">
        <div className="container mx-auto">
          <div className="relative flex justify-center mb-8">
            {/* Animated Icons */}
            <div className="absolute animate-pulse bg-blue-400 rounded-full h-6 w-6 opacity-75"></div>
            <div className="absolute animate-bounce bg-gray-300 rounded-full h-4 w-4 top-0 left-0 opacity-75"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Content Column */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 px-4">
              <div>
                <div className="mb-6">
                  <span className="text-gray-500 uppercase font-semibold text-sm">
                    ABOUT US
                  </span>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-pink-600">TereSang</span>
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    TereSang is a trusted matrimonial platform committed to helping
                    individuals and families find their perfect life partners.
                    With a blend of tradition and technology, we bring you a safe,
                    private, and reliable matchmaking experience tailored to your
                    preferences.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Whether you are looking for a partner based on religion, language,
                    profession, or lifestyle, our advanced matching system ensures
                    that you connect with the most compatible profiles.
                  </p>
                </div>
                <ul className="list-disc pl-5 mb-6 text-gray-600">
                  <li className="mb-2">Verified profiles with updated details</li>
                  <li className="mb-2">Personalized matchmaking filters</li>
                  <li className="mb-2">Private &amp; secure communication</li>
                  <li className="mb-2">Dedicated customer support team</li>
                  <li>Mobile-friendly, easy-to-use experience</li>
                </ul>
                <div className="text-center py-3">
                  <Link
                    to="/register"
                    className="inline-block text-white bg-pink-600 hover:bg-pink-700 font-semibold rounded transition duration-300"
                    style={{ textDecoration: "none", padding: "12px 22px" }}
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
            {/* Image Column */}
            <div className="w-full lg:w-1/2 px-4 hidden sm:block">
              <div className="flex justify-center">
                <img
                  className="rounded-lg shadow-lg w-full"
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="About Us"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white px-3">
        <div className="container mx-auto">
          <div className="relative flex justify-center mb-12">
            {/* <!-- Animated Icons --> */}
            <div className="absolute animate-bounce bg-gray-300 rounded-full h-4 w-4 top-0 left-4 opacity-75"></div>
            <div className="absolute animate-spin bg-red-400 rounded-full h-5 w-5 top-0 right-4 opacity-75"></div>
          </div>

          <div
            className="flex flex-wrap -mx-4"
            style={{ justifyContent: "space-around" }}
          >
            {/* <!-- Title Block --> */}
            <div
              className="w-full lg:w-1/3 px-4 mb-8"
              style={{ alignContent: "center" }}
            >
              <span className="text-gray-500 uppercase font-semibold text-sm">
                Features
              </span>
              <h4 className="text-4xl font-bold text-gray-800 mt-2">
                Our Features
              </h4>
            </div>
            {/* <!-- Feature Block --> */}
            <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                <div className="text-green-500 mb-4 d-flex">
                  <i className="fas fa-user-friends text-4xl"></i>
                  <h4 className="text-xl font-semibold ml-4 text-center">
                    <Link
                      to={"/login"}
                      className="text-gray-800 hover:text-green-500"
                      style={{ textDecoration: "none" }}
                    >
                      Personalized Matching
                    </Link>
                  </h4>
                </div>
                <p className="text-gray-600">
                  We provide personalized matchmaking services to find the
                  perfect partner for you.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center mb-12">
            <div className="absolute animate-ping bg-blue-400 rounded-full h-6 w-6 opacity-75"></div>
          </div>

          <div
            className="flex flex-wrap -mx-4 mt-3"
            style={{ justifyContent: "space-around" }}
          >
            {/* <!-- Feature Block --> */}
            <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                <div className="text-red-500 mb-4 d-flex">
                  <i className="fas fa-bell text-4xl"></i>
                  <h4 className="text-xl font-semibold mb-2 ml-4 text-center">
                    <Link
                      to={"/login"}
                      className="text-gray-800 hover:text-red-500"
                      style={{ textDecoration: "none" }}
                    >
                      Easily Update Profile
                    </Link>
                  </h4>
                </div>
                <p className="text-gray-600">
                  The activities such as changing the display picture, birth
                  details, and personal information.
                </p>
              </div>
            </div>
            {/* <!-- Feature Block --> */}
            <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                <div className="text-purple-500 mb-4 d-flex">
                  <i className="fas fa-headset text-4xl"></i>
                  <h4 className="text-xl font-semibold mb-2 ml-4 text-center">
                    <button
                      className="text-gray-800 hover:text-purple-500"
                      onClick={handleCardClick}
                      style={{ textDecoration: "none", fontWeight: "500" }}
                    >
                      Customer Support
                    </button>
                  </h4>
                </div>
                <p className="text-gray-600">
                  24/7 customer support to assist you throughout your journey.
                </p>
                {showContactDetails && (
                  <div className="mt-4 p-2 bg-purple-100 rounded">
                    <h5 className="text-lg font-semibold">Contact Details:</h5>
                    {/* <p className="text-gray-700">Phone: +91 7000186765</p> */}
                    <p className="text-gray-700">
                      Email:
                      <span
                        className="text-gray-700 ml-1"
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        fdhssolution@gmail.com
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gray-50 px-3">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Need <span className="text-pink-600">Help?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are here to guide you at every step of your matrimonial journey.
              Whether you need help creating your profile, finding matches, or
              understanding our services, our support team is just a click away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="text-pink-600 mb-4">
                <i className="fas fa-user-circle text-4xl"></i>
              </div>
              <h4 className="text-lg font-semibold mb-2">Profile Assistance</h4>
              <p className="text-gray-600 text-sm">
                Need help in setting up or updating your profile?
                Our team will ensure your profile stands out.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="text-green-500 mb-4">
                <i className="fas fa-comments text-4xl"></i>
              </div>
              <h4 className="text-lg font-semibold mb-2">Matchmaking Guidance</h4>
              <p className="text-gray-600 text-sm">
                Get personalized tips and suggestions to find your
                most compatible partner quickly and safely.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="text-blue-500 mb-4">
                <i className="fas fa-headset text-4xl"></i>
              </div>
              <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">
                Our customer support team is available round-the-clock
                to assist you with any queries or concerns.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="mailto:fdhssolution@gmail.com"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded transition duration-300"
              style={{ padding: "12px 28px", textDecoration: "none" }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <div className="footer-custom bg-gray-100 py-4 text-center border-t border-gray-300">
        <div className="text-sm text-dark-900">
          &copy; {new Date().getFullYear()}
          <a
            href="https://tereSang.fdhs-solution.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 no-underline"
          >
            TereSang
          </a>
          <span className="hidden sm:inline"> | </span>{" "}
          {/* Show separator inline on larger screens */}
          <br className="sm:hidden" /> {/* Add a line break on small screens */}
          Made with ❤️
        </div>
      </div>

    </>

  );
};

export default LandingPage;
