import React from "react";
import './list.css'

function List(props) {
    const {heading ,values} = props;


    
    return(
        <div className="payment-wrapper">
            <h3>{heading}</h3>
            <ul>
                
                {
                    values && values.map((str) => {
                        return(
                            <li>{str}</li>
                        )
                    })
                }

            </ul>
        </div>

    )

};
export default List;
