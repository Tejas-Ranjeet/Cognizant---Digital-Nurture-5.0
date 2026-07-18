import { Link, useLocation } from 'react-router-dom';

/**
 * HeaderComponent
 * 
 * Navigation header for the Student Course Portal.
 * Contains the portal name and navigation links: Home, Courses, Profile, Hands-On 2.
 */
const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/hands-on-2') {
      return location.pathname.startsWith('/hands-on-2');
    }
    return location.pathname === path;
  };

  const linkClasses = (path: string) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
    if (isActive(path)) {
      return `${baseClasses} bg-white text-indigo-600 shadow-md`;
    }
    return `${baseClasses} text-indigo-100 hover:bg-indigo-500 hover:text-white`;
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Portal Name / Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
                📚 Student Course Portal
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link to="/" className={linkClasses('/')}>
              🏠 Home
            </Link>
            <Link to="/courses" className={linkClasses('/courses')}>
              📖 Courses
            </Link>
            <Link to="/profile" className={linkClasses('/profile')}>
              👤 Profile
            </Link>
            <Link to="/hands-on-2" className={linkClasses('/hands-on-2')}>
              🧪 Hands-On 2
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
