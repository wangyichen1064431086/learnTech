## 一、createStore
创建一个Redux store以存放应用中所有的state。应用中有且只有一个store。

### 语法
```js
createStore(reducer, [preloadedState], enhancder)
```

参数：
1. reducer: TYPE Function。接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
2. [preloadedState] (any): 初始时的 state。
3. enhancer: TYPE Function。Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。

返回：
TYPE Store: 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。

## 二、Store
Store 就是用来维持应用所有的 state 树 的一个对象。 改变 store 内 state 的惟一途径是对它 dispatch 一个 action。

Store不是类。它只是有几个方法的对象。**要创建store,只需要把根部的reducing函数传递给createStore

### Store的方法
#### getState()
返回应用当前的state树。
它 **与 store 的最后一个 reducer 返回值相同**。

#### dispatch(action)
分发action。这是触发state变化的唯一途径。

会使用当前 getState() 的结果和传入的 action 以同步方式的调用 store 的 reduce 函数。返回值会被作为下一个 state。从现在开始，这就成为了 getState() 的返回值，同时变化监听器(change listener)会被触发。

####  subscribe(listener)
添加一个变化监听器。**每当 dispatch action 的时候就会执行**，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。

这是一个底层 API。多数情况下，你不会直接使用它，会使用一些 React（或其它库）的绑定。

#### replaceReducer(nextReducer)
替换 store 当前用来计算 state 的 reducer。

## 三、combineReducers
随着应用变得越来越复杂，可以考虑将 reducer 函数 拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分。

combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。

**由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名。**

### 语法
```js
combineReducers(reducers)
```

### 示例
```js
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// rootReducer 将返回如下的 state 对象
{
  potato: {
    // ... potatoes, 和一些其他由 potatoReducer 管理的 state 对象 ... 
  },
  tomato: {
    // ... tomatoes, 和一些其他由 tomatoReducer 管理的 state 对象，比如说 sauce 属性 ...
  }
}
```

## 四、applyMiddleware(...middlewares)
使用包含自定义功能的middleware来扩展Redux是一种推荐的方式。

- Middleware可以让你包装store的dispatch方法来达到你想要的目的。
- Middleware拥有 **可组合** 这一关键特性。多个middleware可以被组合到一起使用，形成middleware链。其中，每个middleware都不需要关心链中它前后的middleware的任何信息。

Middleware 并不需要和 createStore 绑在一起使用，也不是 Redux 架构的基础组成部分，但它带来的益处让我们认为有必要在 Redux 核心中包含对它的支持。因此，虽然不同的 middleware 可能在易用性和用法上有所不同，它仍被作为扩展 dispatch 的唯一标准的方式。

### 语法
```js
applyMiddleware(...middlewares)
```

参数：
- ...middlewares(arguments):遵循Redux middleware API的函数。每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。该函数会被传入 被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。

*不太理解*

返回值：
- TYPE (Function) :一个应用了 middleware 后的 store enhancer。这个 store enhancer 的签名是 createStore => createStore，但是最简单的使用方法就是直接作为最后一个 enhancer 参数传递给 createStore() 函数。

## 五、


## 六、compose
从右到左组合多个函数。

当需要把多个 store 增强器 依次执行的时候，需要用到它。

### 语法
```js
compose(...functions)
```

参数：
- functions: 需要合成的多个函数。预计每个函数都接收一个参数。它的返回值将作为一个参数提供给它左边的函数，以此类推。例外是最右边的参数可以接受多个参数，因为它将为由此产生的函数提供签名。compose(funcA, funcB, funcC) 形象为 compose(funcA(funcB(funcC())))

返回值：
TYPE function: 从右到左把接收到的函数合成后的最终函数