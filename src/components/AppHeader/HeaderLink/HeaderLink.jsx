import styles from './HeaderLink.module.css'

function HeaderLink({ sectionName, Icon, callback, isActive, customStyle }) {

  return (
    <a href="#"
      style={customStyle}
      className={styles.link}
      onClick={callback}
    >
      <Icon type={ isActive ? "primary" : "secondary"} />
      <p
        className={ isActive ? "text text_type_main-default ml-2"
          : "text text_type_main-default ml-2 text_color_inactive"
        }
      >{sectionName}</p>
    </a>
  )
}

export default HeaderLink;
