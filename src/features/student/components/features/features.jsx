import {SectionTitle} from "../common/sectionaTitle";
import {SingleFeature} from "./singleFeature";
import {FeaturesData} from "./featuresData";

export const Features = () => {
  return (
    <>
   
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container ">
        <div className="text-black text-center text-5xl mb-14"><h4>Main Features</h4> </div>
        <div className=" text-center text-2xl text-black mb-14">Innovative FYP Management System with Automated Deployment.</div>
          <SectionTitle
            title="Main Features"
            paragraph="Innovative FYP Management System with Automated Deployment."
            center
          />
          

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {FeaturesData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};