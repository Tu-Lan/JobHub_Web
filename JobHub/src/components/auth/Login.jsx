import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant'; // Đảm bảo rằng biến này được khai báo
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className="font-bold text-xl mb-5">Đăng nhập</h1>
          {/* Email */}
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
              placeholder="dacquyet@gmail.com"
            />
          </div>
          {/* password */}
          <div className='my-2'>
            <Label>Mật khẩu</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
              placeholder="Quyet2002@"
            />
          </div>
          {/* role */}
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r1"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Sinh viên</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r2"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Nhà tuyển dụng</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Button Login */}
          {
            loading
              ?
              <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Vui lòng đợi </Button>
              :
              <Button type="submit" className="w-full my-4">Đăng nhập</Button>
          }
          <span className='text-sm'>
            Chưa có tài khoản? <Link to="/signup" className='text-[#6A38C2]'>Đăng ký</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
