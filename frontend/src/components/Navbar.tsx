import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Avatar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';

const AppNavbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar fluid rounded>
      {/* @ts-expect-error: Flowbite types issue with 'to' prop */}
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Film App
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="" rounded placeholderInitials={user.name.charAt(0).toUpperCase()} />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">{role}</span>
            </DropdownHeader>
            {role === 'ADMIN' && (
              <>
                <DropdownItem as={Link} to="/admin">
                  Admin Dashboard
                </DropdownItem>
                <DropdownItem as={Link} to="/admin/films">
                  Manage Films
                </DropdownItem>
                <DropdownItem as={Link} to="/admin/genres">
                  Manage Genres
                </DropdownItem>
                <DropdownItem as={Link} to="/admin/actors">
                  Manage Actors
                </DropdownItem>
                <DropdownItem as={Link} to="/admin/directors">
                  Manage Directors
                </DropdownItem>
                <DropdownDivider />
              </>
            )}
            <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Button as={Link} to="/login" color="gray">
              Login
            </Button>
            <Button as={Link} to="/register" color="purple">
              Register
            </Button>
          </div>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {/* @ts-expect-error: Flowbite types issue with 'to' prop */}
        <NavbarLink as={Link} to="/" active={location.pathname === '/'}>
          Home
        </NavbarLink>
        {/* @ts-expect-error: Flowbite types issue with 'to' prop */}
        <NavbarLink as={Link} to="/films" active={location.pathname === '/films'}>
          Filmler
        </NavbarLink>
        {/* @ts-expect-error: Flowbite types issue with 'to' prop */}
        <NavbarLink as={Link} to="/actors" active={location.pathname === '/actors'}>
          Oyuncular
        </NavbarLink>
        {/* @ts-expect-error: Flowbite types issue with 'to' prop */}
        <NavbarLink as={Link} to="/directors" active={location.pathname === '/directors'}>
          Yönetmenler
        </NavbarLink>
        {/* @ts-expect-error: Flowbite types issue with 'to' prop */}
        <NavbarLink as={Link} to="/genres" active={location.pathname === '/genres'}>
          Türler
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default AppNavbar;
