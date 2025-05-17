// resources/js/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet";

export default function SEO({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title} | DevNest</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | DevNest`} />
      <meta property="og:description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
