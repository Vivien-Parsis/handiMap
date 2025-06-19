import { useEffect } from 'react';
import PropTypes from "prop-types";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title || "Handi'Map";
  }, [title]);
  return null;
};

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;