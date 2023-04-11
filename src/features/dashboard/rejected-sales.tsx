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
  


  const RejectedChart = () => {

    const [sales, setSales] = useState<any | []>([])
    const [negative, setNegative] = useState<any | []>([])
    const [labelsData, setLabels] = useState<any | []>([])

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Rejected Sales Analysis ',
        },
      },
    };
    
    const labels = [...labelsData];
    
   const data = {
      labels,
      datasets: [
 
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
        let temp = []
        const labeltemp = []
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

    

    return <Line options={options} data={data} />
  }

  export default RejectedChart