export function AddTaskButton() {
    return (
        <button className="flex items-center bg-dark-blue rounded p-1 text-white hover:brightness-90">
            <img className="w-8 mr-4" src="/addTask.svg" alt="Image of a plus sign" />
            <p className="font-serif text-xl">Add Task</p>
        </button>
    );
}