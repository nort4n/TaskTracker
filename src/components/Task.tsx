import { TaskType } from "../types";
import { FaTimes } from "react-icons/fa";
import React from "react";

type Props = { task: TaskType; onDelete: Function; onToggle: Function };

function Task({ task, onDelete, onToggle }: Props) {
    return (
        <div
            className={`task ${task.reminder ? "reminder" : ""}`}
            onDoubleClick={() => onToggle(task.id)}
        >
            <h3>
                {task.text}{" "}
                <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    );
}

export default Task;
