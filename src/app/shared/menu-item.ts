
export let MENU_ITEMS: any[] = [];
export let MENU_LIST: any[] = [];
MENU_LIST = [
    // {
    //     title: "Home", 
    //     iconsrc: "/assets/home-icon.svg", 
    //     selected: false, 
    //     children: [

    //     ]
    // },
{
    id: "course",
    title: "Course", 
    iconsrc: "/assets/course-icon.svg", 
    selected: true, 
    children: [
        {
            id: "course_list",
            title: "List", 
            type: "none",
            actions: ["edit","view", "delete"],

        }, 
        {
            id: "course_add",
            title: "Add", 
            type: "none"
        },  
        {
            id: "course_approval",
            title: "Course Approval", 
            type:"none"
        }, 
        {
            id: "course_kit",
            title: "Course Kit",
            type: "none"
        }, 
        {
            id: "categories",
            title: "Categories", 
            type: "none"
        }
    ]
},
{
    id: "class",
    title: "Schedule Class", 
    iconsrc: "/assets/schedule-icon.svg", 
    selected: false, 
    children: 
    [
        {
            id: "class_list",
            title:"List", 
            type: "selected",
            actions: ["edit", "view","delete"],

        }, 
        {
            id: "class_add",
            title:"Add", 
            type:"none"
        }, 
        {
            id: "class_approve_list",
            title:"Approve List", 
            type: "none"
        }, 
        {
            id: "class_completion_list",
            title:"Completion List", 
            type:"none"
        }
    ]
},
{
    id:"fellowship",
    title: "Fellowship", 
    iconsrc:"/assets/fellowship-icon.svg", 
    selected: false, 
    children: [
        {
            id:"add_program",
            title:"Create a Program", 
            type: "none"
        }, 
        {
            id:"list_program",
            title:"List", 
            type:""
        }
    ]
},
{
    id: "survey",
    title: "Survey", 
    iconsrc:"/assets/survey-icon.svg", 
    selected: false, 
    children: 
    [
        {
            id: "survey_list",
            title: "List", 
            type:"none",
            actions: ["add", "edit", "delete"],
        }
    ]
},
{
    id: "audit",
    title: "Audit", 
    selected: false, 
    iconsrc: "/assets/audit-icon.svg", 
    children: 
    [
        {
            id: "audit_list",
            title: "List", 
            type:"none"
        }, 
        {
            id: "e_attendance",
            title: "E-Attendance", 
            type:"none"
        }
    ]
}, 
// {
//     id: "home_content",
//     title: "Home Content", 
//     iconsrc: "/assets/home-content-icon.svg", 
//     selected: false, 
//     children: 
//     [

//     ]
// },
{
    id: "users",
    title: "Users", 
    selected: false, 
    iconsrc: "/assets/users-icon.svg", 
    children: 
    [
        {
            id: "users_type",
            title: "Type", 
            type: "none",
            actions: ["add", "edit", "inactive"],
        }, 
        {
            id: "all_users",
            title: "All User", 
            type: "none",
            actions: ["add", "edit"],
        }
    ]
},
// {
//     id: "survey_builder",
//     title: "Survey Builder", 
//     selected: false, 
//     iconsrc: "/assets/survey-builder-icon.svg", 
//     children: 
//     [
//         {
//             id: "surveys",
//             title: "Surveys", 
//             type: "none",
//             actions: ["add", "edit", "view", "delete"]
//         }, 
//         {
//             id: "survey_add",
//             title: "Add", 
//             type: "none"
//         }
//     ]
// },
{
    id: "certificate_builder",
    title: "Certificate Builder", 
    selected: false, 
    iconsrc: "/assets/certificate-icon.svg", 
    children: 
    [
        {
            id: "certificates_list",
            title: "Certificates", 
            type: "none",
            actions: ["add", "edit", "view", "delete"],
        }, 
        {
            id: "certificates_add",
            title: "Add", 
            type: "none"
        }
    ]
},
{
    id: "email_config",
    title: "Email Configuration", 
    selected: false, 
    iconsrc:"/assets/email-icon.svg", 
    children: 
    [
        {
            id: "forget_password_temp",
            title: "Forgot Password", 
            type: "none"
        }, 
        {
            id: "welcome_mail_template",
            title: "Welcome E-mail", 
            type: "none"
        }, 
        {
            id: "trainer_req_temp",
            title: "Instructor Request", 
            type: "none"
        }, 
        {
            id: "invite_user_reject",
            title: "Invite User Reject", 
            type: "none"
        }, 
        {
            id: "new_member_referred",
            title: "New Student Referred", 
            type: "none"
        },
        {
            id: "course_referral_invite",
            title: "Course Referral Invite", 
            type: "none"
        },
        {
            id: "completed_course",
            title: "Completed Course", 
            type: "none"
        },
        {
            id: "new_trainer_contact",
            title: "Instructor Course Invite", 
            type: "none"
        },
        {
            id: "trainer_accept_course_invite",
            title: "Instructor Accept Course Invite Status", 
            type: "none"
        },
        {
            id: "send_course_invoice",
            title: "Send Course Invoice", 
            type: "none"
        },
        {
            id: "admin_email",
            title: "Admin New Email", 
            type: "none"
        }
    ]
},
{
    id: "banners",
    title: "Banners", 
    selected: false, 
    iconsrc: "/assets/banner-icon.svg", 
    children: 
    [
        {
            id: "trainer_banners",
            title: "Instructor Banner", 
            type: "none"
        }, 
        {
            id: "student_banners",
            title: "Student Banner", 
            type: "none"
        }
    ]
},
// {
//     id: "trainers",
//     title: "Trainer", 
//     selected: false, 
//     iconsrc: "/assets/trainer-icon.svg", 
//     children: []
// },
// {
//     id: "resources",
//     title: "Resources", 
//     selected: false, 
//     iconsrc: "/assets/resource-icon.svg", 
//     children: []
// },
// {
//     id: "news_letter",
//     title: "Newsletter", 
//     selected: false, 
//     iconsrc: "/assets/newsletter-icon.svg", 
//     children: []
// },
{
    id: "announcement",
    title: "Announcement", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "announcement_list",
            title: "List", 
            type: "none",
            actions:["List","edit","view"]
        }
    ]
},
{
    id: "testimonials",
    title: "Testimonials", 
    selected: false, 
    iconsrc: "/assets/testimonials-icon.svg", 
    children: 
    [
        {
            id: "testimonials_trainer",
            title: "Instructor", 
            type: "none"
        }, 
        {
            id: "testimonials_student",
            title: "Student", 
            type: "none"
        }
    ]
},
// {
//     id: "email_invite",
//     title: "Email Invite", 
//     selected: false, 
//     iconsrc: "/assets/email-invite-icon.svg", 
//     children: []
// },
]

MENU_ITEMS = [...MENU_LIST];
