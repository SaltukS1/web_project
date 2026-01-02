import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Films
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Manage your movie catalog. Add, edit, or remove films.
          </p>
          <Button as={Link} to="/admin/films">
            Manage Films
          </Button>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Genres
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Organize films by genres. Create and manage categories.
          </p>
          <Button as={Link} to="/admin/genres" color="purple">
            Manage Genres
          </Button>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Actors
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Manage actors database.
          </p>
          <Button as={Link} to="/admin/actors" color="success">
            Manage Actors
          </Button>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Directors
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Manage directors database.
          </p>
          <Button as={Link} to="/admin/directors" color="warning">
            Manage Directors
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
