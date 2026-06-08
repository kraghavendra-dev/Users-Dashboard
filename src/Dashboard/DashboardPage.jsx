import React, { useState, useEffect} from 'react'
import './DashboardPage.css'
import axios from 'Axios'

const DashboardPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredData = data.filter((user) => {
        return user.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    
    const handleSortByName = () => {
        const sortedData = [...filteredData].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        setData(sortedData);
    }
  return (
    <div>
        <h1 className='page-title'>Users Dashboard</h1>
        <div className='input-container'>
            <input
                className='search-input'
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='sort-btn' onClick={handleSortByName}>
                SortByName
            </button>
        </div>
        <div>
            {loading && <p>Loading....</p>}
            {error && <p>Error: {error}</p>}
            <div className='table-container'>
            {!loading && !error && (
                <table className='data-table'>
                <thead className='table-header'>
                    <tr>
                        
                        <th>ID</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Phone No.</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(filteredData) && filteredData.length > 0 ? (
                             filteredData.map((user) => {
                                const { id, name, username, email, address } = user;
                                return (
                                    <tr key={id}>
                                        <td data-label="ID">{id}</td>
                                        <td data-label="Profile" className="profile-cell">
                                            <img src="https://picsum.photos/200" className="profile-image" alt={name} />
                                        </td>
                                        <td data-label="Name">{name}</td>
                                        <td data-label="Username">{username}</td>
                                        <td data-label="Email">{email}</td>
                                        <td data-label="City">{address?.city}</td>
                                        <td data-label="Phone No.">{address?.zipcode}</td>
                                    </tr>
                                )
                            })
                        ) : ( 
                            <tr>
                                <td colSpan="8">No data available</td>
                            </tr>
            
                        )
                    }
                </tbody>
            </table>
            )}
            </div>
        </div>
    </div>
  )
}

export default DashboardPage