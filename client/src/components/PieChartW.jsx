import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';

const data = [
    { name: 'Thể thao', value: 400 },
    { name: 'Giáo dục', value: 300 },
    { name: 'Sức khỏe', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Title = styled.h1`
    font-size: 50px;
    font-weight: 500;


`;
export default class Example extends PureComponent {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title>Phân bố media</Title>
                <PieChart width={1000} height={600} >
                    <Tooltip
                        contentStyle={{ background: '#fff', borderRadius: '5px' }}
                    />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="90%"
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <div>
                    {data.map(item => (
                        <div>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
