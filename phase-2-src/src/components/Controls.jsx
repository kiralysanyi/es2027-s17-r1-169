import { useState } from "react";

/**
 * 
 * @param {Object} props
 * @param {Function} props.onScaleChange
 * @param {Function} props.onSearch
 * @param {Function} props.onCurrencyChange
 * @param {Object} props.currencies
 * @returns 
 */
const Controls = ({ onScaleChange, onSearch, onCurrencyChange, currencies }) => {
    const [scale, setScale] = useState(1);
    const [currency, setCurrency] = useState({name: "EUR", value: 1})

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

    const changeCurrency = (ev) => {
        setCurrency(JSON.parse(ev.target.value));
        onCurrencyChange(JSON.parse(ev.target.value))
    }

    const [searchValue, setSearchValue] = useState("")

    return <div className="flex flex-row gap-2 bg-gray-100 p-2 align-middle">
        <span className="font-bold self-center">2026. March</span>
        <input type="text" value={searchValue} placeholder="🔍 Search..." onChange={(ev) => { onSearch(ev.target.value); setSearchValue(ev.target.value) }} />

        {/* TODO: actually fill this up with data and add functionality */}
        <div className="input-group ml-auto">
            <label htmlFor="currency">💰</label>
            <select name="currency" value={currency} id="currency" onChange={changeCurrency}>
                {Object.keys(currencies).map(currency => <option value={JSON.stringify({ name: currency, value: currencies[currency] })}>{currency}</option>)}
            </select>
        </div>
        <button className="control-button">🔝 Full Screen</button>
        <button className="control-button"> 📁 Export</button>
        <button className="control-button" onClick={scaleDown}>➖</button>
        <button className="control-button" onClick={scaleUp}>➕</button>
    </div>
}

export default Controls;