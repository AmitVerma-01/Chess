import { useNavigate } from "react-router-dom"
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex items-center justify-around overflow-hidden">
        <div className="h-full flex justify-center items-center">
            <img src={'/board.jpeg'} alt="chessBoardIMG" className="h-3/4 rounded-md" />
        </div>
        <div className="text-3xl max-w-screen-sm text-white space-y-5">
          <div className="font-bold text-5xl ">Play Chess Online on the #1 Site!</div>
          <div className="flex justify-center items-center">
            <Button onClick={()=> navigate('/game')}>Play Online</Button>

          </div>
        </div>
    </div>
  )
}

export default Landing
