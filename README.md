# Vue 3 Music Player

依托网易云音乐的API，使用当下流行技术（2022）搭建的仿网易云音乐的音乐播放器项目。

前端：Vue 3 + Vite + Vue Router + Pinia + Element Plus + Axios。

后端：使用[网易云API](https://github.com/Binaryify/NeteaseCloudMusicApi)项目搭建。

参考了
[ssh](https://github.com/sl1673495)的
[ssh player](https://github.com/sl1673495/vue-netease-music)
仿网易云播放器项目，个人重新实现。

## Command

```bash
# install dependencies
pnpm install

# serve with hot reload at localhost:5173
pnpm dev
````

## TODO

-  [x] 首页
    - [x] 轮播图
    - [x] 推荐歌单
    - [x] 推荐新音乐
- [ ] 播放栏
    - [x] 音频播放器
    - [ ] 视频播放器
    - [ ] 歌词
    - [ ] 评论
    - [ ] 播放列表
- [x] 搜索栏
    - [x] 热门搜索
    - [x] 搜索结果
    - [x] 搜索建议
    - [x] 搜索历史
        - [ ] 搜索历史分类
- [ ] 搜索页面
    - [x] 单曲
    - [ ] 歌单
    - [ ] 歌手
    - [ ] 专辑
- [ ] 用户
    - [ ] 登录
        - [x] 匿名用户
        - [x] UID同步
        - [x] 账号，邮箱，二维码，验证码登陆
    - [ ] 注册
    - [ ] 退出
    - [ ] 用户信息
        - [x] 数据本地缓存
        - [ ] 本地用户登陆后记录合并到网易云账号
- [ ] 重新实现样式
- [ ] 更换UI