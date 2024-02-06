const WildCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col justify-between gap-2'>
      <h2 className='text-primary text-2xl md:text-3xl font-kanit font-bold justify-self-start text-center'>
        {title}
      </h2>
      <p className='text-muted-foreground text-center'>{description}</p>
      <div className='flex flex-wrap justify-center gap-2 px-20 py-6'>
        {children}
      </div>
    </div>
  );
};

export default WildCard;
