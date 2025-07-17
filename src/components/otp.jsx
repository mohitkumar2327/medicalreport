import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resetOtpState } from '../redux/otpSlice';
import { useNavigate } from 'react-router-dom';
import './yt.css';
const Otp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isVerified, error, loading } = useSelector((state) => state.otp);

  useEffect(() => {
    dispatch(resetOtpState());
  }, [dispatch]);

  useEffect(() => {
    if (isVerified) {
      navigate('/login');
    }
  }, [isVerified, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp(otp));
  };

  const handleResend = () => {
    console.log('Resending OTP...');
  };

  return (
    <div>
      <div className="otp-pg">
        <div className="otp-container">
          <h1>Enter OTP</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="otp"
              id="otp"
              required
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
          <p>Didn't receive an OTP? <a href="#" onClick={handleResend}>Resend OTP</a></p>
        </div>
      </div>
    </div>
  );
};

export default Otp;