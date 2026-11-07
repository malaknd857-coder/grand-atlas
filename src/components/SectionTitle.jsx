
const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className="section-title">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
            <span className="title-line"></span>
        </div>
    );
};

export default SectionTitle;
