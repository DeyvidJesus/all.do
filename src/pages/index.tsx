import { TaskList } from "../components/Main/TaskList";
import { Sidebar } from "../components/Sidebar/Sidebar";

function App() {
  return (
    <main className="flex dark:bg-dark-blue">
      <Sidebar />
      <TaskList actualPage={'Inbox'}/>
    </main>
  )
}

export default App
