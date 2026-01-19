import Calendar from "./components/Calendar"
import Controls from "./components/Controls"
import Header from "./components/Header"
import { DataProvider } from "./providers/DataProvider"

const App = () => {

    return <div className="flex flex-col h-full">
        <DataProvider>
            <Header />
            <Controls/>
            <Calendar startDay={7} endDay={31}/>
        </DataProvider>
    </div>
}

export default App