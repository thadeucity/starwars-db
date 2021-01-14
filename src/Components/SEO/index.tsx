import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'A Simple Next.js Star Wars Database',
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true,
}: SEOProps) => {
  const pageTitle = `${title}${
    !shouldExcludeTitleSuffix ? ' | Star Wars DB' : ''
  }`;

  return (
    <Head>
      <title>{pageTitle}</title>

      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}

      <meta name="description" content={description} />
      {image && (
        <>
          <meta name="image" content={image} />
          <meta property="og:image" content={image} />
          <meta property="og:image:secure_url" content={image} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={pageTitle} />
          <meta property="og:image:alt" content="Thumbnail" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#333" />
      <meta name="msapplication-TileColor" content="#333" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />
    </Head>
  );
};

export default SEO;
