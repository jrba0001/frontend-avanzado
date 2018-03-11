import css from './scss/style.scss';

import {
    CommentsService
} from './js/CommentsService';

import 'bootstrap';

import './scss/style.scss';

import {
    AppController
} from './js/AppController';

import {
    CommentListController
} from './js/CommentListController';

import {
    FormController
} from './js/FormController';

import {
    PubSub
} from 'pubsub-js';



import {
    HeaderController
} from './js/HeaderController';

document.addEventListener("DOMContentLoaded", () => {
    let appController = new AppController("body", PubSub);
    let headerController = new HeaderController(".body", appController);

    let commentsService = new CommentsService('http://localhost:3001/comment/');

    let commentListController = new CommentListController(".comment-list", commentsService, PubSub);
    commentListController.loadComment();

    let formController = new FormController('.comment-form', commentsService, PubSub);

});