import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SettingActions } from './reducers/settingReducer';
import Layout from './general/Layout';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

function CrudPage() {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.setting.records);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newRecordTitle, setNewRecordTitle] = useState('');
  const [newRecordLatex, setNewRecordLatex] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');

  // Function to load records from localStorage and update Redux state
  const loadRecordsFromLocalStorage = () => {
    const storedRecords = JSON.parse(localStorage.getItem('records')) || [];
    dispatch(SettingActions.setInitialRecords(storedRecords));
  };

  useEffect(() => {
    // Initial load from localStorage
    loadRecordsFromLocalStorage();

    // Listener to load records when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadRecordsFromLocalStorage();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  const updateLocalStorageAndState = (updatedRecords) => {
    localStorage.setItem('records', JSON.stringify(updatedRecords)); // Update localStorage
    dispatch(SettingActions.setInitialRecords(updatedRecords)); // Update Redux state
  };

  const handleAddRecord = () => {
    if (!newRecordTitle.trim() || !newRecordLatex.trim()) {
      return message.error('Both title and LaTeX content are required!');
    }

    const newRecord = {
      id: Date.now(),
      name: newRecordTitle,
      latex: newRecordLatex,
    };

    const updatedRecords = [...records, newRecord];
    updateLocalStorageAndState(updatedRecords);

    setNewRecordTitle('');
    setNewRecordLatex('');
    setIsAddModalOpen(false);
    message.success('Record added successfully');
  };

  const handleEditRecord = () => {
    if (!title.trim() || !markdown.trim()) {
      return message.error('Both title and LaTeX content are required!');
    }

    const updatedRecords = records.map((record) =>
      record.id === selectedRecord.id ? { ...record, name: title, latex: markdown } : record
    );
    updateLocalStorageAndState(updatedRecords);

    message.success('Record updated successfully');
    setIsEditModalOpen(false);
  };

  const handleDeleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    updateLocalStorageAndState(updatedRecords);

    message.success('Record deleted');
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setTitle(record.name);
    setMarkdown(record.latex);
    setIsEditModalOpen(true);
  };

  const openInOverleaf = () => {
    window.open('https://www.overleaf.com/project/6726fc76928aef48ab6203e7', '_blank');
  };

  const mathJaxConfig = {
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
  };

  return (
    <Layout>
      <div className="my-10 mx-auto max-w-3xl">
        <div className="border rounded-lg shadow-lg p-6 mb-5 bg-gray-50">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Edit Your Templates</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
              Add Record
            </Button>
          </div>
          <div className="border rounded-lg shadow-lg divide-y divide-gray-200">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex justify-between items-center p-2 hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer rounded-lg"
                onClick={() => openEditModal(record)}
              >
                <span className="text-sm font-medium">{record.name}</span>
                <div className="space-x-4">
                  <Button icon={<EditOutlined style={{ fontSize: '20px' }} />} onClick={(e) => e.stopPropagation()} />
                  <Button
                    icon={<DeleteOutlined style={{ fontSize: '20px' }} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRecord(record.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Record Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden flex">
              <div className="w-1/2 p-6 bg-gray-100 scale-100">
                <h3 className="text-lg font-semibold mb-4 text-xl">Add New Record</h3>
                <input
                  type="text"
                  value={newRecordTitle}
                  onChange={(e) => setNewRecordTitle(e.target.value)}
                  placeholder="Enter record title"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={newRecordLatex}
                  onChange={(e) => setNewRecordLatex(e.target.value)}
                  className="w-full h-3/4 border border-gray-300 p-4 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter LaTeX content here..."
                />
              </div>

              <MathJaxContext config={mathJaxConfig}>
                <div className="w-1/2 p-6 bg-white flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-xl">LaTeX Preview</h3>
                    <button
                      onClick={openInOverleaf}
                      className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-sm"
                    >
                      Open in Overleaf
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto p-4 border border-gray-200 rounded-md bg-gray-50">
                    <MathJax dynamic>{newRecordLatex}</MathJax>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRecord}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Add Record
                    </button>
                  </div>
                </div>
              </MathJaxContext>
            </div>
          </div>
        )}

        {/* Edit Record Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full h-3/4 max-w-3xl rounded-lg shadow-lg overflow-hidden flex scale-100">
              <div className="w-1/2 p-6 bg-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-xl">Edit Record</h3>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Edit record title"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full h-3/4 border border-gray-300 p-4 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Edit LaTeX content here..."
                />
              </div>

              <MathJaxContext config={mathJaxConfig}>
                <div className="w-1/2 p-6 bg-white flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-xl">LaTeX Preview</h3>
                    <button
                      onClick={openInOverleaf}
                      className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-sm"
                    >
                      Open in Overleaf
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto p-4 border border-gray-200 rounded-md bg-gray-50">
                    <MathJax dynamic>{markdown}</MathJax>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditRecord}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </MathJaxContext>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CrudPage;
