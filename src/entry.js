import css from './scss/style.scss';

import {
    CommentsService
} from './js/CommentsService';

import 'bootstrap';

import './scss/style.scss';
import moment from 'moment';

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

document.addEventListener("DOMContentLoaded", () => {

    let commentsService = new CommentsService('http://localhost:3001/comment/');

    let commentListController = new CommentListController(".comment-list", commentsService, PubSub, moment);
    commentListController.loadComment();

    let formController = new FormController('.comment-form', commentsService, PubSub, moment);



});