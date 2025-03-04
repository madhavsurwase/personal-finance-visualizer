export function Button({ children, onClick, variant = "default", size = "md" }) {
    const variants = {
      default: "bg-blue-600 text-white",
      destructive: "bg-red-600 text-white",
    };
    const sizes = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
    };
  
    return (
      <button
        className={`${variants[variant]} ${sizes[size]} rounded-md`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  