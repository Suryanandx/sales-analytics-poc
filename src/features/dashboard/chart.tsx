import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect, useState } from 'react';
  import { Line } from 'react-chartjs-2';
import { db } from '../../config/firebase.config';
import { firebaseLooper } from '../../tools/firebase.utils';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  


  const Chart = () => {

    const [sales, setSales] = useState<any | []>([])
    const [negative, setNegative] = useState<any | []>([])
    const [labelsData, setLabels] = useState<any | []>([])
    const [orders, setOrders] = useState<any | []>([])
    const [total, setTotal] = useState(0)

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Overall Sales Analysis ',
        },
      },
    };
    
    const labels = [...labelsData];
    
   const data = {
      labels,
      datasets: [
        {
          label: 'Profitable Sales',
          data: sales,
          borderColor: '#539165',
          backgroundColor: '#5D9C59',
        },
        {
          label: 'rejected Orders',
          data: negative,
          borderColor: '#DF2E38',
          backgroundColor: '#DF2E38',
        },
      ],
    };

    useEffect(() => {
      db.collection('orders').where('orderStatus', '==', 'ACCEPTED').onSnapshot(snap => {
        const data = firebaseLooper(snap)
        setOrders(data)
        let temp = []
        let labeltemp = []
        let sum = 0;
        for (let i = 0; i <= data.length; i++) {
          temp.push(data[i]?.amount)
          
        }
        for (let i = 0; i <= data.length; i++) {
          labeltemp.push(data[i]?.productId.substring(0,4))
        }
        if(temp.length > 0){
           setSales(temp)
           setLabels(labeltemp)
        }
       
      })
      db.collection('orders').where('orderStatus', '==', 'REJECTED').onSnapshot(snap => {
        const data = firebaseLooper(snap)
        let temp = []
        for (let i = 0; i <= data.length; i++) {
          temp.push(data[i]?.amount)
        }
     
        if(temp.length > 0){
           setNegative(temp)
        }
       
      })
    }, [])
    function sumArray(array : any[]) {
      let sum = 0; 
    
    /*Go through each item in the array and execute this function which adds
    each item to sum 
    */
      array.forEach(item => {
        sum += parseInt(item.amount);
      });
    
      console.log(sum); 
      return ((sum/array.length) * 2.5);
    }
    

    return (<div className='p-4'>
       <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
  <div className="flex-auto p-4">
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-2/3 max-w-full px-3">
        <div>
          <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Profit</p>
          <h5 className="mb-0 font-bold">
            {Math.floor(sumArray(orders))}
            <span className="leading-normal text-sm font-weight-bolder text-lime-500">+profit %</span>
          </h5>
        </div>
      </div>
      <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
        <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
          <i className="ni ni-money-coins text-lg relative top-3.5 text-white" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</div>
      <Line options={options} data={data} />
      </div>)
  }

  export default Chart