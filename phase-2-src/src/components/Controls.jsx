import { useState } from "react";

/**
 * 
 * @param {Object} props
 * @param {Function} props.onScaleChange
 * @param {Function} props.onSearch
 * @returns 
 */
const Controls = ({ onScaleChange, onSearch }) => {
    const [scale, setScale] = useState(1)

    const scaleUp = () => {
        if (scale < 5) {
            let newScale = scale + 0.25;
            setScale(newScale)
            onScaleChange(newScale)
        }
    }

    const scaleDown = () => {
        if (scale > 0.5) {
            let newScale = scale - 0.25;
            setScale(newScale)
            onScaleChange(newScale)
        }
    }

    const [searchValue, setSearchValue] = useState("")

    return <div className="flex flex-row gap-2 bg-gray-100 p-2 align-middle">
        <span className="font-bold self-center">2026. March</span>
        <input type="text" value={searchValue} placeholder="🔍 Search..." onChange={(ev) => { onSearch(ev.target.value); setSearchValue(ev.target.value) }} />

        {/* TODO: actually fill this up with data and add functionality */}
        <div className="input-group ml-auto">
            <label htmlFor="currency">💰</label>
            <select name="currency" id="currency"></select>
        </div>
        <button className="control-button">🔝 Full Screen</button>
        <button className="control-button"> 📁 Export</button>
        <button className="control-button" onClick={scaleDown}>➖</button>
        <button className="control-button" onClick={scaleUp}>➕</button>
    </div>
}

export default Controls;