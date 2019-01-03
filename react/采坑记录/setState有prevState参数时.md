```jsx
this.setState(prevState => ({
  oneThing: !prevState.oneThing
}))
```
等价于
```jsx
this.setState(prevState => {
  return {
    oneThing: !prevState.oneThing
  }
})
```

当没有prevState参数时，可以这样写:
```jsx
this.setState({
  oneThing
})

```

当需要有prevState和props两个参数时：
```jsx
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```