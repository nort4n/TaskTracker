import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { TaskType } from "./types";
import React from "react";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        async function getTasks() {
            const tasksFromServer = await fetchTasks();
            console.log(tasksFromServer);
            setTasks(tasksFromServer);
        }
        getTasks();
    }, []);

    async function fetchTasks() {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        console.log(data);
        return data;
    }

    // Fetch Task
    async function fetchTask(id: number) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        return data;
    }

    // Add Task
    async function addTask(task: TaskType) {
        const res = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        const data = await res.json();
        console.log(data);
        setTasks([...tasks, data]);
    }

    // function for deleting tasks that gets passed down as a prop
    async function deleteTask(id: number) {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle Reminder
    async function toggleReminder(id: number) {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updTask),
        });
        const data = await res.json();
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        );
    }

    return (
        <div className="container">
            <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />

            <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                    <Tasks
                        tasks={tasks}
                        onDelete={deleteTask}
                        onToggle={toggleReminder}
                    />
                ) : (
                    "No Tasks To Show"
                )}
            </>

            <Footer />
        </div>
    );
}

export default App;
