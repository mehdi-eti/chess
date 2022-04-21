import React from 'react'

function Loader() {
    return (
        <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content" style={{ overflow: "hidden", width: "5%" }}>
                <div className="loader" />
            </div>
        </div>
    )
}

export default Loader