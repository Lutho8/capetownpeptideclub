import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string;
}

const DOMAIN = 'https://www.capetownpeptideclub.co.za';
const DEFAULT_IMAGE = `${DOMAIN}/og.png`;

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  keywords,
}: SEOProps) {
  const canonical = `${DOMAIN}${path}`;
  const fullTitle = title.includes('Cape Town Peptide Club') ? title : `${title} | Cape Town Peptide Club`;

  return (
    <Helmet>
      <html lang="en-ZA" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Geo signals */}
      <meta name="geo.placename" content="Cape Town, South Africa" />
      <meta name="geo.region" content="ZA-WC" />
      <meta name="geo.position" content="-33.9249;18.4241" />
      <meta name="ICBM" content="-33.9249, 18.4241" />

      {/* Language & Region */}
      <meta property="og:locale" content="en_ZA" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cape Town Peptide Club" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="en-ZA" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Schema: WebSite */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Cape Town Peptide Club',
        url: DOMAIN,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${DOMAIN}/#/research?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      })}</script>

      {/* Schema: Organization */}
      {!noindex && (
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Cape Town Peptide Club',
          alternateName: ['RTD', 'RTD Peptides'],
          url: DOMAIN,
          logo: `${DOMAIN}/og.png`,
          email: 'info@capetownpeptideclub.co.za',
          telephone: '+27-21-555-0192',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Atlantic Seaboard',
            addressLocality: 'Cape Town',
            addressRegion: 'Western Cape',
            postalCode: '8005',
            addressCountry: {
              '@type': 'Country',
              name: 'South Africa',
            },
          },
          sameAs: [
            'https://www.instagram.com/ridethetide',
            'https://wa.me/27215550192',
          ],
        })}</script>
      )}
    </Helmet>
  );
}

// Product schema generator
export function ProductSchema({ product }: { product: { name: string; price: number; usd: number; category: string; purity: string; desc: string; image: string; stock: number } }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: `https://www.capetownpeptideclub.co.za${product.image}`,
        description: product.desc,
        brand: {
          '@type': 'Brand',
          name: 'RTD Peptides',
        },
        category: product.category,
        offers: {
          '@type': 'Offer',
          url: `https://www.capetownpeptideclub.co.za/#/shop`,
          priceCurrency: 'ZAR',
          price: product.price,
          priceValidUntil: '2026-12-31',
          availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'ZAR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'ZA',
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
            returnPolicyCountry: 'ZA',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '347',
        },
      })}</script>
    </Helmet>
  );
}

// Breadcrumb schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `https://www.capetownpeptideclub.co.za${item.path}`,
        })),
      })}</script>
    </Helmet>
  );
}
