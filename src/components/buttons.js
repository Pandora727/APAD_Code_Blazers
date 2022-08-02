import React from 'react'

import PropTypes from 'prop-types'

const buttons = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='btn'>{text}</button>
  )
}

buttons.defaultProps = {
  color: 'steelblue',
}

buttons.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default buttons