import React, { useState } from 'react';
import Select from 'react-select';

const useSelect = (initialState, options) => {
  const [state, setState] = useState(initialState);

  const handleChange = (selectedOption) => {
    setState(selectedOption);
  };

  const SelectHook = () => (
    <Select
      instanceId={(option) => option.id}
      className='mt-3'
      options={options}
      onChange={(option) => handleChange(option)}
      value={state}
    />
  );

  return [state, SelectHook];
};

export default useSelect;
