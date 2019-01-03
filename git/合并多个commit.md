查看有多少个commit
```s
git log --oneline
```

数一下要合并几个commit,假设是7个

合并：
```s
git rebase -i HEAD~7
```

然后把一系列的commit,只保留第一个为pick,其他改为f

修改的时候可以这样：
- 光标上下移动到要修改的pick单词
- 按esc退出编辑模式
- 同时按下 wc 删除这个单词
- 输入f
- 重复该过程

保存并退出：
- 按esc退出编辑模式
- 输入:wq