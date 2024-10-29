export const loadBoardFromStorage = loader("board");
export const loadTurnFromStorage = loader("turn");

export const saveGameToStorage = ({ board, turn }) => {
  // Save game state to localStorage
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", JSON.stringify(turn));
};

export const resetGameStorage = () => {
  // Remove game state from localStorage
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};

function loader(key) {
  return (validator = (data) => data, fallbackSupplier = () => null) => {
    return () => {
      const item = window.localStorage.getItem(key);
      try {
        if (item) {
          const parsedItem = JSON.parse(item);
          // Validate and return data if valid
          return validator(parsedItem) ? parsedItem : fallbackSupplier();
        }
      } catch (e) {
        console.warn(`Failed to load ${key} from localStorage:`, e);
      }
      // Return fallback if item not found or invalid
      return fallbackSupplier();
    };
  };
}
