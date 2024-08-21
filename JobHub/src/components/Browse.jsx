import JobCard from './JobCard';
import Navbar from './shared/Navbar'


const randomJobs = [1,2,3];
const Browse = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Kết quả tìm kiếm ({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            randomJobs.map((item, index) => {
              return (
                <JobCard />
              )
            })
          }
        </div>
        
      </div>
    </div>
  )
}

export default Browse