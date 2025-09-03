

const Loading = () => {
  return (
    <div>
     
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-yellow-600 animate-bounce"></div>
        <div
          className="w-4 h-4 rounded-full bg-yellow-900 animate-bounce [animation-delay:-.3s]"
        ></div>
        <div
          className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce [animation-delay:-.5s]"
        ></div>
      </div>

    </div>
  );
};

export default Loading;