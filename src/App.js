import './App.css';
import DemoContent from "@envelope/core/DemoContent";
import useTimeout from "@envelope/hook/useTimeout";
import {useState} from "react";


function App() {

    const [num, setNum] = useState(0);
    // const user = useSelector(null);


    useTimeout(() => {
        console.log('定个时')
        setNum(num + 1)
    }, 2000)

  return (
    <div className="App">
        <div>
            {
                num
            }
        </div>

        <div className='w-full h-[200px]'>hello</div>

        <DemoContent />

    </div>
  );
}

export default App;
