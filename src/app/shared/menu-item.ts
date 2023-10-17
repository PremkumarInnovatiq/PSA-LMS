
export let MENU_ITEMS: any[] = [];
export let MENU_LIST: any[] = [];
MENU_LIST = [
    {
        id: "dashboard",
        title: "Dashboard", 
        selected: false, 
        iconsrc: "/assets/announcement-icon.svg", 
        children: 
        [
            {
                id: "main",
                title: "Student Analytics", 
                type: "none",
            },
            {
                id: "dashboard2",
                title: "Instructor Analytics", 
                type: "none",
            },
            {
                id: "student-dashboard",
                title: "Student Dashboard", 
                type: "none",
            },
            {
                id: "instructor-dashboard",
                title: "Instructor Dashboard", 
                type: "none",
            },
            {
                id: "coursemanager-dashboard",
                title: "Coursemanager Dashboard", 
                type: "none",
            },
            {
                id: "supervisor-dashboard",
                title: "Supervisor Dashboard", 
                type: "none",
            },
            {
                id: "hod-dashboard",
                title: "Head Of Department Dashboard", 
                type: "none",
            },
            {
                id: "trainingcoordinator-dashboard",
                title: "Training Coordinator Dashboard", 
                type: "none",
            },
            {
                id: "trainingadministrator-dashboard",
                title: "Training Administrator Dashboard", 
                type: "none",
            }
              ]
    },
    
{
    id: "courses",
    title: "Course", 
    iconsrc: "/assets/course-icon.svg", 
    selected: true, 
    children: [
        {
            id: "all-courses",
            title: "Course List", 
            type: "none",
            actions: ["edit","view", "delete"],

        }, 
        {
            id: "add-course",
            title: "Create Course", 
            type: "none"
        },  
        {
            id: "course-approval",
            title: "Course Approval", 
            type:"none"
        }, 
        {
            id: "course-kit",
            title: "Course Kit",
            type: "none"
        }, 
        {
            id: "categories",
            title: "Categories", 
            type: "none"
        },
        {
            id: "student-courses",
            title: "Courses", 
            type: "none"
        }

    ]
},
{
    id: "schedule",
    title: "Schedule Class", 
    iconsrc: "/assets/schedule-icon.svg", 
    selected: false, 
    children: 
    [
        {
            id: "class-list",
            title:"Class List", 
            type: "selected",
            actions: ["edit", "view","delete"],

        }, 
        {
            id: "create-class",
            title:"Create Class", 
            type:"none"
        }, 
        {
            id: "approve-list",
            title:"Approve List", 
            type: "none"
        }, 
        {
            id: "completion-list",
            title:"Completion List", 
            type:"none"
        }
    ]
},
{
    id:"program",
    title: "Program", 
    iconsrc:"/assets/fellowship-icon.svg", 
    selected: false, 
    children: [
        // {
        //     id:"add_program",
        //     title:"Create a Program", 
        //     type: "none"
        // }, 
        {
            id:"program-list",
            title:"All Program", 
            type:""
        },
        {
            id:"schedule-class",
            title:"Schedule Class", 
            type:""
        },
        {
            id:"program-approve-list",
            title:"Program Approve List", 
            type:""
        },
        {
            id:"program-kit",
            title:"Program Kit", 
            type:""
        },
        {
            id:"student-approve-list",
            title:"Student Approval List", 
            type:""
        },
        {
            id:"program-completion-list",
            title:"Completion Lisr", 
            type:""
        },
        {
            id: "student-programs",
            title: "Programs", 
            type: "none"
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
            id: "survey-list",
            title: "Survey List", 
            type:"none",
            actions: ["add", "edit", "delete"],
        },
        {
            id:"likert-chart",
            title:"Likert Chart", 
            type:""
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
            id: "audit-list",
            title: "List", 
            type:"none"
        }, 
        {
            id: "e-attendance",
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
            id: "user-type",
            title: "User Type", 
            type: "none",
            actions: ["add", "edit", "inactive"],
        }, 
        {
            id: "all-users",
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
    id: "certificate",
    title: "Certificate Builder", 
    selected: false, 
    iconsrc: "/assets/certificate-icon.svg", 
    children: 
    [
        {
            id: "certificates",
            title: "Certificates", 
            type: "none",
            actions: ["add", "edit", "view", "delete"],
        }, 
        {
            id: "design",
            title: "Design", 
            type: "none"
        }
    ]
},
{
    id: "email-configuration",
    title: "Email Configuration", 
    selected: false, 
    iconsrc:"/assets/email-icon.svg", 
    children: 
    [
        {
            id: "forgot-password",
            title: "Forgot Password", 
            type: "none"
        }, 
        {
            id: "welcome-mail",
            title: "Welcome E-mail", 
            type: "none"
        }, 
        {
            id: "instructor-request",
            title: "Instructor Request", 
            type: "none"
        }, 
        {
            id: "invite-user-reject",
            title: "Invite User Reject", 
            type: "none"
        }, 
        {
            id: "new-student-referred",
            title: "New Student Referred", 
            type: "none"
        },
        {
            id: "course-referral-invite",
            title: "Course Referral Invite", 
            type: "none"
        },
        {
            id: "completed-course",
            title: "Completed Course", 
            type: "none"
        },
        {
            id: "instructor-course-invite",
            title: "Instructor Course Invite", 
            type: "none"
        },
        {
            id: "instructor-accept-course-invite",
            title: "Instructor Accept Course Invite Status", 
            type: "none"
        },
        {
            id: "send-course-invoice",
            title: "Send Course Invoice", 
            type: "none"
        },
        {
            id: "admin-new-email",
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
            id: "instructor-banner-list",
            title: "Instructor Banners", 
            type: "none"
        }, 
        {
            id: "create-instructor-banner",
            title: "Add Instructor Banner", 
            type: "none"
        }, 

        {
            id: "student-banner-list",
            title: "Student Banners", 
            type: "none"
        },
        {
            id: "create-student-banner",
            title: "Add Student Banner", 
            type: "none"
        }

    ]
},
{
    id: "announcement",
    title: "Announcement", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "list",
            title: "List", 
            type: "none",
            actions:["List","edit","view"]
        }
    ]
},
{
    id: "instructors",
    title: "Instructors", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "all-instructors",
            title: "All Instructors", 
            type: "none",
            actions:["List","edit","view"]
        },
        {
            id: "add-instructor",
            title: "Add Instructor", 
            type: "none",
        },
        {
            id: "article",
            title: "Articles", 
            type: "none",
        },
        {
            id: "agreement-t-c",
            title: "Agreement T & C", 
            type: "none",
        }
    ]
},
{
    id: "students",
    title: "Students", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "all-students",
            title: "All Students", 
            type: "none",
            actions:["List","edit","view"]
        },
        {
            id: "add-student",
            title: "Add Student", 
            type: "none",
        },
        {
            id: "student-attendance",
            title: "Student Attendance", 
            type: "none",
        },
    ]
},
{
    id: "departments",
    title: "Departments", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "all-departments",
            title: "All Departments", 
            type: "none",
            actions:["List","edit","view"]
        },
        {
            id: "add-department",
            title: "Add Department", 
            type: "none",
        }
    ]
},
{
    id: "staff",
    title: "Staff", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "all-staff",
            title: "All Staff", 
            type: "none",
            actions:["List","edit","view"]
        },
        {
            id: "add-staff",
            title: "Add Staff", 
            type: "none",
        },
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
            id: "testimonials-instructor",
            title: "Instructor", 
            type: "none"
        }, 
        {
            id: "testimonials-student",
            title: "Student", 
            type: "none"
        }
    ]
},
{
    id: "homework",
    title: "Homework", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
},
{
    id: "leave-request",
    title: "Leave Request", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "instructor-leaves",
            title: "Instructor Leaves", 
            type: "none"
        }, 
        {
            id: "student-leaves",
            title: "Student Leaves", 
            type: "none"
        }
    ]

},
{
    id: "timetable",
    title: "Time Table", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
},
{
    id: "settings",
    title: "Settings", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
    children: 
    [
        {
            id: "instructor-settings",
            title: "Instructor Profile", 
            type: "none"
        }, 
        {
            id: "student-settings",
            title: "Student Profile", 
            type: "none"
        }
    ]
},
{
    id: "lectures",
    title: "Lectures", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
},
{
    id: "exam-schedule",
    title: "Exam Schedule", 
    selected: false, 
    iconsrc: "/assets/announcement-icon.svg", 
},

]

MENU_ITEMS = [...MENU_LIST];
