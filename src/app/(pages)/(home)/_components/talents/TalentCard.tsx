import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
const TalentCard = ({
  talent,
}: {
  talent: {
    name: string;
    role: string;
    imageUrl: string;
    twitterUrl: string;
  };
}) => {
  return (
    <Link
      href={talent.twitterUrl}
      target='_blank'
      className=' relative border-2 w-[90%] bg-white border-accent-gold flex  flex-col justify-between rounded-lg shadow-lg p-2 xl:p-4 cursor-pointer duration-200  hover:scale-105'
    >
      <Image
        src={talent.imageUrl}
        alt={talent.name}
        width={160}
        height={160}
        draggable={false}
        className='w-full  h-60 object-cover mb-4 border-2 border-accent-gold rounded-lg'
      />
      <h2 className='text-black text-lg font-medium text-center font-kanit'>
        {talent.name}
      </h2>
      <p className='text-xs text-accent-gold text-center '>{talent.role}</p>
      <div className='flex gap-1 items-center justify-center text-accent-blue  p-2 rounded-md text-sm hover:underline  duration-200 text-center'>
        <span>Twitter</span>
        <ExternalLink size={16} className='inline' />
      </div>
    </Link>
  );
};

export default TalentCard;
