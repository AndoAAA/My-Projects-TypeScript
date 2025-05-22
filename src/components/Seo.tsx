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
}

const Seo: React.FC<SeoProps> = ({
  doctors = [],
  titleKey = "meta.homeTitle",
  descriptionKey = "meta.homeDescription",
  canonical = "https://spectra.tarverdyan-projects.com/",
}) => {
  const { t } = useTranslation();

  const title = t(titleKey) || "Welcome to Spectra Dental Clinic";
  const description =
    t(descriptionKey) ||
    "Experience quality dental care and services at our trusted clinic.";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="dental clinic, dentistry, teeth whitening, dental implants, veneers, orthodontics, healthcare, medical services, Yerevan dentist"
      />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:image"
        content="https://spectra.tarverdyan-projects.com/logo.jpg"
      />

      {/* X (formerly Twitter) Meta Tags */}
      {/* Despite the rebrand, these are still used as "twitter" tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://spectra.tarverdyan-projects.com/logo.jpg"
      />

      {/* Organization JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Spectra Dental Clinic",
          url: canonical,
          description,
          logo: "https://spectra.tarverdyan-projects.com/logo.jpg",
          image: "https://spectra.tarverdyan-projects.com/logo.jpg",
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
        })}
      </script>

      {/* MedicalOrganization JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          name: "Spectra Dental Clinic",
          url: canonical,
          description,
          medicalSpecialty: "Dentistry",
          member: doctors.map((doc) => ({
            "@type": "Person",
            name: t(`about.names.${doc.key}.name`),
            jobTitle: "Dentist",
          })),
        })}
      </script>
    </Helmet>
  );
};

export default Seo;
