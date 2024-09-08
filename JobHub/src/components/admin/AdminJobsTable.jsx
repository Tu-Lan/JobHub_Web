import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const { companies } = useSelector(store => store.company);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  // Function to join job data with company data
  const joinJobsWithCompanies = (jobs, companies) => {
    return jobs.map(job => {
      const company = companies.find(comp => comp._id === job.company);
      return {
        ...job,
        companyName: company ? company.name : 'Unknown Company',
      };
    });
  };

  useEffect(() => {
    const jobsWithCompanies = joinJobsWithCompanies(allAdminJobs, companies);
    setFilterJobs(jobsWithCompanies);
  }, [allAdminJobs, companies]);

  const filteredJobs = useMemo(() => {
    if (!searchJobByText) {
      return filterJobs;
    }
    const searchText = searchJobByText.toLowerCase();
    return filterJobs.filter((job) =>
      job?.title?.toLowerCase().includes(searchText) ||
      job?.companyName?.toLowerCase().includes(searchText)
    );
  }, [filterJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>Danh sách các công việc mới post lên gần đây</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tên công ty</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger aria-label="Job actions"><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className='flex items-center gap-2 w-fit cursor-pointer'
                    >
                      <Edit2 className='w-4' aria-label="Edit job" />
                      <span>Chỉnh sửa</span>
                    </div>
                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                      <Eye className='w-4' />
                      <span>Xem người ứng tuyển</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
