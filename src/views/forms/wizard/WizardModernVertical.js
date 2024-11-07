import React, { useRef, useState } from "react";
import Wizard from "@components/wizard";


const WizardModernVertical = ({ control, errors, trigger, onSubmit, setStepper, steps }) => {
  const ref = useRef(null);

  const handleNext = async () => {
    const isValid = await trigger(); // Trigger validation for the current step
    if (isValid) {
      stepper.next();
    }
  };

  const handleSubmit = () => {
    // Only on the last step, invoke the onSubmit function passed as a prop
    stepper.next();
  };

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default WizardModernVertical;
