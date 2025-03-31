import styles from "./Sidebar.module.css";
import SidebarLink from "./SidebarLink";
import { List, Search, Filter } from "lucide-react";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <nav aria-label="Map sidebar navigation">
        <ul className={styles.navTabs}>
          <SidebarLink target="søk" icon={<Search />} />
          <SidebarLink target="filtrer" icon={<Filter />} />
          <SidebarLink target="tegnforklaring" icon={<List />} />
        </ul>
      </nav>
      <div className={styles.sidebarContent}>{children}</div>
    </div>
  );
};

export default Sidebar;
