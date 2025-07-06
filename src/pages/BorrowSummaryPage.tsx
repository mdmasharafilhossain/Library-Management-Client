import React from 'react';
import { useNavigate } from 'react-router';

import { FaBook, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useGetBorrowSummaryQuery } from '../redux/api/borrowApi';

const BorrowSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: borrowSummary, isLoading, isError, refetch } = useGetBorrowSummaryQuery();

  const handleReturnToBooks = () => {
    navigate('/books');
  };

  const handleRefreshData = () => {
    refetch();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Data refreshed!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading borrowing summary...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Failed to Load Data</h2>
          <p className="mb-4">We couldn't load the borrowing summary. Please try again.</p>
          <button
            onClick={handleRefreshData}
            className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors mr-2"
          >
            Try Again
          </button>
          <button
            onClick={handleReturnToBooks}
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const totalBorrowed = borrowSummary?.reduce((sum, item) => sum + item.totalQuantity, 0) || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
           
            <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-blue-500 tracking-tight  mb-4 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
    Borrowing Summary
  </h1>
            
          </div>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={handleRefreshData}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={handleReturnToBooks}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaArrowLeft className="mr-1" />
              Back to Books
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Summary Stats */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-4 text-white">
            <div className="flex flex-wrap justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                
                <div>
                  <p className="text-sm opacity-100">Total Books Borrowed</p>
                  <p className="text-2xl font-bold">{borrowSummary?.length || 0}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                
                <div>
                  <p className="text-sm opacity-80">Total Copies Borrowed</p>
                  <p className="text-2xl font-bold">{totalBorrowed}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            {borrowSummary && borrowSummary.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ISBN
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Borrowed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {borrowSummary.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index+1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                         
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">{item.book.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.book.isbn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.totalQuantity}
                          </span>
                          <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(item.totalQuantity / totalBorrowed) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No Borrowed Books</h3>
                <p className="mt-1 text-gray-500">There are currently no books borrowed from the library.</p>
                <div className="mt-6">
                  <button
                    onClick={handleReturnToBooks}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
                  >
                    <FaBook className="mr-2 -ml-1 h-5 w-5" />
                    Browse Books
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer Summary */}
          {borrowSummary && borrowSummary.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{borrowSummary.length}</span> books with total{' '}
                  <span className="font-medium">{totalBorrowed}</span> copies borrowed
                </p>
                <p className="text-sm text-gray-700">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowSummaryPage;