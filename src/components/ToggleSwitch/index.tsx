import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  thema?: string
};

export function ToggleSwitch({ thema = 'light', ...props }: ButtonProps) {
  
  const { theme, toggleTheme } = useTheme();
  
  return (
    <>
      <button 
        className={`toggleButton`}
        onClick={toggleTheme}
        {...props} 
      />
      <h1>{theme}</h1>
    </>
  )
}