const sidebar_menus = [
  {
    header: "MAIN",
    roles: ["Administrator", "Hub", "Agent"],
  },
  {
    title: "Dashboard",
    icon: "fa-solid fa-gauge",
    link: "/dashboard",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
  {
    header: "SETUP",
    roles: ["Administrator", "Hub", "Agent"],
  },
  {
    title: "Assessment Method",
    icon: "fa-solid fa-bars-progress",
    link: "/assessment-method",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
  {
    title: "Rubrik",
    icon: "fa-solid fa-boxes-stacked",
    link: "/rubrik",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
  {
    title: "Student Outcomes (SOs)",
    icon: "fa-solid fa-graduation-cap",
    link: "/student-outcome",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
  {
    title: "Support Level to SO",
    icon: "fa-solid fa-layer-group",
    link: "/student-outcome-level",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
  {
    title: "Program Studi",
    icon: "fa-solid fa-building",
    link: "/program-studi",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
];

export default sidebar_menus;
