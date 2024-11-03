import React, { useState } from 'react';
import { Button, List, message } from 'antd';
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

  const handleAddRecord = () => {
    if (!newRecordTitle.trim() || !newRecordLatex.trim()) {
      return message.error('Both title and LaTeX content are required!');
    }
  
    // Create a new record with id, name, and latex properties
    const newRecord = {
      id: Date.now(),        // Generate a unique ID
      name: newRecordTitle,   // Title of the record
      latex: newRecordLatex,  // LaTeX content of the record
    };
  
    // Dispatch the new record to the Redux store
    dispatch(SettingActions.addRecord(newRecord));
    
    // Reset the input fields and close the modal
    setNewRecordTitle('');
    setNewRecordLatex('');
    setIsAddModalOpen(false);
    message.success('Record added successfully');
  };

  const handleEditRecord = () => {
    if (!title.trim() || !markdown.trim()) {
      return message.error('Both title and LaTeX content are required!');
    }
    dispatch(SettingActions.updateRecord({ id: selectedRecord.id, name: title, latex: markdown }));
    message.success('Record updated successfully');
    setIsEditModalOpen(false);
  };

  const handleDeleteRecord = (id) => {
    dispatch(SettingActions.deleteRecord(id));
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

  // MathJax configuration to support inline and display math
  const mathJaxConfig = {
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
  };
  return (
    <Layout>
      <div className="my-10 mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">CRUD Actions</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
            Add Record
          </Button>
        </div>
        <div className="border rounded-lg divide-y divide-gray-200">
  {records.map((record) => (
    <div
      key={record.id}
      className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
      onClick={() => openEditModal(record)}
    >
      {/* Render only record.name here, which should be a string */}
      <span className="cursor-pointer text-lg">{record.name}</span>
      <div className="space-x-2">
        <Button 
          icon={<EditOutlined />} 
          onClick={(e) => e.stopPropagation()} 
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteRecord(record.id);
          }}
        />
      </div>
    </div>
  ))}
</div>



        {/* Add Record Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-[60%] h-3/4 rounded-lg shadow-lg overflow-y-scroll flex">
              {/* Left Side - Title and Raw LaTeX Input */}
              <div className="w-1/2 p-6 bg-gray-100">
                <h3 className="text-lg font-semibold mb-4">Add New Record</h3>
                <input
                  type="text"
                  value={newRecordTitle}
                  onChange={(e) => setNewRecordTitle(e.target.value)}
                  placeholder="Enter record title"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
                <textarea
                  value={newRecordLatex}
                  onChange={(e) => setNewRecordLatex(e.target.value)}
                  className="w-full h-3/4 border border-gray-300 p-4 rounded-md resize-none"
                  placeholder="Enter LaTeX content here..."
                />
              </div>

              {/* Right Side - Rendered LaTeX Preview */}
              <MathJaxContext config={mathJaxConfig}>
                <div className="w-1/2 p-6 bg-white flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">LaTeX Preview</h3>
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
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRecord}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
            <div className="bg-white w-full max-w-6xl h-3/4 rounded-lg shadow-lg overflow-hidden flex">
              {/* Left Side - Title and Raw LaTeX Input */}
              <div className="w-1/2 p-6 bg-gray-100">
                <h3 className="text-lg font-semibold mb-4">Edit Record</h3>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Edit record title"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full h-full border border-gray-300 p-4 rounded-md resize-none"
                  placeholder="Edit LaTeX content here..."
                />
              </div>

              {/* Right Side - Rendered LaTeX Preview */}
              <MathJaxContext config={mathJaxConfig}>
                <div className="w-1/2 p-6 bg-white flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">LaTeX Preview</h3>
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
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditRecord}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
