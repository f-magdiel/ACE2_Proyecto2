

import React from "react";

const Card = ({ title, icon, cantidad, fecha, color }) => {
    return (
        <div class="card text-center">
            <div class="card-header">
                <h5 class="card-title">
                    {title}
                </h5>
            </div>
            <div class="card-body">
                <i class={icon} style={{ fontSize: 60 , color:color}} ></i>
                <br /><hr />
                <p class="card-text">{cantidad}</p>
            </div>
            <div class="card-footer text-muted">
                {fecha}
            </div>
        </div>
    )
}

export default Card;