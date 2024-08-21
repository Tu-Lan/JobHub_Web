import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const CompanySetup = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-xl mx-auto my-10'>
        <form action="">
          <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-bold-semibold">
            <ArrowLeft/>
            <span>Quay lại</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CompanySetup