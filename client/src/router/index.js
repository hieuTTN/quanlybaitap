import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/loginlayout/login'
import layoutTeacher from '../layout/teacher/defaultLayout'

//admin
import userAdmin from '../pages/admin/user'
import AdminCategory from '../pages/admin/category'
import AdminBlog from '../pages/admin/blog'
import AdminAddBlog from '../pages/admin/addblog'
import AdminThongbao from '../pages/admin/thongbao'



//public
import login from '../pages/public/login'
import regisPage from '../pages/public/regis'
import confirmPage from '../pages/public/confirm'
import forgotPage from '../pages/public/forgot'
import datLaiMatKhauPage from '../pages/public/datlaimatkhau'

//teacher
import TinTuc from '../pages/teacher/blog'
import TinTucDetail from '../pages/teacher/blogdetail'


const publicRoutes = [
    { path: "/", component: login, layout: layoutLogin},
    { path: "/login", component: login, layout: layoutLogin },
    { path: "/regis", component: regisPage, layout: layoutLogin },
    { path: "/confirm", component: confirmPage, layout: layoutLogin },
    { path: "/forgot", component: forgotPage, layout: layoutLogin },
    { path: "/datlaimatkhau", component: datLaiMatKhauPage, layout: layoutLogin },
];

const teacherRoutes = [
    { path: "/teacher/blog", component: TinTuc, layout: layoutTeacher },
    { path: "/teacher/blog-detail", component: TinTucDetail, layout: layoutTeacher },
];


const adminRoutes = [
    { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    { path: "/admin/category", component: AdminCategory, layout: layoutAdmin },
    { path: "/admin/blog", component: AdminBlog, layout: layoutAdmin },
    { path: "/admin/add-blog", component: AdminAddBlog, layout: layoutAdmin },
    { path: "/admin/thong-bao", component: AdminThongbao, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes, teacherRoutes};
