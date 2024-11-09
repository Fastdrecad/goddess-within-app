import { Helmet } from "react-helmet-async";
import React from "react";

const Meta = React.memo(
  ({
    title = "Default Title",
    description = "Default description",
    keywords = "default, keywords"
  }) => {
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    );
  }
);

Meta.displayName = "Meta";

export default Meta;
