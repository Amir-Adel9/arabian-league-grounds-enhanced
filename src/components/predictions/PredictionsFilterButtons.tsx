import { Prediction } from '@/db/schema';

const PredictionsFilterButtons = ({
  predictions,
  filter,
  setFilter,
}: {
  predictions: Prediction[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className='w-full flex justify-around items-center gap-2'>
      <button
        onClick={() => setFilter('all')}
        className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-200 duration-300'
      >
        All Predictions ({predictions.length})
      </button>
      <button
        onClick={() => setFilter('correct')}
        className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-300 duration-300'
      >
        Correct (
        {
          predictions.filter((prediction) => prediction.state === 'correct')
            .length
        }
        )
      </button>
      <button
        onClick={() => setFilter('incorrect')}
        className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-300 duration-300'
      >
        Incorrect (
        {
          predictions.filter((prediction) => prediction.state === 'incorrect')
            .length
        }
        )
      </button>
      <button
        onClick={() => setFilter('unfulfilled')}
        className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-300 duration-300'
      >
        Pending (
        {
          predictions.filter((prediction) => prediction.state === 'unfulfilled')
            .length
        }
        )
      </button>
    </div>
  );
};

export default PredictionsFilterButtons;
