import React from 'react';

import CustomSectionComponent1 from '../CustomSection/CustomSection1';
import CustomSectionComponent2 from '../CustomSection/CustomSection2';
import CustomSectionComponent3 from '../CustomSection/CustomSection3';
import CustomSectionComponent4 from '../CustomSection/CustomSection4';


function LandingPageMainComponent(){

  return (
    <>
		<CustomSectionComponent3 />
		<CustomSectionComponent1 />
		<CustomSectionComponent2 />
		<CustomSectionComponent4 />
    </>
  );
};


export default LandingPageMainComponent;
