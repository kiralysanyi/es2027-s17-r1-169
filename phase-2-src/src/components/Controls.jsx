const Controls = () => {
    return <div className="flex flex-row gap-2 bg-gray-100 p-2 align-middle">
        <span className="font-bold self-center">2026. March</span>
        <input type="text" placeholder="🔍 Search..." />

        <div className="input-group ml-auto">
            <label htmlFor="currency">💰</label>
            <select name="currency" id="currency"></select>
        </div>
        <button className="control-button">🔝 Full Screen</button>
        <button className="control-button"> 📁 Export</button>
        <button className="control-button">➖</button>
        <button className="control-button">➕</button>
    </div>
}

export default Controls;