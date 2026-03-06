'use client';

import React from 'react';
import { Select } from 'antd';
import { useQuery } from '@apollo/client/react';
import PropTypes from 'prop-types';

export default function DataSelector({
  query,
  dataKey,
  placeholder,
  value,
  onChange,
  labelKey = 'name',
}) {
  const { data, loading, error } = useQuery(query);

  const options =
    data?.[dataKey]?.map((item) => ({
      label: item[labelKey],
      value: item.id,
    })) || [];

  return (
    <Select
      loading={loading}
      placeholder={error ? 'Error loading data' : placeholder}
      showSearch={{
        optionFilterProp: 'label',
      }}
      value={value}
      onChange={onChange}
      allowClear
      style={{ width: '100%' }}
      options={options}
    />
  );
}

DataSelector.propTypes = {
  query: PropTypes.object.isRequired,
  dataKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  labelKey: PropTypes.string,
};
