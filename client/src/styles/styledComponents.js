import styled from 'styled-components';

export const TitleLarge = styled.h1`
  color: ${({ theme }) => theme.text.titleLarge.color};
  font-size: ${({ theme }) => theme.text.titleLarge.fontSize};
  font-weight: ${({ theme }) => theme.text.titleLarge.fontWeight};
  font-family: ${({ theme }) => theme.text.titleLarge.fontFamily};
`;

export const TitleMedium = styled.h2`
  color: ${({ theme }) => theme.text.titleMedium.color};
  font-size: ${({ theme }) => theme.text.titleMedium.fontSize};
  font-weight: ${({ theme }) => theme.text.titleMedium.fontWeight};
  font-family: ${({ theme }) => theme.text.titleMedium.fontFamily};
`;

export const TitleSmall = styled.h3`
  color: ${({ theme }) => theme.text.titleSmall.color};
  font-size: ${({ theme }) => theme.text.titleSmall.fontSize};
  font-weight: ${({ theme }) => theme.text.titleSmall.fontWeight};
  font-family: ${({ theme }) => theme.text.titleSmall.fontFamily};
`;

export const BodyLarge = styled.h4`
  color: ${({ theme }) => theme.text.bodyLarge.color};
  font-size: ${({ theme }) => theme.text.bodyLarge.fontSize};
  font-weight: ${({ theme }) => theme.text.bodyLarge.fontWeight};
  font-family: ${({ theme }) => theme.text.bodyLarge.fontFamily};
`;

export const BodyMedium = styled.h5`
  color: ${({ theme }) => theme.text.bodyMedium.color};
  font-size: ${({ theme }) => theme.text.bodyMedium.fontSize};
  font-weight: ${({ theme }) => theme.text.bodyMedium.fontWeight};
  font-family: ${({ theme }) => theme.text.bodyMedium.fontFamily};
`;

export const BodySmall = styled.h6`
  color: ${({ theme }) => theme.text.bodySmall.color};
  font-size: ${({ theme }) => theme.text.bodySmall.fontSize};
  font-weight: ${({ theme }) => theme.text.bodySmall.fontWeight};
  font-family: ${({ theme }) => theme.text.bodySmall.fontFamily};
`;
