import React from "react";
import HomepageCard from "./HomepageCard";

const Homepage = (props) => {
  return (
    <div className="homepage">
      <HomepageCard apiLoaded={props.apiLoaded} />
    </div>
  );
};

export default Homepage;
