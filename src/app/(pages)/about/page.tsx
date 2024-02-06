import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full min-h-screen relative flex flex-col justify-start items-center'>
        <div className='absolute w-full h-full bg-secondary opacity-95 z-[-10]'></div>
        <Image
          src='/images/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[-20]'
          layout='fill'
          objectFit='cover'
          draggable={false}
          objectPosition='center'
        />
        <div className='mt-[5%] w-full h-full flex flex-col gap-10 justify-center items-center'>
          <Image
            src='/images/al_logo.png'
            alt='Arabian League Logo'
            width={160}
            height={160}
            draggable={false}
            className='z-[10] mt-24 sm:mt-20'
          />
          <div className='relative z-10 flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-4xl font-bold text-accent-gold text-center'>
              About the Arabian League:
            </h1>
            <p className='text-lg text-primary text-center w-[60%]'>
              The Arabian League 2024 is the second season of Riot Games&apos;
              official Middle East and North Africa League of Legends league as
              part of the EMEA ERL ecosystem.
            </p>
          </div>
          <div className='relative z-10 flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-4xl font-bold text-accent-gold text-center'>
              Disclaimer:
            </h1>
            <p className='text-lg text-primary text-center w-[60%]'>
              This website does not encourage or tolerate any form of illegal or
              immoral activity such as gambling. The prediction system is solely
              created for competition and entertainment purposes. Feel free to
              use the website without engaging with the match prediction system.
            </p>
          </div>
          <div className='relative z-10 flex flex-col gap-2 items-center justify-center '>
            <h1 className='text-4xl font-bold text-accent-gold text-center'>
              About the Author:
            </h1>
            <p className='text-lg text-primary text-center w-[60%] mb-10 lg:mb-0'>
              My name is Amir Adel, I am a seasoned League of Legends player,
              Esports enthusiast and passionate software developer. I created
              this website as a way to express my passion for the game and
              towards this community, while also doing the thing I love the most
              which is writing code and making software products. Some of my
              links are below where you can find more details about the
              technical side of this project. Also feel free to reach out to me
              if you have any questions or feedback.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
