import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
  it('zobrazí obrázek loga s výchozími props', () => {
    render(<Logo />);
    const img = screen.getByAltText('STRAWSTAV S.R.O.');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('finallogo'));
  });

  it('použije šířku a výšku z props', () => {
    render(<Logo width={400} height={200} />);
    const img = screen.getByAltText('STRAWSTAV S.R.O.');
    expect(img).toHaveAttribute('width', '400');
    expect(img).toHaveAttribute('height', '200');
  });
});
