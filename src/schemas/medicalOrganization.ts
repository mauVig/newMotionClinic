const medicalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://motionclinic.com.ar/#medical-organization",

  "name": "Motion Clinic",
  "url": "https://motionclinic.com.ar",
  "logo": "https://motionclinic.com.ar/svg/logo.svg",

  "description":
    "Motion Clinic es el primer centro integral de cirugía ortopédica robótica de cadera y rodilla en Argentina. Utilizamos tecnología MAKO SmartRobotics™ para lograr resultados precisos y recuperaciones más rápidas.",

  "telephone": "+54-11-3926-6548",

  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Palermo",
    "addressRegion": "Buenos Aires",
    "addressCountry": "AR"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "addressCountry": "AR",
    "addressRegion": "Buenos Aires"
  },

  "areaServed": {
    "@type": "Country",
    "name": "Argentina"
  },

  "medicalSpecialty": [
    "Orthopedic",
    "SportsMedicine",
    "PhysicalTherapy"
  ],

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
      "@type": "MedicalProcedure",
      "name": "Cirugía mini invasiva de cadera y rodilla"
    },
    {
      "@type": "TherapeuticProcedure",
      "name": "Medicina regenerativa (PRP y células madre)"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Medicina deportiva y lesiones de rodilla"
    }
  ],

  "sameAs": [
    "https://www.instagram.com/motionclinic.ba",
    "https://www.linkedin.com/in/andres-anania"
  ]
};

export default medicalOrgSchema;
