import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Card } from 'antd';
import { setStormId, setBasin, fetchStormQuery, fetchAdvis, setAdvisNum, advisnum } from '../features/wwLin/wwLineQuerySlice';
import { getAdvisory } from '../features/wwLin/wwLineQuerySlice';
import { fetchWwLin } from '../features/wwLin/wwLinSlice';

import { fetchMun } from '../features/mun/munSlice';


const { Option } = Select;
const SelectStormId = () => {
    const wwLineQuery = useSelector((state) => state.wwLineQuery);
    const advisory = useSelector(getAdvisory);
    const dispatch = useDispatch();

    const handleSelectBasinChange = (value) => {
        dispatch(setBasin(value));
    }

    const handleSelectChange = (value) => {
        dispatch(setStormId(value));
    };
    useEffect(() => {
        if (wwLineQuery.cyclons.length > 0) {
            dispatch(setStormId(wwLineQuery.cyclons[0].storm_id));
        };

    }, [wwLineQuery.cyclons]);

    useEffect(() => {
        dispatch(fetchStormQuery({ basin: wwLineQuery.basin }));
    }, [wwLineQuery.basin]);

    useEffect(() => {
        //dispatch(setAdvisNum('001'))
        dispatch(fetchAdvis({ id: wwLineQuery.stormid }))
        if (advisory.length > 0) {
            dispatch(setAdvisNum(advisory[0].adv_num));
        }
    }, [wwLineQuery.stormid]);


    useEffect(() => {
      
    }, [wwLineQuery.advisnum, wwLineQuery.stormid]);

    useEffect(() => {
        console.log(wwLineQuery.stormid, wwLineQuery.advisnum)
        dispatch(fetchWwLin({ id: wwLineQuery.stormid, advisnum: wwLineQuery.advisnum }));
        dispatch(fetchMun({ id: wwLineQuery.stormid, selectValue: wwLineQuery.advisnum }));
    }, [wwLineQuery.advisnum, wwLineQuery.stormid]);


    if (wwLineQuery.status === 'loading' || wwLineQuery.statusAdvis === 'loading' || advisory.length === 0 || wwLineQuery.cyclons.length === 0) {
        return null;
    }

    return (
        <Card style={{ width: 280, position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', zIndex: 1000 }}>
            <h3>Storm Selector</h3>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h5 style={{ textAlign: 'center', marginTop: '5px', marginRight: '10px' }}>Basin: </h5>

                <Select
                    style={{ width: 140, margin: 1 }}
                    value={wwLineQuery.basin}
                    placeholder="Select Basin"
                    onChange={handleSelectBasinChange}
                >
                    <Option value="al">Atlantic</Option>
                    <Option value="ep">East Pacific</Option>
                </Select>

            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h5 style={{ textAlign: 'center', marginTop: '5px', marginRight: '10px' }}>Storm</h5>
                <Select
                    style={{ width: 240, margin: 1 }}
                    value={wwLineQuery.stormid}
                    placeholder="Select a storm"
                    // Controlled value  
                    onChange={handleSelectChange} // Update state on change
                >
                    {wwLineQuery.cyclons.map((cyclon) => (
                        <Option key={cyclon.storm_id} value={cyclon.storm_id}>
                            {cyclon.storm_name}
                        </Option>
                    ))}
                </Select>

            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <h5 style={{ textAlign: 'center', marginTop: '5px', marginRight: '10px' }}>Advisory</h5>
                <Select
                    style={{ width: 100, margin: 1 }}
                    value={wwLineQuery.advisnum}
                    placeholder="Select Advisory"
                    onChange={(value) => dispatch(setAdvisNum(value))}
                >
                    {wwLineQuery.advisory.map((advis) => (
                        <Option key={advis.adv_num} value={advis.adv_num}>
                            {advis.adv_num}
                        </Option>
                    ))}
                </Select>
            </div>

        </Card>
    );
};

export default SelectStormId;