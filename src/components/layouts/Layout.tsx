// Libraries
import { Container } from '@chakra-ui/react';
import { FC } from 'react';

// Components
import { Header } from '../UI';
import { Footer } from './Footer';

interface Props {
  children?: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Container
      maxW={{ base: 'full', md: 'container.2xl' }}
      my={{ base: 4, md: 7 }}
      h='calc(100vh - 2 * var(--chakra-space-7))'
      position='relative'
    >
      <Header />

      {children}

      <Footer />
    </Container>
  );
};
