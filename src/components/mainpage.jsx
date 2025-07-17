import React from 'react';
import Navbar from './Navbar';
import QuickActions from './quickaction';
const Mainpage = () => {
  return (
    <div className='mainpage'>
      <Navbar />
      <div className="mainpage-container">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content area where you can add your components.</p>
        <div className="contianer1">
          <div>
      {/* Other components */}
      <QuickActions />
    </div>

        </div>
      </div>
    </div>
  );
};

export default Mainpage;