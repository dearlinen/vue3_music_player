import {getSongDetail} from "@/api/public/song.js";
import {message} from "@/base/message.js";

export const musicAction = {


    startPlay : async songID =>{
        const [err,res] = await getSongDetail(songID);
        if(err) message.error(err);
        else{

        }

    }
    ,
    prevSong : (songID) => {

    },

    nextSong : songID => {

    }

}