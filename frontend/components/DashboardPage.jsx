import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import {
  DollarOutlined,
  UserOutlined,
  TrophyOutlined,
  SmileOutlined,
  FundOutlined,
  RiseOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import {
  Card, Col, Row, Statistic, List, Avatar, Table, Tag, Space, Timeline, message, notification, Button, Switch,
} from 'antd';
import { Pie, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import 'aos/dist/aos.css';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import 'chart.js/auto';
import 'swiper/swiper-bundle.css';
import emailjs from 'emailjs-com';

// Dynamically import Donut from @ant-design/charts
const Donut = dynamic(() => import('@ant-design/charts').then((mod) => mod.Donut), { ssr: false });

// Dynamically import MapContainer, TileLayer, Marker, and Popup from react-leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});



const getTransactionApi = () =>
  axios
    .request({
      method: "get",
      url: "https://service-testnet.maschain.com/api/token/get-token-transaction?wallet_address=0xdA383c9CaCa3dbfCbF8535fFB9B8E8F3eD9CD70c&contract_address=0x03B8a1a8eF80AeD20d8dF9f1A18dE8150BD49C83&filter=from",
      headers: {
        "Content-Type": "application/json",
        client_id:
          "0264a6a2135d0b766d212db38a1a0fcd2334c651acb32b69098c2fb0c6c98db9",
        client_secret:
          "sk_59bb96279047f2365169a00b7ced5e4d39f5ed5e7da417b3d5c1d849dd697318",
      },
    })
    .then((response) => console.log(response))
    .catch((error) => false);

function DashboardPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.setting.username);
  const [donatedAmount, setDonatedAmount] = useState(150000);
  const [L, setL] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState({
    peopleHelped: 17,
    projectsFunded: 23,
    resourcesProvided: 3000,
  });
  const [showWalletAddress, setShowWalletAddress] = useState(false); // State to toggle the column

  useEffect(() => {
    //getTransactionApi();
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import Leaflet dynamically and set the state
      import("leaflet").then((leaflet) => {
        delete leaflet.Icon.Default.prototype._getIconUrl;

        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        });

        setL(leaflet);
      });

      // Import Leaflet CSS
      require("leaflet/dist/leaflet.css");
    }
  }, []);

  useEffect(() => {
    // Simulate fetching recent donations
    setRecentDonations([
      {
        donor: 'John Doe', amount: 100, date: '2024-07-23', walletAddress: 'mas1qql8h3ndhz2gmv8km5t7dgywysh0lxk59uv9xs0',
      },
      {
        donor: 'Jane Smith', amount: 250, date: '2024-07-22', walletAddress: 'mas1qxh7yf0q2csz9xgec8jtq7ejx0k3h4f8z3x5py5',
      },
      {
        donor: 'Alice Johnson', amount: 50, date: '2024-07-21', walletAddress: 'mas1qqp6a8g2x24vpxqg0k3w8s4xv9gt5rftjucm77m',
      },
    ]);

    // Simulate fetching top donors
    setTopDonors([
      { name: 'John Doe', amount: 10000 },
      { name: 'Jane Smith', amount: 7500 },
      { name: 'Alice Johnson', amount: 5000 },
    ]);
  }, []);

  const donationLocations = [
    {
      id: 1,
      name: 'Chauncey Bowen',
      position: [3.139, 101.6869],
      amount: 'RM100',
      imageUrl: '/images/sickkid3.jpg',
      transactions: [
        { item: 'First Aid Kits', cost: 'RM30' },
        { item: 'Antibiotics', cost: 'RM20' },
        { item: 'Bandages and Dressings', cost: 'RM50' },
      ],
    },
    {
      id: 2,
      name: 'Toni Petersen',
      position: [1.3521, 103.8198],
      amount: 'RM250',
      imageUrl: '/images/sickkid2.jpg',
      transactions: [
        { item: 'Surgical Instruments', cost: 'RM100' },
      { item: 'Patient Meals', cost: 'RM100' },
      { item: 'Sterilization Equipment', cost: 'RM50' },
      ],
    },
    {
      id: 3,
      name: 'Meritxell Mata',
      position: [13.7563, 100.5018],
      amount: 'RM50',
      imageUrl: '/images/sickkid1.jpg',
      transactions: [
        { item: 'Clean Water for Patients', cost: 'RM50' },
      ],
    },
  ];

  const openNotification = () => {
    notification.open({
      message: 'New Donation!',
      description: 'John Doe just donated $100.',
      icon: <DollarOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const tilesInfo = [
    {
      label: "Total Revenue",
      amount: donatedAmount,
      antdIcon: (
        <DollarOutlined style={{ fontSize: "40px", color: "orange" }} />
      ),
    },
    {
      label: 'Total Employees',
      amount: impactMetrics.peopleHelped,
      antdIcon: <UserOutlined style={{ fontSize: '40px', color: 'blue' }} />,
    },
    {
      label: "",
      amount: "Big Data Awards 2023",
      antdIcon: <TrophyOutlined style={{ fontSize: "40px", color: "green" }} />,
    },
    {
      label: 'Profits',
      amount: 'RM80,000',
      antdIcon: <FundOutlined style={{ fontSize: '40px', color: 'purple' }} />,
    },
    {
      label: 'Target Growth',
      amount: '35%',
      antdIcon: <RiseOutlined style={{ fontSize: '40px', color: 'red' }} />,
    }
  ];

  const notifications = [
    {
      message: 'Your donation to Chauncey Bowen has been processed',
      date: '2024-07-31',
    },
    {
      message: 'Your donation to Jarin Son has been processed',
      date: '2024-07-31',
    },
    {
      message: 'Your donation to Mini Fluron has been processed',
      date: '2024-07-29',
    },
    {
      message: 'Your donation to Toni Petersen has been processed',
      date: '2024-07-29',
    },
    {
      message: 'New leaderboard update: You are now ranked 5th in the world!',
      date: '2024-07-28',
    },
  ];

  const recentActivities = [
    { activity: "Cashed in RM50000", date: "2024-07-31" },
    { activity: "Cashed in RM50000", date: "2024-07-31" },
    { activity: "Cashed in RM50000", date: "2024-07-30" },
    { activity: "Cashed in RM50000", date: "2024-07-28" },
    { activity: "Cashed in RM100", date: "2024-07-28" },
  ];


  const successStories = [
    {
      image: '/images/bg1.png',
      quote: 'Amazing quality and fast shipping! I’ll definitely shop here again!',
    },
    {
      image: '/images/bg1.png',
      quote: 'Outstanding support and a fantastic end product. Thank you, reFORM',
    },
    // Add more stories as needed
  ];

  // Data for Line Chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Donation Trends',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const donutConfig = {
    appendPadding: 10,
    data: [
      { type: 'Malaysia', value: 300 },
      { type: 'Singapore', value: 500 },
      { type: 'Thailand', value: 200 },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    color: ['#FF6384', '#36A2EB', '#FFCE56'],
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  // Columns for the Donation Transactions table
  const columns = [
    {
      title: 'Donation Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Token Amount',
      dataIndex: 'tokens',
      key: 'tokens',
    },
    {
      title: 'To Wallet Address',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      className: showWalletAddress ? '' : 'hidden', // Use Tailwind's hidden class
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Donation Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  // Data for the Donation Transactions table
  const dataSource = [
    {
      key: '1',
      amount: 'RM50000',
      tokens: '500000 Tokens',
      date: '2024-07-30',
      recipient: 'Kusal Perera',
      type: 'Auto',
      walletAddress: '0xE23ee739b2D4aBf36Bf74f96C4CFd0f46B9737cd',
    },
    {
      key: '2',
      amount: 'RM50000',
      tokens: '500000 Tokens',
      date: '2024-07-30',
      recipient: 'Siti binti Aminah',
      type: 'Auto',
      walletAddress: '0xF3fBdD4a6Bf7f46Bf396C4CF9737cd03ee739b2',
    },
    {
      key: '3',
      amount: 'RM50000',
      tokens: '500000 Tokens',
      date: '2024-07-30',
      recipient: 'Li Changming',
      type: 'Auto',
      walletAddress: '0xB21dC7d89278eD943bc5274F5b1cD8eE3E4F3C6d',
    },
    {
      key: '4',
      amount: 'RM2500',
      tokens: '2500 Tokens',
      date: '2024-07-30',
      recipient: 'Cempaka binti Sugriwa',
      type: 'Auto',
      walletAddress: '0xA17cE75bF2360Dc2Fb3D547D7cB3A8D16c34B6B1',
    },
    {
      key: '5',
      amount: 'RM50000',
      tokens: '50000 Tokens',
      date: '2024-07-29',
      recipient: 'Li Changming',
      type: 'User',
      walletAddress: '0xB21dC7d89278eD943bc5274F5b1cD8eE3E4F3C6d',
    },
    {
      key: '6',
      amount: 'RM75',
      tokens: '75 Tokens',
      date: '2024-07-28',
      recipient: 'Mo Huiliang',
      type: 'Auto',
      walletAddress: '0xC42eD2cB5F47B3cE8D7f5B4d4cD6aF7eE6C8B7f',
    },
  ];

  return (
    <Layout>
      <div className='w-2/3 mx-auto my-12 px-4'>
        <header className='mb-8'>


          <div
            className='text-white text-center p-6 rounded-xl shadow-md bg-cover bg-center transition-transform transform hover:scale-105 duration-900'
            style={{ backgroundImage: 'url(/images/backg.jpeg)' }}
          >
            <h1 className='ml-14 text-3xl font-bold text-white animate-bounce'>
              Welcome to reFORM, {username || 'Jason'}
            </h1>
            <p  className='mt-2 ml-14 text-xl text-white'>
              A Revolution for All Your Forms
            </p>
          </div>
        </header>

        <Row>
          <div className='grid w-full grid-cols-3 gap-6 my-8'>
            {tilesInfo.map((tile, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-xl shadow-md flex items-center transition-transform transform hover:scale-105 duration-900'
              >
                <div className='text-4xl mr-4'>{tile.antdIcon}</div>
                <div>
                  <div className='text-gray-500 text-sm'>{tile.label}</div>
                  <div className='text-2xl font-bold'>{tile.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </Row>
        
        <div className='my-8 rounded-lg'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-3'>Employee Performance</h2>
            <img src="./images/performance.png" alt=""  style={{ borderRadius: '15px' }} />
          </div>
        </div>

        <div className='my-8 rounded-lg'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-3'>Monthly Sales</h2>
            <img src="./images/sales.png" alt=""  style={{ borderRadius: '15px' }} />
          </div>
        </div>

        <div className='my-8'>
          <Card className='transition-transform transform hover:scale-105 duration-900'>
            <h2 className='text-2xl font-bold text-center mb-6'>Customer Testimonials</h2>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              loop
              autoplay={{ delay: 500 }}
              pagination={{ clickable: true }}
            >
              {successStories.map((story, index) => (
                <SwiperSlide key={index}>
                  <div
                    className='h-64 flex items-center justify-center text-white text-center p-8 rounded-lg bg-cover bg-center'
                    style={{ backgroundImage: `url(${story.image})` }}
                  >
                    <p className='text-xl font-semibold bg-black bg-opacity-50 p-4 rounded-lg'>
                      {story.quote}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
        </div>

        <div className='my-8 rounded-lg'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-3'>Customer Report</h2>
            <img src="./images/customer.png" alt=""  style={{ borderRadius: '15px' }} />
          </div>
        </div>

        

        
      </div>
    </Layout>
  );
}

export default DashboardPage;
