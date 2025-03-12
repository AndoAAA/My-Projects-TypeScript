import { reportWebVitals } from 'web-vitals';

const reportWebVitalsHandler = (onPerfEntry: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onPerfEntry(reportWebVitals);
  }
};

export default reportWebVitalsHandler;
