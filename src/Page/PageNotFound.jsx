import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function PageNotFound(props) {
    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-gradient-to-r from-blue-400 to-purple-600">
            <div className="text-center p-10 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md">
                <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
                </p>
                <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-lg font-medium rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                    <FaHome className="mr-2" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;
