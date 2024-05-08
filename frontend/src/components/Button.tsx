import React from "react"

const Button = ({onClick , children} : {onClick : ()=> void ; children : React.ReactNode }) => {
  return (
    <button className="hover:bg-green-500 bg-green-700 p-3 text-white rounded-md min-w-20 font-semibold hover:shadow-md shadow-green-600" onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
