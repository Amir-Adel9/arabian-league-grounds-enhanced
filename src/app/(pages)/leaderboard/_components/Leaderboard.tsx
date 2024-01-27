import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/db/types';
import LeaderboardSelect from './LeaderboardSelect';

const Leaderboard = ({
  users,
  sortBy,
}: {
  users: User[];
  sortBy: 'predictions' | 'fantasy';
}) => {
  return (
    <div className='mt-20 mb-16 lg:mb-0 flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'>
      <div className=' w-[90%] lg:w-[75%] h-[100%] border-x border-border pt-5 mx-auto'>
        <div className=' relative flex flex-col items-center justify-center space-y-5 w-full text-secondary'>
          <Table>
            <TableHeader>
              <TableRow className='border-border'>
                <TableHead className='w-[150px] text-accent-gold'>
                  Rank
                </TableHead>
                <TableHead className='text-accent-gold grow'>
                  Username
                </TableHead>
                <TableHead className='text-accent-gold'>Points</TableHead>
                <TableHead className='text-accent-gold w-[180px]'>
                  <LeaderboardSelect sortBy={sortBy} />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User, index: number) => {
                return (
                  <TableRow
                    className={`text-white border-border duration-300 hover:bg-[#27272a7f] ${
                      index % 2 === 0 ? '' : 'bg-[#1c1c1e7f]'
                    }`}
                    key={user.id}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='capitalize'>
                      {user.username}
                    </TableCell>
                    <TableCell colSpan={3}>
                      {sortBy === 'predictions'
                        ? user.predictionPoints
                        : sortBy === 'fantasy'
                        ? user.fantasyPoints
                        : 'Error loading points'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
