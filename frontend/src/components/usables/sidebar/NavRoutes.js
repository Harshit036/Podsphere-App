import Bell from "../../../assets/Bell.png";
import User from "../../../assets/User.png";
import Support from "../../../assets/Support.png";
import Dashboard from "../../../assets/Dashboard.png";

const SidebarFields = [
  {
    name: "Home",
    Icon: Dashboard,
    linkTo: "/",
  },
  {
    name: "Add New Podcast",
    Icon: User,
    linkTo: "newPodcast",
  },
];

export default SidebarFields;
