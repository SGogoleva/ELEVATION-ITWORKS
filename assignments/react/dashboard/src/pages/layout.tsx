import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">View Users</Link>
          </li>
          <li>
            <Link to="/create-users">Create User</Link>
          </li>
          <li>
            <Link to="/edit-users">Edit User</Link>
          </li>
          <li>
            <Link to="/login">Log Out</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
export default Layout;
