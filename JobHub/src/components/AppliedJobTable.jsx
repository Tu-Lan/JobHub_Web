import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>Danh sách công việc bạn đã ứng tuyển</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ngày</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead clasName="text-right">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            [1, 2, 3, 4, 5].map((item, index) => (
              <TableRow key={index}>
                <TableCell>17-07-2024</TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>TechNo</TableCell>
                <TableCell clasName="text-right"><Badge>Được nhận</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable