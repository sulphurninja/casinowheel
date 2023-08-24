import { useState, useEffect } from 'react';

function ResultsTable() {
    const [results, setResults] = useState([]);
    const [drawTimes, setDrawTimes] = useState([]);
    const [nextToDrawtime, setNextToDrawtime] = useState('');
    const [timeToDraw, setTimeToDraw] = useState('');
  
    useEffect(() => {
        const timer = setInterval(() => {
          const now = new Date();
          const nextToDraw = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes() + 1,
            0,
            0
          );
          const timeDiff = Math.floor((nextToDraw - now) / 1000);
          const seconds = timeDiff % 60;
          const newTimeToDraw = `${seconds.toString().padStart(2, "0")}`;
          const newNextToDrawtime = nextToDraw.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setNextToDrawtime(newNextToDrawtime);
          setTimeToDraw(newTimeToDraw);
        }, 1000);
    
        const startDrawTime = new Date();
        startDrawTime.setMinutes(Math.floor(startDrawTime.getMinutes() / 1) * 1);
        startDrawTime.setSeconds(0);
        const drawTimes = Array(10).fill().map((_, index) => {
          const drawTime = new Date(startDrawTime.getTime() - index * 1 * 60 * 1000);
          return drawTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        });
    
        setDrawTimes(drawTimes);
    
        const intervalId = setInterval(() => {
          Promise.all(drawTimes.map(drawTime => (
            fetch(`/api/getPrior?drawTime=${drawTime}`).then(res => res.json())
          ))).then(results => {
            setResults(results.map(result => (result.couponNum)));
          });
        }, 1000);
        return () => {
          clearInterval(timer);
          clearInterval(intervalId);
        }
      }, [nextToDrawtime, timeToDraw, results]);

return (
    <div className='  '>
        <div className="flex flex-col  ">
            <div className=" flex flex-row">
                {drawTimes.map((drawTime, index) => (
                    <div key={drawTime} className=" text-white font-bold text-md bg-red-500 px-3 py-2 border-2 border-white -300">
                        {results [index]} 
                    </div>
                ))}
            </div>
            <div className=" flex flex-row">
                
                    <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div>
                    <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div> <div  className=" text-white font-bold text-sm bg-red-500 px-2 py-2 border-2 border-white -300">
                       1X
                    </div>
             
            </div>
        </div>
        
    </div>
);
}

export default ResultsTable;
