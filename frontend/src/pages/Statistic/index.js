import paymentAPI from 'api/paymentAPI';
import React from 'react';
import { useState } from 'react';
import Chart from 'components/Chart';
import { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'TỔNG DOANH THU THEO TỪNG THÁNG',
        },
    },
};

const Statistic = ({}) => {
    const [data, setData] = useState([]);
    const [dataRevenue, setDataRevenue] = useState({})
    useEffect(() => {
      paymentAPI
        .allOrder()
        .then((rs) => {
          if (rs.status === 200) {
            console.log(rs.data);
            setData(rs.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);

    useEffect(() => {
        let arrRev = [0,0,0,0,0,0,0,0,0,0,0,0]
        let label = [0,0,0,0,0,0,0,0,0,0,0,0]
        console.log({arrRev});
        console.log({data});
        label = label.map((item, index) => `Tháng ${index+1}`)
        data.forEach(item => {
            if(item.is_paid) {
                arrRev[new Date(item.ship_date).getMonth()] += parseFloat(item.total) 
                console.log(item.total);
            }
        })
        console.log(arrRev);
        setDataRevenue(
            {
                labels: label,
                datasets: [
                    {
                        label: 'Tổng doanh thu',
                        data: arrRev,
                        backgroundColor: 'rgba(100, 99, 132, 0.5)',
                    },
                ],
            }
        )
    },[data])

    return (
        <div className='chart-revenue'>
           <div style={{height:'500px',width:'700px', margin: 'auto'}}>
           { Object.keys(dataRevenue).length && <Bar options={options2} data={dataRevenue} />}
           </div>
        </div>
    );
};

export default Statistic;