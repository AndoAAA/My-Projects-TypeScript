import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="125" r="115" />
    <rect x="0" y="260" rx="3" ry="3" width="280" height="26" />
    <rect x="0" y="300" rx="6" ry="6" width="280" height="84" />
    <rect x="0" y="413" rx="3" ry="3" width="90" height="30" />
    <rect x="137" y="400" rx="20" ry="20" width="140" height="43" />
  </ContentLoader>
);

export default MyLoader;
