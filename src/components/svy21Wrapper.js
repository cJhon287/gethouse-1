// Import the svy21.js file
import SVY21 from './svy21'; // Import 'SVY21' variable

// Define a wrapper module
const svy21Wrapper = {
  computeLatLon: (lat, lon) => {
    const svy21 = new SVY21();
    return svy21.computeLatLon(lat, lon);
  },
};

export default svy21Wrapper;