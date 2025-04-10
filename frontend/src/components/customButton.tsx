
function CustomButton({text, onClick}: {text: string, onClick?: ()=>void}) {
    return (
        <button
            onClick={onClick}
            className="btn btn-light"
        >
            {text}
        </button>
    )
}

export default CustomButton