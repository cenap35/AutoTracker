import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const fullName = localStorage.getItem('fullName')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('fullName')

    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">Home</Link>{' '}

      {token && <Link to="/vehicles">Vehicles</Link>}

      {!token ? (
        <>
          <Link to="/login">Login</Link>{' '}
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span>Welcome {fullName}</span>{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  )
}

export default Navbar