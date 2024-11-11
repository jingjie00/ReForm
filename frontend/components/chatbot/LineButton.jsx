import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const WhiteLineComponent = ({action}) => {
  const dispatch = useDispatch();

  console.log(action)
  if(action==="showDb"){
    dispatch(SettingActions.setShowDb(true));
  }

  return (
    <div
      style={{
        width: '100%',
        height: '1px',
        backgroundColor: 'white',
      }}
    ></div>
  );
};

export default WhiteLineComponent;
