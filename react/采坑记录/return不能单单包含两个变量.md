这样是会报错的：
```
getItems() {
  ...
  return (
    { item1 }
    { item2 }
  )
}
```

这样可以:
```
getItems() {
  ...
  return (
    <div >
      {item1}
      {item2}
    </div>
  )
}
```

或者只return一个变量，不加( ):
```
getItems() {
  ···
  return items2; //items可以为组件数组，也可以为单个组件
}


