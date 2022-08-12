function BurgerMenu(props) {
  return (
    <div className="burger-menu">
      <div className="burger-menu__user-info">
        <p className="burger-menu__email">{props.email}</p>
        <button onClick={props.onLogout} className="button_type_exit" type="button">
          Выйти
        </button>
      </div>
    </div>
  );
}

export default BurgerMenu;