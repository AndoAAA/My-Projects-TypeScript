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
  canonical = "https://www.spectradentalclinic.com/",
  keywords = "dental clinic, dentistry, teeth whitening, dental implants, veneers, orthodontics, healthcare, medical services, Yerevan dentist",
  image = "https://www.spectradentalclinic.com/logo.jpg",
  titleFallback = "Welcome to Spectra Dental Clinic",
  descriptionFallback = "Experience quality dental care and services at our trusted clinic.",
  isServicePage = false,
  price,
  priceCurrency,
}) => {
  const { t, i18n } = useTranslation();

  // Կարգավորում fallback-ներով
  const title = t(titleKey, { defaultValue: titleFallback });
  const description = t(descriptionKey, { defaultValue: descriptionFallback });

  // Համակարգել canonical URL-ը ըստ լեզվի
  // Օրինակ՝ https://www.spectradentalclinic.com/en կամ /ru
  const canonicalUrl =
    canonical +
    (i18n.language && i18n.language !== "hy" ? `/${i18n.language}` : "");

  // Structured data organization
  const structuredDataOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spectra Dental Clinic",
    url: canonicalUrl,
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

  // Structured data medical organization with doctors
  const structuredDataMedical = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Spectra Dental Clinic",
    url: canonicalUrl,
    description,
    medicalSpecialty: "Dentistry",
    member: doctors.map((doc) => ({
      "@type": "Person",
      name: t(`about.names.${doc.key}.name`, { defaultValue: doc.key }),
      jobTitle: "Dentist",
    })),
  };

  // Service schema, եթե դա service page է
  const structuredDataService = isServicePage
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description: description,
        provider: {
          "@type": "MedicalOrganization",
          name: "Spectra Dental Clinic",
          url: canonicalUrl,
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
        url: canonicalUrl,
        image: image,
        ...(price &&
          priceCurrency && {
            offers: {
              "@type": "Offer",
              price: price,
              priceCurrency: priceCurrency,
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }),
      }
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:type"
        content={isServicePage ? "service" : "website"}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataOrganization),
        }}
      />
      {doctors.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataMedical),
          }}
        />
      )}
      {isServicePage && structuredDataService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataService),
          }}
        />
      )}
    </Helmet>
  );
};

export default Seo;
