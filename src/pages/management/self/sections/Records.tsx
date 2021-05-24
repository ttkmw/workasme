import React, {ReactNode} from "react";
import RecordCard from "src/pages/management/self/sections/components/cards/Record";

const RecordsSection: React.FC = () => {
  const recordCards: React.FC[] = [() => <RecordCard/>, () => <RecordCard/>];
  return <div>
    <GuideBoardPart />
    <RecordsContainer>
      {recordCards}
    </RecordsContainer>
  </div>;
};

const GuideBoardPart: React.FC = () => {
  return <div />;
};


const RecordsContainer: React.FC<{ children: ReactNode }> = ({children}) => {
  return <div>
    {children}
  </div>;
};


export default RecordsSection;
