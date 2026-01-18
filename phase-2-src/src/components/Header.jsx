import Logo from "../assets/logo.svg"

const Header = () => {
    return <div className="w-full flex flex-row justify-center align-middle p-5">
        <img src={Logo} alt="logo"/>
    </div>
}
export default Header;