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
    title: "Rubrik",
    icon: "fa-solid fa-boxes-stacked",
    link: "/rubrik",
    roles: ["Administrator", "Hub", "Agent"],
    children: false,
  },
];

export default sidebar_menus;
