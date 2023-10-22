import Modal from '@/components/Modal';

export default async function Match({
  params,
}: {
  params: {
    matchId: string;
  };
}) {
  return (
    <Modal>
      <main className='w-full min-h-screen relative flex flex-col justify-center items-center'>
        Match Pagesss
        <h3>{params.matchId}</h3>
      </main>
    </Modal>
  );
}
