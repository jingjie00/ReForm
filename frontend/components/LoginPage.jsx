import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
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

function LoginPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
    // putWalletApi();
  }, []);

  const verifyUploadProps = {
    name: 'attachments',
    multiple: true,
    // accept: 'image/jpg, .pdf',
    async onChange(e) {
      if (e.fileList.length > 1) {
        await navigator.clipboard.writeText('I have uploaded my salary slip.');
        setShowImage1(true);
      } else {
        await navigator.clipboard.writeText('Here, I have uploaded the invoice.');
        setShowImage2(true);
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
          <Chatbot
            config={config1}
            messageParser={MessageParser1}
            actionProvider={ActionProvider1}
          />

          {showSuccess && <div className="payment-success">Request Successful!</div>}

          <div className='w-full'>
            <Button onClick={() => { setShowImage3(true) }} className='w-full cursor-none bg-black text-white rounded-lg px-5 py-3 my-5'></Button>
          </div>
        </div>
        <div className='w-2/3 p-4'>
        {!showImage3 &&  <Dragger {...verifyUploadProps}>
            <div className='p-3 w-full border rounded-lg flex flex-col mt-2.5'>
              <div
                className='items-center align-center flex justify-center h-1/5'
                style={{
                  height: '8em',
                }}
              >
                <UploadOutlined style={{ fontSize: '6em', opacity: '0.6' }} />
              </div>
              <div
                className='flex justify-center align-center mb-3'
                style={{ opacity: '0.6' }}
              >
                Upload File
              </div>
              {/* <div>
                     <Button
                       className='flex border-2 border rounded-lg h-10 w-full text-center items-center justify-center button-primary'
                     >
                       <span className='font-semibold text-sm uppercase leading-none'>
                        Choose to Upload
                       </span>
                     </Button>
                   </div> */}
            </div>
          </Dragger>}
         

          <div className='flex gap-4 h-full'>
            {showImage1 && <img src="/images/image2.jpeg" className="w-1/4" alt="" onClick={() => setShowSuccess(true)} />}
            {showImage2 && <img src="/images/image1.jpeg" className="w-1/4" alt="" onClick={() => setShowSuccess(true)} />}
            {showImage3 && <iframe className='w-full h-full' src="/images/report.pdf" title="PDF Preview"></iframe>}

          </div>

        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
