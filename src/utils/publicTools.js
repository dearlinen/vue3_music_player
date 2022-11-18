export const comparePlaylist = (arr,obj)=>{
    return arr.findIndex(item=>item.id===obj.id)
}