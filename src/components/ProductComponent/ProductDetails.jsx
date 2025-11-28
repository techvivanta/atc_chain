import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { HiChevronRight } from "react-icons/hi2";
import {
  MdClose,
  MdDescription,
  MdPictureAsPdf,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FiMaximize2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Menu,
  MenuItem,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { LuDownload } from "react-icons/lu";

import pd1 from "../../assets/images/pd1.jpg";
import pd2 from "../../assets/images/pd2.jpg";
import pd3 from "../../assets/images/pd3.jpg";
import pd4 from "../../assets/images/pd4.jpg";

const ProductDetails = ({ selectedProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiperRef, setMainSwiperRef] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [downloadingFiles, setDownloadingFiles] = useState(new Set());

  // Image fullscreen states
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  // Download dropdown states
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const downloadAnchorRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    company_name: "",
    company_website: "",
    designation: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showThumbnailArrows, setShowThumbnailArrows] = useState(false);
  const thumbnailContainerRef = useRef(null);

  // Handle thumbnail scroll
  const handleThumbnailScroll = (direction) => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const scrollAmount = 100;

      if (direction === "up") {
        container.scrollTop -= scrollAmount;
      } else {
        container.scrollTop += scrollAmount;
      }
    }
  };

  // Handle thumbnail click to update main slider
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (mainSwiperRef) {
      mainSwiperRef.slideTo(index);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string") return null;

    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (imagePath.startsWith("/")) {
      return `${backendUrl}${imagePath}`;
    }
    return `${backendUrl}/${imagePath}`;
  };

  // Get images from props or use fallback
  const getImages = () => {
    if (
      selectedProduct &&
      selectedProduct.images &&
      selectedProduct.images.length > 0
    ) {
      return selectedProduct.images.map((imageUrl, index) => ({
        id: index + 1,
        src: getImageUrl(imageUrl),
        alt:
          selectedProduct.title ||
          selectedProduct.productName ||
          "Product Image",
      }));
    }

    return [
      { id: 1, src: pd1, alt: "Product Image 1" },
      { id: 2, src: pd2, alt: "Product Image 2" },
      { id: 3, src: pd3, alt: "Product Image 3" },
      { id: 4, src: pd4, alt: "Product Image 4" },
    ];
  };

  const images = getImages();

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const hasVerticalScroll = container.scrollHeight > container.clientHeight;
      setShowThumbnailArrows(hasVerticalScroll);
    }
  }, [images]);

  // UPDATED: Get available download files from documents array
  const getDownloadFiles = () => {
    const files = [];

    // Handle documents from selectedProduct - NEW LOGIC FOR YOUR API RESPONSE
    if (
      selectedProduct?.documents &&
      Array.isArray(selectedProduct.documents)
    ) {
      selectedProduct.documents.forEach((doc, index) => {
        if (doc && typeof doc === "string") {
          const fileName = doc.split("/").pop() || `document_${index + 1}`;
          const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

          files.push({
            id: index + 1,
            name: fileName,
            url: getImageUrl(doc),
            type: getFileType(fileExtension),
            size: "Unknown",
            extension: fileExtension,
          });
        }
      });
    }

    // Fallback: Handle legacy document field - can be array or string
    if (selectedProduct?.document && files.length === 0) {
      const documents = Array.isArray(selectedProduct.document)
        ? selectedProduct.document
        : [selectedProduct.document];

      documents.forEach((doc, index) => {
        if (doc && typeof doc === "string") {
          const fileName = doc.split("/").pop() || `document_${index + 1}`;
          const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

          files.push({
            id: index + 1,
            name: fileName,
            url: getImageUrl(doc),
            type: getFileType(fileExtension),
            size: "Unknown",
            extension: fileExtension,
          });
        }
      });
    }

    // Remove duplicates based on URL
    const uniqueFiles = files.filter(
      (file, index, self) => index === self.findIndex((f) => f.url === file.url)
    );

    return uniqueFiles;
  };

  const getFileType = (extension) => {
    const types = {
      pdf: "PDF Document",
      doc: "Word Document",
      docx: "Word Document",
      xls: "Excel Spreadsheet",
      xlsx: "Excel Spreadsheet",
      ppt: "PowerPoint Presentation",
      pptx: "PowerPoint Presentation",
      txt: "Text Document",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      gif: "Image",
      zip: "Archive",
      rar: "Archive",
    };
    return types[extension] || "Document";
  };

  const getFileIcon = (extension) => {
    const iconProps = { size: 20 };
    if (["pdf"].includes(extension)) {
      return <MdPictureAsPdf {...iconProps} color="#d32f2f" />;
    }
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return <MdPictureAsPdf {...iconProps} color="#2196f3" />;
    }
    return <MdDescription {...iconProps} color="#757575" />;
  };

  const downloadFiles = getDownloadFiles();

  const getBreadcrumbItems = () => {
    if (!selectedProduct) return [];

    const items = [];

    const categoryName =
      selectedProduct.category?.name || selectedProduct.apiData?.category?.name;
    const subcategoryName =
      selectedProduct.subcategory?.name ||
      selectedProduct.apiData?.subcategory?.name;
    const productName = selectedProduct.title || selectedProduct.productName;

    // Get current URL parameters for navigation
    const currentCategory = searchParams.get("category");
    const currentSubcategory = searchParams.get("subcategory");

    if (categoryName) {
      items.push({
        name: categoryName,
        active: false,
        onClick: () => {
          const params = new URLSearchParams();
          if (currentCategory) params.set("category", currentCategory);
          navigate(`/products?${params.toString()}`);
          window.location.reload();
        },
      });
    }

    if (subcategoryName) {
      items.push({
        name: subcategoryName,
        active: false,
        onClick: () => {
          const params = new URLSearchParams();
          if (currentCategory) params.set("category", currentCategory);
          if (currentSubcategory) params.set("subcategory", currentSubcategory);
          navigate(`/products?${params.toString()}`);
          window.location.reload();
        },
      });
    }

    if (productName) {
      items.push({
        name: productName,
        active: true,
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Handle image click for fullscreen
  const handleImageClick = (imageIndex) => {
    setFullscreenImageIndex(imageIndex);
    setIsImageFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsImageFullscreen(false);
  };

  const handleFullscreenPrev = () => {
    setFullscreenImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleFullscreenNext = () => {
    setFullscreenImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateURL = (url) => {
    if (!url) return true;
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  // UPDATED: Download menu toggle handlers
  const handleDownloadMenuToggle = () => {
    setDownloadMenuOpen((prevOpen) => !prevOpen);
  };

  const handleDownloadMenuClose = (event) => {
    if (
      downloadAnchorRef.current &&
      downloadAnchorRef.current.contains(event.target)
    ) {
      return;
    }
    setDownloadMenuOpen(false);
  };

  // UPDATED: File download handler
  const handleFileDownload = async (file) => {
    setDownloadingFiles((prev) => new Set(prev).add(file.id));
    setDownloadMenuOpen(false);

    try {
      // Create a temporary link for download
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Download failed. Please try again.");
    } finally {
      setDownloadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  };

  // Handle download all files
  const handleDownloadAll = async () => {
    setDownloadMenuOpen(false);
    for (const file of downloadFiles) {
      await handleFileDownload(file);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  // Handle view all downloads
  const handleViewAllDownloads = () => {
    setDownloadMenuOpen(false);
    handleOpenDownloadDialog();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!validatePhone(formData.phone_number)) {
      errors.phone_number = "Please enter a valid phone number";
    }

    if (!formData.company_name.trim()) {
      errors.company_name = "Company name is required";
    }

    if (formData.company_website && !validateURL(formData.company_website)) {
      errors.company_website = "Please enter a valid website URL";
    }

    if (!formData.designation.trim()) {
      errors.designation = "Designation is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
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
          body: JSON.stringify({
            ...formData,
            product_id: selectedProduct?.id,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Your inquiry has been submitted successfully! We will get back to you soon.",
        });

        setTimeout(() => {
          handleCloseDialog();
        }, 2000);
      } else {
        throw new Error("Failed to submit inquiry");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit inquiry. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog open
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setSubmitStatus({ type: "", message: "" });
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      company_name: "",
      company_website: "",
      designation: "",
      message: "",
    });
    setFormErrors({});
    setSubmitStatus({ type: "", message: "" });
  };

  // Handle download dialog
  const handleOpenDownloadDialog = () => {
    setIsDownloadDialogOpen(true);
  };

  const handleCloseDownloadDialog = () => {
    setIsDownloadDialogOpen(false);
  };

  if (!selectedProduct) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Alert severity="info" className="max-w-md">
          <Typography variant="h6" gutterBottom>
            No Product Selected
          </Typography>
          <Typography variant="body2">
            Please select a product to view its details.
          </Typography>
        </Alert>
      </div>
    );
  }

  const productData = {
    id: selectedProduct.id,
    productName: selectedProduct.title || selectedProduct.productName,
    description: selectedProduct.description,
    document: selectedProduct.document,
    category: selectedProduct.category || selectedProduct.apiData?.category,
    subcategory:
      selectedProduct.subcategory || selectedProduct.apiData?.subcategory,
    url: selectedProduct.url,
  };

  function addDistClasses(html) {
    return (
      html
        // For <h1> ... </h1>
        .replace(/<h1(?![^>]*class=)/g, '<h1 class="dist-h1"')
        .replace(/<h1([^>]*)class="([^"]*)"/g, '<h1$1class="dist-h1 $2"')
        // For <h2>
        .replace(/<h2(?![^>]*class=)/g, '<h2 class="dist-h2"')
        .replace(/<h2([^>]*)class="([^"]*)"/g, '<h2$1class="dist-h2 $2"')
        // For <h3>
        .replace(/<h3(?![^>]*class=)/g, '<h3 class="dist-h3"')
        .replace(/<h3([^>]*)class="([^"]*)"/g, '<h3$1class="dist-h3 $2"')
        // For <p>
        .replace(/<p(?![^>]*class=)/g, '<p class="dist-p"')
        .replace(/<p([^>]*)class="([^"]*)"/g, '<p$1class="dist-p $2"')
        // For <ul>
        .replace(/<ul(?![^>]*class=)/g, '<ul class="dist-ul"')
        .replace(/<ul([^>]*)class="([^"]*)"/g, '<ul$1class="dist-ul $2"')
        // For <ol>
        .replace(/<ol(?![^>]*class=)/g, '<ol class="dist-ol"')
        .replace(/<ol([^>]*)class="([^"]*)"/g, '<ol$1class="dist-ol $2"')
        // For <li>
        .replace(/<li(?![^>]*class=)/g, '<li class="dist-li"')
        .replace(/<li([^>]*)class="([^"]*)"/g, '<li$1class="dist-li $2"')
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Navigation */}
      <div className="px-4 lg:px-0 mb-4 lg:mb-5">
        <div className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  item.active
                    ? "text-[#2E437C] font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={item.onClick}
              >
                {item.name}
              </span>
              {index < breadcrumbItems.length - 1 && (
                <HiChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:px-8 px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-8 mb-5 lg:mb-5">
          {/* Product Title and Description */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-[32px] font-bold text-[#babec8] leading-tight">
              {productData.productName}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row flex-wrap gap-2 sm:gap-3 w-full lg:w-auto lg:justify-end">
            {productData.url && (
              <button
                onClick={() => {
                  window.open(productData.url, "_blank", "noopener,noreferrer");
                }}
                className="flex-1 min-w-[120px] sm:flex-none px-3 sm:px-6 py-2.5 border border-black text-black text-xs sm:text-sm font-medium uppercase rounded-full hover:bg-gray-50 transition-colors"
              >
                <span className="truncate">Explore More</span>
              </button>
            )}

            {/* UPDATED: Enhanced Download Button with Dropdown */}
            {downloadFiles.length > 0 && (
              <div className="relative flex-1 sm:flex-none">
                {downloadFiles.length === 1 ? (
                  // Single file - direct download
                  <Button
                    onClick={() => handleFileDownload(downloadFiles[0])}
                    variant="contained"
                    disabled={downloadingFiles.has(downloadFiles[0].id)}
                    startIcon={<LuDownload className="w-4 h-4" />}
                    sx={{
                      backgroundColor: "#2E437C",
                      textTransform: "uppercase",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      fontWeight: 500,
                      borderRadius: "9999px",
                      px: { xs: 2, sm: 3 },
                      py: 1.25,
                      "&:hover": {
                        backgroundColor: "#1E2F5C",
                      },
                    }}
                  >
                    {downloadingFiles.has(downloadFiles[0].id) ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      "Download"
                    )}
                  </Button>
                ) : (
                  // Multiple files - dropdown
                  <>
                    <ButtonGroup
                      variant="contained"
                      ref={downloadAnchorRef}
                      aria-label="download options"
                      sx={{
                        boxShadow: "none",
                        width: "100%",
                        "& .MuiButton-root": {
                          backgroundColor: "#2E437C",
                          textTransform: "uppercase",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          fontWeight: 500,
                          borderRadius: "9999px",
                          flex: 1,
                          "&:hover": {
                            backgroundColor: "#1E2F5C",
                          },
                        },
                        "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                          borderRight: "1px solid rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      <Button
                        size="small"
                        onClick={handleDownloadMenuToggle}
                        startIcon={<LuDownload className="w-4 h-4" />}
                        endIcon={<MdKeyboardArrowDown className="w-4 h-4" />}
                        sx={{
                          px: { xs: 2, sm: 3 },
                          py: 1.25,
                          minWidth: 0,
                          "& .MuiButton-startIcon": {
                            marginRight: { xs: "4px", sm: "8px" },
                          },
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Downloads ({downloadFiles.length})
                        </span>
                      </Button>
                    </ButtonGroup>

                    <Popper
                      sx={{ zIndex: 99999 }}
                      open={downloadMenuOpen}
                      anchorEl={downloadAnchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                      placement="bottom-end"
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-end"
                                ? "right top"
                                : "right bottom",
                          }}
                        >
                          <Paper
                            sx={{
                              minWidth: 250,
                              mt: 1,
                              borderRadius: 2,
                              boxShadow: 3,
                            }}
                          >
                            <ClickAwayListener
                              onClickAway={handleDownloadMenuClose}
                            >
                              <MenuList
                                autoFocusItem={downloadMenuOpen}
                                id="download-menu"
                              >
                                {downloadFiles.map((file) => (
                                  <MenuItem
                                    key={file.id}
                                    onClick={() => handleFileDownload(file)}
                                    disabled={downloadingFiles.has(file.id)}
                                    sx={{
                                      py: 1,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1.5,
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(46, 67, 124, 0.04)",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      {getFileIcon(file.extension)}
                                      <Box>
                                        <Typography
                                          variant="body2"
                                          fontWeight="medium"
                                          noWrap
                                          sx={{ maxWidth: 180 }}
                                        >
                                          {file.name}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {file.type}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box sx={{ ml: "auto" }}>
                                      {downloadingFiles.has(file.id) ? (
                                        <CircularProgress size={16} />
                                      ) : (
                                        <LuDownload className="text-[16px]" />
                                      )}
                                    </Box>
                                  </MenuItem>
                                ))}

                                <Divider />
                                <MenuItem
                                  onClick={handleDownloadAll}
                                  sx={{
                                    py: 1.5,
                                    color: "#2E437C",
                                    fontWeight: "medium",
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(46, 67, 124, 0.04)",
                                    },
                                  }}
                                >
                                  <LuDownload
                                    size={18}
                                    style={{ marginRight: 8 }}
                                  />
                                  Download All ({downloadFiles.length} files)
                                </MenuItem>

                                {downloadFiles.length > 5 && (
                                  <MenuItem
                                    onClick={handleViewAllDownloads}
                                    sx={{
                                      py: 1.5,
                                      color: "#2E437C",
                                      fontWeight: "medium",
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(46, 67, 124, 0.04)",
                                      },
                                    }}
                                  >
                                    View All Downloads
                                  </MenuItem>
                                )}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </>
                )}
              </div>
            )}

            <button
              onClick={handleOpenDialog}
              className="flex-1 min-w-[125px] sm:flex-none px-3 sm:px-6 py-2.5 border border-black text-black text-xs sm:text-sm font-medium uppercase rounded-full hover:bg-gray-50 transition-colors"
            >
              <span className="truncate">Raise Inquiry</span>
            </button>
          </div>
        </div>

        {/* Main Content - Desktop: 75% slider + 25% thumbnails, Mobile: Full width */}
        <div className="w-full">
          {/* Mobile Layout - Full width slider + bottom thumbnails */}
          <div className="lg:hidden">
            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shadow-lg">
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-custom-mobile",
                  prevEl: ".swiper-button-prev-custom-mobile",
                }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={images.length > 1}
                speed={800}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={setMainSwiperRef}
                className="w-full h-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={image.id}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <div className="swiper-button-prev-custom-mobile absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                      <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 rotate-180" />
                    </div>
                    <div className="swiper-button-next-custom-mobile absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                      <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </div>
                  </>
                )}
              </Swiper>
            </div>

            {/* Mobile Bottom Thumbnails - Updated with click handler */}
            {images.length > 1 && (
              <div className="mt-4">
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <div
                      key={`mobile-thumb-${image.id}`}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative w-full aspect-square overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90 rounded-lg ${
                        activeIndex === index ? "ring-2 ring-[#2E437C]" : ""
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-300 hover:brightness-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Layout - 75% slider + 25% vertical thumbnails */}
          <div className="hidden lg:flex gap-6">
            {/* Main Slider - 75% width */}
            <div className="w-3/4">
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shadow-lg">
                <Swiper
                  modules={[Navigation, Thumbs, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next-custom-desktop",
                    prevEl: ".swiper-button-prev-custom-desktop",
                  }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={images.length > 1}
                  speed={800}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  onSwiper={setMainSwiperRef}
                  className="w-full h-full swiper-container"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={image.id}>
                      <div className="relative aspect-[4/3] overflow-hidden group cursor-zoom-in">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          onClick={() => handleImageClick(index)}
                        />
                        <FiMaximize2 className="text-white text-4xl drop-shadow-md" />
                      </div>
                    </SwiperSlide>
                  ))}

                  {/* Custom Navigation Buttons */}
                  {images.length > 1 && (
                    <>
                      <div className="swiper-button-prev-custom-desktop absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                        <HiChevronRight className="w-5 h-5 text-gray-800 rotate-180" />
                      </div>
                      <div className="swiper-button-next-custom-desktop absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                        <HiChevronRight className="w-5 h-5 text-gray-800" />
                      </div>
                    </>
                  )}
                </Swiper>
              </div>
            </div>

            {/* Vertical Thumbnails - 25% width - Updated with click handler */}
            {images?.length > 1 && (
              <div className="w-1/4 relative">
                {/* Up Arrow */}
                {showThumbnailArrows && (
                  <button
                    onClick={() => handleThumbnailScroll("up")}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg mb-1"
                  >
                    <HiChevronRight className="w-4 h-4 text-gray-800 -rotate-90" />
                  </button>
                )}

                {/* Thumbnail grid */}
                <div
                  ref={thumbnailContainerRef}
                  className="grid grid-cols-2 gap-3 overflow-y-auto scrollbar-hide"
                  style={{
                    maxHeight: "550px",
                    marginTop: showThumbnailArrows ? "32px" : "0",
                    marginBottom: showThumbnailArrows ? "32px" : "0",
                  }}
                >
                  {images.map((image, index) => (
                    <div
                      key={`desktop-thumb-${image.id}`}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative w-full aspect-square overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90 flex-shrink-0 ${
                        activeIndex === index ? "border border-[#2E437C]" : ""
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Down Arrow */}
                {showThumbnailArrows && (
                  <button
                    onClick={() => handleThumbnailScroll("down")}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg mt-1"
                  >
                    <HiChevronRight className="w-4 h-4 text-gray-800 rotate-90" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="container px-5 max-w-[">
            {selectedProduct?.description && (
              <div
                className="text-base text-gray-600 leading-relaxed pt-5"
                dangerouslySetInnerHTML={{
                  __html: addDistClasses(selectedProduct.description),
                }}
                style={{
                  fontSize: "16px",
                  lineHeight: "1.75",
                  color: "#4a5568",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isImageFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center overflow-auto">
          {/* Close button */}
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 z-60 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <MdClose size={24} />
          </button>

          {/* Navigation buttons for multiple images */}
          {images?.length > 1 && (
            <>
              <button
                onClick={handleFullscreenPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <HiChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button
                onClick={handleFullscreenNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main fullscreen image */}
          <div className="relative p-4 flex items-center justify-center">
            <img
              src={images[fullscreenImageIndex]?.src}
              alt={images[fullscreenImageIndex]?.alt}
              className="w-[500px] h-[auto] object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full">
              {fullscreenImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}

      {/* Download Files Dialog */}
      <Dialog
        open={isDownloadDialogOpen}
        onClose={handleCloseDownloadDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              color="#2E437C"
            >
              Download Files - {productData.productName}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDownloadDialog}
              sx={{ color: "grey.500" }}
            >
              <MdClose size={24} />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {downloadFiles.length} file{downloadFiles.length !== 1 ? "s" : ""}{" "}
            available for download
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {downloadFiles.length > 0 ? (
            <List sx={{ width: "100%" }}>
              {downloadFiles.map((file) => (
                <ListItem
                  key={file.id}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    mb: 2,
                    "&:last-child": { mb: 0 },
                  }}
                >
                  <ListItemIcon>{getFileIcon(file.extension)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {file.name}
                        </Typography>
                        <Chip
                          label={file.type}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {file.extension.toUpperCase()} • {file.size}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={() => handleFileDownload(file)}
                      disabled={downloadingFiles.has(file.id)}
                      sx={{
                        backgroundColor: "#2E437C",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#1E2F5C",
                        },
                        "&:disabled": {
                          backgroundColor: "#ccc",
                        },
                      }}
                    >
                      {downloadingFiles.has(file.id) ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <LuDownload />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No files available for download
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseDownloadDialog}
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: "#2E437C",
              color: "#2E437C",
              "&:hover": {
                borderColor: "#1E2F5C",
                backgroundColor: "rgba(46, 67, 124, 0.04)",
              },
            }}
          >
            Close
          </Button>
          {downloadFiles.length > 1 && (
            <Button
              onClick={handleDownloadAll}
              variant="contained"
              sx={{
                backgroundColor: "#2E437C",
                "&:hover": {
                  backgroundColor: "#1E2F5C",
                },
                minWidth: 140,
              }}
              startIcon={<LuDownload />}
            >
              Download All
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Inquiry Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              color="#2E437C"
            >
              Product Inquiry - {productData.productName}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ color: "grey.500" }}
            >
              <MdClose size={24} />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Fill out the form below and we'll get back to you soon.
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {submitStatus.message && (
            <Alert
              severity={submitStatus.type}
              sx={{ mb: 3 }}
              onClose={() => setSubmitStatus({ type: "", message: "" })}
            >
              {submitStatus.message}
            </Alert>
          )}

          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={2.5}
            >
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <TextField
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                error={!!formErrors.phone_number}
                helperText={formErrors.phone_number}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
                placeholder="+91 9876543210"
              />

              <TextField
                name="company_name"
                label="Company Name"
                value={formData.company_name}
                onChange={handleInputChange}
                error={!!formErrors.company_name}
                helperText={formErrors.company_name}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <TextField
                name="company_website"
                label="Company Website"
                value={formData.company_website}
                onChange={handleInputChange}
                error={!!formErrors.company_website}
                helperText={formErrors.company_website}
                fullWidth
                variant="outlined"
                sx={{ mb: 1 }}
                placeholder="https://www.example.com"
              />

              <TextField
                name="designation"
                label="Designation"
                value={formData.designation}
                onChange={handleInputChange}
                error={!!formErrors.designation}
                helperText={formErrors.designation}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />
            </Box>

            <TextField
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleInputChange}
              error={!!formErrors.message}
              helperText={formErrors.message}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
              sx={{ mt: 2 }}
              placeholder="Please describe your inquiry in detail..."
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: "#2E437C",
              color: "#2E437C",
              "&:hover": {
                borderColor: "#1E2F5C",
                backgroundColor: "rgba(46, 67, 124, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#2E437C",
              "&:hover": {
                backgroundColor: "#1E2F5C",
              },
              minWidth: 120,
            }}
          >
            {isSubmitting ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} color="inherit" />
                Submitting...
              </Box>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
