import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//         field: 'firstName',
//         headerName: 'First name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'lastName',
//         headerName: 'Last name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 110,
//         editable: true,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];


const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 200,
        editable: true,
        valueGetter: (params) => params.row.title || '',
    },
    {
        field: 'desc',
        headerName: 'Description',
        width: 300,
        editable: true,
        valueGetter: (params) => params.row.desc || '',
    },
    {
        field: 'viewCount',
        headerName: 'View Count',
        type: 'number',
        width: 120,
        editable: true,
        valueGetter: (params) => params.row.viewCount || '',
    },
    {
        field: 'tags',
        headerName: 'Tags',
        width: 180,
        editable: true,
        valueGetter: (params) => (params.row.tags ? params.row.tags.join(', ') : ''),
    },
    {
        field: 'likes',
        headerName: 'Likes',
        width: 120,
        editable: true,
        valueGetter: (params) => params.row.likes.length || '',
    },
    {
        field: 'dislikes',
        headerName: 'Dislikes',
        width: 120,
        editable: true,
        valueGetter: (params) => params.row.dislikes.length || '',
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 150,
        editable: true,
        valueGetter: (params) => params.row.category || '',
    },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => {
            const handleDelete = (id) => {
                const shouldDelete = window.confirm("Are you sure you want to delete this video?");
                if (shouldDelete) {
                    try {
                        axios.delete(`/videos/${id}`)
                            .then(() => {
                                window.location.reload();
                            });
                    } catch (err) {
                        console.log(err);
                    }
                }
            };
            return (
                <button onClick={() => handleDelete(params.row._id)} >Delete</button>
            );
        },
    }
];


// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataGridDemo() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get("/videos/search?q=");
                setVideos(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchVideos();

    }, []);

    // Wait for the videos to be fetched before rendering the DataGrid
    if (videos.length === 0) {
        return <p>Loading...</p>;
    }

    console.log(videos);
    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={videos}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                pageSizeOptions={[7]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
