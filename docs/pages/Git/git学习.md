````bash
# 修改最近一次commit的message
git commit --amend

# 多个commit合并成一个
git rebase -i 基于哪一个的hash
然后用s替换pick

# 取消最近几次的commit(慎用，不可恢复)
git reset --hard 回退的hash
## 一、Git基本配置

### 1.1global、local、system登录

```bash
# 设置全局/当前仓库用户
git config --local/global user.name 'coderqmj'
git config --local/global user.email '1732935973@qq.com'
# 查看当前配置
git config --local/global --list
````

<<<<<<< HEAD

=======

> > > > > > > b610db5ec86d23c6091e91c1e1e58cfe073563f6

### 1.版本回退/前进

#### 方法一：

进行多次 commit，想回到某一个 commit 之前的版本，可以使用

- git reset --hard HEAD^
- 其中一个^可以回退一次 commit 之前， HEAD^^回退两个版本。
- 可以使用 HEAD~n 回退 n 个版本。

回退版本之后，又想去到最版本，

- git reset --hard \${git log}
- 版本号写前几位就行了

### 2.暂存区/工作区

本地文件就是工作区，add 之后就是就是暂存区，commit 之后就是提交到本地分支里面，push 之后就是远程分支了。

### 分支管理

#### 创建远程`origin`的`dev`分支到本地

- git checkout -b dev origin/dev

#### 删除远程分支

git push origin --delete [branchname]

#### 删除本地分支

#### 多人开发

两个人在同一个分支上面进行开发，这时候你修改了内容并推送远程。你同事又修改了相同文件，并试图推送。那么这个时候就会报错。

- git branch --set-upstream-to=origin/dev dev 本地分支与远程分支进行连接。
- 先 git pull 把远程最新代码抓取下来。
- 有冲突的话就先解决冲突，在提交。

![image-20201224182646539](/Users/didi/Library/Application Support/typora-user-images/image-20201224182646539.png)

1.开发新需求都需要更新 master 最新代码，然后从 master 分支上拉最新的分支出来进行开发。

2.合并代码时，不要将其他分支的代码合并到自己的分支，不是自己改的代码，不要提交。

3.要经常提交代码，不要改动一大推代码再提交，否则容易造成代码冲突。

```
1.在master git pull拉取最新代码。问题可能出在这。
2.创建
3.
```

#### 合并分支

- 首先提交开发分支
- 切换到需要合并的分支上，如 test
- git merge 开发分支。
- 更新远程 test 分支。

### git 开发流程

```
1.去最新代码 git pull origin master
2.git checkout -b 你的分支
3.git push origin 你的分支
4.git pull
5.将远程和本地进行连接git branch --set-upstream-to=origin/你的远程 你的本地
6.git pull
7.coding...
8.git add -A -> git commit -> git push
9.合并分支test，标题按照规范，描述需要尽量详细。
10.测试环境没问题合并预发环境，预发环境没问题合并到master。
```
