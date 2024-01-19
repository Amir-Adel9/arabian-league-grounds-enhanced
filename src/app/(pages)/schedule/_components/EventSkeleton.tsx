import { Skeleton } from '@/components/ui/skeleton';

const EventSkeleton = () => {
  return (
    <div className='relative flex justify-between items-center w-full h-[120px] bg-card text-primary px-6 py-4 rounded-xl duration-300'>
      <Skeleton className='w-[140px] h-[20px] rounded-full' />
      <div className='flex justify-center flex-grow items-center flex-col lg:flex-row gap-1 lg:gap-0'>
        <div className='flex flex-row lg:flex-row-reverse w-24 lg:w-1/3 items-center justify-between lg:justify-start  space-x-1 lg:gap-4 '>
          <Skeleton className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full' />
        </div>
        <div className='font-bold px-8 xl:px-14 hidden lg:inline'>
          <Skeleton className='w-[100px] h-[20px] rounded-full' />
        </div>
        <div className='flex flex-row lg:flex-row w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:space-x-4'>
          <Skeleton className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full' />
        </div>
      </div>
      <Skeleton className='w-[140px] h-[20px] rounded-full' />
    </div>
  );
};

export default EventSkeleton;
