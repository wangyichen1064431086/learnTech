<http://cn.redux.js.org/docs/react-redux/>
react-redux 是 Redux 官方提供的 React 绑定库。

## 搭配 React
Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

## 安装
redux 默认不包含 react-redux, 需要单独安装：
```js
npm install --save react-redux
```

## 思想
react-redux 是基于 容器组件和展示组件相分离 的开发思想。

不同点：

  |展示组件|容器组件
 --|-------|-------
作用 |	描述如何展现（骨架、样式）|描述如何运行（数据获取、状态更新）
直接使用 Redux|否|是
数据来源	 | props| 监听 Redux state
数据修改	|从 props 调用回调函数	|向 Redux 派发 actions
调用方式	|手动	|通常由 React Redux 生成

大部分的组件都应该是展示型的，但一般需要少数的几个容器组件把它们和 Redux store 连接起来。


## API
### Provider store

它可以使组件层级中的 connect() 方法都能获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider > 中，其下的组件才能使用 connect() 方法。

Provider 这个模块是作为整个 App 的容器，在你原有的 App Container的基础上再包上一层，它的工作很简单，就是接受 Redux 的 store 作为props，并将其声明为 context 的属性之一，子组件可以在声明了contextTypes 之后可以方便的通过 this.context.store 访问到store。不过我们的组件通常不需要这么做，将 store 放在context里，是为了给下面的connect用的。

Eg:
```js
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
)
```

使用示例：
```js
const history = createHistory()
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo} />
        <Route path="bar" component={Bar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

```

### connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
连接 React 组件与 Redux store。返回一个新的与 Redux store 连接的组件类。

先考虑Redux是怎么运作的：首先store中维护了一个state，我们dispatch一个action，接下来reducer根据这个action更新state。

映射到我们的 React 应用中，store中维护的state就是我们的app state，一个React组件作为View层，做两件事：render和响应用户操作。于是 **connect就是将store中的必要数据作为props传递给React组件来render，并包装action creator用于在响应用户操作时dispatch一个action。**

参数：
#### (1) **mapStateToProps** 
函数签名： (state, [ownProps]) => stateProps

如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。

如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用.

返回值：要 merge 进 props 中的 state。

**理解：** 就是从 store 的 state 中选取本组件要用到的数据，merge进本组件的 props 中。

#### (2) **mapDispatchToProps**
函数签名：(dispatch, [ownProps]) => dispatchProps

返回值： 需要 merge 进 props 的 actionCreator 函数

Eg:
```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(
  mapStateToProps,
  actionCreators
)(TodoApp)
```