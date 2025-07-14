// import React from 'react'
// import profile from '../assets/prof.jpg'
// import './yt.css'

// function Header() {
//   return (
//     <header className="header">
//       <nav className="navbar">
//         <div className="header-actions">
//           <input type="search" name="search" id="search" placeholder='Search'/>
//           <button type="button" className='btn'>+ Create</button>
//           <a href="/" className='profile'>
//             <img src={profile} alt="profile" className='prof' />
//           </a>
//         </div>
//       </nav>
//     </header>      
//   )
// }

// export default Header



import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'; // Assuming logout is an async thunk or similar
import profile from '../assets/prof.jpg';
import './yt.css';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown state
  };

  const handleLogout = async () => {
    console.log('Logout initiated');
    try {
      // Dispatch the logout action
      await dispatch(logout()).unwrap(); // Use .unwrap() if logout is an async thunk that can reject
      console.log('Logout dispatched successfully, navigating to /signup');
      navigate('/signup'); // Navigate to signup page after successful logout
      setIsDropdownOpen(false); // Close the dropdown
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error during logout (e.g., API failure),
      // we might still want to navigate to signup or handle the error gracefully.
      // For now, we'll just log it. Your Redux state might also catch this error.
      navigate('/signup'); // Optionally navigate even on error if the goal is to always go to login/signup after a logout attempt
    }
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    setIsDropdownOpen(false);
    // Add navigation to settings page here if needed:
    // navigate('/settings');
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="header-actions">
          <input type="search" name="search" id="search" placeholder='Search'/>
          <button type="button" className='btn'>+ Create</button>
          <div className="profile-container" ref={dropdownRef}>
            <button
              onClick={handleProfileClick}
              className='profile'
              type="button"
            >
              <img src={profile} alt="profile" className='prof' />
            </button>

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img src={profile} alt="profile" className='dropdown-prof' />
                  <div className="user-info">
                    <p className="user-name">{user?.name || 'User'}</p>
                    <p className="user-email">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <ul className="dropdown-menu">
                  <li>
                    <button onClick={handleSettings} className="dropdown-item">
                      <span className="icon">⚙️</span>
                      Settings
                    </button>
                  </li>
                  <li>
                    {/* Use handleLogout directly for the logout button */}
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <span className="icon">🚪</span>
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;