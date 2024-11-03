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
import { Button } from 'antd';

function LoginPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showImage3, setShowImage3] = useState(false);
  const [showImage4, setShowImage4] = useState(false);
  const [showImage5, setShowImage5] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [iframeContent, setIframeContent] = useState(<div></div>);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const uploadedFile = useSelector((state) => state.setting.uploadedfile);
  const showDb = useSelector((state) => state.setting.showDb);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, [dispatch]);

  useEffect(() => {
    if (showImage3) {
      setIframeContent(<iframe className='w-full h-full' src="/images/mcmc invoice.pdf" title="MCMC invoice"></iframe>);
    }
  }, [showImage3]);

  useEffect(() => {
    if (showImage4) {
      setIframeContent(<iframe className='w-full h-full' src="/images/stock_report.pdf" title="Stock Report"></iframe>);
    }
  }, [showImage4]);

  useEffect(() => {
    if (showImage5) {
      setIframeContent(<iframe className='w-full h-full' src="/images/trend_analysis.pdf" title="Trend Analysis"></iframe>);
    }
  }, [showImage5]);

  useEffect(() => {
    if (uploadedFile?.length > 0) {
      setIframeContent(
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
      );
    }
  }, [uploadedFile]);

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
          await navigator.clipboard.writeText('Here is the stock summary');
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
          <Button className='w-full bg-red-500 text-white rounded-lg px-5 py-3' onClick={() => {
            dispatch(SettingActions.setShowDb(true));
            dispatch(SettingActions.setUploadedFile(null));
          }}>
          </Button>

          <Chatbot config={config1} messageParser={MessageParser1} actionProvider={ActionProvider1} />

          {showSuccess && <div className="payment-success">Request Successful!</div>}

          <Button className='w-full bg-red-500 text-white cursor-none rounded-lg px-5 py-3 mt-4' onClick={() => {
            dispatch(SettingActions.setShowDb(false));
            setShowImage3(true);
          }}>
          </Button>

          <Button className='w-full bg-[#f5f6f6] text-white cursor-none rounded-lg px-5 py-3 mt-1' onClick={() => {
            setShowImage5(true);
          }}>
          </Button>
        </div>
        <div className='w-2/3 p-4'>
          <div className={`flex gap h-full`}>
            {iframeContent}
          </div>
        </div>
      </div>

      {/* SQL Edit Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/2 rounded-lg shadow-lg p-6 relative">
            <h2 className="text-2xl font-semibold mb-4">Edit SQL Query</h2>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="Write your SQL query here..."
              className="w-full h-48 p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeSqlModal}
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => alert('Submitted!')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default LoginPage;
