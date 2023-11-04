import { Prediction } from '@/db/schema';
import { Event } from '@/utils/types/types';

const IncorrectPrediction = ({
  prediction,
  event,
  startTime,
}: {
  prediction: Prediction;
  event: Event;
  startTime: {
    hour: string;
    minute: string;
    date: string;
  };
}) => {
  return <div>IncorrectPrediction</div>;
};

export default IncorrectPrediction;
