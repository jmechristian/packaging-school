import React from 'react';
import { useStateMachineInput, useRive } from '@rive-app/react-canvas';

const FPCCard = () => {
  const { rive, RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: 'https://packschool.s3.amazonaws.com/fpc_card.riv',
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

export default FPCCard;
