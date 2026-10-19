import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment,incrementByAmount } from '../../redux/slices/counter/counterSlice'

export function Count() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="p-4"> {/* Add padding to the whole component */}
      <div className="flex items-center space-x-4"> {/* Flex layout */}
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment
        </button>
        <span className="text-xl">{count}</span>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
