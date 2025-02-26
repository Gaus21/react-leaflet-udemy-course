import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { useState } from 'react';
import { setStormId } from '../features/wwLin/wwLineQuerySlice';
import { fetchWwLin } from '../features/wwLin/wwLinSlice';


const { Option } = Select;

const SelectStormId = () => {
    const wwLineQuery = useSelector((state) => state.wwLineQuery);
    const dispatch = useDispatch();
    const handleSelectChange = (value) => {
        dispatch(setStormId(value));
    };

    useEffect(() => {
        dispatch(fetchWwLin({ id: wwLineQuery.stormid }))
    }, [wwLineQuery.stormid,dispatch]);

    if (wwLineQuery.status === 'loading') {
        return null;
    }

    return (
        <Select
            style={{ width: 180, position: 'absolute', top: '80px', left: '10px', zIndex: 1000 }}
            value={wwLineQuery.stormid}
            placeholder="Select a storm"
            // Controlled value  
            onChange={handleSelectChange} // Update state on change
        >
            {wwLineQuery.features.map((item) => (
                <Option
                    key={item.properties.stormid}
                    value={item.properties.stormid}
                >
                    {item.properties.stormname}
                </Option>
            ))}
        </Select>
    );
};

export default SelectStormId;