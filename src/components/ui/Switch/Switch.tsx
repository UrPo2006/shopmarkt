import { useEffect, useState } from "react";

export default function Switch() {
  const [darkMode, setDarkMode] = useState(false);

  // عند فتح الصفحة
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // عند التغيير
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <label className="relative inline-block w-16 h-9 cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleTheme}
        className="sr-only"
      />

      {/* slider */}
      <span className="absolute inset-0 rounded-full bg-sky-400 dark:bg-[#183153] transition-all duration-300"></span>

     {/* sun */}
<span
  className={`absolute right-1 top-1 text-yellow-400 transition-all duration-300
    ${darkMode ? "opacity-0 scale-0" : "opacity-100 scale-100 animate-spin-slow"}
  `}
>
  ☀️
</span>

{/* moon */}
<span
  className={`absolute left-1 top-1 text-sky-400 transition-all duration-300
    ${darkMode ? "opacity-100 scale-100 animate-tilt" : "opacity-0 scale-0"}
  `}
>
  🌙
</span>
    </label>
  );
}
