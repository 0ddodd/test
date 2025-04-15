
function CustomButton({text, bg, onClick}: {text: string, bg?: string, onClick?: ()=>void}) {
    return (
        <button
            onClick={onClick}
            className={`btn btn-${bg ? bg : 'light'}`}
        >
            {text}
        </button>
    )
}

export default CustomButton