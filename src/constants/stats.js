
import {FiLoader} from 'react-icons/fi'
import {TiTick} from 'react-icons/ti'
import {IoIosPeople} from 'react-icons/io'
import {BsCurrencyDollar,BsCurrencyPound} from 'react-icons/bs'
import {BsBasket,BsShieldFillCheck} from 'react-icons/bs'
import {GiSandsOfTime} from 'react-icons/gi'

export const dashboardStats = (companies,sales,pending,completed) => {
    return [
      {
        heading: "Total Companies",
        stats: companies,
        icon:<IoIosPeople color="#fff"  size={36}/>
      },
      {
        heading: "Total Sales",
        stats: sales,
        icon:<BsCurrencyDollar color="#fff" size={36}/>
      },
      {
        heading: "Pending Orders",
        stats: pending,
        icon:<FiLoader color="#fff" size={36}/>

      },
      {
        heading: "Completed Orders",
        stats: completed,
        icon:<TiTick color="#fff" size={36}/>

      },
    ];
  };
  
export const detailsStats = (companies,sales,pending,completed) => {
    return [
      {
        heading: "Total Companies",
        stats: companies,
        icon:<IoIosPeople color="#fff"  size={36}/>
      },
      {
        heading: "Total Sales",
        stats: sales,
        icon:<BsCurrencyDollar color="#fff" size={36}/>
      },
      {
        heading: "Total Sales",
        stats: pending,
        icon:<FiLoader color="#fff" size={36}/>

      },
      {
        heading: "Total Sales",
        stats: completed,
        icon:<BsCurrencyPound color="#fff" size={36}/>

      },
    ];
  };

  export const orderDetailStats = (orders,progress,pending,ready,completed) => {
    return [
      {
        heading: "Total Orders",
        stats: orders,
        icon:<BsBasket color="#fff"  size={36}/>
      },
      {
        heading: "In Progress",
        stats: progress,
        icon:<GiSandsOfTime color="#fff" size={36}/>
      },
      {
        heading: "Pending Orders",
        stats: pending,
        icon:<FiLoader color="#fff" size={36}/>

      },
      {
        heading: "Ready to Deliver",
        stats: ready,
        icon:<BsShieldFillCheck color="#fff" size={36}/>

      },
      {
        heading: "Completed Orders",
        stats: completed,
        icon:<TiTick color="#fff" size={36}/>

      },
    ];
  };
  