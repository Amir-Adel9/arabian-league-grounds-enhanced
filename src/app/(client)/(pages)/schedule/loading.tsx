import EventSkeleton from '@/app/(client)/(pages)/schedule/_components/EventSkeleton';

export default function Loading() {
  return (
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-center '>
      <div className='mt-20 mb-16 lg:mb-0 flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'>
        <div className=' w-[90%] lg:w-[75%] h-[100%] border-x border-border pt-5 mx-auto'>
          <div className=' relative flex flex-col items-center py-3 px-5 border-x border-border justify-center space-y-5 w-full text-secondary'>
            {[...Array(30)].map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
