import { ButtonHTMLAttributes } from 'react';

import './styles.scss';
import cx from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutline?: boolean,
  isDark?: boolean
};

export function Button({ isOutline = false, isDark = false,  ...props }: ButtonProps) {
  return (
    <button 
      className={cx(
        'button',
        { outlined: isOutline },
        { dark: isDark }
      )}
      {...props} 
    />
  )
}