const medicalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://motionclinic.com.ar/#medical-organization",

  "name": "Motion Clinic",
  "url": "https://motionclinic.com.ar",
  "logo": "https://motionclinic.com.ar/logo.png",

  "description":
    "Motion Clinic es un centro especializado en cirugía ortopédica y robótica de cadera y rodilla, rehabilitación y medicina deportiva en Argentina.",

  "medicalSpecialty": [
    "Orthopedic",
    "SportsMedicine",
    "PhysicalTherapy"
  ],

  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buenos Aires",
    "addressRegion": "CABA",
    "addressCountry": "AR"
  },

  "areaServed": {
    "@type": "Country",
    "name": "Argentina"
  },

  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "Cirugía robótica MAKO de cadera y rodilla"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Reemplazo articular de cadera"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Reemplazo articular de rodilla"
    },
    {
      "@type": "TherapeuticProcedure",
      "name": "Rehabilitación y fisioterapia"
    }
  ]
};

export default medicalOrgSchema;