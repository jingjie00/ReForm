import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const RecordViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const record = useSelector((state) => state.settings.records.find((r) => r.id === parseInt(id)));

  if (!record) {
    return <div>Record not found</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left side red */}
      <div className="w-1/2 bg-red-500 flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">{record.name}</h1>
      </div>

      {/* Right side yellow */}
      <div className="w-1/2 bg-yellow-500 flex justify-center items-center">
        <Button type="primary" onClick={() => router.back()}>Back to List</Button>
      </div>
    </div>
  );
};

export default RecordViewPage;
