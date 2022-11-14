import React from "react";

type Props = { color: string; text: string; onClick: React.MouseEventHandler };

const Button = ({ color, text, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className="btn"
        >
            {text}
        </button>
    );
};
Button.defaultProps = {
    color: "steelblue",
};

export default Button;
