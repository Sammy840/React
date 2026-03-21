import React from 'react'
import Greet from './components/Greet';
import Add from './components/Add';
import Sum from './components/Sum';
import GreetingCard from './components/GreetingCard';
import Counter from './components/Counter';
import ToggleSwitch from './components/ToggleSwitch';
import ControlledInput from './components/ControlledInput';

const App = () => {
  return (
    <div>
      {/* <Greet /> */}
      {/* <Add /> */}
      {/* <Sum /> */}
      {/* <GreetingCard name="Sam" msg="you are welcome" mood="Happy" /> */}
      {/* <Counter /> */}
      {/* <ToggleSwitch /> */}
      <ControlledInput />
    </div>
  )
}

export default App;