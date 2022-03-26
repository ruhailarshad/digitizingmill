
const Card = ({shadow, styles = '', children, ...rest}: any) => {
  
    const cardProps = () => {
      if (shadow) return 'shadow-2'
      return ''
    }
    return (
      <div
        className={`border border-gray-10 rounded-20 p-20 ${cardProps} ${styles}`}
        {...rest}
      >
        {children}
      </div>
    )
  }
  
  export default Card