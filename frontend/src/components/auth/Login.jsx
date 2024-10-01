// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();




//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert(data.message);
//         localStorage.setItem('user', data.user._id);
//         localStorage.setItem('isAdmin', data.user.isAdmin); 
//         navigate('/main');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error logging in');
//     }
//   };
  

//   return (
//     <div className='login-container'>
//       <div className="login-d">
//         <h3 className='welcome'>Welcome to the Book Review Site</h3>
//         <div className='login'>
//           <form onSubmit={handleSubmit}>
//             <h1>Login</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <i className='bx bxs-user'></i>
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <i className='bx bxs-lock-alt'></i>
//             </div>
//             <div className="remember_me">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 Remember me
//               </label>
//               <a href="#">Forget Password</a>
//             </div>
//             <button type="submit" className="btn">Login</button>
//             <div className="register-link">
//               <p>Don't have an account? <a href="/">Register</a></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/users/login', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
       
        // Assuming you want to store the token for future authenticated requests
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user.user_id); // Save user ID if needed
        navigate('/main');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };
  
  return (
    <div className='login-container'>
      <div className="login-d">
        <h3 className='welcome'>Welcome to the Book Review Site</h3>
        <div className='login'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email" // Changed to 'email' type
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="remember_me">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#">Forget Password</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <div className="register-link">
              <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
