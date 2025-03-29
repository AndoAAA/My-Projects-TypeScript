import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
    onFCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry);
  }
};

export default reportWebVitals;
