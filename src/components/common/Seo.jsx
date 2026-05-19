import React from 'react'
import { Title, Meta, Link } from "react-head";

const Seo = ({ title, description, image, url, keywords, schemas }) => {
  return (
     <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      {keywords && <Meta name="keyword" content={keywords} />}
      
      {/* Global Meta Tags */}
      <Meta name="robots" content="index,follow" />
      <Meta name="contact" content="+91 90237 25674" />
      <Meta name="distribution" content="Global" />
      <Meta name="rating" content="General" />
      <Meta name="revisit-after" content="1 days" />
      <Meta name="geo.placename" content="Ahmedabad, India" />
      <Meta name="geo.placename" content="Gujarat, India" />
      <Meta name="author" content="ATC Chains India, sales@atcchain.com" />

      {/* Open Graph Tags */}
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:site_name" content="ATC Chains India" />
      <Meta name="og:email" content="sales@atcchain.com" />
      <Meta name="og:phone_number" content="+91 90237 25674" />
      {url && <Meta name="og:url" content={url} />}
      {image && <Meta property="og:image" content={image} />}

      {/* Twitter Cards */}
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:site" content="@HospitalKd" />
      <Meta name="twitter:creator" content="@HospitalKd" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />

      {url && <Link rel="canonical" href={url} />}

      {/* Schema Markups */}
      {schemas && schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  )
}

export default Seo