import React from 'react';

const Welcome = ({ name }) => {
  return (
      <div className='white f3'>
        {`Welcome ${name}!`}
      </div>
  );
}

export default Welcome;