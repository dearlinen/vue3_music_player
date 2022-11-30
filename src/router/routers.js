import {createRouter, createWebHistory} from "vue-router";


const pageRouter = [
    {
        path: '/',
        name: 'Home',
        redirect: '/discovery'
    },
    {
        path: '/discovery',
        component: () => import('@/views/Discovery.vue'),
    },
    {
        path: '/user/:uid',
        name:'user',
        component:()=>import('@/components/user/User.vue')
    }
]

const loginRouter = [
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/uid',
        name: 'uid',
        component: () => import('@/components/user/UIDLogin.vue'),
        beforeEnter: (to, from, next) => {
            if (from.path === '/login') {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('@/components/user/AccountLogin.vue'),
        beforeEnter: (to, from, next) => {
            if (from.path === '/login') {
                next()
            } else {
                next('/login')
            }
        }
    },
]

const searchRouter = [
    {
        path: '/search/:keyword',
        // name:'search',
        component: () => import('@/views/SearchPage.vue'),
        children: [
            {
                path: 'song',
                name: 'song',
                component: () => import('@/components/detailList/SearchSong.vue'),
            },
            {
                path: 'album',
                name: 'album',
                component: () => import('@/components/detailList/SearchAlbum.vue'),
            },
            {
                path: 'artist',
                name: 'artist',
                component: () => import('@/components/detailList/SearchArtist.vue'),
            },
            {
                path: 'playlist',
                name: 'playlist',
                component: () => import('@/components/detailList/SearchPlaylist.vue'),
            }
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...pageRouter,
        ...searchRouter,
        ...loginRouter

    ]
})