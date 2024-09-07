import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className='bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold'>
              <Link to={'/'}>Job<span className='text-[#F83002]'>Hub</span></Link>
            </h1>
          </div>
          
          <div className='hidden md:flex items-center space-x-4'>
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies" className='text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md font-semibold'>Công ty</Link>
                <Link to="/admin/jobs" className='text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md font-semibold'>Công việc</Link>
              </>
            ) : (
              <>
                <Link to="/" className='text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md font-semibold'>Trang chủ</Link>
                <Link to="/jobs" className='text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md font-semibold'>Công việc</Link>
                <Link to="/browse" className='text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md font-semibold'>Browse</Link>
              </>
            )}
            
            {!user ? (
              <div className='flex items-center gap-2'>
                <Link to={'/login'}>
                  <Button variant='outline' className="font-semibold">Đăng nhập</Button>
                </Link>
                <Link to={'/signup'}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] font-semibold">Đăng ký</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://www.shutterstock.com/shutterstock/photos/1894390879/display_1500/stock-vector-js-or-sj-letter-logo-design-vector-1894390879.jpg"}
                      alt={user.fullName || "User Avatar"}
                      className="object-contain"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-80'>
                  <div className=''>
                    <div className='flex gap-4 space-y-2'>
                      <Avatar className='cursor-pointer'>
                        <AvatarImage
                          src={user?.profile?.profilePhoto || "https://www.shutterstock.com/shutterstock/photos/1894390879/display_1500/stock-vector-js-or-sj-letter-logo-design-vector-1894390879.jpg"}
                          alt={user.fullName || "User Avatar"}
                          className="object-contain"
                        />
                      </Avatar>

                      <div>
                        <h4 className='font-medium'>{user.fullName}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                      </div>
                    </div>

                    <div className='flex flex-col my-2 text-gray-600'>
                      {
                        user && user.role === "student" && (
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant='link'><Link to={'/profile'}>Xem hồ sơ</Link></Button>
                      </div>
                        )
                      }
                      
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button onClick={logoutHandler} variant='link'>Đăng xuất</Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
          
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
            >
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" className='text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md font-semibold'>Công ty</Link>
              <Link to="/admin/jobs" className='text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md font-semibold'>Công việc</Link>
            </>
          ) : (
            <>
              <Link to="/" className='text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md font-semibold'>Trang chủ</Link>
              <Link to="/jobs" className='text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md font-semibold'>Công việc</Link>
              <Link to="/browse" className='text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md font-semibold'>Browse</Link>
            </>
          )}
        </div>
        <div className='pt-4 pb-3 border-t border-gray-200'>
          {user ? (
            <div className='space-y-3'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://www.shutterstock.com/shutterstock/photos/1894390879/display_1500/stock-vector-js-or-sj-letter-logo-design-vector-1894390879.jpg"}
                      alt={user.fullName || "User Avatar"}
                      className="object-contain"
                    />
                  </Avatar>
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>{user.fullName}</div>
                  <div className='text-sm font-medium text-gray-500'>{user.email}</div>
                </div>
              </div>
              <div className='px-2 space-y-1'>
                {user && user.role === "student" && (
                  <Button variant='link' asChild className='w-full justify-start'>
                    <Link to={'/profile'}><User2 className="mr-2 h-4 w-4" /> Xem hồ sơ</Link>
                  </Button>
                )}
                <Button variant='link' onClick={logoutHandler} className='w-full justify-start text-red-500'>
                  <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                </Button>
              </div>
            </div>
          ) : (
            <div className='mt-3 px-2 space-y-1'>
              <Link to={'/login'}>
                <Button variant='outline' className='w-full font-semibold'>Đăng nhập</Button>
              </Link>
              <Link to={'/signup'}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full font-semibold">Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
