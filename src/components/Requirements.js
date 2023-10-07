import "./Requirements.css";

const Requirements = ({ requirements }) => {
  return (
    <div>
      <h2>Requirements</h2>
        <ul className="round-bullets">
          {requirements[0].requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
    </div>
  );
};

export default Requirements;
