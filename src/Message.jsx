import React from 'react'

function Message({ color = "danger", children }) {
    return (
        <div class="columns is-mobile is-centered">
            <div class="column is-half">
                <p class="bd-notification is-primary">
                    <article class={`message is-${color}`} style={{ marginTop: "20%" }}>
                        <div class="message-body">
                            {children}
                        </div>
                    </article>
                </p>
            </div>
        </div>

    )
}

export default Message