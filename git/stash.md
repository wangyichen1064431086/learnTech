储存当前分支上未commit的变化：
git stash
git checkout master

恢复:
git checkout mybranch
git stash list // stash@{0} stash@{1}
git stash apply stash@{1}