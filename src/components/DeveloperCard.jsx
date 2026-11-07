
const DeveloperCard = ({ developer }) => {
    return (
        <article className="developer-card">
            <img src={developer.image} alt={developer.name} />
            <div className="developer-info">
                <h3>{developer.name}</h3>
                <p>{developer.description}</p>
                <span>{developer.projects} Projects</span>
            </div>
        </article>
    );
};

export default DeveloperCard;
