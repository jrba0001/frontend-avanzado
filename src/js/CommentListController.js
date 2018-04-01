export class CommentListController {

    constructor(selector, commentsService, pubSub, moment) {
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

    showNoMessage()  {
        this.element.innerHTML = '<div class="info">No hay ningún comentario</div>';
    }

    renderMessage(comment) {
        let html = '';
        for (let contenido of comment) {

            html += `<table class="table table-responsive">
            <td class="nombre">${contenido.nombre}</td>
            <td class="apellidos">${contenido.apellidos} </td>
            <td class="email">${contenido.email}</td>
            <td class="comentario">${contenido.comentario}</td>
            <td class="date">${this.moment(contenido.date).format('DD-MM-YYYY')}</span>
                                <span><i class="far fa-clock"></i> ${this.moment(contenido.date).fromNow()}</td> </table>`
        }


        this.element.innerHTML = html;
    }

    loadComment() {
        this.showLoadingMessage();
        this.commentsService.list().then(comment => {
            if (comment.length == 0) {
                this.showNoSongsMessage();
            } else {
                this.renderMessage(comment);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING MESSAGES", error);
            this.showErrorMessage();
        });
    }
}