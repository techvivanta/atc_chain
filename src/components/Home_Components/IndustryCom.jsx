import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaIndustry,
  FaWineBottle,
  FaFish,
  FaIceCream,
  FaShippingFast,
  FaSprayCan,
  FaCar,
  FaHospital,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import food1 from "../../assets/images/industries/food1.jpg";
import food2 from "../../assets/images/industries/food2.jpeg";
import water1 from "../../assets/images/industries/water1.jpeg";
import water2 from "../../assets/images/industries/water2.jpeg";
import juice1 from "../../assets/images/industries/juice1.jpeg";
import juice2 from "../../assets/images/industries/juice2.jpeg";
import tetra1 from "../../assets/images/industries/tetra1.jpeg";
import tetra2 from "../../assets/images/industries/tetra2.jpeg";
import beer1 from "../../assets/images/industries/beer1.jpeg";
import beer2 from "../../assets/images/industries/beer2.jpeg";
import softdrink1 from "../../assets/images/industries/softdrink1.jpeg";
import softdrink2 from "../../assets/images/industries/softdrink2.jpeg";
import seafood1 from "../../assets/images/industries/seafood1.jpeg";
import seafood2 from "../../assets/images/industries/seafood2.jpeg";
import meat1 from "../../assets/images/industries/meat1.jpeg";
import meat2 from "../../assets/images/industries/meat2.jpeg";
import poultry1 from "../../assets/images/industries/meat2.jpeg";
import milk from "../../assets/images/industries/milk.jfif";
import { CustomHeading } from "../common/CustomHeading";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbMeat } from "react-icons/tb";
import { IoFishSharp } from "react-icons/io5";
import seeFood1 from "../../assets/images/industries/seeFood1.jpg";
import seeFood2 from "../../assets/images/industries/seeFood2.jpg";
import seeFood3 from "../../assets/images/industries/seeFood3.jpg";
import seeFood4 from "../../assets/images/industries/seeFood4.jpg";

// const categoryContent = {
//   // Food Industry
//   "Fruit & Vegitables": {
//     title: "Fruit & Vegetables Solutions",
//     description:
//       "A fruits and vegetable modular conveyor belt is a type of conveyor system that is designed specifically for handling fruits and vegetables in a production or processing facility. This type of conveyor system is typically made up of modular plastic belts that are designed to be easily replaced, cleaned, and sanitized to meet the strict hygiene standards required in the food industry. The design of a fruits and vegetable modular conveyor belt is optimized for the handling of delicate produce, such as fruits and vegetables, without causing damage to the product. The conveyor system is typically equipped with features such as adjustable speed controls and gentle transfer mechanisms to ensure that the produce is transported smoothly and safely through the production or processing line. In addition to being designed for the handling of delicate produce, a fruits and vegetable modular conveyor belt is also typically designed to be easily disassembled and cleaned to meet strict food safety requirements. This is important because any contaminants or bacteria that may be present on the conveyor belt can easily transfer to the produce, which can have serious health implications for consumers. Overall, a fruits and vegetable modular conveyor belt is an important component of a modern food production or processing facility, and can help ensure that fruits and vegetables are handled safely and efficiently throughout the production process.",
//     images: [food1, food2],
//   },

//   Water: {
//     title: "Water Bottling Solutions",
//     description:
//       "SS chain (stainless steel chain), plastic chain, modular belts, and components are commonly used in water bottling lines for various purposes. These materials and components play important roles in conveying, transferring, and processing bottles throughout the bottling process.",
//     images: [water1, water2],
//   },

//   Juice: {
//     title: "Juice Production Lines",
//     description:
//       "In a juice production line, you can utilize conveyors made of stainless steel (SS), plastic chain, and modular belt, along with various components tailored to the specific needs of the process. Modular belt, SS chains, Plastic and flex chains are commonly use in In-feed Conveyors, Fruit Washing Conveyors, Sorting Conveyors, Juice Extraction Conveyors, Bottle or Container Conveyors, Packaging Conveyors, Inspection Conveyors, Transfer Conveyors. Stainless steel conveyors are commonly used for conveying fruits through washing and sorting stages. They are resistant to moisture, chemicals, and are easy to clean, making them suitable for maintaining hygiene during the washing process. Plastic chain conveyors can also be employed, providing gentle and efficient transportation of delicate fruits.For the bottling and packaging of juice, conveyors with modular belts or plastic chains are commonly used. These conveyors transport empty bottles or containers through filling, capping, labeling, and packaging stations. Modular belts provide a stable surface for smooth and efficient movement, while plastic chain conveyors offer flexibility and ease of cleaning. Conveyors with modular belts or plastic chains are used for visual inspection and quality control of filled and packaged juice products. These conveyors facilitate the movement of bottles or containers, allowing inspectors to examine them for any defects or inconsistencies.",
//     images: [juice1, juice2],
//   },

//   "Tetra Pack": {
//     title: "Tetra Pack Handling",
//     description:
//       "Tetra Pack production typically involves the use of finger chains, slat chains, and various conveyor components to transport the cartons throughout the production line.Finger chains are commonly used in the Tetra Pack production process to transport the cartons from one stage to another. They are designed to securely hold the cartons in place and prevent them from falling or tilting during the conveying process.Modular belts are a versatile option for conveying cartons in the Tetra Pack production process. They can be easily customized to fit different conveyor configurations and offer low maintenance and easy cleaning, making them ideal for use in food and beverage applications. Other conveyor components commonly used in the Tetra Pack production process include bearings, sprockets, wear strips, and guides, all of which play a crucial role in ensuring the efficient and effective operation of the conveyor system.",
//     images: [tetra1, tetra2],
//   },

//   "Beer Line": {
//     title: "Brewery Conveying Systems",
//     description:
//       "Beer manufacturing processes often utilize conveyors for various stages of production, including bottling, canning, labeling, packaging, and transportation. Both stainless steel (SS) conveyors and conveyors with plastic chains or modular belts are commonly employed in the beer industry. Stainless steel is a popular choice for conveying systems in the beer manufacturing industry due to its durability, corrosion resistance, and ease of cleaning. Plastic chain conveyors are another type of conveyor system widely used in the beer industry. These conveyors consist of interlocking plastic chains that move products along the production line. Plastic chains offer advantages such as being lightweight, flexible, and easy to clean. Both plastic chain conveyors and modular belt conveyors are well-suited for beer manufacturing processes as they are resistant to moisture, corrosion, and chemical exposure. The choice between the two will depend on factors such as the specific application, the type of product being transported, and the desired level of hygiene and product protection. It's worth noting that conveyor systems in the beer industry often require additional features and components to ensure product integrity and maintain hygiene standards. These may include side guides, drip pans, sanitary design principles, and proper cleaning procedures to prevent contamination and maintain the quality of the beer throughout the production process.",
//     images: [beer1, beer2],
//   },

//   "Carbonated Soft Drinks": {
//     title: "Carbonated Beverage Lines",
//     description:
//       "The manufacturing process of carbonated soft drinks often involves the use of SS (stainless steel) slat chains, plastic chains, and various conveyor parts to transport the bottles or cans throughout the production line.Other conveyor parts commonly used in the manufacturing process of carbonated soft drinks include bearings, sprockets, wear strips, and guides, all of which play a crucial role in ensuring the efficient and effective operation of the conveyor system.",
//     images: [softdrink1, softdrink2],
//   },

//   // Meat & Seafood Industry
//   Seafood: {
//     title: "Seafood Handling Solutions",
//     description:
//       "Efficient and hygienic conveyor systems for seafood processing and packaging.",
//     images: [seafood1, seafood2],
//   },

//   Meat: {
//     title: "Meat Processing Solutions",
//     description:
//       "Safe and sanitary conveyor systems for meat processing facilities.",
//     images: [meat1, meat2],
//   },

//   Poultry: {
//     title: "Poultry Handling Solutions",
//     description:
//       "Specialized conveyors for handling poultry products with hygiene compliance.",
//     images: [poultry1],
//   },

//   // Dairy Industry
//   Chocolate: {
//     title: "Chocolate Production Solutions",
//     description: "Conveyors for chocolate processing ensuring product quality.",
//     images: [
//       "https://images.unsplash.com/photo-1580927752450-b5f0a35b0a2d?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "Milk & Milk Products": {
//     title: "Milk Processing Solutions",
//     description:
//       "Modular belts and plastic chains are commonly used in the food and beverage industry, including milk and milk product filling, labeling, and packaging applications. Modular belts are made up of interlocking plastic modules that can be easily replaced if damaged, allowing for quick maintenance and reducing downtime. They are often used in conveyor systems for transporting milk and other liquid products, as they are easy to clean and can withstand exposure to moisture. Plastic chains, on the other hand, are composed of interlocking plastic links and are ideal for applications that require high-strength and durability. They are often used in packaging and labeling machines to transport and position containers of milk and milk products during the filling and packaging process. Both modular belts and plastic chains are popular choices for the food and beverage industry because they are made from food-grade materials that are safe for contact with consumable products. They are also resistant to corrosion and are easy to clean, making them an ideal choice for environments where hygiene is critical.",
//     images: [milk],
//   },

//   Yogurt: {
//     title: "Yogurt Production Lines",
//     description: "Sanitary conveyor solutions for yogurt production.",
//     images: [
//       "https://images.unsplash.com/photo-1587398290463-90b95b56e1b1?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   Cheese: {
//     title: "Cheese Handling Systems",
//     description: "Specialized conveyors for cheese processing and packaging.",
//     images: [
//       "https://images.unsplash.com/photo-1596614770116-0ff91d8e234d?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "Shrink Wrapping": {
//     title: "Shrink Wrapping Solutions",
//     description:
//       "Conveyors for automated shrink wrapping in logistics and packaging.",
//     images: [
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "Material Handling": {
//     title: "Material Handling Solutions",
//     description:
//       "Efficient conveyors for moving materials across production lines.",
//     images: [
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "Packaging Belting Solution": {
//     title: "Packaging Belting Solutions",
//     description:
//       "Conveyor belts optimized for packaging applications and labeling.",
//     images: [
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "E-commerce": {
//     title: "E-commerce Logistics Solutions",
//     description: "Conveyors for efficient handling of e-commerce products.",
//     images: [
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   Distribution: {
//     title: "Distribution Solutions",
//     description: "Conveyors for product distribution and warehouse automation.",
//     images: [
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   // Cosmetic & Pharmaceutical
//   "No Category": {
//     title: "Cosmetic & Pharmaceutical Conveyors",
//     description:
//       "Conveyors for cosmetic and pharmaceutical industries ensuring sterile handling.",
//     images: [
//       "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg",
//     ],
//   },

//   // Automobile
//   Assembly: {
//     title: "Assembly Line Conveyors",
//     description: "Conveyors for automobile assembly lines.",
//     images: [
//       "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "Parts Manufacturing": {
//     title: "Parts Manufacturing Conveyors",
//     description: "Conveyors for efficient parts manufacturing.",
//     images: [
//       "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   Painting: {
//     title: "Painting Line Conveyors",
//     description: "Specialized conveyors for painting operations.",
//     images: [
//       "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   "Quality Control": {
//     title: "Quality Control Conveyors",
//     description: "Conveyors for QC processes in automobile production.",
//     images: [
//       "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
//     ],
//   },

//   // Healthcare
//   "Seafood Processing": {
//     title: "Seafood Processing Conveyors",
//     description:
//       "Seafood processing conveyors are designed for durability, hygiene, and product safety. Built with stainless steel and modular plastic belts, they efficiently move fish, shrimp, and shellfish through cutting, washing, inspection, and packaging lines. Their open-grid structure and easy-clean design prevent bacterial buildup, ensuring compliance with food-safety standards such as HACCP and FDA.",
//     images: [seeFood1, seeFood4],
//   },

//   "Frozen Handling": {
//     title: "Frozen Seafood Handling Systems",
//     description:
//       "Frozen seafood conveyors are engineered to maintain product integrity under sub-zero temperatures. Using anti-corrosive materials and low-friction modular belts, they ensure smooth movement of frozen fish and crustaceans during glazing, freezing, and packaging. The systems are energy-efficient, easy to sanitize, and minimize ice accumulation, reducing maintenance downtime.",
//     images: [seeFood2, seeFood3],
//   },
// };

const categoryContent = {
  // Food Industry
  "Fruit & Vegitables": {
    title: "Fruit & Vegetables Solutions",
    description:
      "A fruits and vegetable modular conveyor belt is a type of conveyor system that is designed specifically for handling fruits and vegetables in a production or processing facility. This type of conveyor system is typically made up of modular plastic belts that are designed to be easily replaced, cleaned, and sanitized to meet the strict hygiene standards required in the food industry. The design of a fruits and vegetable modular conveyor belt is optimized for the handling of delicate produce, such as fruits and vegetables, without causing damage to the product. The conveyor system is typically equipped with features such as adjustable speed controls and gentle transfer mechanisms to ensure that the produce is transported smoothly and safely through the production or processing line. In addition to being designed for the handling of delicate produce, a fruits and vegetable modular conveyor belt is also typically designed to be easily disassembled and cleaned to meet strict food safety requirements. This is important because any contaminants or bacteria that may be present on the conveyor belt can easily transfer to the produce, which can have serious health implications for consumers. Overall, a fruits and vegetable modular conveyor belt is an important component of a modern food production or processing facility, and can help ensure that fruits and vegetables are handled safely and efficiently throughout the production process.",
    images: [food1, food2],
  },

  Water: {
    title: "Water Bottling Solutions",
    description:
      "SS chain (stainless steel chain), plastic chain, modular belts, and components are commonly used in water bottling lines for various purposes. These materials and components play important roles in conveying, transferring, and processing bottles throughout the bottling process.",
    images: [water1, water2],
  },

  Juice: {
    title: "Juice Production Lines",
    description:
      "In a juice production line, you can utilize conveyors made of stainless steel (SS), plastic chain, and modular belt, along with various components tailored to the specific needs of the process. Modular belt, SS chains, Plastic and flex chains are commonly use in In-feed Conveyors, Fruit Washing Conveyors, Sorting Conveyors, Juice Extraction Conveyors, Bottle or Container Conveyors, Packaging Conveyors, Inspection Conveyors, Transfer Conveyors. Stainless steel conveyors are commonly used for conveying fruits through washing and sorting stages. They are resistant to moisture, chemicals, and are easy to clean, making them suitable for maintaining hygiene during the washing process. Plastic chain conveyors can also be employed, providing gentle and efficient transportation of delicate fruits.For the bottling and packaging of juice, conveyors with modular belts or plastic chains are commonly used. These conveyors transport empty bottles or containers through filling, capping, labeling, and packaging stations. Modular belts provide a stable surface for smooth and efficient movement, while plastic chain conveyors offer flexibility and ease of cleaning. Conveyors with modular belts or plastic chains are used for visual inspection and quality control of filled and packaged juice products. These conveyors facilitate the movement of bottles or containers, allowing inspectors to examine them for any defects or inconsistencies.",
    images: [juice1, juice2],
  },

  "Tetra Pack": {
    title: "Tetra Pack Handling",
    description:
      "Tetra Pack production typically involves the use of finger chains, slat chains, and various conveyor components to transport the cartons throughout the production line.Finger chains are commonly used in the Tetra Pack production process to transport the cartons from one stage to another. They are designed to securely hold the cartons in place and prevent them from falling or tilting during the conveying process.Modular belts are a versatile option for conveying cartons in the Tetra Pack production process. They can be easily customized to fit different conveyor configurations and offer low maintenance and easy cleaning, making them ideal for use in food and beverage applications. Other conveyor components commonly used in the Tetra Pack production process include bearings, sprockets, wear strips, and guides, all of which play a crucial role in ensuring the efficient and effective operation of the conveyor system.",
    images: [tetra1, tetra2],
  },

  "Beer Line": {
    title: "Brewery Conveying Systems",
    description:
      "Beer manufacturing processes often utilize conveyors for various stages of production, including bottling, canning, labeling, packaging, and transportation. Both stainless steel (SS) conveyors and conveyors with plastic chains or modular belts are commonly employed in the beer industry. Stainless steel is a popular choice for conveying systems in the beer manufacturing industry due to its durability, corrosion resistance, and ease of cleaning. Plastic chain conveyors are another type of conveyor system widely used in the beer industry. These conveyors consist of interlocking plastic chains that move products along the production line. Plastic chains offer advantages such as being lightweight, flexible, and easy to clean. Both plastic chain conveyors and modular belt conveyors are well-suited for beer manufacturing processes as they are resistant to moisture, corrosion, and chemical exposure. The choice between the two will depend on factors such as the specific application, the type of product being transported, and the desired level of hygiene and product protection. It's worth noting that conveyor systems in the beer industry often require additional features and components to ensure product integrity and maintain hygiene standards. These may include side guides, drip pans, sanitary design principles, and proper cleaning procedures to prevent contamination and maintain the quality of the beer throughout the production process.",
    images: [beer1, beer2],
  },

  "Carbonated Soft Drinks": {
    title: "Carbonated Beverage Lines",
    description:
      "The manufacturing process of carbonated soft drinks often involves the use of SS (stainless steel) slat chains, plastic chains, and various conveyor parts to transport the bottles or cans throughout the production line.Other conveyor parts commonly used in the manufacturing process of carbonated soft drinks include bearings, sprockets, wear strips, and guides, all of which play a crucial role in ensuring the efficient and effective operation of the conveyor system.",
    images: [softdrink1, softdrink2],
  },

  // Meat & Seafood Industry
  Seafood: {
    title: "Seafood Handling Solutions",
    description:
      "Efficient and hygienic conveyor systems for seafood processing and packaging.",
    images: [seafood1, seafood2],
  },

  Meat: {
    title: "Meat Processing Solutions",
    description:
      "Safe and sanitary conveyor systems for meat processing facilities.",
    images: [meat1, meat2],
  },

  Poultry: {
    title: "Poultry Handling Solutions",
    description:
      "Specialized conveyors for handling poultry products with hygiene compliance.",
    images: [poultry1],
  },

  // Dairy Industry
  Chocolate: {
    title: "Chocolate Production Solutions",
    description:
      "Our chocolate conveyor systems are engineered for precision and temperature control during every stage of chocolate production — from molding and cooling to coating and packaging. Built with food-grade materials, these conveyors ensure smooth product transfer without contamination, maintaining texture, gloss, and quality consistency. Optional cooling tunnels, enrobing lines, and custom belt designs help optimize efficiency in modern confectionery manufacturing plants.",
    images: [
      "https://elitevisionbelting.com/assets/images/product/chocolate%2001-min.jpg",
      "https://www.tayanasolutions.com/wp-content/uploads/2022/04/chocolate-manufacturing-1.jpg",
    ],
  },

  "Milk & Milk Products": {
    title: "Milk Processing Solutions",
    description:
      "Our modular belt and plastic chain conveyors are specifically designed for dairy operations involving milk processing, filling, and packaging. Made from high-grade, hygienic materials, they support easy cleaning and moisture resistance, crucial for maintaining product safety and compliance with food standards. Whether for transporting bottles, pouches, or cartons, these conveyors ensure steady flow, reduced downtime, and seamless integration with filling and labeling machines. Their corrosion-resistant construction makes them a durable, efficient choice for milk, butter, cream, and other dairy products.",
    images: [milk],
  },

  Yogurt: {
    title: "Yogurt Production Lines",
    description:
      "Our sanitary conveyor systems for yogurt production maintain hygienic conditions throughout fermentation, filling, and packaging processes. Designed with stainless steel frames and food-grade belts, they prevent bacterial buildup and allow easy washdowns. With precise motion control, these conveyors handle cups, bottles, and tubs efficiently — reducing spillage and ensuring consistent throughput. Perfect for high-speed yogurt lines focused on safety and shelf-life quality.",
    images: [
      "https://img.freepik.com/premium-photo/dairy-factory-with-conveyor-belt-filled-with-yogurt_899870-20707.jpg",
    ],
  },

  Cheese: {
    title: "Cheese Handling Systems",
    description:
      "Engineered for gentle yet efficient cheese processing, our conveyor systems support cutting, curing, coating, and packaging applications. Built with stainless steel and modular plastic belts, they ensure product hygiene and prevent sticking or deformation. Adjustable configurations allow smooth transfer of cheese blocks, slices, and grated products, reducing manual handling and enhancing productivity. Ideal for both artisanal and industrial-scale cheese operations requiring precision and hygiene.",
    images: [
      "https://conveyorsolutionsindia.com/static/media/1.702f4a76.jpg",
      "https://assets-us-01.kc-usercontent.com/19eb64b5-1815-003a-d268-e7109927ccad/534e77b0-501c-43d6-9af7-2546094a9d7d/2022-06-22_11-54-08.png?w=568&h=298.2&rect=0,35,1910,1003&fit=&q=85&auto=format",
    ],
  },

  "Shrink Wrapping": {
    title: "Shrink Wrapping Solutions",
    description:
      "Our shrink wrapping conveyor systems are designed for high-speed, automated packaging lines. They provide precise film application, consistent heat distribution, and smooth material flow — ensuring tightly sealed, durable packages for products across food, pharmaceutical, and consumer goods industries.",
    images: [
      "https://www.shutterstock.com/image-photo/recyclable-cardboard-box-being-transported-600nw-2436656401.jpg",
      "https://images.stockcake.com/public/8/3/7/8372d38f-d275-41d5-8628-cfedfd6823a9_large/conveyor-belt-package-stockcake.jpg",
    ],
  },

  "Material Handling": {
    title: "Material Handling Solutions",
    description:
      "Efficient, durable conveyor systems engineered for seamless material movement between production stages. Our modular designs support bulk goods, components, and finished products — improving workflow efficiency, reducing manual handling, and enhancing plant safety in manufacturing and logistics operations.",
    images: [
      "https://rebstorage.com/wp-content/uploads/2022/12/REB-011-scaled.jpg",
    ],
  },

  "Packaging Belting Solution": {
    title: "Packaging Belting Solutions",
    description:
      "Optimized conveyor belts built for high-speed packaging, labeling, and sorting. With precision motion control and hygienic materials, our belting systems enhance packaging line performance while minimizing maintenance — ideal for food, beverage, and FMCG industries.",
    images: [
      "https://assets-us-01.kc-usercontent.com/19eb64b5-1815-003a-d268-e7109927ccad/ff92da15-e856-4b2c-8105-3420da8a8035/packaging-solutions-40_21.jpg?w=750&h=421.875&rect=80,0,2240,1260&fit=&q=85&auto=format",
    ],
  },

  // Cosmetic & Pharmaceutical
  Cosmetic: {
    name: "Filling & Packaging Conveyors",
    description:
      "High-speed, stainless steel conveyor systems designed for hygienic transport of bottles, jars, and tubes during the filling and packaging process — ensuring smooth, contamination-free production lines for cosmetic and personal care products.",
    images: ["https://www.conveyors247.com/hubfs/dreamstime_xl_28892650.jpg"],
  },

  // Automobile (Updated)
  Assembly: {
    title: "Automobile Assembly Line Conveyors",
    description:
      "Automobile assembly line conveyors are the backbone of modern vehicle manufacturing. These systems enable seamless integration of car components — from chassis construction to body fitting and final inspection. Designed for heavy-duty performance, our modular and slat chain conveyors ensure continuous, efficient movement of vehicles through every production phase, minimizing downtime and enhancing productivity.",
    images: [
      "https://cdn.skoda-storyboard.com/2019/06/cars-skoda-manufacturing-factory.JPG-1440x960.jpg",
    ],
  },

  "Parts Manufacturing": {
    title: "Automotive Parts Manufacturing Conveyors",
    description:
      "Precision and speed are vital in parts manufacturing. Our conveyor systems are engineered to handle metal and plastic automotive parts efficiently across machining, welding, and sub-assembly stations. They reduce manual handling, increase throughput, and maintain high quality across all production environments.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHJZfUQJhw_EI2HidPYRcxoGUMfq624bslJQ&s",
      "https://i.ytimg.com/vi/orneOQXr0B0/maxresdefault.jpg",
    ],
  },

  Painting: {
    title: "Automotive Painting Line Conveyors",
    description:
      "Our painting line conveyors are designed to handle vehicles and components in paint shops with superior precision. Featuring anti-corrosive materials and smooth operation, they ensure even coating and reduce contamination risks. The design allows easy cleaning and maintenance, supporting a spotless painting environment.",
    images: [
      "https://www.shutterstock.com/image-photo/car-bodies-on-assembly-line-260nw-2136777759.jpg",
      "https://img.freepik.com/premium-photo/car-factory-assembly-line-land-vehicle-production-conveyor-belt-aig41_31965-323415.jpg",
    ],
  },

  "Quality Control": {
    title: "Automotive Quality Control Conveyors",
    description:
      "Quality control conveyors are equipped with precision motion and integration options for inspection systems. These conveyors ensure vehicles and parts move steadily through testing zones — enabling sensor checks, visual inspection, and automated QA processes. Built for consistency, they help maintain strict industry standards and zero-defect outcomes.",
    images: [
      "https://www.shutterstock.com/image-illustration/automation-automobile-factory-concept-3d-600nw-2252817305.jpg",
    ],
  },

  // Seafood Industry (Separate section)
  "Seafood Processing": {
    title: "Seafood Processing Conveyors",
    description:
      "Seafood processing conveyors are designed for durability, hygiene, and product safety. Built with stainless steel and modular plastic belts, they efficiently move fish, shrimp, and shellfish through cutting, washing, inspection, and packaging lines. Their open-grid structure and easy-clean design prevent bacterial buildup, ensuring compliance with food-safety standards such as HACCP and FDA.",
    images: [seeFood1, seeFood4],
  },

  "Frozen Handling": {
    title: "Frozen Seafood Handling Systems",
    description:
      "Frozen seafood conveyors are engineered to maintain product integrity under sub-zero temperatures. Using anti-corrosive materials and low-friction modular belts, they ensure smooth movement of frozen fish and crustaceans during glazing, freezing, and packaging. The systems are energy-efficient, easy to sanitize, and minimize ice accumulation, reducing maintenance downtime.",
    images: [seeFood2, seeFood3],
  },
};

const industries = [
  {
    id: 1,
    title: "Food Industry",
    description:
      "A food industry modular conveyor belt is a type of conveyor system that is commonly used in the food processing and manufacturing industry. It consists of individual interlocking plastic modules that.",
    image: food1,
    icon: <IoFastFoodOutline size={26} />,
    SColor: "#2E437C",
    EColor: "#0E1A4C",
    targetRotation: 0,
    mobileTargetRotation: -120,
    categories: ["Fruit & Vegitables"],
  },
  {
    id: 2,
    title: "Beverage Industry",
    description:
      "Beverage conveyors are designed to handle bottles, cans, and other containers with precision and care, ensuring efficient production lines.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    icon: <FaWineBottle size={26} />,
    SColor: "#E74623",
    EColor: "#8B1C00",
    targetRotation: -45,
    mobileTargetRotation: -165,
    categories: [
      "Water",
      "Juice",
      "Tetra Pack",
      "Beer Line",
      "Carbonated Soft Drinks",
    ],
  },
  {
    id: 3,
    title: "Meat & Seafood Industry",
    description:
      "Specialized conveyors for meat and seafood processing ensure hygiene standards while handling raw and processed products.",
    image:
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=1200&q=80",
    icon: <TbMeat size={26} />,
    SColor: "#F39314",
    EColor: "#8C3E00",
    targetRotation: -90,
    mobileTargetRotation: -210,
    categories: ["Seafood", "Meat", "Poultry"],
  },
  {
    id: 4,
    title: "Dairy Industry",
    description:
      "Dairy conveyors are designed to handle milk products with strict hygiene standards and temperature controls.",
    image:
      "https://images.unsplash.com/photo-1566772940193-9c3ae2938d78?auto=format&fit=crop&w=1200&q=80",
    icon: <FaIceCream size={26} />,
    SColor: "#F4D601",
    EColor: "#FFB100",
    targetRotation: -135,
    mobileTargetRotation: -255,
    categories: ["Chocolate", "Milk & Milk Products", "Yogurt", "Cheese"],
  },
  {
    id: 5,
    title: "Packaging & Logistics",
    description:
      "Packaging and logistics conveyors automate the movement of products through filling, sealing, labeling, and distribution processes.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    icon: <FaShippingFast size={26} />,
    SColor: "#2E437C",
    EColor: "#0E1A4C",
    targetRotation: -180,
    mobileTargetRotation: -300,
    categories: [
      "Shrink Wrapping",
      "Material Handling",
      "Packaging Belting Solution",
    ],
  },
  {
    id: 6,
    title: "Cosmetic and Pharmaceutical",
    description:
      "Conveyors for cosmetic and pharmaceutical industries ensure sterile handling of products with compliance to health standards.",
    image:
      "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg",
    icon: <FaSprayCan size={26} />,
    SColor: "#E74623",
    EColor: "#8B1C00",
    targetRotation: -225,
    mobileTargetRotation: -345,
    categories: ["Cosmetic"],
  },
  {
    id: 7,
    title: "Automobile",
    description:
      "Conveyors in automobile industry are used for assembly lines, efficient movement of parts, and automation of processes.",
    image:
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    icon: <FaCar size={26} />,
    SColor: "#F39314",
    EColor: "#8C3E00",
    targetRotation: -270,
    mobileTargetRotation: -35,
    categories: [
      "Assembly",
      "Parts Manufacturing",
      "Painting",
      "Quality Control",
    ],
  },
  {
    id: 8,
    title: "Seafood Industry",
    description:
      "Seafood processing requires conveyor systems that ensure hygiene, precision, and efficiency throughout the handling, cleaning, and packaging stages. Our modular conveyor solutions are designed to handle delicate seafood products safely while meeting strict food-grade standards.",
    image:
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=1200&q=80",
    icon: <IoFishSharp size={26} />,
    SColor: "#F4D601",
    EColor: "#FFB100",
    targetRotation: -315,
    mobileTargetRotation: -80,
    categories: ["Seafood Processing", "Frozen Handling"],
  },
];

export default function IndustryCom() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const [activeCategory, setActiveCategory] = useState(
    industries[0].categories?.[0] || null
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [rotation, setRotation] = useState(-20);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setRotation(-120);
      } else {
        setRotation(0);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleButtonClick = (industry) => {
    setActiveIndustry(industry);
    setActiveCategory(industry.categories?.[0] || null);

    const currentRotation = rotation % 360;
    let targetRotation = industry.targetRotation;

    if (isMobile) {
      targetRotation = industry.mobileTargetRotation;
    }

    const normalizedCurrent = ((currentRotation % 360) + 360) % 360;
    const normalizedTarget = ((targetRotation % 360) + 360) % 360;

    let diff = normalizedTarget - normalizedCurrent;

    if (diff > 180) {
      diff -= 360;
    } else if (diff < -180) {
      diff += 360;
    }

    setRotation(rotation + diff);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleReadMore = (industryId, category) => {
    const key = category ? `${industryId}-${category}` : industryId;
    setExpandedDescriptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getConicGradient = () => {
    const segmentAngle = 360 / industries.length;
    const gapAngle = 5;

    let gradientString = "";

    industries.forEach((industry, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle - gapAngle;
      const { SColor, EColor } = industry;

      // Smooth blend from SColor → EColor per segment
      gradientString += `
      ${SColor} ${startAngle}deg, 
      ${EColor} ${endAngle}deg, 
      transparent ${endAngle}deg ${endAngle + gapAngle}deg, 
    `;
    });

    // Remove trailing comma and return the stops only
    return gradientString.trim().replace(/,$/, "");
  };

  const getCategoryContent = () => {
    return (
      categoryContent[activeCategory] || {
        title: `${activeIndustry.title} - ${activeCategory}`,
        description: activeIndustry.description,
        image: activeIndustry.image,
      }
    );
  };

  const categoryData = getCategoryContent();
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

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  const whatsappRef = useRef(null);

  useEffect(() => {
    const forceWhatsAppPosition = () => {
      if (whatsappRef.current) {
        const element = whatsappRef.current;
        element.style.setProperty("transform", "none", "important");
        element.style.setProperty("transform-origin", "initial", "important");
      }
    };

    // Force positioning immediately
    forceWhatsAppPosition();

    // Force positioning on scroll and resize
    const handleScroll = () => forceWhatsAppPosition();
    const handleResize = () => forceWhatsAppPosition();

    // Force positioning periodically
    const interval = setInterval(forceWhatsAppPosition, 500);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={whatsappRef}
      className=" mx-auto w-full py-10 lg:pr-16 lg:pl-0 xl:pr-20 xl:pl-0  sm:py-20"
    >
      {/* Heading */}
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className=" ps-4 lg:ps-25 text-[28px] sm:text-[36px] md:text-[56px] lg:text-[72px] xl:text-[92px] font-[500] md:font-[400] text-[#BABEC8] mb-10 text-left leading-[1.15] md:leading-[1.05] xl:leading-[0.95] "
      >
        <span className="block">
          <CustomHeading
            as="span"
            title="Conveyor Solutions"
            className=""
            headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
          />
        </span>
        <span className="block">
          <CustomHeading
            as="span"
            title="for Diverse Industries"
            className=""
            headingClassName="flex flex-wrap gap-x-0.5 md:gap-x-2 gap-y-0"
            delay={0.12}
          />
        </span>
      </motion.h2>

      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Chart Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-5 relative flex justify-center lg:justify-start items-center overflow-hidden order-2 lg:order-1">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
              rotate: isMobile ? -170 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: isMobile ? -170 : -20,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{
              width: isMobile ? "320px" : "600px",
              height: isMobile ? "320px" : "600px",
              marginLeft: isMobile ? "0px" : "-250px",
              marginTop: isMobile ? "-180px" : "0",
            }}
          >
            <motion.div
              initial={{ rotate: isMobile ? -170 : -20 }}
              animate={{ rotate: rotation }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="absolute w-full h-full rounded-full"
            >
              <div
                className="absolute inset-0 rounded-full cursor-pointer"
                style={{
                  background: `conic-gradient(${getConicGradient()})`,
                  // filter: "grayscale(15%)",
                }}
              ></div>

              <div
                className="absolute bg-white rounded-full z-10 flex items-center justify-center"
                style={{
                  inset: isMobile ? "80px" : "150px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              ></div>

              {industries.map((industry, index) => {
                const segmentAngle = 360 / industries.length;
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                const midAngle = startAngle + segmentAngle / 2;
                const radian = (midAngle * Math.PI) / 180;
                const radius = isMobile ? 120 : 220;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);

                const isActive = industry.id === activeIndustry.id;
                const iconTextSize = isActive
                  ? isMobile
                    ? "text-[10px]"
                    : "text-xs"
                  : isMobile
                  ? "text-[8px]"
                  : "text-xs";
                const centerPoint = isMobile ? 200 : 300;
                const pathRadius = isMobile ? 200 : 300;

                return (
                  <div key={industry.id}>
                    <div
                      onClick={() => handleButtonClick(industry)}
                      className="absolute inset-0 rounded-full cursor-pointer"
                      style={{
                        clipPath: `path('M${centerPoint},${centerPoint} L${
                          centerPoint +
                          pathRadius * Math.cos((startAngle * Math.PI) / 180)
                        },${
                          centerPoint +
                          pathRadius * Math.sin((startAngle * Math.PI) / 180)
                        } A${pathRadius},${pathRadius} 0 0,1 ${
                          centerPoint +
                          pathRadius * Math.cos((endAngle * Math.PI) / 180)
                        },${
                          centerPoint +
                          pathRadius * Math.sin((endAngle * Math.PI) / 180)
                        } Z')`,
                        zIndex: 15,
                        // border: isActive
                        //   ? "2px solid #fff"
                        //   : "2px solid transparent",
                        // filter: isActive
                        //   ? "drop-shadow(0 0 15px rgba(255,255,255,0.6))"
                        //   : "none",
                        // transition: "all 0.3s ease",
                      }}
                    ></div>

                    <motion.div
                      initial={{ rotate: isMobile ? 170 : 20 }}
                      animate={{ rotate: -rotation + (isMobile ? 170 : 20) }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className={`absolute z-20 flex flex-col items-center justify-center ${
                        isMobile ? "w-12 h-12" : "w-16 h-16"
                      }`}
                      style={{
                        left: `calc(50% + ${x}px - ${
                          isMobile ? "1.5rem" : "2rem"
                        })`,
                        top: `calc(50% + ${y}px - ${
                          isMobile ? "1.5rem" : "2rem"
                        })`,
                        color: "white",
                        borderColor: "white",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        className={
                          isMobile
                            ? "text-lg text-[#f1f1f1]"
                            : "text-xl text-[#f1f1f1]"
                        }
                      >
                        {/* {React.cloneElement(industry.icon, {
                          size: isMobile ? 23 : 26,
                        })} */}
                        {React.cloneElement(industry.icon, {
                          size: isActive
                            ? isMobile
                              ? 30
                              : 50
                            : isMobile
                            ? 23
                            : 26,
                        })}
                      </span>
                      <span
                        className={`${iconTextSize} mt-1 font-medium text-center text-[#f1f1f1] leading-tight ${
                          isActive ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {industry.title.split(" ")[0]}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-7 order-1 lg:order-2">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full px-4 sm:px-6 lg:px-0 order-1 lg:order-2"
          >
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activeIndustry.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeIndustry.categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={{
                        backgroundColor:
                          activeCategory === category ? "#2E437C" : "",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image Slider */}
            <div className="relative overflow-hidden w-[100%] mx-auto">
              {categoryData?.images?.length > 0 ? (
                <div className="w-full aspect-[6/3] overflow-hidden bg-gray-100">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    slidesPerView={1}
                    className="w-full h-full"
                  >
                    {categoryData.images.map((img, idx) => (
                      <SwiperSlide key={idx} className="w-full h-full">
                        <img
                          src={img}
                          alt={`${categoryData.title} ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={activeIndustry.image}
                    alt={activeIndustry.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/70 to-transparent">
                <h3 className="text-lg lg:text-xl font-semibold text-white">
                  {categoryData.title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Title and Description */}
            <h3 className="mt-4 text-2xl lg:text-[36px] font-[500] text-gray-800">
              Solutions for{" "}
              <span style={{ color: "#2E437C" }}>{activeIndustry.title}</span>
            </h3>
            <div className="mt-2 text-gray-600">
              <p
                className={`text-sm lg:text-base leading-relaxed ${
                  !expandedDescriptions[
                    activeCategory
                      ? `${activeIndustry.id}-${activeCategory}`
                      : activeIndustry.id
                  ]
                    ? "line-clamp-3"
                    : ""
                }`}
              >
                {categoryData.description}
              </p>

              {/* Read More/Less Button */}
              {categoryData.description.length > 150 && (
                <button
                  onClick={() =>
                    toggleReadMore(activeIndustry.id, activeCategory)
                  }
                  className="mt-2 text-[#2E437C] font-medium hover:text-[#1E2F5C] transition-colors flex items-center"
                >
                  {expandedDescriptions[
                    activeCategory
                      ? `${activeIndustry.id}-${activeCategory}`
                      : activeIndustry.id
                  ] ? (
                    <>
                      Read Less
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
