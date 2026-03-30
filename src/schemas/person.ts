const personSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://motionclinic.com.ar/#dr-andres-anania",

  "name": "Andrés Anania",
  "jobTitle": "Cirujano Traumatólogo — Especialista en Cadera y Rodilla",
  "description":
    "Médico traumatólogo subespecializado en cadera y rodilla. AVP Fellowship en el Hospital for Special Surgery (Nueva York). MBA en IAE Business School. Programas ejecutivos en Harvard Business School y Stanford en transformación digital e inteligencia artificial aplicada a la salud.",

  "worksFor": {
    "@id": "https://motionclinic.com.ar/#medical-organization"
  },

  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Hospital for Special Surgery",
      "address": "New York, USA"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "IAE Business School"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Harvard Business School"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Stanford University"
    }
  ],

  "url": "https://motionclinic.com.ar/#biography",

  "sameAs": [
    "https://www.linkedin.com/in/andres-anania"
  ]
};

export default personSchema;
