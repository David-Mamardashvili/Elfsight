import styled from 'styled-components';

export function Text({
  className,
  children,
  style,
  color = '#00afc7',
  fontSize = '20px'
}) {
  return (
    <StyledText
      className={className}
      style={style}
      _color={color}
      _fontSize={fontSize}
    >
      {children}
    </StyledText>
  );
}

const StyledText = styled.span`
  color: ${({ _color }) => _color};
  font-size: ${({ _fontSize }) => _fontSize};
`;
