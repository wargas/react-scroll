import React from 'react'

import { ReactScroll } from 'react-scroll'
import 'react-scroll/dist/index.css'

const App = () => {
  return (
    <div className='container'>

      <div className='box'>
        <ReactScroll debug width={7} color="red">
          <div style={{ padding: 10 }}>
            {Array(20).fill().map((_, index) => (
              <p key={index}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam fuga hic totam veritatis unde quas a, ipsa quos,
                quibusdam sequi sapiente architecto ut quam nostrum corrupti vero
                quasi, recusandae ad.
              </p>
            ))}
          </div>
        </ReactScroll>
      </div>
    </div>
  )
}

export default App
