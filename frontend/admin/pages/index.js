import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../components/widgetLg/WidgetLg";
import WidgetSm from "../components/widgetSm/WidgetSm";
import styles from "../styles/Home.module.css";
import UserRoute from "../context/routes/UserRoute";
export default function Home() {
  return (
    <UserRoute>
      <div className={styles.home}>
        <FeaturedInfo />

        <div className={styles.homeWidgets}>
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </UserRoute>
  );
}
