import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const JobCard = ({ job }) => {
  const { allJobs } = useSelector(store => store.job);
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }
  // const jobId = '123';
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-s, text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Hôm nay": `${daysAgoFunction(job?.createdAt)} ngày trước`}</p>
        <Button variant='outline' className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/1894390879/display_1500/stock-vector-js-or-sj-letter-logo-design-vector-1894390879.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}r</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Vị trí</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}.000đ</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/job/description/${job?._id}`)} variant="outline">Chi tiết</Button>
        <Button className="bg-[#7209b7]">Lưu vào danh sách</Button>
      </div>
    </div>
  )
}

export default JobCard