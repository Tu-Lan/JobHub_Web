import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetAllAdminJobs from '@/hooks/usegetAllAdminJobs';
import { debounce } from 'lodash'; // Import debounce from lodash

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Debounce input value change
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearchJobByText(value));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(input);
    // Cancel debounce on component unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [input, debouncedSearch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Tìm kiếm bằng tên hoặc vị trí"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>Tạo công việc mới</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
