import { FC } from 'react';

interface Props {
  children: string[];
}

export const Note: FC<Props> = ({ children }) => {
  return (
    <p>{children}</p>
  );
};