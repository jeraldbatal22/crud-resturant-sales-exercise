import { Box, CircularProgress } from "@mui/material";
import { Fragment } from "react";
import PropTypes from 'prop-types';

const Spinner = ({ isLoading, title }) => {
  return (
    <Fragment>
      {
        isLoading &&
        <Box 
          zIndex={10000}
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          position="absolute"
          backgroundColor="rgba(241, 241, 241, 0.85)"
          width="100%"
          height="100%"
          style={{ inset: 0 }}
        >
          <CircularProgress size={20} style={{ marginRight: 10 }} /> {title}
        </Box>
      }
    </Fragment>
  );
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

export default Spinner;