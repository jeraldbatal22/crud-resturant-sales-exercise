const capitalizeFirstLetter = (str) => {
  // Check if the input is a non-empty string
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  // Capitalize the first letter and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default capitalizeFirstLetter