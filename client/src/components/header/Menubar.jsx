import "../header/menubar.css";

const Menubar = () => {
    return (
        <div className="menubar">
            <div className="menuContainer">
                <span className="menubar-menu" id="menubar-menu-all">전체 상품</span>
                <span className="menubar-menu">베스트</span>
                <span className="menubar-menu">신상품</span>
                <span className="menubar-menu">건담 프라모델</span>
                <span className="menubar-menu">디지몬 프라모델</span>
                <span className="menubar-menu">포켓몬 프라모델</span>
                <span className="menubar-menu" id="menubar-menu-other">기타 프라모델</span>
            </div>
        </div>
    )
}

export default Menubar;