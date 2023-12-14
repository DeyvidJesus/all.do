import { TaskList } from "../components/Main/TaskList";
import { Sidebar } from "../components/Sidebar/Sidebar";

function App() {
  return (
    <main className="flex">
      <Sidebar />
      <TaskList actualPage={'Inbox'}/>
    </main>
  )
}

export default App
