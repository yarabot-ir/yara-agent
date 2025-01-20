
interface ChatBubbleProps {
    text: string,
    onClick?: any
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, onClick }) => {
    return (
        <button className="relative w-full mx-auto" onClick={onClick} >
            {/* Chat Bubble */}
            <div className="bg-secondary-200 dark:bg-secondary-150 text-sm text-start   text-secondary-600/90 px-2.5 py-2 rounded-md shadow-sm">
                {text}
            </div>
            {/* Pointer */}
            <div className="absolute -bottom-2 left-3 light-triangle !border-t-secondary-200 dark:!border-t-secondary-150 rounded-sm  dark:dark-triangle"></div>
        </button>
    );
};

export default ChatBubble;