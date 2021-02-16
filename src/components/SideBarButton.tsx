import './SideBarButton.css'
import { useRootStore } from './RootStateContext'

export default function SideBarButton({ title }: any) {
  const { rootStore: { userStore } } = useRootStore();

  return (
    <button
      className="SideBarButton"
      onClick={() => userStore.setOpenedAppSection(title)}
    >
      { title} 
    </button>
  )
}
