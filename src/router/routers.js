import {createRouter, createWebHistory} from "vue-router";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name:'Home',
            redirect: '/discovery'
        },
        {
            path: '/discovery',
            component: () => import('@/views/discovery/Discovery.vue'),
        },
        {
            path: '/search/:keyword',
            // name:'search',
            component: () => import('@/views/search/SearchPage.vue'),
            children: [
                {
                    path: '',
                    redirect: 'song',
                    // props: true
                },
                {
                    path: 'song',
                    name:'searchSong',
                    component: () => import('@/views/search/SearchSong.vue'),
                },
                {
                    path: 'album',
                    name:'album',
                    component: () => import('@/views/search/SearchAlbum.vue'),
                },
                {
                    path: 'artist',
                    name:'artist',
                    component: () => import('@/views/search/SearchArtist.vue'),
                },
                {
                    path: 'playlist',
                    name:'playlist',
                    component: () => import('@/views/search/SearchPlaylist.vue'),
                }
            ]
        }

    ]
})