import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const filterData = [
  {
    filterType: "Địa chỉ",
    array: ["Hà Nội", "Việt Nam", "HCM", "Hải Phòng"]
  },
  {
    filterType: "Vị trí",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType: "Lương",
    array: ["0-5000k", "5000k-10M", "Trên 10M"]
  },
];

const FilterCard = ({ onClearFilters }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  }

  const handleClearFilters = () => {
    setSelectedValue('');
    dispatch(setSearchedQuery(''));
    if (onClearFilters) onClearFilters();
  };

  return (
    <div className='w-full bg-white p-3 rounded-md shadow'>
      <div className="flex justify-between items-center mb-4">
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          Clear All
        </Button>
      </div>
      <hr className='mt-3 mb-4' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index} className="mb-4">
              <h2 className='font-bold text-lg mb-2'>{data.filterType}</h2>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard;
