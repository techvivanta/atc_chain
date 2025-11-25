import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FaChevronDown, FaArrowLeft, FaTimes } from "react-icons/fa";
import productImage from "../../assets/images/productdefault.png";
import ProductDetails from "./ProductDetails";
import SubcategoryCards from "./SubcategoryCards";
import axios from "axios";
import { CustomHeading } from "../common/CustomHeading";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LuDot } from "react-icons/lu";
import Loader from "../common/Loader";
import CateComponent2 from "../Home_Components/modulerSolution/CateComponent2";
import { HiChevronRight } from "react-icons/hi2";

const theme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "38px !important",
          padding: "0px 5px !important",
          marginBottom: "0px !important",
          "&.Mui-expanded": {
            minHeight: "38px !important",
            margin: "0 !important",
            marginBottom: "0 !important",
          },
        },
        content: {
          margin: "0 !important",
          "&.Mui-expanded": {
            margin: "0 !important",
          },
        },
        expandIconWrapper: {
          marginRight: "0 !important",
          marginLeft: "0px !important",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "0 !important",
          padding: "0 !important",
          borderRadius: "0 !important",
          boxShadow: "none !important",
          backgroundColor: "transparent !important",
          "&.Mui-expanded": {
            margin: "0 !important",
          },
          "&:before": {
            display: "none !important",
          },
          "&:last-child": {
            marginBottom: "0 !important",
            "&.Mui-expanded": {
              margin: "0 !important",
            },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 !important",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: "0 !important",
          paddingBottom: "0 !important",
          listStyle: "none",
          position: "relative",
        },
      },
    },
  },
});

const ProductCom = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("Bearing");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState("first");
  const [expandedPanel, setExpandedPanel] = useState(false);

  // const [expandedPanel, setExpandedPanel] = useState("panel1");
  const [expandedSubPanel, setExpandedSubPanel] = useState("");
  const [parentCategory, setParentCategory] = useState("Bearing");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [directProducts, setDirectProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categoryName, setCategoryName] = useState();
  const [subCategoryName, setSubCategoryName] = useState();
  const [cateId, setcateId] = useState();
  const [subCateId, setsubCateId] = useState();

  const isInitialLoadRef = useRef(false);
  const hasProcessedUrlRef = useRef(false);
  const lastUrlParamsRef = useRef("");

  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const scrollTarget = useRef(0);
  const scrolling = useRef(false);
  
  useEffect(() => {
    const leftElement = leftPanelRef.current;
    const rightElement = rightPanelRef.current;

    if (!leftElement && !rightElement) return;

    // Store handler references for proper cleanup
    const leftWheelHandler = (e) => handlePanelWheel(e, leftElement);
    const rightWheelHandler = (e) => handlePanelWheel(e, rightElement);

    // Simple scroll function without animation for testing
    const scrollTo = (element, targetScrollTop) => {
      if (!element) return;
      element.scrollTop = targetScrollTop;
    };

    // Debug wheel handler
    const handlePanelWheel = (e, element) => {
      if (!element) return;

      const isScrollable = element.scrollHeight > element.clientHeight;
      if (!isScrollable) {
        return;
      }

      const atTop = element.scrollTop <= 0;
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      const canScrollInternally =
        (scrollingDown && !atBottom) || (scrollingUp && !atTop);

      if (canScrollInternally) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        let scrollAmount;
        if (e.deltaMode === 0) {
          // Pixel mode (touchpad) - use smaller multiplier
          scrollAmount = e.deltaY * 0.8;
        } else {
          // Line mode (mouse wheel)
          scrollAmount = e.deltaY * 15;
        }

        const newScrollTop = element.scrollTop + scrollAmount;

        element.scrollTop = newScrollTop;
      }
    };

    // Keyboard handler
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const activeElement = document.activeElement;
        let targetElement = null;

        if (leftElement && leftElement.contains(activeElement)) {
          targetElement = leftElement;
        } else if (rightElement && rightElement.contains(activeElement)) {
          targetElement = rightElement;
        }

        if (targetElement) {
          e.preventDefault();
          const scrollAmount = e.key === "ArrowDown" ? 50 : -50;
          targetElement.scrollTop += scrollAmount;
        }
      }
    };

    // Focus handler
    const handleFocusIn = (e) => {
      [leftElement, rightElement].forEach((element) => {
        if (!element || !element.contains(e.target)) return;

        const elementRect = e.target.getBoundingClientRect();
        const containerRect = element.getBoundingClientRect();

        if (
          elementRect.top < containerRect.top ||
          elementRect.bottom > containerRect.bottom
        ) {
          const scrollTop = Math.max(
            0,
            e.target.offsetTop - element.offsetTop - 20
          );
          element.scrollTop = scrollTop;
        }
      });
    };

    // Attach event listeners with capture phase
    if (leftElement) {
      leftElement.addEventListener("wheel", leftWheelHandler, {
        passive: false,
        capture: true,
      });
    }
    if (rightElement) {
      rightElement.addEventListener("wheel", rightWheelHandler, {
        passive: false,
        capture: true,
      });
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    // Test: Add a temporary test button
    const testScroll = () => {
      if (leftElement) {
        leftElement.scrollTop += 100;
      }
    };

    // Add test button to DOM temporarily
    const testButton = document.createElement("button");
    testButton.textContent = "";
    document.body.appendChild(testButton);

    // Clean up on unmount
    return () => {
      if (leftElement) {
        leftElement.removeEventListener("wheel", leftWheelHandler, {
          capture: true,
        });
      }
      if (rightElement) {
        rightElement.removeEventListener("wheel", rightWheelHandler, {
          capture: true,
        });
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      // Remove test button
      if (document.body.contains(testButton)) {
        document.body.removeChild(testButton);
      }
    };
  }, [leftPanelRef.current, rightPanelRef.current]); // Simplified dependencies
  const getAxiosConfig = useCallback(
    () => ({
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    }),
    []
  );

  useEffect(() => {
    const initializeComponent = async () => {
      if (isInitialLoadRef.current) return;

      try {
        setLoading(true);
        await fetchCategories();
        isInitialLoadRef.current = true;
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const subcategoryParam = searchParams.get("subcategory");
    const productParam = searchParams.get("product");

    const urlFilters = {
      category: categoryParam ? parseInt(categoryParam) : null,
      subcategory: subcategoryParam ? parseInt(subcategoryParam) : null,
      product: productParam ? parseInt(productParam) : null,
    };

    const hasAnyParam =
      urlFilters.category || urlFilters.subcategory || urlFilters.product;

    // Block API + selection logic ONLY if viewMode is 'first' and NO params
    if (viewMode === "first" && !hasAnyParam) {
      // Do not fetch subcategories or products!
      return;
    }

    if (!isInitialLoadRef.current || categories.length === 0) return;

    const currentUrlParams = `${categoryParam || ""}-${
      subcategoryParam || ""
    }-${productParam || ""}`;

    if (
      hasProcessedUrlRef.current &&
      lastUrlParamsRef.current === currentUrlParams
    ) {
      return;
    }

    lastUrlParamsRef.current = currentUrlParams;

    if (hasAnyParam) {
      hasProcessedUrlRef.current = true;
      applyUrlFilters(urlFilters);
    } else if (categories.length > 0 && !hasProcessedUrlRef.current) {
      const firstCategory = categories[0];
      if (firstCategory?.id) {
        // setSelectedCategory(firstCategory.category || firstCategory.title);
        // setParentCategory(firstCategory.category || firstCategory.title);
        // setExpandedPanel(`panel1`);
        // setSelectedSubcategoryId(null);
        // setSelectedProductId(null);
        // fetchSubcategoriesAndDirectProducts(firstCategory.id);
        // hasProcessedUrlRef.current = true;
      }
    }
  }, [categories, searchParams, viewMode]);

  const updateUrlParams = (params) => {
    const newSearchParams = new URLSearchParams();

    if (params.category) {
      newSearchParams.set("category", params.category.toString());
    }
    if (params.subcategory) {
      newSearchParams.set("subcategory", params.subcategory.toString());
    }
    if (params.product) {
      newSearchParams.set("product", params.product.toString());
    }

    const newUrlParams = newSearchParams.toString();
    const currentUrlParams = `${searchParams.get("category") || ""}-${
      searchParams.get("subcategory") || ""
    }-${searchParams.get("product") || ""}`;
    const newUrlParamsFormatted = `${params.category || ""}-${
      params.subcategory || ""
    }-${params.product || ""}`;

    if (currentUrlParams !== newUrlParamsFormatted) {
      lastUrlParamsRef.current = newUrlParamsFormatted;
      setSearchParams(newSearchParams);
    }
  };

  const fetchSubcategoriesAndDirectProducts = async (categoryId) => {
    try {
      setSubcategoriesLoading(true);
      setError(null);

      const [subcategoryResponse, directProductsResponse] = await Promise.all([
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/subcategory?category_id=${categoryId}`,
          getAxiosConfig()
        ),
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/product/search?search=&category_id=${categoryId}`,
          getAxiosConfig()
        ),
      ]);

      let subcategoriesData = [];
      if (
        subcategoryResponse.data.message ===
          "Subcategories fetched successfully" &&
        subcategoryResponse.data.data
      ) {
        subcategoriesData = subcategoryResponse.data.data;
        setCategoryName();
        setSubCategoryName();
      }

      let directProductsData = [];
      if (
        directProductsResponse.data.message ===
          "Products fetched successfully" &&
        directProductsResponse.data.data
      ) {
        setCategoryName();
        setSubCategoryName();
        directProductsData = directProductsResponse.data.data
          .filter((product) => !product.subcategory_id)
          .map((product) => ({
            id: product.id,
            title: product.productName,
            category: product.category?.name || "Uncategorized",
            parentCategory: product.category?.name || "Uncategorized",
            image:
              product.images && product.images.length > 0
                ? product.images[0]
                : productImage,
            description: product.description,
            document: product.document,
            is_active: product.is_active,
            categoryId: product.category_id,
            subcategoryId: product.subcategory_id,
            apiData: product,
            isDirectProduct: true,
            displayOrder: product.displayOrder,
            cover_image: product.cover_image,
          }))
          .sort((a, b) => a.displayOrder - b.displayOrder);
      }

      setSubcategories(subcategoriesData);
      setDirectProducts(directProductsData);
      setViewMode("categories");
    } catch (err) {
      setSubcategories([]);
      setDirectProducts([]);
      if (err.response) {
        setError(
          `Failed to load data: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        setError("Network error while loading data. Please try again.");
      } else {
        setError(`Failed to load data: ${err.message}`);
      }
    } finally {
      setSubcategoriesLoading(false);
    }
  };

  const applyUrlFilters = async (filters) => {
    try {
      if (filters.category) {
        const category = categories.find(
          (cat) => cat.id.toString() === filters.category.toString()
        );

        if (!category) return;

        setSelectedCategory(category.category || category.title);
        setParentCategory(category.category || category.title);
        setExpandedPanel(`panel${categories.indexOf(category) + 1}`);

        if (filters.product) {
          setSelectedProductId(filters.product);
          setSelectedSubcategoryId(filters.subcategory || null);
          await handleProductByUrl(
            filters.product,
            category,
            filters.subcategory
          );
        } else if (filters.subcategory) {
          setSelectedSubcategoryId(filters.subcategory);
          setSelectedProductId(null);
          await handleSubcategoryByUrl(filters.subcategory, category);
        } else {
          setSelectedSubcategoryId(null);
          setSelectedProductId(null);
          await fetchSubcategoriesAndDirectProducts(category.id);
          setViewMode("categories");
          setShowDetails(false);
          setProducts([]);
        }
      }
    } catch (error) {
      setError("Error applying URL filters");
    }
  };

  const handleProductByUrl = async (
    productId,
    category,
    subcategoryId = null
  ) => {
    try {
      setProductDetailsLoading(true);

      const detailedProduct = await fetchProductDetails(productId);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setViewMode("details");
        setShowDetails(true);

        if (subcategoryId || detailedProduct.subcategoryId) {
          const searchResults = await searchProducts(
            "",
            category.id,
            subcategoryId || detailedProduct.subcategoryId
          );
          setProducts(searchResults);
        }
      }
    } catch (error) {
      setError("Error loading product by URL");
    } finally {
      setProductDetailsLoading(false);
    }
  };

  const handleSubcategoryByUrl = async (subcategoryId, category) => {
    try {
      setProductsLoading(true);

      let foundSubcategory = null;
      let subPanelIndex = -1;

      if (category.children) {
        category.children.forEach((child, index) => {
          if (
            child.isSubCategory &&
            child.subcategoryId.toString() === subcategoryId.toString()
          ) {
            foundSubcategory = child;
            subPanelIndex = index;
          }
        });
      }

      if (foundSubcategory) {
        setExpandedSubPanel(`subpanel${subPanelIndex}`);
        setSelectedCategory(foundSubcategory.title);
        setParentCategory(category.category || category.title);
      }

      const products = await searchProducts("", category.id, subcategoryId);
      setProducts(products);
      setViewMode("products");
      setShowDetails(false);
    } catch (error) {
      setError("Error loading subcategory by URL");
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSubcategoryCardClick = async (subcategory) => {
    try {
      setProductsLoading(true);
      setViewMode("products");
      setShowDetails(false);
      setSelectedSubcategoryId(subcategory.id);
      setSelectedProductId(null);

      const fetchedProducts = await searchProducts(
        "",
        subcategory.category_id,
        subcategory.id
      );
      setProducts(fetchedProducts);

      updateUrlParams({
        category: subcategory.category_id,
        subcategory: subcategory.id,
      });
    } catch (error) {
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleDirectProductClick = async (product) => {
    try {
      const detailedProduct = await fetchProductDetails(product.id);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setSelectedProductId(product.id);
        setSelectedSubcategoryId(null);
        setViewMode("details");
        setShowDetails(true);

        const urlParams = {
          category: detailedProduct.categoryId,
          product: detailedProduct.id,
        };

        if (detailedProduct.subcategoryId) {
          urlParams.subcategory = detailedProduct.subcategoryId;
        }

        updateUrlParams(urlParams);
      }
    } catch (error) {
      setError("Error loading product details");
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);

    setCategoryName();
    setSubCategoryName();
    setSelectedProduct();

    if (isExpanded) {
      const categoryIndex = parseInt(panel.replace("panel", "")) - 1;
      const category = categories[categoryIndex];
      if (category) {
        setSelectedCategory(category.category);
        setParentCategory(category.category);
        setViewMode("categories");
        setShowDetails(false);
        setExpandedSubPanel("");
        setSelectedSubcategoryId(null);
        setSelectedProductId(null);
        setProducts([]);

        fetchSubcategoriesAndDirectProducts(category.id);
        updateUrlParams({ category: category.id });
      }
    } else {
      // Accordion closed: show CateComponent2
      setViewMode("first"); // triggers CateComponent2 to render
      setSelectedCategory(null);
      setSelectedCategoryId(null);
      setSelectedSubcategoryId(null);
      setSelectedProductId(null);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      setProductDetailsLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/product/${productId}`,
        getAxiosConfig()
      );

      if (
        response.data.message === "Product fetched successfully" &&
        response.data.data
      ) {
        setCategoryName();
        setSubCategoryName();
        const detailedProduct = {
          id: response.data.data.id,
          title: response.data.data.productName,
          url: response.data.data.url,
          description: response.data.data.description,
          images: response.data.data.images || [],
          document: response.data.data.documents,
          category: response.data.data.category?.name || "Uncategorized",
          subcategory: response.data.data.subcategory?.name || null,
          parentCategory: response.data.data.category?.name || "Uncategorized",
          categoryId: response.data.data.category_id,
          subcategoryId: response.data.data.subcategory_id,
          is_active: response.data.data.is_active,
          created_at: response.data.data.created_at,
          updated_at: response.data.data.updated_at,
          apiData: response.data.data,
        };

        return detailedProduct;
      } else {
        throw new Error("Invalid product details API response format");
      }
    } catch (err) {
      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        setError(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setError(`Failed to load product details: ${err.message}`);
      }
      throw err;
    } finally {
      setProductDetailsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/chart`,
        getAxiosConfig()
      );

      if (
        response.data.message === "Chart fetched successfully" &&
        response.data.data
      ) {
        setCategoryName();
        setSubCategoryName();
        const transformedCategories = transformApiData(response.data.data);
        setCategories(transformedCategories);
        return transformedCategories;
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message);
      }
      throw err;
    }
  };

  const searchProducts = async (
    query,
    categoryId = null,
    subcategoryId = null
  ) => {
    try {
      setProductsLoading(true);

      let url = `${
        import.meta.env.VITE_BACKEND_URL
      }/product/product/search?search=${encodeURIComponent(query)}`;

      if (!query) {
        if (categoryId) {
          url += `&category_id=${categoryId}`;
        }
        if (subcategoryId) {
          url += `&subcategory_id=${subcategoryId}`;
        }
      }

      const response = await axios.get(url, getAxiosConfig());

      if (
        response.data.message === "Products fetched successfully" &&
        response.data.data
      ) {
        const transformedProducts = response.data.data
          .map((product) => ({
            id: product.id,
            title: product.productName,
            category: product.category?.name || "Uncategorized",
            parentCategory: product.category?.name || "Uncategorized",
            image:
              product.images && product.images.length > 0
                ? product.images[0]
                : productImage,
            description: product.description,
            document: product.document,
            is_active: product.is_active,
            categoryId: product.category_id,
            subcategoryId: product.subcategory_id,
            displayOrder: product.displayOrder || product.display_order || 999,
            apiData: product,
            cover_image: product.cover_image,
          }))
          .sort((a, b) => {
            if (a.displayOrder == null && b.displayOrder == null) return 0;
            if (a.displayOrder == null) return 1;
            if (b.displayOrder == null) return -1;
            return a.displayOrder - b.displayOrder;
          });

        setcateId(response.data.data[0]?.category.id);
        setsubCateId(response.data.data[0]?.subcategory.id);
        setCategoryName(response.data.data[0]?.category.name);
        setSubCategoryName(response.data.data[0]?.subcategory.name);

        return transformedProducts;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    } finally {
      setProductsLoading(false);
    }
  };

  const transformApiData = (apiData) => {
    return apiData.map((category, index) => {
      const children = [];

      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((subcategory) => {
          children.push({
            title: subcategory.name,
            category: category.name,
            isSubCategory: true,
            subcategoryId: subcategory.id,
            categoryId: category.id,
            subChildren: subcategory.products.map((product) => ({
              title: product.productName || product.productname,
              category: subcategory.name,
              productId: product.id,
              subcategoryId: subcategory.id,
              categoryId: category.id,
            })),
          });
        });
      }

      if (category.products && category.products.length > 0) {
        category.products.forEach((product) => {
          children.push({
            title: product.productName || product.productname,
            category: category.name,
            productId: product.id,
            categoryId: category.id,
            isProduct: true,
          });
        });
      }

      return {
        id: category.id,
        title: category.name,
        category: category.name,
        image: category.image || productImage,
        children: children,
        hasSubcategories:
          category.subcategories && category.subcategories.length > 0,
        hasDirectProducts: category.products && category.products.length > 0,
      };
    });
  };

  const handleSubAccordionChange =
    (subPanel, subCategory) => async (event, isExpanded) => {
      setExpandedSubPanel(isExpanded ? subPanel : false);

      setCategoryName();
      setSubCategoryName();
      setSelectedProduct();

      if (isExpanded && subCategory) {
        try {
          setProductsLoading(true);
          setSelectedSubcategoryId(subCategory.subcategoryId);
          setSelectedProductId(null);

          const parentCategory = categories.find(
            (cat) =>
              cat.category === subCategory.category ||
              cat.title === subCategory.category
          );

          if (parentCategory) {
            setSelectedCategory(subCategory.title);
            setParentCategory(subCategory.category);
            setViewMode("products");
            setShowDetails(false);

            const fetchedProducts = await searchProducts(
              "",
              subCategory.categoryId,
              subCategory.subcategoryId
            );
            setProducts(fetchedProducts);

            updateUrlParams({
              category: subCategory.categoryId,
              subcategory: subCategory.subcategoryId,
            });
          }
        } catch (error) {
          setProducts([]);
        } finally {
          setProductsLoading(false);
        }
      } else {
        // Subcategory accordion is closed - reset to category default view
        setSelectedSubcategoryId(null);
        setSelectedProductId(null);
        setViewMode("categories");
        setShowDetails(false);
        // Load category subcategories + direct products
        const categoryId = subCategory?.categoryId;
        if (categoryId) {
          await fetchSubcategoriesAndDirectProducts(categoryId);
        } else {
          setProducts([]);
        }
      }
    };

  const handleProductItemClick = async (
    productTitle,
    category,
    productData = null
  ) => {
    setCategoryName();
    setSubCategoryName();
    setSelectedProduct();
    try {
      setProductDetailsLoading(true);

      if (productData?.productId) {
        const detailedProduct = await fetchProductDetails(
          productData.productId
        );

        if (detailedProduct) {
          setSelectedProduct(detailedProduct);
          setSelectedProductId(productData.productId);
          setSelectedSubcategoryId(productData.subcategoryId || null);
          setViewMode("details");
          setShowDetails(true);
          setParentCategory(category);

          const urlParams = {
            category: productData.categoryId,
            product: detailedProduct.id,
          };

          if (productData.subcategoryId) {
            urlParams.subcategory = productData.subcategoryId;
          }

          updateUrlParams(urlParams);
        }
        return;
      }

      setProductsLoading(true);

      const categoryObj = categories.find(
        (cat) => cat.category === category || cat.title === category
      );

      if (categoryObj) {
        const searchResults = await searchProducts(
          productTitle,
          categoryObj.id
        );
        const product = searchResults.find((p) => p.title === productTitle);

        if (product) {
          const detailedProduct = await fetchProductDetails(product.id);

          if (detailedProduct) {
            setSelectedProduct(detailedProduct);
            setSelectedProductId(product.id);
            setSelectedSubcategoryId(detailedProduct.subcategoryId || null);
            setViewMode("details");
            setShowDetails(true);
            setParentCategory(category);

            const urlParams = {
              category: detailedProduct.categoryId,
              product: detailedProduct.id,
            };

            if (detailedProduct.subcategoryId) {
              urlParams.subcategory = detailedProduct.subcategoryId;
            }

            updateUrlParams(urlParams);
          }
        }
      }
    } catch (error) {
      setError("Error loading product details");
    } finally {
      setProductsLoading(false);
      setProductDetailsLoading(false);
    }
  };

  const handleProductClick = async (product) => {
    try {
      const detailedProduct = await fetchProductDetails(product.id);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setSelectedProductId(product.id);
        setSelectedSubcategoryId(detailedProduct.subcategoryId || null);
        setViewMode("details");
        setShowDetails(true);

        const urlParams = {
          category: detailedProduct.categoryId,
          product: detailedProduct.id,
        };

        if (detailedProduct.subcategoryId) {
          urlParams.subcategory = detailedProduct.subcategoryId;
        }

        updateUrlParams(urlParams);
      }
    } catch (error) {
      setError("Error loading product details");
    }
  };

  const handleBackToProducts = () => {
    const currentCategory = searchParams.get("category");
    const currentSubcategory = searchParams.get("subcategory");

    if (currentSubcategory) {
      setViewMode("products");
      setShowDetails(false);
      setSelectedProduct(null);
      setSelectedProductId(null);

      const urlParams = {};
      if (currentCategory) urlParams.category = currentCategory;
      if (currentSubcategory) urlParams.subcategory = currentSubcategory;

      updateUrlParams(urlParams);
    } else {
      setViewMode("categories");
      setShowDetails(false);
      setSelectedProduct(null);
      setSelectedProductId(null);

      const urlParams = {};
      if (currentCategory) urlParams.category = currentCategory;

      updateUrlParams(urlParams);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <Alert severity="error" className="max-w-md">
          <strong>Error loading products:</strong> {error}
          <button
            onClick={fetchCategories}
            className="ml-2 underline hover:no-underline text-[#2E437C]"
          >
            Try again
          </button>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <div className="min-h-screen bg-white px-4 md:px-12 py-5">
              <div className="flex flex-col lg:flex-row gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  ref={leftPanelRef}
                  className="w-full md:w-full lg:w-5/12 xl:w-4/12 custom-width max-h-[87vh] overflow-y-auto overflow-x-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-5">
                    <h1 className="text-[36px] font-[700] text-[#BABEC8]">
                      <CustomHeading title="Our Products" className="" />
                    </h1>
                  </div>
                  <div className="py-4 rounded-lg">
                    <div className="lg:hidden">
                      <Accordion
                        expanded={isMobileMenuOpen}
                        onChange={(event, isExpanded) =>
                          setIsMobileMenuOpen(isExpanded)
                        }
                        sx={{
                          boxShadow:
                            "0px 0.89px 1.78px 0px rgba(16, 24, 40, 0.05)",
                          "&:before": { display: "none" },
                          marginBottom: "4px",
                          backgroundColor: "transparent",
                          border: "none",
                          borderRadius: "27px",
                          width: "100%",
                          maxWidth: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<FaChevronDown className="text-black" />}
                          sx={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #000000",
                            borderRadius: "27px",
                            minHeight: "auto",
                            padding: "10.66px 25px",
                            margin: 0,
                            "&.Mui-expanded": {
                              backgroundColor: "#ffffff",
                              borderRadius: "27px 27px 0 0",
                              borderBottom: "none",
                              minHeight: "auto",
                            },
                            "& .MuiAccordionSummary-content": {
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flex: 1,
                            },
                            "& .MuiAccordionSummary-expandIconWrapper": {
                              transform: "rotate(0deg)",
                              transition: "transform 0.2s",
                            },
                            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                              {
                                transform: "rotate(180deg)",
                              },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#000000",
                              textAlign: "left",
                              fontFamily: "'Articulat CF', sans-serif",
                              fontSize: "16px",
                              lineHeight: "21.32px",
                              fontWeight: 500,
                              flex: 1,
                            }}
                          >
                            Explore our range
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                          sx={{
                            backgroundColor: "#ffffff",
                            border: "0.89px solid #000000",
                            borderTop: "none",
                            borderRadius: "0 0 27px 27px",
                            padding: "8px 0",
                            boxShadow:
                              "0px 0.89px 1.78px 0px rgba(16, 24, 40, 0.05)",
                          }}
                        >
                          {categories.map((category, index) => (
                            <Accordion
                              key={category.id}
                              expanded={expandedPanel === `panel${index + 1}`}
                              onChange={handleAccordionChange(
                                `panel${index + 1}`
                              )}
                              sx={{
                                boxShadow: "none",
                                "&:before": { display: "none" },
                                marginBottom: "4px",
                                backgroundColor: "transparent",
                              }}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <FaChevronDown className="text-gray-600" />
                                }
                                sx={{
                                  minHeight: "48px",
                                  padding: "0 8px",
                                  borderRadius: "6px",
                                  transition: "all 0.2s ease-in-out",
                                }}
                              >
                                <div className="flex items-center w-full">
                                  <Typography
                                    sx={{
                                      fontSize: "17px",
                                      fontWeight: 500,
                                      fontStyle: "normal",
                                      color:
                                        expandedPanel === `panel${index + 1}` &&
                                        !selectedSubcategoryId &&
                                        !selectedProductId
                                          ? "#2E437C"
                                          : "#000",
                                      transition: "color 0.2s ease-in-out",
                                      whiteSpace: "nowrap",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {category.title}
                                  </Typography>
                                  <div className="flex-1 border-[#2E437C] border-[1px] me-2 "></div>
                                </div>
                              </AccordionSummary>

                              <AccordionDetails
                                sx={{ padding: "0 0 8px 16px" }}
                              >
                                <List dense>
                                  {category.children.map(
                                    (child, childIndex) => (
                                      <React.Fragment key={childIndex}>
                                        {child.isSubCategory ? (
                                          <Accordion
                                            expanded={
                                              expandedSubPanel ===
                                              `subpanel${childIndex}`
                                            }
                                            onChange={handleSubAccordionChange(
                                              `subpanel${childIndex}`,
                                              child
                                            )}
                                            sx={{
                                              boxShadow: "none",
                                              "&:before": { display: "none" },
                                              backgroundColor: "transparent",
                                              margin: 0,
                                            }}
                                          >
                                            <AccordionSummary
                                              expandIcon={
                                                <FaChevronDown className="text-gray-500 text-xs" />
                                              }
                                              sx={{
                                                minHeight: "36px",
                                                padding: "0 4px",
                                                borderRadius: "4px",
                                                transition:
                                                  "all 0.2s ease-in-out",
                                              }}
                                            >
                                              <div className="flex items-center w-full">
                                                <Typography
                                                  sx={{
                                                    fontSize: "17px",
                                                    fontWeight: 500,
                                                    fontStyle: "normal",
                                                    color:
                                                      selectedSubcategoryId ===
                                                        child.subcategoryId &&
                                                      !selectedProductId
                                                        ? "#2E437C"
                                                        : "#666666cc",
                                                    transition:
                                                      "color 0.2s ease-in-out",
                                                    whiteSpace: "nowrap",
                                                    marginRight: "12px",
                                                  }}
                                                >
                                                  {child.title}
                                                </Typography>
                                              </div>
                                            </AccordionSummary>

                                            <AccordionDetails
                                              sx={{ padding: "0 0 4px 12px" }}
                                            >
                                              <List dense>
                                                {child.subChildren.map(
                                                  (subChild, subIndex) => (
                                                    <ListItem
                                                      key={subIndex}
                                                      disablePadding
                                                    >
                                                      <ListItemButton
                                                        onClick={() =>
                                                          handleProductItemClick(
                                                            subChild.title,
                                                            subChild.category,
                                                            subChild
                                                          )
                                                        }
                                                        sx={{
                                                          minHeight: "32px",
                                                          padding: "4px 8px",
                                                          borderRadius: "4px",
                                                          transition:
                                                            "all 0.2s ease-in-out",
                                                        }}
                                                      >
                                                        <LuDot
                                                          className="text-[30px]"
                                                          style={{
                                                            color:
                                                              selectedProductId ===
                                                              subChild.productId
                                                                ? "#2E437C"
                                                                : "#666666cc",
                                                          }}
                                                        />
                                                        <ListItemText
                                                          primary={
                                                            subChild.title
                                                          }
                                                          primaryTypographyProps={{
                                                            fontSize: "14px",
                                                            fontWeight: 500,
                                                            fontStyle: "normal",
                                                            color:
                                                              selectedProductId ===
                                                              subChild.productId
                                                                ? "#2E437C"
                                                                : "#666666cc",
                                                            marginLeft: "2px",
                                                            transition:
                                                              "color 0.2s ease-in-out",
                                                          }}
                                                        />
                                                      </ListItemButton>
                                                    </ListItem>
                                                  )
                                                )}
                                              </List>
                                            </AccordionDetails>
                                          </Accordion>
                                        ) : (
                                          <ListItem
                                            key={childIndex}
                                            disablePadding
                                          >
                                            <ListItemButton
                                              onClick={() =>
                                                handleProductItemClick(
                                                  child.title,
                                                  child.category,
                                                  child
                                                )
                                              }
                                              sx={{
                                                minHeight: "36px",
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                                transition:
                                                  "all 0.2s ease-in-out",
                                              }}
                                            >
                                              •
                                              <ListItemText
                                                primary={child.title}
                                                primaryTypographyProps={{
                                                  fontSize: "15px",
                                                  fontWeight: 500,
                                                  fontStyle: "normal",
                                                  color:
                                                    selectedProductId ===
                                                    child.productId
                                                      ? "#2E437C"
                                                      : "#4b5563",
                                                  marginLeft: "2px",
                                                  transition:
                                                    "color 0.2s ease-in-out",
                                                }}
                                              />
                                            </ListItemButton>
                                          </ListItem>
                                        )}
                                      </React.Fragment>
                                    )
                                  )}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className="hidden lg:block">
                      {categories.map((category, index) => (
                        <Accordion
                          key={category.id}
                          expanded={expandedPanel === `panel${index + 1}`}
                          onChange={handleAccordionChange(`panel${index + 1}`)}
                          sx={{
                            boxShadow: "none",
                            "&:before": { display: "none" },
                            marginBottom: "4px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <FaChevronDown className="text-gray-600" />
                            }
                            sx={{
                              minHeight: "48px",
                              padding: "0 8px",
                              borderRadius: "6px",
                              transition: "all 0.2s ease-in-out",
                            }}
                          >
                            <div className="flex items-center w-full">
                              <Typography
                                sx={{
                                  fontSize: "17px",
                                  fontWeight:
                                    expandedPanel === `panel${index + 1}` &&
                                    !selectedSubcategoryId &&
                                    !selectedProductId
                                      ? 600
                                      : 500,
                                  fontStyle: "normal",
                                  color:
                                    expandedPanel === `panel${index + 1}` &&
                                    !selectedSubcategoryId &&
                                    !selectedProductId
                                      ? "#2E437C"
                                      : "#000",
                                  transition: "color 0.2s ease-in-out",
                                  whiteSpace: "nowrap",
                                  marginRight: "12px",
                                }}
                              >
                                {category.title}
                              </Typography>
                              <div className="flex-1 border-[#2E437C] border-[1px] me-2 "></div>
                            </div>
                          </AccordionSummary>

                          <AccordionDetails sx={{ padding: "0 0 8px 16px" }}>
                            <List
                              dense
                              sx={{
                                marginLeft: "25px",
                              }}
                            >
                              {category.children.map((child, childIndex) => (
                                <React.Fragment key={childIndex}>
                                  {child.isSubCategory ? (
                                    <Accordion
                                      expanded={
                                        expandedSubPanel ===
                                        `subpanel${childIndex}`
                                      }
                                      onChange={handleSubAccordionChange(
                                        `subpanel${childIndex}`,
                                        child
                                      )}
                                      sx={{
                                        boxShadow: "none",
                                        "&:before": { display: "none" },
                                        backgroundColor: "transparent",
                                        margin: 0,
                                        "& .MuiAccordionSummary-root": {
                                          flexDirection: "row-reverse",
                                        },
                                      }}
                                    >
                                      <AccordionSummary
                                        expandIcon={
                                          <FaChevronDown className="text-gray-500 text-xs" />
                                        }
                                        sx={{
                                          minHeight: "36px",
                                          padding: "0 4px",
                                          borderRadius: "4px",
                                          transition: "all 0.2s ease-in-out",
                                        }}
                                      >
                                        <div className="flex items-center w-full">
                                          <Typography
                                            sx={{
                                              fontSize: "15px",
                                              fontWeight:
                                                selectedSubcategoryId ===
                                                  child.subcategoryId &&
                                                !selectedProductId
                                                  ? 600
                                                  : 400,
                                              fontStyle: "normal",
                                              color:
                                                selectedSubcategoryId ===
                                                  child.subcategoryId &&
                                                !selectedProductId
                                                  ? "#2E437C"
                                                  : "#666666cc",
                                              transition:
                                                "color 0.2s ease-in-out",
                                              whiteSpace: "nowrap",
                                              marginRight: "12px",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            {child.title}
                                          </Typography>
                                        </div>
                                      </AccordionSummary>

                                      <AccordionDetails
                                        sx={{ padding: "0 0 4px 12px" }}
                                      >
                                        <List dense>
                                          {child.subChildren.map(
                                            (subChild, subIndex) => (
                                              <ListItem
                                                key={subIndex}
                                                sx={{ marginLeft: "25px" }}
                                                disablePadding
                                              >
                                                <ListItemButton
                                                  onClick={() =>
                                                    handleProductItemClick(
                                                      subChild.title,
                                                      subChild.category,
                                                      subChild
                                                    )
                                                  }
                                                  sx={{
                                                    minHeight: "32px",
                                                    marginLeft: "20px",
                                                    borderRadius: "4px",
                                                    transition:
                                                      "all 0.2s ease-in-out",
                                                  }}
                                                >
                                                  <LuDot
                                                    className="text-[30px]"
                                                    style={{
                                                      color:
                                                        selectedProductId ===
                                                        subChild.productId
                                                          ? "#2E437C"
                                                          : "#666666cc",
                                                    }}
                                                  />
                                                  <ListItemText
                                                    primary={subChild.title}
                                                    primaryTypographyProps={{
                                                      fontSize: "13px",
                                                      fontWeight:
                                                        selectedProductId ===
                                                        subChild.productId
                                                          ? 600
                                                          : 400,
                                                      fontStyle: "normal",
                                                      color:
                                                        selectedProductId ===
                                                        subChild.productId
                                                          ? "#2E437C"
                                                          : "#666666cc",
                                                      marginLeft: "2px",
                                                      transition:
                                                        "color 0.2s ease-in-out",
                                                    }}
                                                  />
                                                </ListItemButton>
                                              </ListItem>
                                            )
                                          )}
                                        </List>
                                      </AccordionDetails>
                                    </Accordion>
                                  ) : (
                                    <ListItem key={childIndex} disablePadding>
                                      <ListItemButton
                                        onClick={() =>
                                          handleProductItemClick(
                                            child.title,
                                            child.category,
                                            child
                                          )
                                        }
                                        sx={{
                                          minHeight: "36px",
                                          borderRadius: "4px",
                                          transition: "all 0.2s ease-in-out",
                                        }}
                                      >
                                        <LuDot
                                          className="text-[30px]"
                                          style={{
                                            color:
                                              selectedProductId ===
                                              child.productId
                                                ? "#2E437C"
                                                : "#666666cc",
                                          }}
                                        />
                                        <ListItemText
                                          primary={child.title}
                                          primaryTypographyProps={{
                                            fontSize: "15px",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            color:
                                              selectedProductId ===
                                              child.productId
                                                ? "#2E437C"
                                                : "#666666cc",
                                            marginLeft: "2px",
                                            transition:
                                              "color 0.2s ease-in-out",
                                          }}
                                        />
                                      </ListItemButton>
                                    </ListItem>
                                  )}
                                </React.Fragment>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  ref={rightPanelRef}
                  className="w-full md:w-full lg:w-7/12 xl:w-8/12 custom-width2 max-h-[74vh] md:max-h-[87vh] overflow-auto  "
                >
                  <div className="flex items-center flex-wrap gap-2 text-sm">
                    {categoryName && subCategoryName && !selectedProduct && (
                      <>
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                              // "text-[#2E437C] font-semibold bg-blue-50"
                              "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              navigate(`/products?category=${cateId}`);
                              setSubCategoryName();
                            }}
                          >
                            {categoryName}
                          </span>

                          <HiChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                              // "text-[#2E437C] font-semibold bg-blue-50"
                              "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              navigate(
                                `/products?category=${cateId}&subcategory=${subCateId}`
                              );
                              setSubCategoryName();
                              setSelectedProduct([]);
                            }}
                          >
                            {subCategoryName}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {viewMode === "first" && (
                    <div className="flex items-center justify-around w-full h-[80vh]">
                      <CateComponent2 />
                    </div>
                  )}
                  {viewMode === "categories" && (
                    <div>
                      {subcategories.filter((item) => item.is_active !== false)
                        .length > 0 && (
                        <div className="mb-8">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                            <h2 className="text-xl font-semibold text-[#BABEC8]">
                              Subcategories
                            </h2>
                            <div className="hidden md:block flex-1 mx-6">
                              <div className="h-[6px] bg-[#BABEC8]"></div>
                            </div>
                          </div>

                          <SubcategoryCards
                            subcategories={subcategories}
                            onSubcategoryClick={handleSubcategoryCardClick}
                            loading={subcategoriesLoading}
                          />
                        </div>
                      )}

                      {directProducts.length > 0 && (
                        <div>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-3 gap-6 mb-8">
                            <h2 className="text-xl font-semibold text-[#BABEC8]">
                              Products
                            </h2>
                            <div className="hidden md:block flex-1 mx-6">
                              <div className="h-[6px] bg-[#BABEC8]"></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {directProducts.map((product, index) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: index * 0.1,
                                }}
                                onClick={() => {
                                  handleDirectProductClick(product);
                                  setSubCategoryName();
                                  setdetailsShowing(true);
                                }}
                                className="flex flex-col items-start cursor-pointer p-4"
                              >
                                <div className="aspect-[3/3] max-w-[100%] w-full overflow-hidden">
                                  <motion.img
                                    src={
                                      product.image &&
                                      product.image.startsWith("http")
                                        ? product.image
                                        : product.image &&
                                          product.image.includes("/")
                                        ? `${
                                            import.meta.env.VITE_BACKEND_URL
                                          }/${product.cover_image}`
                                        : productImage
                                    }
                                    alt={product.title}
                                    className="max-w-[100%] w-full h-full object-cover p-3"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                                <h2 className="text-[16px] font-[400] mt-3 text-gray-800">
                                  {product.title}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">
                                  {product.category}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {subcategories.length === 0 &&
                        directProducts.length === 0 &&
                        !subcategoriesLoading && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                          >
                            <div className="text-gray-400 mb-4">
                              <svg
                                className="w-16 h-16 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                              No content available
                            </h3>
                            <p className="text-gray-400">
                              This category doesn't have any subcategories or
                              products available
                            </p>
                          </motion.div>
                        )}
                    </div>
                  )}

                  {viewMode === "products" && (
                    <>
                      {productsLoading ? (
                        <div className="text-center py-20">
                          <CircularProgress
                            size={40}
                            sx={{ color: "#2E437C" }}
                          />
                          <p className="mt-4 text-gray-600">
                            Loading products...
                          </p>
                        </div>
                      ) : products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                          {products.map((product, index) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              onClick={() => handleProductClick(product)}
                              className="flex flex-col items-start text-center cursor-pointer"
                            >
                              <div className="aspect-[4/4] w-full overflow-hidden">
                                <motion.img
                                  src={
                                    product.image &&
                                    product.image.startsWith("http")
                                      ? product.image
                                      : product.image &&
                                        product.image.includes("/")
                                      ? `${import.meta.env.VITE_BACKEND_URL}/${
                                          product.cover_image
                                        }`
                                      : productImage
                                  }
                                  alt={product.title}
                                  className="w-full object-cover p-3  mb-4"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              <h2 className="text-[16px] font-[400] mt-3 text-gray-800">
                                {product.title}
                              </h2>
                              <p className="text-gray-500 text-sm mt-1">
                                {product.category}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-20"
                        >
                          <div className="text-gray-400 mb-4">
                            <svg
                              className="w-16 h-16 mx-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.653M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-600 mb-2">
                            {products.length === 0
                              ? "Select a subcategory to view products"
                              : "No products found"}
                          </h3>
                          <p className="text-gray-400">
                            {products.length === 0
                              ? "Choose a subcategory from the left to explore products"
                              : `No products available in ${selectedCategory}`}
                          </p>
                        </motion.div>
                      )}
                    </>
                  )}

                  {viewMode === "details" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {productDetailsLoading ? (
                        <div className="flex items-center justify-center py-20">
                          <CircularProgress
                            size={60}
                            sx={{ color: "#2E437C" }}
                          />
                          <p className="ml-4 text-gray-600">
                            Loading product details...
                          </p>
                        </div>
                      ) : (
                        <ProductDetails selectedProduct={selectedProduct} />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default ProductCom;
