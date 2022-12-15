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
import { IconOrderTotal, IconRevenue, IconUser } from 'assets/icons/icons';
import numeral from 'numeral';
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
    const [totalUser, setTotalUser] = useState(0)
    const [revenue, setRevenue] = useState(0)
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
        let arrRev = new Array(12).fill(0)
        let label = new Array(12).fill(0)
        
        label = label.map((item, index) => `Tháng ${index+1}`)
        data.forEach(item => {
            if(item.is_paid) {
                arrRev[new Date(item.ship_date).getMonth()] += parseFloat(item.total) 
                console.log(item.total);
            }
        })

        let totalUserTemp = Array.from(new Set(data.map(item => item.user.id))).length
        setTotalUser(totalUserTemp)
        setRevenue(arrRev.reduce((acc, cur) => acc+cur,0))
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
        <div className='statistic-session'>
            <div className='row-statistic'>
                <div className='statistic-card revenue-card'>
                    <div className='title'>Doanh thu</div>
                    <div className='detail'>
                        <div className='revenue'><IconRevenue/></div>
                        <span>{numeral(revenue).format("0,0")}đ</span>
                    </div>
                </div>
                <div className='statistic-card order-card'>
                    <div className='title'>Đơn hàng</div>
                    <div className='detail'>
                    <div className='order'><IconOrderTotal/></div>
                        <span>{`${data.length} đơn`}</span>
                    </div>
                </div>
                <div className='statistic-card user-card'>
                    <div className='title'>Khách hàng</div>
                    <div className='detail'>
                    <div className='user'><IconUser/></div>
                        <span>{`${totalUser} người`}</span>
                    </div>
                </div>
            </div>
            <div className='chart-revenue'>
           <div style={{height:'400px',width:'700px', margin: 'auto'}}>
           { Object.keys(dataRevenue).length && <Bar options={options2} data={dataRevenue} />}
           </div>
        </div>
        </div>
    );
};

export default Statistic;