import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <Input
            className="w-fit"
            placeholder="Tìm kiếm"
          />
          <Button onClick={() => navigate("/admin/companies/create")}>Công ty mới</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies