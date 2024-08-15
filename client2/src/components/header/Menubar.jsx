import "../header/menubar.css";
import { useNavigate } from "react-router-dom";

const Menubar = () => {

    const navigate = useNavigate();
    
    const handleAllMenuClick = () => {
        navigate("/list");    
    }

    const handleBestClick = () => {
        navigate("/bestProductList");    
    }

    const handlenewProductClick = () => {
        navigate("/newProductList");    
    }

    const handleGundamClick = () => {
        navigate("/gundamList");    
    }

    const handleDigimonClick = () => {
        navigate("/digimonList");    
    }

    const handlePokemonClick = () => {
        navigate("/pokemonList");    
    }

    const handleHexagearClick = () => {
        navigate("/hexaGearList");    
    }

    return (
        <div className="menubar">
            <div className="menuContainer">
                <span className="menubar-menu" id="menubar-menu-all" onClick={handleAllMenuClick}>전체 상품</span>
                <span className="menubar-menu" onClick={handleBestClick}>베스트</span>
                <span className="menubar-menu" onClick={handlenewProductClick}>신상품</span>
                <span className="menubar-menu" onClick={handleGundamClick}>건담 프라모델</span>
                <span className="menubar-menu" onClick={handleDigimonClick}>디지몬 프라모델</span>
                <span className="menubar-menu" onClick={handlePokemonClick}>포켓몬 프라모델</span>
                <span className="menubar-menu" id="menubar-menu-other" onClick={handleHexagearClick}>HEXA GEAR</span>
            </div>
        </div>
    )
}

export default Menubar;