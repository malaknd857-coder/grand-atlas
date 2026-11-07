
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search properties..." }) => {
    return (
        <div className="search-bar">
            <Search size={20} />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchBar;
