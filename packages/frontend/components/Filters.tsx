import { Card, Filters as PolarisFilters, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const Filters: React.FC<{ filters: { customerName?: string; attributedStaffName?: string }; setFilters: (filters: any) => void }> = ({ filters, setFilters }) => {
  const [customerName, setCustomerName] = useState(filters.customerName || '');
  const [attributedStaffName, setAttributedStaffName] = useState(filters.attributedStaffName || '');

  const handleCustomerNameChange = useCallback((value: string) => { 
    setCustomerName(value);
    setFilters({ ...filters, customerName: value });
  }, [filters, setFilters]);

  const handleAttributedStaffNameChange = useCallback((value: string) => {
    setAttributedStaffName(value);
    setFilters({ ...filters, attributedStaffName: value });
  }, [filters, setFilters]);

  const appliedFilters = [
    {
      key: 'customerName',
      label: customerName ? `Customer: ${customerName}` : '',
      onRemove: () => handleCustomerNameChange(''),
    },
    {
      key: 'attributedStaffName',
      label: attributedStaffName ? `Staff: ${attributedStaffName}` : '',
      onRemove: () => handleAttributedStaffNameChange(''),
    },
  ];

  return (
    <Card>
      <PolarisFilters
        queryValue={customerName}
        onQueryChange={handleCustomerNameChange}
        onQueryClear={() => handleCustomerNameChange('')}
        filters={[
          {
            key: 'customerName',
            label: 'Customer Name',
            filter: (
              <TextField
                label="Customer Name"
                value={customerName}
                onChange={handleCustomerNameChange}
                autoComplete="off"
              />
            ),
          },
          {
            key: 'attributedStaffName',
            label: 'Attributed Staff Name',
            filter: (
              <TextField
                label="Attributed Staff Name"
                value={attributedStaffName}
                onChange={handleAttributedStaffNameChange}
                autoComplete="off"
              />
            ),
          },
        ]}
        appliedFilters={appliedFilters}
        onClearAll={() => {
          handleCustomerNameChange('');
          handleAttributedStaffNameChange('');
        }}
      />
    </Card>
  );
};

export default Filters;
