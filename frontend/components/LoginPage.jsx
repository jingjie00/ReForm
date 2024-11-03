import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import Chatbot from "react-chatbot-kit";
import config1 from "./chatbot1/config1";
import MessageParser1 from "./chatbot1/MessageParser1";
import ActionProvider1 from "./chatbot1/ActionProvider1";
import Dragger from 'antd/lib/upload/Dragger';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useFetcher } from 'react-router-dom';
import axios from "axios";
import useSelection from 'antd/lib/table/hooks/useSelection';

function LoginPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showImage0, setShowImage0] = useState(false);
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [showImage4, setShowImage4] = useState(false);
  const [showImage5, setShowImage5] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false)
  const [iframeContent, setIframeContent] = useState(<div></div>)
  const uploadedFile = useSelector((state) => state.setting.uploadedfile);
const showDb = useSelector((state) => state.setting.showDb);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
    // putWalletApi();
  }, []);

  useEffect(()=>{
if(showImage3===true){
setIframeContent(<iframe className='w-full h-full' src="/images/mcmc invoice.pdf" title="MCMC invoice"></iframe>)
}
  }, [showImage3])

  useEffect(()=>{
if(showImage4===true){
 setIframeContent(<iframe className='w-full h-full' src="/images/stock_report.pdf" title="Stock Report"></iframe>)
}
  }, [showImage4])

  useEffect(()=>{
    if(showImage5===true){
  setIframeContent(<iframe className='w-full h-full' src="/images/trend_analysis.pdf" title="Trend Analysis"></iframe>)
    }
  }, [showImage5])

  useEffect(()=>{
    if(uploadedFile?.length>0){
  setIframeContent(<div className="mt-4 w-full h-full overflow-x-scroll">
    <table className="table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          {uploadedFile[0].map((header, index) => (
            <th key={index} className="border px-4 py-2 bg-gray-200">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Limit to the first 10 rows */}
        {uploadedFile.slice(1, 11).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border px-4 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {uploadedFile.length > 11 && (
      <p className="text-sm text-gray-500 mt-2">
        Showing first 10 rows of {uploadedFile.length - 1} total rows
      </p>
    )}
  </div>)
    }
  }, [uploadedFile])

  useEffect(()=>{
    if(showDb===true){
      setIframeContent( <div className="w-full h-full">
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQY__Dj1DGHH-QSQm3ZfoggADyMkkgNEi9pMwpUm052p7IdcPFNCZ8kJW7iuX7wp4R8Ah08IlPuY2M1/pubhtml?widget=true&amp;headers=true"
          className="w-full h-full rounded-lg mt-1 pointer-events-none" // pointer-events-none to disable clicks on iframe
          title="Google Sheets"
        ></iframe>
        
        <div className="flex flex-row justify-between">
        <button
            onClick={() => {
              window.open(
                'https://docs.google.com/spreadsheets/d/1RRRfXNgdPckR3siiBEoRBwFRp-QjtX3cCLmZjqRGthE/edit?usp=sharing',
                '_blank'
              );
            }}
            className="absolute bottom-4 right-20 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
          >
            Edit in Sheets
          </button>
          <button
            onClick={() => {
              window.open(
                'https://docs.google.com/spreadsheets/d/1RRRfXNgdPckR3siiBEoRBwFRp-QjtX3cCLmZjqRGthE/edit?usp=sharing',
                '_blank'
              );
            }}
            className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-lg"
          >
            Edit in SQL
          </button>
        </div>
        
        </div>)
     
    }
  }, [showDb])

  const verifyUploadProps = {
    name: 'attachments',
    multiple: true,
    // accept: 'image/jpg, .pdf',
    async onChange(e) {
      if (e.fileList.length == 1 ) {
        if (!flag) {
          await navigator.clipboard.writeText('I submitted a past invoice sample.');
          setShowImage0(true);
        }else{
          await navigator.clipboard.writeText('Here you go');
          setShowImage2(true);
        }
      } else if (e.fileList.length == 2) {
        await navigator.clipboard.writeText('Ok. I need a system to track all invoice I generated before. Here is the excel listing.');
        setShowImage1(true);
      }
    },
    onDrop(e) {
      // uploadToServer(e);
    },
  };

  return (
    <Layout>
      <div className='flex flex-row h-5/6'>
        <div className='w-1/3 p-4'>
        <div className='w-full'>
       
        <Button  className='w-full cursor-none bg-red-500 text-white rounded-lg px-5 py-3' onClick={()=>{
          dispatch(SettingActions.setShowDb(true));
          dispatch(SettingActions.setUploadedFile(null));
        }}></Button>
        <Button className='bg-[#e5e7eb]'></Button>
          
          </div>
          <Chatbot
            config={config1}
            messageParser={MessageParser1}
            actionProvider={ActionProvider1}
          />

          {showSuccess && <div className="payment-success">Request Successful!</div>}

          <div className='w-full'>
          <Button className='w-full cursor-none bg-red-500 text-white rounded-lg px-5 py-3' onClick={()=>{
            dispatch(SettingActions.setShowDb(false));
            setShowImage3(true);
            
          }}></Button>
         
          </div>
        </div>
        <div className='w-2/3 p-4'>
          <div className={`flex gap ${showImage3||showImage4||showImage5  ? 'h-full' : 'h-full'}`}>
            {/* {showImage3 && <iframe className='w-full h-full' src="/images/mcmc invoice.pdf" title="MCMC invoice"></iframe>}
            {showImage4 && <iframe className='w-full h-full' src="/images/stock_report.pdf" title="Stock Report"></iframe>}
            {showImage5 && <iframe className='w-full h-full' src="/images/trend_analysis.pdf" title="Trend Analysis"></iframe>}
         
            {uploadedFile && (
            <div className="mt-4 w-full h-full overflow-x-scroll">
              <table className="table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {uploadedFile[0].map((header, index) => (
                      <th key={index} className="border px-4 py-2 bg-gray-200">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
     
                  {uploadedFile.slice(1, 11).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {uploadedFile.length > 11 && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing first 10 rows of {uploadedFile.length - 1} total rows
                </p>
              )}
            </div>
          )}

          {
showDb && <div className="w-full h-full">
<iframe
  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQY__Dj1DGHH-QSQm3ZfoggADyMkkgNEi9pMwpUm052p7IdcPFNCZ8kJW7iuX7wp4R8Ah08IlPuY2M1/pubhtml?widget=true&amp;headers=true"
  className="w-full h-full rounded-lg mt-1 pointer-events-none" // pointer-events-none to disable clicks on iframe
  title="Google Sheets"
></iframe>

<button
    onClick={() => {
      window.open(
        'https://docs.google.com/spreadsheets/d/1RRRfXNgdPckR3siiBEoRBwFRp-QjtX3cCLmZjqRGthE/edit?usp=sharing',
        '_blank'
      );
    }}
    className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
  >
    Open in New Tab
  </button>
</div>
          } */}
          {iframeContent}
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
