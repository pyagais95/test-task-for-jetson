import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import AllBooks from '@/components/AllBooks'
import BookDetails from '@/components/BookDetails'
import Profile from '@/components/Profile'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/all-books',
            name: 'AllBooks',
            component: AllBooks
        },
        {
            path: '/book/:id',
            name: 'Book',
            component: BookDetails
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
});

export default router