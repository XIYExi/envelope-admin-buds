import './App.css';
import DemoContent from "@envelope/core/DemoContent";
import DemoSidebarContent from "@envelope/core/DemoSidebarContent/DemoSidebarContent";
import useTimeout from "@envelope/hook/useTimeout";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";


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
