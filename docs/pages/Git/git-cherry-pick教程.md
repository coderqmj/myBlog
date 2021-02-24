### 一、前言

对于多分支的代码仓库，将代码从一个分支移到另一个分支是非常常见的需求。这个时候就分为两种情况：

- 需要另一个分支的所有代码变动，则使用 `git merge`
- 只需要部分代码的变动（某几个提交），这个时候可以采用 Cherry pick

### 二、基本用法

`git cherry-pick`命令的作用，就是将指定的提交（commit）应用于其他分支。

```
git cherry-pick <commitHash>
```

上面的命令就会指定提交的commitHash，应用于当前分支。在当前分支产生一个新的提交，他们哈希值不一样。

例子：仓库有`master` 和 `feature`两个分支。

```bash
  a - b - c - d   Master
       \
         e - f - g Feature
```

现在将提交`f`应用到`master`分支

```bash
# 切换到 master 分支
$ git checkout master

# Cherry pick 操作
$ git cherry-pick f
```

上面的操作完成以后，代码库就变成了下面的样子。

```bash
  a - b - c - d - f   Master
       \
         e - f - g Feature
```

完成上面操作之后，`master`分支新增了一个f的提交

`git cherry-pick`命令的参数，不一定是提交的哈希值，分支名也是可以的，表示转移该分支的最新提交。

> ```bash
> $ git cherry-pick feature
> ```

上面代码表示将`feature`分支的最近一次提交，转移到当前分支。

### 三、转移多个提交

