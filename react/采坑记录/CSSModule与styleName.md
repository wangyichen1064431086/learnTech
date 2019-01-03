关于CSS Module:
<https://www.npmjs.com/package/react-css-modules>

styleName完全是使用CSS Module之后得到的属性。

所以在定义组件props时，要定义的是className, 需要计算、变化的也是className。最后在元素上采用 styleName = {className}

通常会用到相关的classnames组件：
<https://www.npmjs.com/package/classnames>