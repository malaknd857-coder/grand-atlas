
const FilterPanel = ({ zone, setZone, zones }) => {
    return (
        <div className="filter-panel">
            <select value={zone} onChange={(e) => setZone(e.target.value)}>
                <option value="">All Locations</option>
                {zones.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterPanel;
