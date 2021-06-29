import { useTheme } from '../../hooks/useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';

import './styles.scss';

export function ToggleTheme() {
  const {theme, toggleTheme} = useTheme();

  return (
    <button 
      className={`toggleButton ${theme==='dark' ? 'dark' : ''}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <FaMoon />
      ): (
        <FaSun color={'#f8f8f8'}/>
      )}
    </button>
  )
}