import { Prediction } from '@/db/types';

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
    <div className='w-full flex justify-around items-center text-primary gap-5 font-geist'>
      <button
        onClick={() => setFilter('all')}
        className={` flex-grow font-bold hover:text-accent-gold p-2 rounded-md hover:bg-card duration-300 ${
          filter === 'all' && 'text-accent-gold bg-card'
        }`}
      >
        All Predictions ({predictions.length})
      </button>
      <button
        onClick={() => setFilter('correct')}
        className={` flex-grow font-bold hover:text-accent-gold p-2 rounded-md hover:bg-card duration-300 ${
          filter === 'correct' && 'text-accent-gold bg-card'
        }`}
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
        className={` flex-grow font-bold hover:text-accent-gold p-2 rounded-md hover:bg-card duration-300 ${
          filter === 'incorrect' && 'text-accent-gold bg-card'
        }`}
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
        className={` flex-grow font-bold hover:text-accent-gold p-2 rounded-md hover:bg-card duration-300 ${
          filter === 'unfulfilled' && 'text-accent-gold bg-card'
        }`}
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
