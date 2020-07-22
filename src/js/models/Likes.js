export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }
    
    deleteLike(id){
        const stIndex = this.likes.findIndex(el =>
            el.id === id
        );

        this.likes.splice(stIndex, 1);
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;

    }

    getNumberOfLikes(){
        return this.likes.length;
    }
}