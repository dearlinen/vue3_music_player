import {useMusicStore} from "@/store/music/music.js";
import {computed, watchEffect,ref} from "vue";


export const usePlayMode = (playMod) => {
    const mode = ref('')

    const modIcon = computed(() => {
        switch (playMod) {
            case 'loop':
                return 'icon-loop'
            case 'single':
                return 'icon-single'
            case 'shuffle':
                return 'icon-shuffle'
        }
    })


    // const modText = computed(() => {
    //     switch (playMod) {
    //         case 'loop':
    //             return '列表循环'
    //         case 'single':
    //             return '单曲循环'
    //         case 'shuffle':
    //             return '随机播放'
    //     }
    // })
    const changeMod = () => {
        switch (playMod) {
            case 'loop':
                musicStore.playMod = 'single'
                break;
            case 'single':
                musicStore.playMod = 'shuffle'
                break;
            case 'shuffle':
                musicStore.playMod = 'loop'
        }
    }


    watchEffect(() => {
        switch (playMod) {
            case 'loop':
                mode.value = '列表循环'
                break;
            case 'single':
                mode.value = '单曲循环'
                break;
            case 'shuffle':
                mode.value = '随机播放'

        }
    })

    console.log(mode.value)
    return {
        modIcon,
        mode,
        changeMod
    }
}