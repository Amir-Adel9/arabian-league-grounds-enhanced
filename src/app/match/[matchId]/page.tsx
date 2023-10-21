export default async function Match({
  params,
}: {
  params: {
    matchId: string;
  };
}) {
  return (
    <main className='w-full min-h-screen relative flex flex-col justify-center items-center'>
      Match Page
      <h3>{params.matchId}</h3>
    </main>
  );
}
