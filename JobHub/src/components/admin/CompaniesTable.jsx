import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>Danh sách công ty đăng ký gần đây</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Tên công ty</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead className = "text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar>
              <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/1894390879/display_1500/stock-vector-js-or-sj-letter-logo-design-vector-1894390879.jpg" />
            </Avatar>
          </TableCell>
          <TableCell>TeachNo</TableCell>
          <TableCell>20-08-2024</TableCell>
          <TableCell className = "text-right cursor-pointer">
            <Popover>
              <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
              <PopoverContent className ="w-42">
                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                  <Edit2/>
                  <span>Chỉnh sửa</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable