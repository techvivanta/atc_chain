import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { CustomHeading } from "../common/CustomHeading";

// Heading is prop-driven so the /contact page keeps its original
// "Contact Us" <h1> while the homepage renders the SEO heading as an <h2>.
const ContactForm = ({
  headingTag: HeadingTag = "h1",
  headingPrimary = "Contact",
  headingSecondary = "Us",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_website: "",
    phone_number: "",
    company_name: "",
    designation: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type:"", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]:""}));
    }
    if (submitStatus.message) {
      setSubmitStatus({ type:"", message: "" });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateURL = (url) => {
    if (!url) return true; // Optional field
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!validatePhone(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    // Optional field validation (only validate if filled)
    if (formData.company_website && !validateURL(formData.company_website)) {
      newErrors.company_website = "Please enter a valid website URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/settings/enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Your message has been sent successfully! We will get back to you soon.",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          company_website: "",
          phone_number: "",
          company_name: "",
          designation: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className=" mx-auto p-6">
      <motion.div
        className="grid grid-cols-12 gap-6 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Contact Information Section */}
        <motion.div
          className="col-span-12 md:col-span-6 lg:col-span-6 space-y-8"
          variants={itemVariants}
        >
          {/* Header */}
          <div className="space-y-4">
            <HeadingTag className="text-[30px] md:text-[40px] lg:text-[48px] font-bold text-left leading-[1.1] md:leading-[1.05]">
              <span className="text-[#2E437C]">
                <CustomHeading
                  as="span"
                  title={headingPrimary}
                  className=""
                  headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
                />
              </span>
              <span className="text-[#BABEC8]">
                {" "}
                <CustomHeading
                  as="span"
                  title={headingSecondary}
                  className=""
                  headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
                />
              </span>
            </HeadingTag>
            <p className="text-[#343434] text-[16px] lg:text-[17.76px] leading-relaxed">
              We are committed to processing the information in
              <br className="hidden lg:block" />
              order to contact you and talk about your project.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 lg:space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <IoLocationOutline className="w-[20px] h-[19px] lg:w-[22px] lg:h-[21px] text-[#2E437C] mt-1 flex-shrink-0" />
              <p className="text-black text-[18px] lg:text-[20px] leading-[145%] font-normal">
                22, Kalyannagar Society, O/s Shahpur Gate, Shahpur, Ahmedabad -
                380004
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <IoMailOutline className="w-[20px] h-[16px] lg:w-[22px] lg:h-[18px] text-[#2E437C] flex-shrink-0" />
              <a
                href="mailto:sales@atcchain.com"
                className="text-black text-[18px] lg:text-[20px] leading-[145%] font-normal underline hover:text-[#2E437C] transition-colors break-all"
              >
                sales@atcchain.com
              </a>
            </div>

            {/* Phone Numbers */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <IoCallOutline className="w-[19px] h-[20px] lg:w-[21px] lg:h-[22px] text-[#2E437C] flex-shrink-0" />
                <p className="text-black text-[18px] lg:text-[20px] leading-[145%] font-medium">
                  Quick Connect
                </p>
              </div>

              {/* Phone Number 1 */}
              <div className="flex items-center gap-3 ml-8 lg:ml-10">
                <div className="flex items-center gap-3">
                  <IoCallOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#2E437C]" />
                  <IoLogoWhatsapp className="w-[17px] h-[18px] lg:w-[19.9px] lg:h-[20px] text-[#2E437C]" />
                </div>
                <a
                  href="tel:+919023725674"
                  className="text-black text-[18px] lg:text-[20px] leading-[145%] font-normal hover:text-[#2E437C] transition-colors"
                >
                  +91 90237-25674
                </a>
              </div>

              {/* Phone Number 2 */}
              <div className="flex items-center gap-3 ml-8 lg:ml-10">
                <div className="flex items-center gap-3">
                  <IoCallOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#2E437C]" />
                  <IoLogoWhatsapp className="w-[17px] h-[18px] lg:w-[19.9px] lg:h-[20px] text-[#2E437C]" />
                </div>
                <a
                  href="tel:+919023725676"
                  className="text-black text-[18px] lg:text-[20px] leading-[145%] font-normal hover:text-[#2E437C] transition-colors"
                >
                  +91 90237-25676
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="col-span-12 md:col-span-6 lg:col-span-6"
          variants={itemVariants}
        >
          {/* Status Message */}
          {submitStatus.message && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Name Field - Required */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  className={`w-full h-14 lg:h-15 form-custom px-4 lg:px-6 bg-white border rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all ${
                    errors.name ? "border-red-500" : "border-[#D8D8D8]"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field - Required */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  className={`w-full h-14 lg:h-15 form-custom px-4 lg:px-6 bg-white border rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-[#D8D8D8]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone Number Field - Required */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="Phone Number *"
                  className={`w-full h-14 lg:h-15 form-custom px-4 lg:px-6 bg-white border rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all ${
                    errors.phone_number
                      ? "border-red-500"
                      : "border-[#D8D8D8]"
                  }`}
                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-sm">{errors.phone_number}</p>
              )}
            </div>

            {/* Company Name and Website Row - Optional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-2">
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="w-full h-14 lg:h-15 form-custom px-3 lg:px-4 bg-white border border-[#D8D8D8] rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  name="company_website"
                  value={formData.company_website}
                  onChange={handleInputChange}
                  placeholder="Website"
                  className={`w-full h-14 lg:h-15 form-custom px-3 lg:px-4 bg-white border rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all ${
                    errors.company_website
                      ? "border-red-500"
                      : "border-[#D8D8D8]"
                  }`}
                />
                {errors.company_website && (
                  <p className="text-red-500 text-sm">
                    {errors.company_website}
                  </p>
                )}
              </div>
            </div>

            {/* Designation Field - Optional */}
            <div className="space-y-2">
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Designation"
                className="w-full h-14 lg:h-15 form-custom px-4 lg:px-6 bg-white border border-[#D8D8D8] rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all"
              />
            </div>

            {/* Message Field - Optional */}
            <div className="space-y-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                rows={3}
                className="w-full h-16 lg:h-20 px-4 lg:px-6 py-3 lg:py-4 bg-white border border-[#D8D8D8] rounded-lg text-[14px] lg:text-[16px] text-[#494949] placeholder-[#494949] focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className={`w-full h-14 lg:h-15 form-custom text-white text-[14px] lg:text-[16px] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E437C] focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2E437C] hover:bg-[#1E2F5C]"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
