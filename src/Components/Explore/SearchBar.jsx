function SearchBar({ value, onChange }) {
  
  return (
    <input
      type="text"
      placeholder="Search countries..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-3 outline-none"
    />
  );
}

export default SearchBar;