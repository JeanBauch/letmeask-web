import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';

import { Button } from '../components/Button/Button';
import { RoomCode } from '../components/RoomCode/RoomCode';
import { Question } from '../components/Question/index';
import { ToggleTheme } from '../components/ToggleTheme/index';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import emptyImg from '../assets/images/empty-questions.svg';

import '../styles/room.scss';
import cx from 'classnames';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const history = useHistory();
  const roomId = params.id;
  const { title, questions, loader } = useRoom(roomId);
  const { theme } = useTheme();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  
  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  return (
    <div id="page-room">
      <header className={cx(
        { dark: theme==='dark' }
      )}>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <ToggleTheme />
            <RoomCode code={roomId}/>
            <Button isOutline isDark={theme==='dark'} onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        {questions.length === 0 && loader &&
          <div className="emptyQuestions">
            <h2>Está sala ainda não possui perguntas</h2>
            <img src={emptyImg} alt="Está sala ainda não possui perguntas" />
          </div>
        }

        <div className="question-list">
          {questions.map( question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida"></img>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta"></img>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta"></img>
                </button>
              </Question>
            )
          } )}
        </div>
      </main>
    </div>
  );
}