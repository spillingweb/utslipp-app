
import Heading from "../ui/Heading";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  id: number;
  title: string;
  noObjects: number;
  noDone: number;
};

const ProjectCard = ({ id, title, noObjects, noDone }: ProjectCardProps) => {
  const percentDone = Math.round((noDone / noObjects) * 100);

  return (
    <li className={styles.projectCard}>
      <div className={styles.projectHeader}>
        <Heading level={3}>{`${id} - ${title}`}</Heading>
      </div>
      <div className={styles.projectData}>
        <p>{`Antall tilsynsobjekter: ${noObjects}`}</p>
        <p>{`Antall ferdigstilte: ${noDone} (${percentDone} %)`}</p>
        <div className={styles.pieChart}>
          {/* <PieChart data={[
              { title: "Ferdig", value: noDone, key: 1, color: "#4CAF50" },
              {
                title: "Tilsyn påbegynt",
                value: noObjects - noDone,
                key: 2,
                color: "#9CDCFE",
              },
            ]}
          /> */}
        </div>
        <a href={`#table${id}`}>Se tabell</a>
        <a href={`#map${id}`}>Vis i kart</a>
      </div>
    </li>
  );
};

export default ProjectCard;
