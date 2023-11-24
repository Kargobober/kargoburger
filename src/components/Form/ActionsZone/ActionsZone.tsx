import { FC } from 'react';

type TProps = {
  className?: string;
};

const ActionsZone: FC<TProps> = ({ children, className }) => {
  return (
    <section className={className}>
      {children}
    </section>
  )
};

export default ActionsZone;
