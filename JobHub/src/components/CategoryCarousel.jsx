import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Science",
  "Graphic Designer",
  "Mobile Developer",
]

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="flex justify-center gap-2 w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className="flex-shrink-0 mx-1">
                <Button variant="outline" className="rounded-full px-6 py-2 text-lg">
                  {cat}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
