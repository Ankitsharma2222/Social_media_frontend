import React from 'react';
import {InfinitySpin} from 'react-loader-spinner';
const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <InfinitySpin type="Oval" color="#00BFFF" height={140} width={140} />
    </div>
  );
};

export default Loading;