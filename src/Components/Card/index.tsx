import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Container, CardTitle, ImageContainer } from './styles';

interface CardProps {
  imageUrl: string;
  title: string;
  linkUrl: string;
  isLoading?: boolean;
}

const BodyCard = ({
  imageUrl,
  linkUrl,
  title,
  isLoading = false,
}: CardProps): React.ReactElement => {
  return (
    <Link href={linkUrl}>
      <Container isLoading={isLoading}>
        <ImageContainer>
          <Image src={imageUrl} alt={title} layout="fill" quality={85} />
        </ImageContainer>
        <CardTitle>{title}</CardTitle>
      </Container>
    </Link>
  );
};

export default BodyCard;
