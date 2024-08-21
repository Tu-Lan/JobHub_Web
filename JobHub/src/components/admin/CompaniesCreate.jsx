import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    if (!companyName || companyName.trim() === "") {
      toast.error("Company name is required");
      return;
    }
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Tên công ty của bạn</h1>
          <p className='text-gray-500'>Hãy đặt tên công ty của bạn. Bạn có thể sửa lại sau</p>
        </div>

        <Label>Tên công ty</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className='flex items-center gap-2 my-10'>
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>Hủy</Button>
          <Button onClick={registerNewCompany}>Tiếp tục</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate