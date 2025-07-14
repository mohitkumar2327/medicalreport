import '../index.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup, clearError } from '../redux/authSlice'

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
    // Clear error when user starts typing
    if (error) dispatch(clearError());
  }

  const onsubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = formData

    if (password !== confirmPassword) {
      dispatch({ type: 'auth/setError', payload: 'Passwords do not match' })
      return
    }

    try {
      await dispatch(signup({ name, email, password })).unwrap()
      navigate('/otp')
    } catch (error) {
      // Error is handled by Redux state
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