import React from 'react'

import './GuessCount.css'

import PropTypes from 'prop-types'


const GuessCount = () => <div className="guesses" />

GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired,
}

export default GuessCount