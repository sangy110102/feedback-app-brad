
function Header({text}) {
  
  return (
    <header style={{backgroundColor: 'black', color: 'red'}}>
        <div className="container">
            <h1>{text}</h1>
        </div>
    </header>
  )
}

Header.defaultProps = {
  text: 'Feedback'
}

export default Header