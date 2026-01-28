import Calendar from "./components/Calendar"
import Controls from "./components/Controls"
import Header from "./components/Header"
import { DataProvider } from "./providers/DataProvider"
import { TooltipProvider } from "./providers/TooltipProvider"

const App = () => {

    return <div className="flex flex-col h-full">
        <TooltipProvider>
            <DataProvider>
                <Header />
                <Controls />
                <Calendar startDay={7} endDay={31} />
            </DataProvider>
        </TooltipProvider>
    </div>
}

export default App