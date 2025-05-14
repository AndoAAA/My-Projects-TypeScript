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
import ManukImage from "./assets/Manuk.JPG";
import GayaneImage from "./assets/Gayane.JPG";
import AghasiImage from "./assets/Aghasi.JPG";
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
    image: ManukImage,
    key: "manuk",
  },
  {
    id: "1",
    image: GayaneImage,
    key: "gayane",
  },
  {
    id: "2",
    image: AghasiImage,
    key: "aghasi",
  },
];
