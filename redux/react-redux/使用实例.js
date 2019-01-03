import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onIncreaseClick: PropTypes.func.isRequired
    }
    render() {
        const { value, onIncreaseClick } = this.props
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

// Action
const increaseAction = {
    type: 'increase'
}

// Reducer
function counter(state = {count:0}, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':
            return {count: count+1 }
        default:
            return state
    }
}

// Store
const store = createStore(counter)

// Map redux state to component props
function mapStateToProps(state) {
    return {
        value: state.count
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

// Connect Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)