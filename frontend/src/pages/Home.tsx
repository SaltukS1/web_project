import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
        FilmApp'e Hoş Geldiniz
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        İzlediklerini keşfet, notlarını sakla, favorilerini hatırla.
      </p>
      <div className="flex gap-4">
        <Link to="/films">
          <Button size="xl" color="purple">
            Filmleri Keşfet
          </Button>
        </Link>
        <Link to="/genres">
          <Button size="xl" color="light">
            Türlere Göz At
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
