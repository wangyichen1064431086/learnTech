标准做法:

1. 同步 master: git pull upstream master --rebase
2. 检出新分支: git checkout -b feat-a
3. 提交改动: git commit
4. 合并本地提交: git rebase -i HEAD~X
5. 同步 master: 重复1
6. 推到自己的仓库: git push origin feat-a -f

```s
git branch //看下是不是在你的branch上
git pull upstream master --rebase
```

如果rebase有冲突，那么可以直接拉取最新的master再新建分支～
```s
//拉去最新的master
git checkout master
git pull upstream master
git status
git push origin master


```