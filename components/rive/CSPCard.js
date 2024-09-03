import React from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const CSPCard = () => {
  const { rive, RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: 'https://packschool.s3.amazonaws.com/csp_card-2.riv',
    stateMachines: 'rootMachine',
    // Be sure to specify the correct state machine (or animation) name
    onLoadError: (err) => console.log(err),
    // This is optional.Provides additional layout control.
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  const isHovering = useStateMachineInput(rive, 'rootMachine', 'hoverInput');

  return (
    <RiveComponent
      onMouseEnter={() => (isHovering.value = true)}
      onMouseLeave={() => (isHovering.value = false)}
    />
  );
};

export default CSPCard;
