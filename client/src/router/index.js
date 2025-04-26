import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/loginlayout/login'
import layoutTeacher from '../layout/teacher/defaultLayout'
import layoutStudent from '../layout/student/defaultLayout'

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
import SubjectTeacher from '../pages/teacher/subject'
import AccountTeacher from '../pages/teacher/account'
import ChatTeacher from '../pages/teacher/chat'
import SubjectDetailTeacher from '../pages/teacher/subjectdetail'

//student
import TinTucStudent from '../pages/student/blog'
import TinTucDetailStudent from '../pages/student/blogdetail'
import AccountStudent from '../pages/student/account'
import ChatStudent from '../pages/student/chat'
import SubjectStudent from '../pages/student/subject'


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
    { path: "/teacher/subject", component: SubjectTeacher, layout: layoutTeacher },
    { path: "/teacher/account", component: AccountTeacher, layout: layoutTeacher },
    { path: "/teacher/chat", component: ChatTeacher, layout: layoutTeacher },
    { path: "/teacher/subject-detail", component: SubjectDetailTeacher, layout: layoutTeacher },
];

const studentRoutes = [
    { path: "/student/blog", component: TinTucStudent, layout: layoutStudent },
    { path: "/student/blog-detail", component: TinTucDetailStudent, layout: layoutStudent },
    { path: "/student/account", component: AccountStudent, layout: layoutStudent },
    { path: "/student/chat", component: ChatStudent, layout: layoutStudent },
    { path: "/student/subject", component: SubjectStudent, layout: layoutStudent },
];


const adminRoutes = [
    { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    { path: "/admin/category", component: AdminCategory, layout: layoutAdmin },
    { path: "/admin/blog", component: AdminBlog, layout: layoutAdmin },
    { path: "/admin/add-blog", component: AdminAddBlog, layout: layoutAdmin },
    { path: "/admin/thong-bao", component: AdminThongbao, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes, teacherRoutes,studentRoutes};
