export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);

        // persist the data in local storage
        this.persistData();

        return like;
    }
    
    deleteLike(id){
        const stIndex = this.likes.findIndex(el =>
            el.id === id
        );

        this.likes.splice(stIndex, 1);

        // persist the data in local storage
        this.persistData();
        // console.log(this.likes);
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
   
    }

    getNumberOfLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readLocalStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        if(storage){
            this.likes = storage;
        }

    }
}