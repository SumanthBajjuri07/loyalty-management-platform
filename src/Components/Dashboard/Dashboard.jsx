
// // import React, { useEffect, useState } from 'react';
// // import { createClient } from '@supabase/supabase-js';
// // import { Bar, Pie } from 'react-chartjs-2';
// // import 'chart.js/auto';
// // import './Dashboard.css';

// // const supabaseUrl = 'https://vfcdcttmvwskzqfpuqxq.supabase.co';
// // const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2RjdHRtdndza3pxZnB1cXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NjIwMDUsImV4cCI6MjAzNTQzODAwNX0.Y94iLW2Piy7Cqdcu9S0I9k_rr3CD99RbE--MDtpI4P0';

// // const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // const Dashboard = () => {
// //   const [barData, setBarData] = useState({
// //     labels: [],
// //     datasets: [
// //       {
// //         label: 'Number of Transactions',
// //         data: [],
// //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
// //         borderColor: 'rgba(75, 192, 192, 1)',
// //         borderWidth: 1,
// //       },
// //     ],
// //   });
// //   const [pieData, setPieData] = useState({
// //     labels: ['Credit', 'Debit'],
// //     datasets: [
// //       {
// //         data: [0, 0],
// //         backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
// //         borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
// //         borderWidth: 1,
// //       },
// //     ],
// //   });

// //   useEffect(() => {
// //     const fetchTransactions = async () => {
// //       const { data, error } = await supabase.from('Transactions').select('*');
// //       if (error) {
// //         console.error('Error fetching transactions:', error);
// //       } else {
// //         processTransactions(data);
// //       }
// //     };

// //     fetchTransactions();
// //   }, []);

// //   const processTransactions = (transactions) => {
// //     const dateMap = {};
// //     const operationTypeMap = { Credit: 0, Debit: 0 };

// //     transactions.forEach(transaction => {
// //       const date = new Date(transaction.credited_date_and_time).toLocaleDateString();
// //       dateMap[date] = (dateMap[date] || 0) + 1;
// //       operationTypeMap[transaction.operation_type] += 1;
// //     });

// //     setBarData({
// //       labels: Object.keys(dateMap),
// //       datasets: [
// //         {
// //           label: 'Number of Transactions',
// //           data: Object.values(dateMap),
// //           backgroundColor: 'rgba(75, 192, 192, 0.6)',
// //           borderColor: 'rgba(75, 192, 192, 1)',
// //           borderWidth: 1,
// //         },
// //       ],
// //     });

// //     setPieData({
// //       labels: ['Credit', 'Debit'],
// //       datasets: [
// //         {
// //           data: [operationTypeMap.Credit, operationTypeMap.Debit],
// //           backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
// //           borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
// //           borderWidth: 1,
// //         },
// //       ],
// //     });
// //   };


// //   return (
// //     <div className="dashboard">
// //       <h2>Transaction Dashboard</h2>
// //       <div className="chart-container">
// //         <div className="bar-chart">
// //           <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
// //         </div>
// //         <div className="pie-chart">
// //           <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;




// import React, { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './Dashboard.css';

// const supabaseUrl = 'https://vfcdcttmvwskzqfpuqxq.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2RjdHRtdndza3pxZnB1cXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NjIwMDUsImV4cCI6MjAzNTQzODAwNX0.Y94iLW2Piy7Cqdcu9S0I9k_rr3CD99RbE--MDtpI4P0';

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const Dashboard = () => {
//     const [transactions, setTransactions] = useState([]);

//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     const fetchTransactions = async () => {
//         const { data, error } = await supabase
//             .from('Transactions')
//             .select('*');

//         if (error) {
//             console.error('Error fetching transactions:', error);
//         } else {
//             setTransactions(data);
//         }
//     };

//     const getTransactionCountsByDate = () => {
//         const counts = {};
//         transactions.forEach(transaction => {
//             const date = new Date(transaction.credited_date_and_time).toISOString().split('T')[0];
//             counts[date] = (counts[date] || 0) + 1;
//         });
//         return counts;
//     };

//     const getOperationTypeCounts = () => {
//         const counts = { Credit: 0, Debit: 0 };
//         transactions.forEach(transaction => {
//             counts[transaction.operation_type] += 1;
//         });
//         return counts;
//     };

//     const transactionCountsByDate = getTransactionCountsByDate();
//     const operationTypeCounts = getOperationTypeCounts();

//     const barData = {
//         labels: Object.keys(transactionCountsByDate),
//         datasets: [
//             {
//                 label: 'Number of Transactions',
//                 data: Object.values(transactionCountsByDate),
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             },
//         ],
//     };

//     const pieData = {
//         labels: ['Credit', 'Debit'],
//         datasets: [
//             {
//                 label: 'Transaction Types',
//                 data: [operationTypeCounts.Credit, operationTypeCounts.Debit],
//                 backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
//             },
//         ],
//     };

//     const lineData = {
//         labels: Object.keys(transactionCountsByDate),
//         datasets: [
//             {
//                 label: 'Number of Transactions',
//                 data: Object.values(transactionCountsByDate),
//                 backgroundColor: 'rgba(153, 102, 255, 0.6)',
//                 borderColor: 'rgba(153, 102, 255, 1)',
//                 fill: false,
//             },
//         ],
//     };

//     return (
//         <div className="dashboard">
//             <h2>Dashboard</h2>
//             <div className="chart-grid">
//                 <div className="chart-container">
//                   <div className='bar-chart'> 
//                     <h3>Transactions Over Time (Bar Chart)</h3>
//                     <Bar data={barData} />
//                     </div>
//                 </div>
//                 <div className="chart-container">
//                      <div className='pie-chart'> 
//                     <h3>Credit vs Debit Transactions (Pie Chart)</h3>
//                     <Pie data={pieData} />
//                     </div>
//                 </div>
//             </div>
//             <div className="chart-container-full">
//                 <h3>Transactions Over Time (Line Chart)</h3>
//                 <Line data={lineData} />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

const supabaseUrl = 'https://vfcdcttmvwskzqfpuqxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2RjdHRtdndza3pxZnB1cXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NjIwMDUsImV4cCI6MjAzNTQzODAwNX0.Y94iLW2Piy7Cqdcu9S0I9k_rr3CD99RbE--MDtpI4P0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const { data, error } = await supabase
            .from('Transactions')
            .select('*');

        if (error) {
            console.error('Error fetching transactions:', error);
        } else {
            setTransactions(data);
        }
    };

    const getTransactionCountsByDate = () => {
        const counts = {};
        transactions.forEach(transaction => {
            const date = new Date(transaction.credited_date_and_time).toISOString().split('T')[0];
            counts[date] = (counts[date] || 0) + 1;
        });
        return counts;
    };

    const getOperationTypeCounts = () => {
        const counts = { Credit: 0, Debit: 0 };
        transactions.forEach(transaction => {
            counts[transaction.operation_type] += 1;
        });
        return counts;
    };

    const transactionCountsByDate = getTransactionCountsByDate();
    const operationTypeCounts = getOperationTypeCounts();

    const barData = {
        labels: Object.keys(transactionCountsByDate),
        datasets: [
            {
                label: 'Number of Transactions',
                data: Object.values(transactionCountsByDate),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieData = {
        labels: ['Credit', 'Debit'],
        datasets: [
            {
                label: 'Transaction Types',
                data: [operationTypeCounts.Credit, operationTypeCounts.Debit],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    const lineData = {
        labels: Object.keys(transactionCountsByDate),
        datasets: [
            {
                label: 'Number of Transactions',
                data: Object.values(transactionCountsByDate),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="charts-container">
                <div className="chart1">
                    <h3>Transactions Over Time (Bar Chart)</h3>
                    <Bar data={barData} />
                </div>
                <div className="chart2">
                    <h3>Credit vs Debit Transactions (Pie Chart)</h3>
                    <Pie data={pieData} />
              </div>
                </div>
                <div className="chart3">
                    <h3>Transactions Over Time (Line Chart)</h3>
                    <Line data={lineData} />
                </div>
            
        </div>
    );
};

export default Dashboard;



