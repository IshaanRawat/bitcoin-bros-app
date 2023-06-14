import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: string;
}
const TITLE =
  "Bitcoin Bros: The Best PFP collection ever is coming to the Bitcoin Brotherhood";
const DESCRIPTION =
  "Paint the most important symbol ever of humanity on the Bitcoin Blockchain. Inscribe a Dick and get free entry to the Bitcoin Brotherhood when the mint begins.";
const IMAGE = "https://static.cdn.zo.xyz/media/banner-bb.png";

const MetaTags: React.FC<MetaTagsProps> = ({
  title = TITLE,
  description,
  image,
  canonical,
  type = "website",
}) => {
  const router = useRouter();

  const url = useMemo(
    () =>
      typeof window != "undefined"
        ? `${window.location.origin}${router.pathname}`
        : `https://bitcoinbros.xyz${router.pathname}`,
    [router.pathname]
  );

  return (
    <Head>
      <title>{title || TITLE}</title>
      <meta name="title" content={title || TITLE} />
      <link
        rel="shortcut icon"
        href="https://static.cdn.zo.xyz/app-media/logos/bitcoin-bros.jpeg"
        type="image/jpeg"
      />
      <meta name="description" content={description || DESCRIPTION} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title || TITLE} />
      <meta property="og:description" content={description || DESCRIPTION} />
      <meta property="og:image" content={image || IMAGE} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title || TITLE} />
      <meta
        property="twitter:description"
        content={description || DESCRIPTION}
      />
      <meta property="twitter:image" content={image || IMAGE} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
};

export default MetaTags;
