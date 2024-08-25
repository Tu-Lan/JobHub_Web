import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumer: "",
    password: "",
    role: "",
    file: null
  });


  const { loading, user } = useSelector(store => store.auth);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
  
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumer);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }
    try {
      dispath(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispath(setLoading(false));
    }
  }
  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className="font-bold text-xl mb-5">Đăng ký</h1>
          <div className='my-2'>
            {/* FullName */}
            <Label>Họ và tên</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventhandler}
              placeholder="Đắc Quyết"
            />
          </div>
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
          {/* Phone */}
          <div className='my-2'>
            <Label>Số điện thoại</Label>
            <Input
              type="number"
              value={input.phoneNumer}
              name="phoneNumer"
              onChange={changeEventhandler}
              placeholder="0879817410"
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
                <input type="radio" id="r1" name="role" value="student" checked={input.role === "student"} onChange={changeEventhandler} className="cursor-pointer" />
                <Label htmlFor="r1">Sinh viên</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="r2" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventhandler} className="cursor-pointer" />
                <Label htmlFor="r2">Nhà tuyển dụng</Label>
              </div>
            </RadioGroup>
            {/* Upload CV */}
            <div className='flex items-center gap-2'>
              <Label className="whitespace-nowrap">Avatar</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* Button Signup */}
          {
            loading
              ?
              <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Vui lòng đợi!! </Button>
              :
              <Button type="submit" className="w-full my-4">Đăng ký</Button>
          }
          <span className='text-sm'>Đã có tài khoản? <Link to="/login" className='text-[#6A38C2]'>Đăng nhập</Link></span>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
