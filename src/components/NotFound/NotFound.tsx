import './NotFound.scss'
const NotFound = ()=>{
    return(
        <div className="notFound">
            <h1>Помилка: 404</h1>
            <h2>Цю сторінку не знайдено<br />Перевірте URL адресу.</h2>
            <a href="/home">
                <button className="home_btn">На головну</button>
            </a>
        </div>
    )
}
export default NotFound