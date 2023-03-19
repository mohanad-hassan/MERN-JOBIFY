import { useAppContext } from "../context/appContext"
const Alert = ({text}) => {
const {alertType,alertText} = useAppContext()
  return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert
