import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import PostDetail from "@/views/PostDetails.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/post/:id', name: 'post-detail', component: PostDetail}
    ]
});

export default router