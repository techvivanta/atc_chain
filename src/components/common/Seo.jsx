import React from "react";
import { Title, Meta, Link } from "react-head";

const SITE_NAME = "ATC Chains India";
const TWITTER_HANDLE = "@atcchains";

const Seo = ({
  title,
  description,
  image,
  url,
  keywords,
  author = SITE_NAME,
  ogType = "website",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  schemas,
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      {keywords && <Meta name="keywords" content={keywords} />}
      <Meta name="author" content={author} />

      {/* Global Meta Tags */}
      <Meta name="robots" content="index,follow" />
      <Meta name="contact" content="+91 90237 25674" />
      <Meta name="distribution" content="Global" />
      <Meta name="rating" content="General" />
      <Meta name="revisit-after" content="1 days" />
      <Meta name="geo.placename" content="Ahmedabad, India" />
      <Meta name="geo.placename" content="Gujarat, India" />

      {/* Open Graph Tags */}
      <Meta property="og:title" content={ogTitle || title} />
      <Meta property="og:description" content={ogDescription || description} />
      <Meta property="og:type" content={ogType} />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta name="og:email" content="sales@atcchain.com" />
      <Meta name="og:phone_number" content="+91 90237 25674" />
      {url && <Meta property="og:url" content={url} />}
      {image && <Meta property="og:image" content={image} />}

      {/* Twitter Cards */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content={TWITTER_HANDLE} />
      <Meta name="twitter:creator" content={TWITTER_HANDLE} />
      <Meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <Meta
        name="twitter:description"
        content={twitterDescription || ogDescription || description}
      />
      {image && <Meta name="twitter:image" content={image} />}

      {url && <Link rel="canonical" href={url} />}

      {/* Schema Markups */}
      {schemas &&
        schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
    </>
  );
};

export default Seo;
