import './NotFound.scss'
const NotFound = ()=>{
    return(
        <div className="notFound">
            <h1>Помилка: 404</h1>
            <h2>Перевірте правильність URL адреси. <br /> Цю сторінку не знайдено</h2>
            <a href="/home">
                <button className="home_btn">На головну</button>
            </a>
        </div>
    )
}
export default NotFound