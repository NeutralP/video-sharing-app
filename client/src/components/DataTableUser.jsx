import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'subscriberCount', headerName: 'Subscriber Count', type: 'number', width: 180 },
    {
        field: 'subscribedUsers',
        headerName: 'Subscribed Users',
        width: 150,
        valueGetter: (params) => (params.row.subscribedUsers ? params.row.subscribedUsers.length : ''),
    },
    {
        field: 'fromGoogle',
        headerName: 'From Google',
        width: 150,
        type: 'boolean',
        renderCell: (params) => params.row.fromGoogle ? 'Yes' : 'No',
    },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => {
            const handleDelete = (id) => {
                const shouldDelete = window.confirm("Are you sure you want to delete this user?");
                if (shouldDelete) {
                    try {
                        axios.delete(`/users/${id}`)
                            .then(() => {
                                window.location.reload();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } catch (err) {
                        console.log(err);
                    }
                }
            };

            return (
                <button onClick={() => handleDelete(params.row._id)}>Delete</button>
            );
        },
    },
];

export default function DataGridDemo() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/users"); // Replace with the actual API endpoint for fetching users
                setUsers(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    // Wait for the users to be fetched before rendering the DataGrid
    if (!users) {
        return <p>Loading...</p>;
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row._id} // Use _id as the unique identifier for each row
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
