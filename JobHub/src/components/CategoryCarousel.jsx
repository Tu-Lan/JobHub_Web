import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
]

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="relative w-full max-w-xl mx-auto my-20">
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="flex space-x-4">
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 mx-auto">
                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full px-4 py-2">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

export default CategoryCarousel;
