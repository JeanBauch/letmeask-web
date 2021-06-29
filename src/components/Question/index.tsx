import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighLighted = false,
  children
}: QuestionProps) {
  const { theme } = useTheme();
  return (
    <div 
      className={cx(
        'question',
        { answered: isAnswered },
        { answeredDark: isAnswered && theme === 'dark'},
        { highlighted: isHighLighted && !isAnswered},
        { highlightedDark: isHighLighted && !isAnswered && theme === 'dark'},
        { dark: theme === 'dark'}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}