import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import JobCard from './JobCard';
import { Button } from './ui/button'; // Import Button component
import { Filter } from 'lucide-react'; // Import Filter icon
import { setSearchJobByText } from '../redux/jobSlice';

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery]);

  const handleClearFilters = () => {
    dispatch(setSearchJobByText(''));
    // Reset any other filter-related state here if needed
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-5'>
          {/* Filter toggle button for mobile */}
          <div className='lg:hidden mb-4'>
            <Button onClick={() => setShowFilter(!showFilter)} className="w-full">
              <Filter className="mr-2 h-4 w-4" /> {showFilter ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* FilterCard - hidden by default on mobile, always visible on large screens */}
          <div className={`w-full lg:w-1/5 mb-4 lg:mb-0 ${showFilter ? 'block' : 'hidden'} lg:block`}>
            <FilterCard onClearFilters={handleClearFilters} />
          </div>
          
          {
            filterJobs.length <= 0 ? <span className="text-center w-full">Job not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}>
                        <JobCard job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs