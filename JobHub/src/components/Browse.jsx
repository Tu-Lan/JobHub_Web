import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import JobCard from './JobCard';

const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs, loading, error } = useSelector(store => store.job);

  // Fetch jobs on component mount
  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  if (loading) return <div>Vui lòng đợi...</div>;
  if (error) return <div>Lỗi tải job: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Kết quả tìm kiếm ({allJobs.length})</h1>
        {allJobs.length === 0 ? (
          <p>Không có job nào được tìm thấy.</p>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {allJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
