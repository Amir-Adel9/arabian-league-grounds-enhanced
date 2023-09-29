const HeroButtons = () => {
  return (
    <>
      <button className='bg-accent-gold w-40 rounded px-4 py-3 hover:bg-primary hover:text-secondary duration-300 delay-0 animate-translate-y'>
        <span className='font-light font-gluten'>Get Started</span>
      </button>
      <button className='border-accent-gold border rounded-3xl px-3 py-2 hover:border-accent-gold hover:text-accent-gold duration-300 font-bold animate-translate-y-late'>
        <span className='font-light font-gluten'>Upcoming Matches</span>
      </button>
    </>
  );
};

export default HeroButtons;
