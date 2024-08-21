import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Trang tìm kiếm việc làm hàng đầu Việt Nam</span>
        <h1 className='text-5xl font-bold'>Tìm kiếm, Ứng tuyển & <br /> Có được <span className='text-[#6A38C2]'>công việc mơ ước</span> </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio sed qui aperiam excepturi quos vero, officiis.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input 
            type="text"
            placeholder='Tìm kiếm job'
            className='outline-none border-0 w-full'
            />
          <Button className="rounded-r-full bg-[#6A39c2]">
            <Search className='h-5 w-5'/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection