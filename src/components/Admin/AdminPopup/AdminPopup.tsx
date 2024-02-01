import "./AdminPopup.scss"
const AdminPopup = () => {
    return (
        <div className="admin__popup-container">
            <div className="admin__popup">
                <h3 className="admin__popup-text"><span>/</span>Створити товар</h3>
                <div className="admin__popup-input_container">
                    <input className="admin__popup-input" type="text" placeholder="Назва товару" />
                    <input className="admin__popup-input" type="text" placeholder="Кількість балів" />
                    <label className="admin__popup-input_image-block" >
                        <p>Вибрати фото</p>
                        <input className="admin__popup-input_image" type="file" />
                    </label>

                </div>
                <button className="admin__popup-btn">Створити</button>

            </div>
        </div>
    )
}

export default AdminPopup