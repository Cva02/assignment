import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const onSent = (prompt) => {
    const newPrompt = prompt || input;
    if (!newPrompt.trim()) return;

    setPrevPrompts((prev) => [newPrompt, ...prev]);
    setRecentPrompt(newPrompt);
    setInput("");
    setShowResult(true);
  };

  const newChat = () => {
    setShowResult(false);
    setRecentPrompt("");
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        onSent,
        prevPrompts,
        recentPrompt,
        showResult,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
