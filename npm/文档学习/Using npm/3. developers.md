## 文档
<https://docs.npmjs.com/misc/developers>

## npm-developers Developer Guide

### Description
So, you've decided to use npm to develop (and maybe publish/deploy) your project.

你决定使用npm来开发、发布你的项目。

Fantastic!

There are a few things that you need to do above the simple steps that your users will do to install your program.

在用户通过简单的步骤安装你的程序之前，你需要做几件事情。

### About These Documents
These are man pages. If you install npm, you should be able to then do man npm-thing to get the documentation on a particular topic, or npm help thing to see the same information.

这些是手册页。 如果你安装了npm，你应该可以通过命令man npm-thing来获得关于某个特定主题的文档，或者npm help thing来查看相同的信息。

```
npm help thing
```

### What is a package

A package is:

- a) a folder containing a program described by a package.json file
- b) a gzipped tarball containing (a)
- c) a url that resolves to (b)
- d) a <name>@<version> that is published on the registry with (c)
- e) a <name>@<tag> that points to (d)
- f) a <name> that has a "latest" tag satisfying (e)
- g) a git url that, when cloned, results in (a).

一个package是：

- a)一个包含程序的文件夹，其中还有一个描述性文件package.json
- b)一个包含a)的压缩文件包
- c)一个可以得到(b)的url
- d)一个在(npm 的)注册表发布的< name>@< version>，其拥有c)所说的url
- e)一个指向d的< name>@< tag>
- f)一个满足(e)的且tag为"latest"的< name>
- g)一个git url,当其被clone的时候，会得到a)

Even if you never publish your package, you can still get a lot of benefits of using npm if you just want to write a node program (a), and perhaps if you also want to be able to easily install it elsewhere after packing it up into a tarball (b).

即使你从不发布你的软件包，如果你只是想编写一个node程序（a），你仍然可以获得很多使用npm的好处；如果你也想在打包之后可以方便地安装到别处 （b）。

Git urls can be of the form:

Git 的urls就是这样的格式：
```
git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
```

The commit-ish can be any tag, sha, or branch which can be supplied as an argument to git checkout. The default is master.

commit-ish可以是任何tag,sha(安全散列算法)，或者branch,可以作为git checkout的参数。默认值是master。


### The package.json File
You need to have a package.json file in the root of your project to do much of anything with npm. That is basically the whole interface.

你需要在你项目的根目录中有一个package.json文件，来用npm做很多事情。该文件基本上有全部的接口。

关于该文件的详细信息请看[package.json](https://docs.npmjs.com/files/package.json)。你至少需要知道以下几点：

- **name**: This should be a string that identifies your project. Please do not use the name to specify that it runs on node, or is in JavaScript. You can use the "engines" field to explicitly state the versions of node (or whatever else) that your program requires, and it's pretty well assumed that it's javascript.

It does not necessarily need to match your github repository name.

So, node-foo and bar-js are bad names. foo or bar are better.

- **name**:这是标识您项目的字符串。请不要使用name来指明它是在Node上运行，还是在JavaScirpt中运行。你可以使用engines字段来明确地说明你的程序需要的运行环境：node的版本（或其他东西）。假定它就是javascirpt是一种很好的做法。

该字段没必要和你的gitub repository的name一样。

所以，node-foo和bar-js都是不好的名字，foo和bar就更好一些。

- **version**: A semver-compatible version.

- **version**: 一个语义化兼容的版本号

- **engines**: Specify the versions of node (or whatever else) that your program runs on. The node API changes a lot, and there may be bugs or new functionality that you depend on. Be explicit.

- **engines**:指明你程序可以运行的node版本（或其他东西）。node API经常变化，你所依赖的东西可能会出现bugs或者新功能。所以要明确说明。

- **author**：Take some credit

- **author**:有贡献的人

- **scripts**: If you have a special compilation or installation script, then you should put it in the scripts object. You should definitely have at least a basic smoke-test command as the "scripts.test" field. See [npm-scripts](https://docs.npmjs.com/misc/scripts).

- **scripts**:如果你有一个用于特殊的编译或安装的script脚本，那么你应该将它写在"scripts"字段中。你至少应该有一个基本的测试命令，写在script.test字段。详见[npm-scripts](https://docs.npmjs.com/misc/scripts)

- **main**:If you have a single module that serves as the entry point to your program (like what the "foo" package gives you at require("foo")), then you need to specify that in the "main" field.

- **main**:如果你有一个单独的module作为你程序的入口点（就像你使用require("foo")获得"foo"包输出的东西），那么你需要在main字段之处来。

- **directories**: This is an object mapping names to folders. The best ones to include are "lib" and "doc", but if you use "man" to specify a folder full of man pages, they'll get installed just like these ones.

You can use npm init in the root of your package in order to get you started with a pretty basic package.json file. See [npm-init](https://docs.npmjs.com/cli/init) for more info.

你可以在你的包的根目录下用命令npm init，来开始使用一个非常基本的package.json文件。 更多信息请参见[npm-init](https://docs.npmjs.com/cli/init)。

### Keeping files out of your package
Use a .npmignore file to keep stuff out of your package. If there's no .npmignore file, but there is a .gitignore file, then npm will ignore the stuff matched by the .gitignore file. If you want to include something that is excluded by your .gitignore file, you can create an empty .npmignore file to override it. Like git, npm looks for .npmignore and .gitignore files in all subdirectories of your package, not only the root directory.

使用一个.npmignore文件来把你的包里的东西排除在外。 如果没有.npmignore文件，但有一个.gitignore文件，那么npm会以.gitignore文件为准排除其中指定的东西。 如果您想要包含被.gitignore文件排除的内容，可以创建一个空的.npmignore文件来覆盖它。 和git一样，npm会在包的所有子目录中查找.npmignore和.gitignore文件，而不仅仅是在根目录下查找。

.npmignore files follow the same pattern rules as .gitignore files:

.npmignore文件遵循与.gitignore文件相同的模式规则：

- Blank lines or lines starting with # are ignored.
- Standard glob patterns work.
- You can end patterns with a forward slash / to specify a directory.
- You can negate a pattern by starting it with an exclamation point !.


By default, the following paths and files are ignored, so there's no need to add them to .npmignore explicitly:

默认情况下，以下路径和文件被忽略，所以不需要明确地将它们添加到.npmignore：

- .*.swp
- ._*
- .DS_Store
- .git
- .hg
- .npmrc
- .lock-wscript
- .svn
- .wafpickle-*
- config.gypi
- CVS
- npm-debug.log

Additionally, everything in node_modules is ignored, except for bundled dependencies. npm automatically handles this for you, so don't bother adding node_modules to .npmignore.

此外，node_modules中的所有内容都被忽略，除了捆绑的依赖关系不会被忽略。 npm自动为你处理这件事，所以不用麻烦你自己添加node_modules到.npmignore。

The following paths and files are never ignored, so adding them to .npmignore is pointless:

下面的路径和文件永远不会被忽略，因此将它们添加到.npmignore中是毫无意义的：

- package.json
- README (and its variants)
- CHANGELOG (and its variants)
- LICENSE / LICENCE

If, given the structure of your project, you find .npmignore to be a maintenance headache, you might instead try populating the files property of package.json, which is an array of file or directory names that should be included in your package. Sometimes a whitelist is easier to manage than a blacklist.

如果根据项目的结构，发现.npmignore是一个维护起来很头疼的东西，那么可以尝试填充package.json的files属性，这是一个数组，指定包中的文件或目录名称。 有时白名单比黑名单更容易管理。

##### Testing whether your .npmignore or files config works: 测试你的.npmignore或文件配置是否有效

If you want to double check that your package will include only the files you intend it to when published, you can run the npm pack command locally which will generate a tarball in the working directory, the same way it does for publishing.

如果你想再次确认一下你的软件包是否是只包含你想要发布的文件，你可以在本地运行npm pack命令，这将在工作目录下生成一个打包文件，就像是发布一样：

```
npm pack
```

### Link Packages
npm link is designed to install a development package and see the changes in real time without having to keep re-installing it. (You do need to either re-link or npm rebuild -g to update compiled packages, of course.)

npm link命令旨在安装开发包，并实时查看更改，而不必重新安装。 （当然，你需要npm link或者npm rebuild -g来更新已编译的软件包。）
```
npm link
npm rebuild -g
```

### Before Publishing: Make Sure Your Package Installs and Works:在发布之前：确认你的包可以安装而且可以用

If you can not install it locally, you'll have problems trying to publish it. Or, worse yet, you'll be able to publish it, but you'll be publishing a broken or pointless package. So don't do that.

如果您无法在本地安装，那么你在试图发布时也肯定会遇到问题。 或者，更糟糕的是，你可能能够发布它，但是你将会发布一个损坏的或毫无意义的软件包。 所以不要这样做。

In the root of your package, do this:

在你的包的根目录下，这样做：

```
npm install . -g
```

That'll show you that it's working. If you'd rather just create a symlink package that points to your working directory, then do this:

这将会告诉你，它是否能用。 如果你想创建一个指向你的工作目录的符号链接包，那么执行下面的命令：

```
npm link
```

使用以下命令查看包是否在那里了：

```
npm ls -g
```

To test a local install, go into some other folder, and then do:

为了测试本地的安装，进入一个其他文件夹下，然后执行：

```
cd ../some-other-folder
npm install ../my-package
```

to install it locally into the node_modules folder in that other place.

这样就将它本地地安装到了其他目录下的node_modules文件夹中。

Then go into the node-repl, and try using require("my-thing") to bring in your module's main module.

### Create a User Account
```
npm adduser
```

###  Publish your package
```
npm publish
```

You can give publish a url to a tarball, or a filename of a tarball, or a path to a folder.


你可以给发布指定一个指向压缩包的url，或一个压缩包的文件名，或一个文件夹的路径。