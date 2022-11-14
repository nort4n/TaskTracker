import Task from "./Task";
import { TaskType } from "../types";
import React from "react";

type Props = { tasks: TaskType[]; onDelete: Function; onToggle: Function };

export default function Tasks({ tasks, onDelete, onToggle }: Props) {
    return (
        <>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </>
    );
}
