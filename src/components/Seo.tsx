import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type Doctor = {
  key: string;
};

interface SeoProps {
  doctors?: Doctor[];
  titleKey?: string;
  descriptionKey?: string;
  canonical?: string;
  keywords?: string;
  image?: string;
  titleFallback?: string;
  descriptionFallback?: string;
  isServicePage?: boolean;
  price?: string;
  priceCurrency?: string;
}

const Seo: React.FC<SeoProps> = ({
  doctors = [],
  titleKey = "meta.homeTitle",
  descriptionKey = "meta.homeDescription",
  canonical = "https://spectra.tarverdyan-projects.com/",
  keywords = "dental clinic, dentistry, teeth whitening, dental implants, veneers, orthodontics, healthcare, medical services, Yerevan dentist",
  image = "https://spectra.tarverdyan-projects.com/logo.jpg",
  titleFallback = "Welcome to Spectra Dental Clinic",
  descriptionFallback = "Experience quality dental care and services at our trusted clinic.",
  isServicePage = false,
  price,
  priceCurrency,
}) => {
  const { t } = useTranslation();

  const title = t(titleKey, titleFallback);
  const description = t(descriptionKey, descriptionFallback);

  const structuredDataOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spectra Dental Clinic",
    url: canonical,
    description,
    logo: image,
    image: image,
    sameAs: [
      "https://www.facebook.com/people/Spectra-Dental-Clinic/61564332775099/?_rdr",
      "https://www.instagram.com/spectradental.clinic/",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dro 5",
      addressLocality: "Yerevan",
      addressRegion: "Yerevan",
      postalCode: "0051",
      addressCountry: "AM",
    },
    telephone: "+37493391481",
    email: "spectraclinicarmenia@gmail.com",
  };

  const structuredDataMedical = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Spectra Dental Clinic",
    url: canonical,
    description,
    medicalSpecialty: "Dentistry",
    member: doctors.map((doc) => ({
      "@type": "Person",
      name: t(`about.names.${doc.key}.name`, doc.key),
      jobTitle: "Dentist",
    })),
  };

  // Service-ի schema.org JSON-LD
  const structuredDataService = isServicePage
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description: description,
        provider: {
          "@type": "MedicalOrganization",
          name: "Spectra Dental Clinic",
          url: canonical,
        },
        areaServed: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Yerevan",
            addressRegion: "Yerevan",
            addressCountry: "AM",
          },
        },
        url: canonical,
        image: image,
        ...(price &&
          priceCurrency && {
            offers: {
              "@type": "Offer",
              price: price,
              priceCurrency: priceCurrency,
              availability: "https://schema.org/InStock",
              url: canonical,
            },
          }),
      }
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredDataOrganization)}
      </script>

      {doctors.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(structuredDataMedical)}
        </script>
      )}

      {isServicePage && structuredDataService && (
        <script type="application/ld+json">
          {JSON.stringify(structuredDataService)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
