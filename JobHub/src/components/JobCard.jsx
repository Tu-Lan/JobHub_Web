import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = React.useMemo(() => daysAgoFunction(job?.createdAt), [job?.createdAt]);

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgo === 0 ? "Hôm nay" : `${daysAgo} ngày trước`}
        </p>
        <Button variant='outline' className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || "https://www.shutterstock.com/shutterstock/photos/1894390879/display_1500/stock-vector-js-or-sj-letter-logo-design-vector-1894390879.jpg"} />
          </Avatar>
        </Button>
        <div className="flex-1">
          <h1 className='font-medium text-lg'>{job?.company?.name || "Tên công ty không có"}</h1>
          <p className='text-sm text-gray-500'>{job?.location || "Vị trí không có"}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h1 className='font-bold text-lg my-2'>{job?.title || "Tiêu đề không có"}</h1>
        <p className='text-sm text-gray-600' style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          height: '3rem',
          lineHeight: '1.5rem'
        }}>
          {job?.description || "Mô tả không có"}
        </p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position || "Số lượng không có"} Vị trí</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType || "Loại công việc không có"}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary || "Lương không có"}.000đ</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/job/description/${job?._id}`)} variant="outline">Chi tiết</Button>
        <Button className="bg-[#7209b7]">Lưu vào danh sách</Button>
      </div>
    </div>

  );
};

export default JobCard;
