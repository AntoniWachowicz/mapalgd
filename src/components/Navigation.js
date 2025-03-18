import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaMap, FaUserCog, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import mapConfig from '../config/mapConfig';

export default function Navigation() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignIn = async (email, password) => {
    try {
      console.log('Attempting to sign in with:', email);
      const result = await signIn('credentials', { 
        email, 
        password,
        callbackUrl: '/admin',
        redirect: true
      });
      console.log('Sign in result:', result);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and title */}
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <FaMap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Map Pin App
              </span>
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === '/' 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Mapa
              </Link>

              {session && (
                <Link 
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    router.pathname === '/admin' 
                      ? 'border-blue-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Panel Administracyjny
                </Link>
              )}
            </div>

            {/* User authentication */}
            <div className="ml-6 flex items-center">
              {session ? (
                <div className="relative">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      {session.user.name || session.user.email}
                    </span>
                    <button
                      onClick={() => signOut()}
                      className="ml-2 p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                      title="Sign out"
                    >
                      <FaSignOutAlt className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <FaSignInAlt className="h-5 w-5 mr-1" />
                    Zaloguj się
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000 }}
          onClick={(e) => {
            // Only close if clicking the backdrop, not the modal itself
            if (e.target === e.currentTarget) {
              setShowSignIn(false);
            }
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 w-96 max-w-[90vw] relative"
            style={{ zIndex: 10001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Logowanie</h2>
            <p className="mb-4 text-gray-600">
              Zaloguj się, aby uzyskać dostęp do panelu administracyjnego.
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const email = e.target.email.value;
              const password = e.target.password.value;
              
              handleSignIn(email, password);
            }}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Hasło
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSignIn(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Zaloguj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}