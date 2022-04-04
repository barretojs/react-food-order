import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";

const Header: React.VFC = () => {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes["header-text"]}>BoxexaMeals</h1>
        <HeaderCardButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food!" />
      </div>
    </>
  );
};

export default Header;
