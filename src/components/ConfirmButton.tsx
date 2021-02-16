import './ConfirmButton.css'
import { useRootStore } from './RootStateContext'

export default function ConfirmButton({ title }: any) {
  const { rootStore: { userStore, challengeStore } } = useRootStore();

  return (
    <button
      className="ConfirmButton"
      onClick={() => challengeStore.createChallenge(userStore.email)}
    >
      { title } 
    </button>
  )
}
