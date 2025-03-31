import styles from "./SidebarSection.module.css";
import { ChevronLeft } from "lucide-react";
import Heading from "../ui/Heading";

type SidebarSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const SidebarSection = (props: SidebarSectionProps) => {
  return (
    <section className={styles.section} id={props.id}>
      <div className={styles.sectionHeader}>
        <Heading level={2}>{props.title}</Heading>
        <a className={styles.arrowIcon} href="#">
          <ChevronLeft />
        </a>
      </div>
      <div className={styles.sectionContent}>{props.children}</div>
    </section>
  );
};

export default SidebarSection;
