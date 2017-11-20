import React, {Component, PropTypes} from 'react';
import ReactSlider from 'rc-slider';
import {omit} from 'ramda';

/**
 * A slider component with a single handle.
 */
export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value, drag_value: props.drag_value};
    }

    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value, drag_value: newProps.drag_value});
    }

    render() {
        const {setProps, fireEvent, updatemode} = this.props;
        const {value} = this.state;
        return (
            <ReactSlider
                onChange={value => {
                    this.setState({value, drag_value});
                    if (updatemode === 'drag') {
                        if (setProps) setProps({value});
                        if (fireEvent) fireEvent('change');
                    }
                    if (updatemode === 'hybrid') {
                        if (setProps) setProps({drag_value});
                        if (fireEvent) fireEvent('change');
                    }
                }}
                onAfterChange={value => {
                    if (updatemode === 'mouseup' | updatemode === 'hybrid') {
                        if (setProps) setProps({value});
                        if (fireEvent) fireEvent('change');
                    }
                }}
                value={value}
                drag_value={drag_value}
                {...omit(['fireEvent', 'setProps', 'updatemode', 'value', 'drag_value'], this.props)}
            />
        );
    }
}

Slider.propTypes = {
    id: PropTypes.string,

    /**
     * Marks on the slider.
     * The key determines the position,
     * and the value determines what will show.
     * If you want to set the style of a specific mark point,
     * the value should be an object which
     * contains style and label properties.
     */
    marks: PropTypes.shape({
        number: PropTypes.oneOfType([
            /**
             * The label of the mark
             */
            PropTypes.string,

            /**
             * The style and label of the mark
             */
            PropTypes.shape({
                style: PropTypes.object,
                label: PropTypes.string
            })
        ])
    }),

    /**
     * The value of the input
     */
    value: PropTypes.number,

    /**
     * The drag value of the input
     */
    drag_value: PropTypes.number,

    /**
     * Additional CSS class for the root DOM node
     */
    className: PropTypes.string,

    /**
     * If true, the handles can't be moved.
     */
    disabled: PropTypes.bool,

    /**
     * When the step value is greater than 1,
     * you can set the dots to true if you want to
     * render the slider with dots.
     */
    dots: PropTypes.bool,

    /**
     * If the value is true, it means a continuous
     * value is included. Otherwise, it is an independent value.
     */
    included: PropTypes.bool,

    /**
     * Minimum allowed value of the slider
     */
    min: PropTypes.number,

    /**
     * Maximum allowed value of the slider
     */
    max: PropTypes.number,

    /**
     * Value by which increments or decrements are made
     */
    step: PropTypes.number,

    /**
     * If true, the slider will be vertical
     */
    vertical: PropTypes.bool,

    /**
     * Determines when the component should update
     * its value. If `mouseup`, then the slider
     * will only trigger its value when the user has
     * finished dragging the slider. If `drag`, then
     * the slider will update its value continuously
     * as it is being dragged.
     * Only use `drag` if your updates are fast.
     */
    updatemode: PropTypes.oneOf(['mouseup', 'drag', 'hybrid']),

    /**
     * Dash-assigned callback that gets fired when the checkbox item gets selected.
     */
    fireEvent: PropTypes.func,

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func,

    dashEvents: PropTypes.oneOf(['change'])

};

Slider.defaultProps = {
    updatemode: 'mouseup'
};
