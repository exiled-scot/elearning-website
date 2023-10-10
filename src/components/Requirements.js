import "./Requirements.css";

const Requirements = ({ requirements }) => {
  if (requirements === null) {
    return null;
  }

  let parsedReq;

  try {
    parsedReq = requirements;
  } catch (error) {
    console.error('Error parsing requirements:', error);
    parsedReq = {};
  }

  const courseReqList = parsedReq.requirements?.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  if (parsedReq?.requirements?.length > 0) {
    return (
      parsedReq.requirements && (
        <div>
          <h2>Requirements</h2>
          <ul>{courseReqList}</ul>
        </div>
      )
    );
  }

  return null;
};

export default Requirements;
