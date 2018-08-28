import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" className={props.className}>
    <path d="M840.3968 755.712c3.072 0 5.632-2.6624 5.632-5.9904a5.7856 5.7856 0 0 0-5.632-5.9392c-3.1232 0-5.632 2.6624-5.632 5.9392 0 3.328 2.5088 5.9904 5.632 5.9904z m-118.5792 141.5168c6.144 0 11.1616-5.2736 11.1616-11.8272a11.52 11.52 0 0 0-11.1616-11.8272 11.52 11.52 0 0 0-11.2128 11.8272c0 6.5536 5.0176 11.8272 11.2128 11.8272z m-161.6896 75.776a17.3056 17.3056 0 0 0 16.7936-17.7664c0-9.8304-7.5264-17.8176-16.7936-17.8176a17.3056 17.3056 0 0 0-16.8448 17.8176c0 9.8304 7.5264 17.8176 16.8448 17.8176z m-174.592-3.4304a23.04 23.04 0 0 0 22.3744-23.7056 23.04 23.04 0 0 0-22.3744-23.7056 23.04 23.04 0 0 0-22.3744 23.7056 23.04 23.04 0 0 0 22.3744 23.7056z m-154.112-80.896c15.4112 0 27.9552-13.312 27.9552-29.6448 0-16.384-12.544-29.6448-28.0064-29.6448-15.4624 0-28.0064 13.312-28.0064 29.6448 0 16.384 12.544 29.6448 28.0064 29.6448zM126.3104 747.008c18.5344 0 33.5872-15.9744 33.5872-35.6352 0-19.6608-15.0528-35.584-33.5872-35.584-18.5856 0-33.6384 15.9232-33.6384 35.584 0 19.6608 15.0528 35.6352 33.6384 35.6352z m-35.9936-175.4112c21.6576 0 39.168-18.5856 39.168-41.472 0-22.9376-17.5104-41.472-39.168-41.472-21.6064 0-39.168 18.5344-39.168 41.472 0 22.8864 17.5616 41.472 39.168 41.472z m39.7824-174.1312c24.7808 0 44.8-21.248 44.8-47.4624s-20.0192-47.4112-44.8-47.4112c-24.7296 0-44.8 21.1968-44.8 47.4112s20.0704 47.4624 44.8 47.4624z m108.1344-139.264c27.8528 0 50.432-23.9104 50.432-53.4016 0-29.4912-22.528-53.4016-50.432-53.4016-27.8528 0-50.432 23.9104-50.432 53.4016 0 29.4912 22.5792 53.4016 50.432 53.4016z m156.1088-77.312c30.9248 0 55.9616-26.5216 55.9616-59.2896 0-32.768-25.088-59.2896-55.9616-59.2896-30.9248 0-56.0128 26.5728-56.0128 59.2896 0 32.768 25.088 59.2896 56.0128 59.2896z m174.6432 0.8192c34.048 0 61.6448-29.184 61.6448-65.28 0-35.9936-27.5968-65.2288-61.6448-65.2288-33.9968 0-61.5936 29.184-61.5936 65.2288 0 36.0448 27.5968 65.28 61.5936 65.28z m160.3584 79.616c37.12 0 67.1744-31.8464 67.1744-71.168 0-39.2192-30.0544-71.1168-67.1744-71.1168-37.0688 0-67.1744 31.8976-67.1744 71.168 0 39.2704 30.1056 71.168 67.1744 71.168z m115.6096 144.4864c40.192 0 72.8064-34.5088 72.8064-77.056 0-42.5984-32.6144-77.1072-72.8064-77.1072-40.192 0-72.7552 34.5088-72.7552 77.1072 0 42.5472 32.5632 77.056 72.7552 77.056z m49.408 185.4464c43.264 0 78.3872-37.2224 78.3872-83.0464 0-45.8752-35.1232-83.0464-78.3872-83.0464-43.3152 0-78.4384 37.1712-78.4384 83.0464 0 45.824 35.1232 83.0464 78.4384 83.0464z" />
  </svg>
);

Loading.propTypes = {
  className: PropTypes.string,
};

export default Loading;
