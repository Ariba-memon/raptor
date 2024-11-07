import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import { useGetScooters } from '../../../api/query';
import { useUpdateScooter } from '../../../api/mutations';
import Table from '../../tables/mui-table/Table';
import mockData from './mokeData';
import { columns, initialColumnVisibility } from './columns';
import FormAuth from './FormAuth';

const Scooters = () => {
  // Call hooks at the top level
  const { mutateAsync: updateScooter } = useUpdateScooter();
  const { data: scooters, isLoading, isError } = useGetScooters(0, 100);

  const [allScooters, setAllScooters] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (scooters) {
      setAllScooters(scooters);
    }
  }, [scooters]);

  if (isLoading) {
    return (
      <LinearProgress
        sx={{
          height: 8,
          borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#bc2d2d',
          },
        }}
      />
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="app-user-list">
      <Table
        data={allScooters}
        dynamicColumns={columns}
        FormAuth={FormAuth}
        initialColumnVisibility={initialColumnVisibility}
        setTitle={setTitle}
        title={title}
        updateScooter={updateScooter}
        mockData={mockData}
      />
    </div>
  );
};

export default Scooters;
