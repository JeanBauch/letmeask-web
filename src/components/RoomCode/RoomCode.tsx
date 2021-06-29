import copyImg from '../../assets/images/copy.svg';
import toast, { Toaster } from 'react-hot-toast';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Codigo copiado com sucesso!');
  }

  return (
    <>
      <button className={`room-code ${theme === 'dark' ? 'dark' : ''}`} onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      <Toaster
        position="top-right"
        reverseOrder={false} 
      />
    </>
  )
}