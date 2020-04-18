import React from 'react'
import { DialogProvider } from 'use-dialog'
import Child from './child'

const App = () => {
  return (
    <DialogProvider>
      <Child />
    </DialogProvider>
  )
}

export default App
