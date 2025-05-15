import dentalImplantsImg from "./assets/img/dentalImplantsImg.jpg";
import cosmeticCareImg from "./assets/img/CosmeticCare.jpg";
import cosmeticCareIcon from "./assets/icons/cosmeticCareIcon.jpg";
import denturesImg from "./assets/img/denturesImg.jpg";
import denturesIcon from "./assets/icons/denturesIcon.jpg";
import surgicalProceduresImg from "./assets/img/surgicalProceduresImg.jpg";
import surgicalProceduresIcon from "./assets/icons/SurgicalProcedures.jpg";
import pediatricDentistryImg from "./assets/img/pediatricDentistryImg.jpg";
import pediatricDentistryIcon from "./assets/icons/pediatricDentistryIcon.jpg";
import endodonticsImg from "./assets/img/endodonticsImg.jpg";
import diagnosticIcon from "./assets/icons/diagnosticIcon.jpg";
import diagnosticImg from "./assets/img/diagnosticImg.jpg";
import implantIcon from "./assets/icons/implantIcon.jpg";
import venirIcon from "./assets/icons/venirIcon.jpg";
import venirImg from "./assets/img/venirImg.jpg";
import therapyIcon from "./assets/icons/therapyIcon.jpg";
import therapyImg from "./assets/img/therapyImg.jpg";
import endodonticsIcon from "./assets/icons/endodonticsIcon.jpg";
import orthopedicsIcon from "./assets/icons/orthopedicsIcon.jpg";
import orthopedicsImg from "./assets/img/orthopedicsImg.jpg";
import orthodonticsIcon from "./assets/icons/orthodonticsIcon.jpg";
import orthodonticsImg from "./assets/img/orthodonticsImg.jpg";
import ManukImage0 from "./assets/doctors/Manuk4.JPG";
import ManukImage1 from "./assets/doctors/Manuk1.jpg";
import ManukImage2 from "./assets/doctors/Manuk2.jpg";
import ManukImage3 from "./assets/doctors/Manuk3.jpg";
import ManukImage4 from "./assets/doctors/Manuk0.jpg";
import GayaneImage0 from "./assets/doctors/Gayane8.JPG";
import GayaneImage1 from "./assets/doctors/Gayane1.jpg";
import GayaneImage2 from "./assets/doctors/Gayane2.jpg";
import GayaneImage3 from "./assets/doctors/Gayane3.jpg";
import GayaneImage4 from "./assets/doctors/Gayane4.jpg";
import AghasiImage0 from "./assets/doctors/Aghasi5.JPG";
import AghasiImage1 from "./assets/doctors/Aghasi1.jpg";
import AghasiImage2 from "./assets/doctors/Aghasi2.jpg";
import AghasiImage3 from "./assets/doctors/Aghasi3.jpg";
import AghasiImage4 from "./assets/doctors/Aghasi4.jpg";

export const services = [
  {
    id: "10",
    title: "diagnostics",
    image: diagnosticImg,
    icon: diagnosticIcon,
    consultation: {
      label: "Consultation",
      price: " For Free ",
    },
    xRay: {
      label: "X-ray RVG)",
      price: "֏ 1,000 ",
    },
  },
  {
    id: "0",
    title: "dentalImplants",
    image: dentalImplantsImg,
    icon: implantIcon,
    price: "֏ 140,000",
  },
  {
    id: "1",
    title: "cosmeticCare",
    image: cosmeticCareImg,
    icon: cosmeticCareIcon,
    price: "֏ 70,000",
  },
  {
    id: "2",
    title: "veneer",
    image: venirImg,
    icon: venirIcon,
    price: "֏ 80,000",
  },
  {
    id: "3",
    title: "therapy",
    image: therapyIcon,
    icon: therapyImg,
    price: "֏ 15,000",
    aesthetic: {
      label: "Aesthetic restoration of teeth",
      price: "֏ 15,000 ",
    },
    compositeVeneer: {
      label: "Aesthetic restoration of teeth",
      price: "֏ 20,000 ",
    },
  },
  {
    id: "4",
    title: "endodontics",
    image: endodonticsImg,
    icon: endodonticsIcon,
    price: "֏ 10,000",
  },
  {
    id: "5",
    title: "dentures",
    image: denturesImg,
    icon: denturesIcon,
    price: "֏ 65,000",
  },
  {
    id: "6",
    title: "surgicalProcedures",
    image: surgicalProceduresImg,
    icon: surgicalProceduresIcon,
    price: "֏ 5,000",
    extraction: {
      label: "Extraction of teeth",
      price: "(from) ֏ 5,000 ",
    },
    remove: {
      label: "Removal of impacted teeth ",
      price: "(from) ֏ 20,000 ",
    },
    gingival: {
      label: "Gingival plasty",
      price: "(from) ֏ 30,000 ",
    },
  },
  {
    id: "7",
    title: "pediatricDentistry",
    image: pediatricDentistryImg,
    icon: pediatricDentistryIcon,
    price: "֏ 3,000",
    milkToothExtraction: {
      label: "Milk tooth extraction",
      price: "֏ 3.000",
    },
    toothFiling: {
      label: "Tooth filing",
      price: "֏ 8.000",
    },
  },

  {
    id: "8",
    title: "orthopedics",
    image: orthopedicsImg,
    icon: orthopedicsIcon,
    price: "֏ 30,000",
    metalCeramicCrown: {
      label: "Metal ceramic crown",
      price: "֏ 30.000",
    },
    zirconiaCrown: {
      label: "Zirconia crown",
      price: "֏ 65.000",
    },
    pressCeramicCrown: {
      label: "Press ceramic crown",
      price: "֏ 80.000",
    },
  },
  {
    id: "9",
    title: "orthodontics",
    image: orthodonticsImg,
    icon: orthodonticsIcon,
    price: "֏ 120,000",
  },
];

export const doctors = [
  {
    id: "0",
    images: [ManukImage0, ManukImage1, ManukImage2, ManukImage3, ManukImage4],
    key: "manuk",
  },
  {
    id: "1",
    images: [
      GayaneImage0,
      GayaneImage1,
      GayaneImage2,
      GayaneImage3,
      GayaneImage4,
    ],
    key: "gayane",
  },
  {
    id: "2",
    images: [
      AghasiImage0,
      AghasiImage1,
      AghasiImage2,
      AghasiImage3,
      AghasiImage4,
    ],
    key: "aghasi",
  },
];
