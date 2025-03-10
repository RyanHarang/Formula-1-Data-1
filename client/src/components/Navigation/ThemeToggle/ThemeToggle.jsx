import { useState } from "react";

const highlightColors = {
  "Highlight 1": "--color-highlight-1",
  "Highlight 2": "--color-highlight-2",
  "Highlight 3": "--color-highlight-3",
  "Highlight 4": "--color-highlight-4",
};

const ThemeToggle = () => {
  const [selected, setSelected] = useState("--color-highlight-1");

  const handleSelect = (color) => {
    setSelected(color);
    document.documentElement.style.setProperty(
      "--color-accent",
      `var(${color})`,
    );
  };

  return (
    <div className="group relative flex items-center">
      <button
        className="border-accent bg-accent h-6 w-6 cursor-pointer rounded-full border-2"
        title=""
      ></button>
      <div className="bg-light-bg2 dark:bg-dark-bg2 absolute left-1/2 mt-43 w-12 -translate-x-1/2 rounded-lg opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex flex-col items-center justify-center gap-2 p-2">
          {Object.entries(highlightColors).map(([label, color]) => (
            <button
              key={color}
              onClick={() => handleSelect(color)}
              className={`h-6 w-6 cursor-pointer rounded-full border-2 ${
                selected === color ? "ring-accent ring-2" : ""
              }`}
              style={{ backgroundColor: `var(${color})` }}
              title={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
