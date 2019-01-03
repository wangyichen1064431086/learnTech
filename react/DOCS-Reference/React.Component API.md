## The Component Lifecycle:组件生命周期
### Updating
<https://reactjs.org/docs/react-component.html#updating>

如果组件自身state更新了，那么会依次执行shouldComponentUpdate()、componentWillUpdate()、render()、componentDidUpdate()

## Class Properties：类属性
### defaultProps
defaultProps can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props. For example:

defaultProps可以定义在component class本身上面。它可以为class设置默认props。它对undefined props有用，但对null props没用。 Eg:

```
  class CustomButton extends React.Component {
    // ...
  }

  CustomButton.defaultProps = {
    color: 'blue'
  };
```

If props.color is not provided, it will be set by default to 'blue':

如果没有提供props.color，那么它将会被设置为'blue':

```
render() {
  return <CustomButton /> ; // props.color will be set to blue
}
```

如果props.color被设置为null,它将保持为null:

```
render() {
  return <CustomButton color={null} /> ; // props.color will remain null
}
```