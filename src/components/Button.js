import React from 'react'
import PropTypes from 'prop-types'


const Button = ({color, text, onclick}) => {
  return (
    <button onClick={onclick} style={{backgroundColor: color}} > {text} </button>
  )
}

Button.defaultProps =
{
    color: 'green',
    text: 'click me'
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onclick: PropTypes.func
}

export default Button