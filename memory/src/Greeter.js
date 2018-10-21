import React from 'react'

const Greeter = ({ whom }) => (
<button onClick={() => console.log(`Are you sure the only you is ${whom} ?`)}>
        The only me is me
  </button>
)



export default Greeter