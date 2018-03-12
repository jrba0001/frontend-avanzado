export class CommentListController {

    constructor(selector, commentsService, pubSub) {
    	this.moment = moment;
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        pubSub.subscribe('comment:created', (event, comment) => {
            console.log("CommentListController", comment);
            this.loadArticle();
        });
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Se ha producido un error</div>';
    }

    showNoSongsMessage()  {
        this.element.innerHTML = '<div class="info">No hay ningún comentario</div>';
    }

    renderSongs(comment) {
        let html = '';
        for (let comment of comment) {

            html += `<table class="table table-responsive">
            <td class="nombre">${comment.nombre}</td>
            <td class="apellidos">${comment.apellidos} </td>
            <td class="email">${comment.email}</td>
            <td class="comentario">${comment.comentario}</td>
            <td class="date">${this.moment(comment.date).format('DD-MM-YYYY')}</span>
                                <span><i class="far fa-clock"></i> ${this.moment(comment.date).fromNow()}</td> </table>`
        }


        this.element.innerHTML = html;
    }

    loadComment() {
        this.showLoadingMessage();
        this.commentsService.list().then(comment => {
            if (comment.length == 0) {
                this.showNoSongsMessage();
            } else {
                this.renderSongs(comment);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING SONGS", error);
            this.showErrorMessage();
        });

    }

}