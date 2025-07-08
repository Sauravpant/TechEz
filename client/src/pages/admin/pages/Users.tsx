import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
    
        const mockUsers: User[] = [
          {
            id: '1',
            name: 'Saurav Pant',
            email: 'saurav@example.com',
            address: 'Gwarko, Lalitpur',
            role: 'Customer',
            joinDate: '2023-01-15',
            status: 'active'
          },
          {
            id: '2',
            name: 'Samir Shrestha',
            email: 'samir@example.com',
            address: 'Balaju, Kathmandu',
            role: 'Technician',
            joinDate: '2022-11-03',
            status: 'active'
          },
          {
            id: '3',
            name: 'Swastika Dhakal',
            email: 'swastika@example.com',
            address: 'Sanepa , Lalitpur',
            role: 'Customer',
            joinDate: '2023-02-20',
            status: 'inactive'
          },
          {
            id: '4',
            name: 'Ram Gurung',
            email: 'ram@example.com',
            address: 'Pulchowk, Lalitpur',
            role: 'Technician',
            joinDate: '2022-09-12',
            status: 'active'
          },
          {
            id: '5',
            name: 'Krishna Tamang',
            email: 'krishna@example.com',
            address: 'Boudha, kathmandu',
            role: 'Customer',
            joinDate: '2023-03-05',
            status: 'active'
          },
          {
            id: '6',
            name: 'Nishanta Sharma',
            email: 'nishanta@example.com',
            address: 'Thapathali, Kathmandu',
            role: 'Technician',
            joinDate: '2023-04-18',
            status: 'active'
          },
          {
            id: '7',
            name: 'Samir Tamang',
            email: 'samirt@example.com',
            address: 'Koteshwor, Kathmandu',
            role: 'Customer',
            joinDate: '2023-01-30',
            status: 'inactive'
          }
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleEditUser = (userId: string) => {
    console.log('Edit user:', userId);
    // Implement edit functionality
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId);
    // Implement delete functionality
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">User Management</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-xl font-bold">{users.length}</p>
              <p className="text-xs text-gray-500">{filteredUsers.length} filtered</p>
            </div>
          </div>
        </div>
        
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-medium">
              <div className="col-span-4 md:col-span-3">User</div>
              <div className="col-span-4 md:col-span-3">Contact</div>
              <div className="hidden md:block md:col-span-3">Address</div>
              <div className="col-span-2 md:col-span-2">Role</div>
              <div className="col-span-2 md:col-span-1">Actions</div>
            </div>

            {/* Table Body */}
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <div className="col-span-4 md:col-span-3 flex items-center">
                    <FaUserCircle className="text-gray-400 text-xl mr-3" />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">Joined: {user.joinDate}</p>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-3 flex items-center">
                    <a 
                      href={`mailto:${user.email}`} 
                      className="text-blue-400 hover:underline"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="hidden md:flex md:col-span-3 items-center">
                    <p className="text-gray-400">{user.address}</p>
                  </div>
                  <div className="col-span-2 md:col-span-2 flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Technician' 
                        ? 'bg-green-900 text-green-400' 
                        : 'bg-blue-900 text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditUser(user.id)}
                      className="p-2 text-blue-400 hover:bg-gray-700 rounded-full"
                      aria-label="Edit user"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-400 hover:bg-gray-700 rounded-full"
                      aria-label="Delete user"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                No users found matching your search criteria.
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Address View */}
      <div className="md:hidden mt-4">
        {currentUsers.map((user) => (
          <div key={`mobile-${user.id}`} className="bg-gray-800 p-4 rounded-lg shadow mb-3">
            <p className="text-gray-400 text-sm mb-1">Address: {user.address}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-800 rounded-lg flex items-center disabled:opacity-50"
          >
            <FaChevronLeft className="mr-1" /> Previous
          </button>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages || filteredUsers.length === 0}
            className="px-3 py-1 bg-gray-800 rounded-lg flex items-center disabled:opacity-50"
          >
            Next <FaChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;