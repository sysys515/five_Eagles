import styles from "../../css/eventBanner.module.css";

export const EventBanner = () => {
    return (
        <article
            className={styles.banner}
            style={{
                backgroundImage: "url(/images/main.jpg",
                backgroundSize: "100%",
            }}
        >
        </article>
    );
};
export default EventBanner;