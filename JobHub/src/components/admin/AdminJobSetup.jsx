import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetAdminJobById from '@/hooks/useGetAdminJobById';

const AdminJobEdit = () => {
  const params = useParams();
  useGetAdminJobById(params.id);
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: 0,
  });
  const { singleJob } = useSelector(store => store.job);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob.title || '',
      description: singleJob.description || '',
      requirements: singleJob.requirements || '',
      salary: singleJob.salary || '',
      location: singleJob.location || '',
      jobType: singleJob.jobType || '',
      experienceLevel: singleJob.experienceLevel || 0,
    });
  }, [singleJob]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate('/admin/jobs')}
            variant="outline"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Trở lại</span>
          </Button>
          <h1 className="font-bold text-2xl text-gray-800 mx-auto uppercase">Chỉnh sửa công việc</h1>
          <div className="w-16"></div> {/* Placeholder to balance the space */}
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Tên công việc</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Mô tả</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Chi tiết</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Lương</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Địa chỉ</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Vị trí</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Kinh nghiệm làm việc</Label>
              <Input
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-8">
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Vui lòng đợi!!
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Cập nhật
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminJobEdit;
