### findDOMNode
<https://reactjs.org/docs/react-dom.html#finddomnode>

```jsx
ReactDOM.findDOMNode(component)
```

### render()

```jsx
ReactDOM.render(element, container[,callback])
```
该方法会把element挂载到container中，并且返回element的实例(即refs引用)。如果是无状态组件，render会返回null。当组件装载完毕，callback就会被调用。

### unmountComponnetAtNode()