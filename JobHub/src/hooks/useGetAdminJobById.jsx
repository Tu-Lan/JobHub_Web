import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAdminJobById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/job/${id}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchJobById();
    }
  }, [id, dispatch]);
};

export default useGetAdminJobById;
