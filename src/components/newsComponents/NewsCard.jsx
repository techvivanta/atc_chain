import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ props }) => {
  const navigate = useNavigate();  
  
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  
  return (
    <>
      <div
        onClick={() => navigate(`/news/details/${props.slug}`)}
        className="cursor-pointer"
      >
        {/* Image container with 4:3 aspect ratio */}
        <div className="w-full aspect-[3/4] overflow-hidden">
          <img
            src={props.display_image}
            className="w-full h-full object-cover"
            alt="img"
          />
        </div>
        
        <div className="md:p-[15px] p-[15px]">
          <p className="font-[600] text-[9px] md:text-[12px] text-[#868686] pb-1">
            {props.news}
          </p>
          <div className="flex justify-between">
            <p className="md:text-[21px] text-[14px] font-[500] py-0">
              {truncateText(props.heading, 35)}
            </p>
            <div style={{width:"22px",height:"22px"}}>
              <MdArrowOutward className="text-[22px] pt-1" />
            </div>
          </div>
          <p className="md:text-[14px] text-[10px] text-[#667085] py-1">
            {truncateText(props.details, 60)}
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
