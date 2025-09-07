# Nestjs With Prisma Demo

安装 `nestjs` cli，搭建项目模板

`$ sudo npm i -g @nestjs/cli@latest`

安装好后，使用 `nest new xxx`的方式来创建项目

`nest new nestjs-prisma`

使用 `nest generate` 来快捷创建模块，`--no-spec`参数表示不生成测试文件
`nest generate module users --no-spec`
或者使用简写`nest g mo users --no-spec`

```shell
nest g co users --no-spec
nest g s users --no-spec
nest g m users --no-spec
```

## Project setup

```bash
$ pnpm install
```

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
