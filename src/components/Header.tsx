import Button from "./Button";
import React from "react";

type HeaderProps = {
    title: string;
    onAdd: Function;
    showAdd: boolean;
};

export default function Header({ title, onAdd, showAdd }: HeaderProps) {
    return (
        <header>
            <h1>{title}</h1>

            <Button
                color={showAdd ? "red" : "green"}
                text={showAdd ? "Close" : "Add"}
                onClick={() => onAdd()}
            ></Button>
        </header>
    );
}
Header.defaultProps = { title: "Task Tracker" };
// CSS in jsx
// const headingStyle = { color: "red", backgroundColor: "black" };
