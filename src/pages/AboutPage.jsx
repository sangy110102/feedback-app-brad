import Card from "../components/shared/Card"
import { Link } from "react-router-dom"
import { FaArrowAltCircleLeft } from "react-icons/fa"
function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>This is a react app to leave a feedback for a product or service</p>
            <p>Version : 1.0.0</p>
            <p>
                <Link to="/">
                  <FaArrowAltCircleLeft size={30} />
                </Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage