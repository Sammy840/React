import React from 'react'
import Greet from './components/Greet';
import Add from './components/Add';
import Sum from './components/Sum';
import GreetingCard from './components/GreetingCard';

const App = () => {
  return (
    <div>
      {/* <Greet /> */}
      {/* <Add /> */}
      {/* <Sum /> */}
      <GreetingCard name="Sam" msg="you are welcome" mood="great" />
    </div>
  )
}

export default App;