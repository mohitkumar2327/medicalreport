import '../index.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Assuming your authSlice exports an action creator for setting errors
// If not, you might need to add one to authSlice or keep the direct dispatch for simplicity.
import { signup, clearError, setError } from '../redux/authSlice' // <--- Added 'setError'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    // Clear error when user starts typing IF there's an error displayed
    if (error) { // Check if there's an error to clear to avoid unnecessary dispatches
      dispatch(clearError());
    }
  }

  const onsubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = formData

    // Basic client-side validation for empty fields (optional but good practice)
    if (!name || !email || !password || !confirmPassword) {
      dispatch(setError('Please fill in all fields.')); // Use the action creator
      return;
    }

    if (password !== confirmPassword) {
      // Use the 'setError' action creator for consistency
      dispatch(setError('Passwords do not match.'));
      return;
    }

    try {
      await dispatch(signup({ name, email, password })).unwrap()
      navigate('/otp')
    } catch (err) {
      // Error is handled by Redux state from the thunk's rejectWithValue
      // or set by the extraReducers. No explicit action here is fine.
      console.error("Signup failed:", err); // Optional: log for debugging
    }
  }

  return (
    <>
      <div className="signup-pg">
        <div className="signup-container">
          <h1>SignUp</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={onsubmit}>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder='Enter Name'
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder='Enter Email'
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder='Enter Password'
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              required
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p>Already have an account? <a href="./login.jsx">Login</a></p>
        </div>
      </div>
    </>
  )
}

export default Signup