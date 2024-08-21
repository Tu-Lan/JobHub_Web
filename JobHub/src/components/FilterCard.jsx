import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { data } from 'autoprefixer'


const filterData = [
  {
    filterType:"Địa chỉ",
    array: ["Hà Nội", "Việt Nam", "HCM", "Hải Phòng"]
  },
  {
    filterType:"Vị trí",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType:"Lương",
    array: ["0-5000k", "5000k-10M", "Trên 10M"]
  },
]
const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Lọc</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {
          filterData.map((data,index) =>(
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,index)=> {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item}/>
                      <label>{item}</label>
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

export default FilterCard