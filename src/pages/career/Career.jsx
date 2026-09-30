import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "../../components/Navbar/Navbar";
import JobApplicationModal from "../../components/careerComponents/JobApplicationModal";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { BsBarChart } from "react-icons/bs";
import Seo from "../../components/common/Seo";
import { CustomHeading } from "../../components/common/CustomHeading";
import Loader from "../../components/common/Loader";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobsError, setJobsError] = useState(null);

  const benefitsData = [
    {
      id: 1,
      icon: <LuUsersRound className="text-[26px] md:text-[38px]" />,
      title: "Team work",
      description:
        "Work in a collaborative environment where every idea counts, and success is built through shared goals and mutual support.",
      bgColor: "bg-[#E7F2FF]",
    },
    {
      id: 2,
      icon: <MdOutlineSecurity className="text-[26px] md:text-[38px]" />,
      title: "Secured Future",
      description:
        "Grow your career with stability and long-term opportunities, supported by an organization that invests in your success.",
      bgColor: "bg-[#F1F7E8]",
    },
    {
      id: 3,
      icon: <PiStudentBold className="text-[26px] md:text-[38px]" />,
      title: "Learning Opportunity",
      description:
        "Gain hands-on experience and expand your knowledge with continuous learning that shapes you into a better professional.",
      bgColor: "bg-[#EFF2F5]",
    },
    {
      id: 4,
      icon: <BsBarChart className="text-[26px] md:text-[38px]" />,
      title: "Upgrade Skills",
      description:
        "Stay ahead in your career with access to new tools, training, and guidance to sharpen and enhance your expertise.",
      bgColor: "bg-[#FFEEED]",
    },
  ];

  // Function to get icon based on job title name
  const getIconForJobTitle = (name) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("hr") || lowerName.includes("admin")) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      );
    } else if (
      lowerName.includes("engineering") ||
      lowerName.includes("engineer")
    ) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    } else if (lowerName.includes("marketing") || lowerName.includes("sales")) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    } else if (lowerName.includes("finance") || lowerName.includes("manager")) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      );
    }
  };

  // Fetch job titles/categories from API
  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/settings/job-title`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (
          result.message === "Job title fetched successfully" &&
          result.data
        ) {
          // Transform API data to categories with job count initialization
          const transformedCategories = result.data
            .filter((jobTitle) => jobTitle.is_active)
            .map((jobTitle) => ({
              id: jobTitle.id,
              name: jobTitle.name.toUpperCase(),
              count: 0, // Will be updated when jobs are fetched
              icon: getIconForJobTitle(jobTitle.name),
              originalName: jobTitle.name,
            }));

          setCategories(transformedCategories);

          // Set first category as active if available
          if (transformedCategories.length > 0) {
            setActiveCategory(transformedCategories[0].id);
          }
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError("Failed to load job categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobTitles();
  }, []);

  // Fetch jobs based on selected category
  useEffect(() => {
    if (!activeCategory) return;

    const fetchJobsByCategory = async () => {
      try {
        setLoading(true);
        setJobsError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/settings/job?page=1&limit=10&job_title_id=${activeCategory}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.message === "Job fetch successfully" && result.data) {
          // Transform API data to match existing job structure
          const transformedJobs = result.data.map((job, index) => ({
            id: job.id,
            title: job.name,
            experience: job.experience,
            department: job.department,
            location: job.location,
            type: job.job_role,
            description: job.description,
            slug: job.slug,
            job_title_id: job.job_title_id,
            profileImage: `https://images.unsplash.com/photo-${
              1507299647 + index
            }85-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
          }));

          setJobs(transformedJobs);

          // Update the count for the active category
          setCategories((prevCategories) =>
            prevCategories.map((category) => ({
              ...category,
              count:
                category.id === activeCategory
                  ? transformedJobs.length
                  : category.count,
            }))
          );
        } else {
          setJobs([]);
          // Update count to 0 for active category
          setCategories((prevCategories) =>
            prevCategories.map((category) => ({
              ...category,
              count: category.id === activeCategory ? 0 : category.count,
            }))
          );
        }
      } catch (err) {
        setJobsError("Failed to load job openings. Please try again later.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByCategory();
  }, [activeCategory]);

  // Handle Apply button click
  const handleApplyClick = (id) => {
    setSelectedJobTitle(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobTitle("");
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  // Render benefit card component
  const BenefitCard = ({ benefit, index }) => (
    <div key={benefit.id}>
      <div
        className={`w-[51px] md:w-[74px] h-[51px] md:h-[74px] ${benefit.bgColor} rounded-[4px] flex items-center justify-center`}
      >
        {benefit.icon}
      </div>
      <h6 className="text-[#001833] text-[18px] font-[700] mt-3">
        {benefit.title}
      </h6>
      <p className="text-[#001833] text-[12px] md:text-[14px] font-[300] mt-2">
        {benefit.description}
      </p>
    </div>
  );

  // Render job card component
  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Job Title */}
        <div className="flex gap-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{job.location}</p>
          </div>

          {/* Experience Section */}
          <div className="flex flex-col items-center px-8">
            <span className="text-lg font-semibold text-gray-900">
              {job.experience}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Experience
            </span>
          </div>
        </div>

        {/* Apply Button */}
        <div>
          <button
            onClick={() => handleApplyClick(job.id)}
            className="bg-[#2E437C] hover:bg-[#1E2F5C] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:scale-105 transform"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  // Render category button component
  const CategoryButton = ({ category }) => (
    <button
      key={category.id}
      onClick={() => handleCategoryChange(category.id)}
      className={`
        w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group hover:scale-105 transform
        ${
          activeCategory === category.id
            ? "text-[#F39314] bg-orange-50"
            : "text-gray-600 hover:bg-orange-50 hover:text-orange-400"
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <span className="font-medium text-sm">{category.name}</span>
      </div>
      {category.count > 0 && (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            activeCategory === category.id
              ? "bg-white text-[#2E437C]"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {category.count}
        </span>
      )}
    </button>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <Seo
            title="Jobs & Careers at ATC Chain | Join Our Team"
            description="Explore career opportunities at ATC Chain and join our team in industrial conveyor chain manufacturing, engineering, sales, marketing and technical solutions."
            keywords="ATC Chain jobs, ATC Chain careers, jobs at ATC Chain, careers at ATC Chains India, ATC Chains India jobs, conveyor chain company jobs, conveyor manufacturing jobs, conveyor industry jobs, industrial manufacturing jobs, engineering jobs, mechanical engineering jobs, manufacturing careers, industrial automation jobs, conveyor chain manufacturer jobs, jobs in conveyor manufacturing, technical jobs in manufacturing, sales jobs in industrial products, marketing jobs in manufacturing, Ahmedabad manufacturing jobs, Ahmedabad engineering jobs"
            url="https://atcchain.com/jobs"
            image="https://atcchain.com/images/social-preview.jpg"
          />
          <Navbar navStyle={"white"} />

          {/* Hero Section */}
          <motion.div
            className="container mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-[400] text-[#2E437C] text-[40px] md:text-[74px] text-center"
              style={{ lineHeight: "70px" }}
            >
              <CustomHeading title="Career " className="font-[700]" /> <br />
              <span className="font-[700] text-[#BABEC8]">
                <CustomHeading title="Openings" className="" />
              </span>
            </motion.h1>

            <motion.p className="text-[20px] pt-5 text-center text-[#191919] max-w-4xl mx-auto leading-relaxed">
              We're always looking for creative, talented self-starters to join
              the ATC family, <br className="hidden md:block" /> check out our
              open roles below and fill out an application
            </motion.p>
          </motion.div>

          {/* Jobs Section */}
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <motion.div className="lg:col-span-1" variants={slideInLeft}>
                <div className="bg-white rounded-xl p-6 sticky top-6">
                  {/* Loading Categories */}
                  {loading && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2E437C] mx-auto mb-4"></div>
                      <p className="text-gray-500 text-sm">
                        Loading categories...
                      </p>
                    </div>
                  )}

                  {/* Error Loading Categories */}
                  {error && !loading && (
                    <div className="text-center py-8">
                      <p className="text-red-500 text-sm mb-4">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="text-[#2E437C] hover:text-[#1E2F5C] font-medium text-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Categories List */}
                  {!loading && !error && (
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <CategoryButton key={category.id} category={category} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Job Listings */}
              <motion.div className="lg:col-span-3" variants={slideInRight}>
                {/* Loading Jobs State */}
                {loading && (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-gray-300 mb-6">
                      <svg
                        className="w-20 h-20 mx-auto animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">Loading job openings...</p>
                  </div>
                )}

                {/* Error State */}
                {jobsError && !loading && (
                  <div className="text-center py-16 bg-white rounded-xl border border-red-200 shadow-sm">
                    <div className="text-red-300 mb-6">
                      <svg
                        className="w-20 h-20 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-red-600 mb-4">{jobsError}</p>
                    <button
                      onClick={() => handleCategoryChange(activeCategory)}
                      className="text-[#2E437C] hover:text-[#1E2F5C] font-medium bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 transform"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Job Listings */}
                {!loading && !jobsError && !loading && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      {jobs.length > 0 ? (
                        jobs.map((job) => <JobCard key={job.id} job={job} />)
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm"
                        >
                          <div className="text-gray-300 mb-6">
                            <svg
                              className="w-20 h-20 mx-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-medium text-gray-600 mb-3">
                            No Openings Available
                          </h3>
                          <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            We don't have any positions in this category right
                            now, but we're always growing!
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Initial Loading State */}
                {loading && (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-gray-300 mb-6">
                      <svg
                        className="w-20 h-20 mx-auto animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      Setting up job categories...
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Benefits Section */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 pt-16 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left Side - Text Content */}
              <motion.div className="p-3" variants={slideInLeft}>
                <p className="text-[#001833] text-[18px] font-[500]">
                  Benefits
                </p>
                <h2 className="text-[#2E437C] text-[36px] font-[700] leading-tight">
                  Why you Should Join{" "}
                </h2>
                <h2 className="text-[#BABEC8] text-[36px] font-[700] leading-tight">
                  Our Awesome Team
                </h2>
                <p className="text-[#001833] text-[14px] font-[400] mt-4 leading-relaxed">
                  We want to feel like home when you are working at ATC for that
                  we have curated a great set of benefits for you. It all starts
                  with the free lunch!
                </p>
              </motion.div>

              {/* Right Side - Benefits Grid */}
              <motion.div className="p-3" variants={slideInRight}>
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                  {benefitsData.map((benefit, index) => (
                    <BenefitCard
                      key={benefit.id}
                      benefit={benefit}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <JobApplicationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            jobId={selectedJobTitle}
          />
        </>
      )}
    </>
  );
};

export default Career;
