import { User } from '@/db/types';

const Leaderboard = ({
  users,
}: {
  users: {
    id: number;
    clerkId: string | null;
    username: string | null;
    predictionPoints: number | null;
  }[];
}) => {
  return (
    <div>
      {users.map(
        (
          user: {
            id: number;
            clerkId: string | null;
            username: string | null;
            predictionPoints: number | null;
          },
          index: number
        ) => {
          return (
            <div className='flex gap-2' key={user.id}>
              <p>{index + 1}</p>
              <p>{user.username}</p>
              <p>{user.predictionPoints}</p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Leaderboard;
