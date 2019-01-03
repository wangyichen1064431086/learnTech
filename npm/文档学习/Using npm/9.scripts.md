## 文档
<https://docs.npmjs.com/misc/scripts
>

## npm-scripts: How npm handles the "scripts" field

### Description
npm supports the "scripts" property of the package.json file, for the following scripts:

npm支持在package.json文件中使用“scripts”属性，用于以下脚本：

- prepublish: Run BEFORE the package is packed and published, as well as on local npm install without any arguments. (See below)
- prepublish: 在pack和publish之前运行，在输入命令npm install（没有任何参数的本地安装）的情况下运行。 （见下文）

- prepare: Run both BEFORE the package is packed and published, and on local npm install without any arguments (See below). This is run AFTER prepublish, but BEFORE prepublishOnly.
- prepare: 在pack和publish之前执行，在输入命令npm install（没有任何参数的本地安装）的情况下运行。它的运行是在prepublish之后，但是在prepublishOnly之前。

- prepublishOnly: Run BEFORE the package is prepared and packed, ONLY on npm publish. (See below.)
- prepublishOnly: 在prepare和pack之前执行，仅仅在输入命令npm publish的情况下执行

- prepack: run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies)
- prepack: 在pack为压缩包之前执行，在输入命令npm pack、npm publish、install dependencies的情况下都会执行。

- postpack: Run AFTER the tarball has been generated and moved to its final destination.
- postpack: 在生成压缩包之后执行，将压缩包移动到最终的目标目录。

- publish, postpublish: Run AFTER the package is published.
- publish, postpublish: 在package已经pulish之后执行

- preinstall: Run BEFORE the package is installed
- preinstall:在package install之前执行

- install, postinstall: Run AFTER the package is installed.
- install, postinstall:在package install之后执行

- preuninstall, uninstall: Run BEFORE the package is uninstalled.
- preuninstall, uninstall:在package被uninstall之前执行

- postuninstall: Run AFTER the package is uninstalled.
- postuninstall: 在package被uninstall之后执行

- preversion: Run BEFORE bumping the package version.
- preversion:在更新包版本之前执行

- version: Run AFTER bumping the package version, but BEFORE commit.
- version: 在更新包版本之后、提交之前执行。

- postversion: Run AFTER bumping the package version, and AFTER commit.
- postversion: 在碰上版本号之后、提交之后执行。

- pretest, test, posttest: Run by the npm test command.
- pretest, test, posttest:在输入**npm test** 指令的时候执行。

- prestop, stop, poststop: Run by the npm stop command.
- prestop, stop, poststop:在输入**npm stop**指令的时候执行

- prestart, start, poststart: Run by the npm start command.
- prestart, start, poststart: 在输入**npm start**指令的时候执行。

- prerestart, restart, postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
- prestart, restart, postrestart: 在输入**npm restart**指令的时候执行。注意：在没有提供restart 脚本的情况下，**npm restart**将会暂停并重新最新执行start指令时运行的脚本。

- preshrinkwrap, shrinkwrap, postshrinkwrap: Run by the npm shrinkwrap command.
- preshrinkwrap, shrinkwrap, postshrinkwrap:在输入**npm shrinkwrap**指令时执行。(shrinkwrap：压缩打包)

Additionally, arbitrary scripts can be executed by running npm run-script < stage >. Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript). Scripts from dependencies can be run with npm explore < pkg> -- npm run < stage>.

另外，可以通过运行**npm run-script < stage>**来执行任意脚本。 对于这些命令，还会运行具有匹配名称的前后命令（例如，premyscript，myscript，postmyscript）。 有依赖关系的脚本可以使用**npm explore < pkg> - npm run < stage>**运行。

### Prepublish and prepare
If you need to perform operations on your package before it is used, in a way that is not dependent on the operating system or architecture of the target system, use a prepublish script. This includes tasks such as:
- Compiling CoffeeScript source code into JavaScript.
- Creating minified versions of JavaScript source code.
- Fetching remote resources that your package will use.

如果你的包在它被使用前需要执行一些操作，如果这些操作并不依赖于目标系统的任何操作系统或体系结构，那么请使用prepulish脚本。这包括以下几个任务：
- 将CoffeeScript源码编译为JavaScript
- 创建JavaScript代码的压缩版本
- 抓取你的包将用到的远程资源

The advantage of doing these things at prepublish time is that they can be done once, in a single place, thus reducing complexity and variability. Additionally,this means that:
- You can depend on coffee-script as a devDependency, and thus your users don't need to have it installed.
- You don't need to include minifiers in your package, reducing the size for your users.
- You don't need to rely on your users having curl or wget or other system tools on the target machines.

在prepublish的时候做这些事的好处是，它们可以在一个地方一次性被做完，从而降低复杂性和可变性。另外，这也意味着：
- 你可以将coffee-script用作开发依赖文件（即devDependency），这样你的用户就不用再专门安装这个依赖包
- 你不必在你的包中包含压缩器，以至于会减少你的用户量
- 你不必依赖 你的用户在目标机器上要有curl或者wget或其他系统工具。

### Default Values:默认值
npm will default some script values based on package contents.

npm命令 会基于包的内容 默认执行一些script。

#### (1)"start":"node server.js"
If there is a server.js file in the root of your package, then npm will default the start command to node server.js.

如果你的包的根目录下有一个server.js文件，那么**npm start**指令就会默认执行"node server.js"

#### (2)"install":"node-gyp rebuild"
If there is a binding.gyp file in the root of your package and you haven't defined your own install or preinstall scripts, npm will default the install command to compile using node-gyp.

如果你的包的根目录有一个binding.gyp文件，而且你还没有定义你自己的**install**或**preinstall** scripts, 那么**npm install**指令会默认用node-gyp来进行编译。(NOTE:node-gyp是node原生插件构建工具https://www.npmjs.com/package/node-gyp)

### USER
If npm was invoked with root privileges, then it will change the uid to the user account or uid specified by the user config, which defaults to nobody. Set the unsafe-perm flag to run scripts with root privileges.

如果使用root权限调用npm，则会将uid更改为**user** 配置所指定的用户帐户或uid，默认为nobody。 设置**unsafe-perm**标志以运行具有root权限的脚本。

### Environment
Package scripts run in an environment where many pieces of information are made available regarding the setup of npm and the current state of the process.

包脚本所运行的环境中有很多关于npm设置和当前进程状态的信息。

**NOTE**:此处的环境指的就是node.js进程process的env属性：The **process.env** property returns an object containing the user environment.<https://nodejs.org/dist/latest-v9.x/docs/api/process.html#process_process_env> 

#### path
If you depend on modules that define executable scripts, like test suites, then those executables will be added to the PATH for executing the scripts. So, if your package.json has this:

如果你依赖那些定义了可执行脚本的模块（如测试套件），那么这些可执行文件将被添加到PATH中以执行脚本。 所以，如果你的package.json有这个：
```
{ 
    "name" : "foo",
    "dependencies" : { 
        "bar" : "0.1.x" 
    },
    "scripts": { 
        "start" : "bar ./test" 
    } 
}
```

then you could run **npm start** to execute the bar script, which is exported into the **node_modules/.bin** directory on **npm install**.

那么你就可以通过指令**npm start**来执行bar脚本，该脚本会在npm install的时候被export到node_modules/.bin目录

#### package.json vars
The package.json fields are tacked onto the npm_package_ prefix. So, for instance, if you had {"name":"foo", "version":"1.2.5"} in your package.json file, then your package scripts would have the npm_package_name environment variable set to "foo", and the npm_package_version set to "1.2.5"

package.json中的字段被添加到具有npm_package前缀的字段上。 例如，如果你的package.json文件中有{“name”：“foo”，“version”：“1.2.5”}，那么你的包脚本将把**npm_package_name**环境变量设置为“foo” 并将**npm_package_version**设置为“1.2.5”

NOTE：此处说的这些变量是process.env.npm_package_name,process.env.npm_package_version这些。

#### configuration

Configuration parameters are put in the environment with the npm_config_ prefix. For instance, you can view the effective root config by checking the npm_config_root environment variable.

配置参数会放置在具有npm_config_前缀的环境中。 例如，您可以通过检查npm_config_root环境变量来查看有效的根配置。

#### Special: package.json "config" object
The package.json "config" keys are overwritten in the environment if there is a config param of < name>[@< version>]:< key>. For example, if the package.json has this:

如果通过npm config命令设置了npm config参数：< name> [@ < version>]：< key>， 那么package.json的“config”键将在环境中被覆盖。 例如，如果package.json有这个：
```
{ "name" : "foo"
, "config" : { "port" : "8080" }
, "scripts" : { "start" : "node server.js" } }
```

且server.js中有这个:
```
http.createServer(...).listen(process.env.npm_package_config_port)

```

那么用户可以这样来改变行为：
```
npm config set foo:port 80
```

#### current lifecycle event：当前声明周期事件
Lastly, the npm_lifecycle_event environment variable is set to whichever stage of the cycle is being executed. So, you could have a single script used for different parts of the process which switches based on what's currently happening.

最后，npm_lifecycle_event环境变量会被设置为执行周期的任何一个阶段。 这样，你就可以为进程的不同部分使用单个脚本，并根据当前发生的情况进行切换。

Objects are flattened following this format, so if you had {"scripts":{"install":"foo.js"}} in your package.json, then you'd see this in the script:

Objects会按照这种格式被压平，所以，如果你在package.json中有{“scripts”：{“install”：“foo.js”}}，那么你可以在脚本中看到：

```
process.env.npm_package_scripts_install === "foo.js"
```

##### Eg:
如果你的package.json包含以下代码:
```
{
    "scripts" :{ 
        "install" : "scripts/install.js", 
        "postinstall" : "scripts/install.js", "uninstall" : "scripts/uninstall.js"
    }
}
```
then **scripts/install.js** will be called for the install and post-install stages of the lifecycle, and **scripts/uninstall.js** will be called when the package is uninstalled. Since **scripts/install.js** is running for two different phases, it would be wise in this case to look at the npm_lifecycle_event environment variable.

那么将生命周期的install和post-install阶段会调用**scripts / install.js**，并且在uninstall程序包时将调用**scripts / uninstall.js**。 由于**scripts / install.js**运行于两个不同的阶段，在这种情况下，看看npm_lifecycle_event环境变量是明智的。

If you want to run a make command, you can do so. This works just fine:

如果你想运行make命令，你可以这样做
```
{ "scripts" :
  { "preinstall" : "./configure"
  , "install" : "make && make install"
  , "test" : "make test"
  }
}
```


### Exiting:退出
Scripts are run by passing the line as a script argument to sh.

If the script exits with a code other than 0, then this will abort the process.

Note that these script files don't have to be nodejs or even javascript programs. They just have to be some kind of executable file.

### HOOK Scripts

### BEST PRACTICES

- Don't exit with a non-zero error code unless you really mean it. Except for uninstall scripts, this will cause the npm action to fail, and potentially be rolled back. If the failure is minor or only will prevent some optional features, then it's better to just print a warning and exit successfully.
- Try not to use scripts to do what npm can do for you. Read through package.json to see all the things that you can specify and enable by simply describing your package appropriately. In general, this will lead to a more robust and consistent state.
- Inspect the env to determine where to put things. For instance, if the npm_config_binroot environment variable is set to /home/user/bin, then don't try to install executables into /usr/local/bin. The user probably set it up that way for a reason.
- Don't prefix your script commands with "sudo". If root permissions are required for some reason, then it'll fail with that error, and the user will sudo the npm command in question.
- Don't use install. Use a .gyp file for compilation, and prepublish for anything else. You should almost never have to explicitly set a preinstall or install script. If you are doing this, please consider if there is another option. The only valid use of install or preinstall scripts is for compilation which must be done on the target architecture.

## 很棒的学习blog
<http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html>

## 常用指令及相关模块

### 1.拷贝文件

安装cpx：

```cmd
npm install cpx -g
```

cpx 包：<https://www.npmjs.com/package/cpx>

package.json:

```json
 "build:publish":"cpx  \"dist/**/*\" \"../dev_cms/charts-system-new\" "

```