// import '../App.css'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { login } from '../redux/authSlice' // adjust path as needed
// import { useState } from 'react'

// function Login() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { loading, error } = useSelector(state => state.auth)
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }))
//   }

//   const onsubmit = async (e) => {
//     e.preventDefault()
//     const { email, password } = formData

//     try {
//       await dispatch(login({ email, password })).unwrap()
//       navigate('/pages')
//     } catch (error) {
//       // Error is handled by Redux state
//     }
//   }

//   return (
//     <>
//       <div className="login-pg">
//         <div className="login-container">
//           <h1>Login</h1>
//           {error && <p className="error">{error}</p>}
//           <form onSubmit={onsubmit}>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               required
//               placeholder='Enter Email'
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               id="password"
//               required
//               placeholder='Enter Password'
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <button type="submit" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//           <p>Don't have an account? <a href='./signup.jsx'>Sign Up</a></p>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Login

import '../App.css'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../redux/authSlice'
import { useState, useEffect } from 'react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    const { email, password } = formData

    console.log('Login attempt with:', { email, password })

    try {
      const result = await dispatch(login({ email, password })).unwrap()
      console.log('Login successful:', result)
      navigate('/pages')
    } catch (error) {
      console.log('Login error:', error)
      // Don't navigate on error - let the error display in the UI
      // The error will be shown through the Redux state
    }
  }

  return (
    <>
      <div className="login-pg">
        <div className="login-container">
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={onsubmit}>
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
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login