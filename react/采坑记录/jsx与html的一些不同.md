## 1. 常用属性区分

html | JSX
-----|-----
class|className
tabindex|tabIndex
for  |htmlFor

## 2. style设置方式区分
jsx给组件设置style prop时，style prop的值必须是一个对象：

```jsx
const component = <Component style={{
  color: 'white',
  backgroundImage: `url(${imgUrl})`
}} />
```

而HTML中元素的style值是一个;分隔的字符串:

```html
<div style="color: white; backgroundImage: url(xxx.jpg)">
```
## 2. 属性值区分
- HTML的数组值只能是字符串
- JSX属性值可以是任意类型（用{}包裹起来即可）

## 3. button的disable

<https://stackoverflow.com/questions/33673520/react-setting-the-disabled-attribute-based-on-a-state>

### 在jsx中

表示able:

```jsx
<button disabled={false}>Submit</button>
```

表示disable:

```jsx
<button disabled={true}>Submit</button>
```

### 在html中

表示able:

```html
<button>Submit</button>
```

表示disable:

```html
<button disabled>Submit</button>
```

## 4.事件区分
### (1)React绑定事件与DOM0级事件绑定程序的语法区别
- React events使用峰驼式命名，而非小写
- 在JSX中你传递一个function作为event handler,而非一个字符串

Eg, the HTML:
```jsx
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

Eg, React:
```js
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
### (2)React绑定事件与DOM0级事件绑定程序的机制区别

React不会像DOM0级事件处理那样将事件监听器直接绑定到HTML元素上。React仅仅是借鉴了这种写法而已。其实，在React底层，对合成事件做了 **事件委派**。

#### React事件委派：

React并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的监听器。该监听器维持了一个映射来保存所有组件内部的事件监听函数。

这样简化了事件处理和回收机制，很大地提高了效率。

### (3)事件中阻止元素默认行为的方式
在react中你不能通过return false来阻止（HTML元素的）默认行为。你必须显式调用preventDefault。

Eg, the HTML:

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

Eg, the React:
```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

### 5. 表单元素的一些区别

#### (1)textarea元素定义text的方式
在HTML中，textarea元素通过children来定义它的文字:
```jsx
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在React中，< textarea>拥有一个value属性而非通过其子元素设置text。这样，使用textarea的form的写法很类似于使用单行input的form。

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value.toUpperCase()
    });
  }

  handleSubmit(event) {
    alert('A name was submitted:' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

#### (2)select元素表示选中某一项的方式

在HTML中，select元素通过对某一option元素设置selected属性表示选中该项。Eg:
```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

在React中，它是在 **select标签上设置一个value属性**，而 **非在option标签上使用selected属性**。这样在受控组件中会更方便，因为你只需要在一个地方更新它。Eg:

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'coconut'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is:' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite：
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### (3) type为checkbox的input表示勾选的方式
html中通过checked属性的存在来表示input是否默认被选中。你可以将该属性设置为checked="checked"，或更简单地只设置为checked。

react中checked属性为true表示被选中，为false表示未被选中。

