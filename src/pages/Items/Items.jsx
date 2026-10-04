import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Item from "../../components/Item/Item";
import { getProducts } from "../../services/api";
import { useAppContext } from "../../context/AppContext";

function Items() {

    const {products, setProducts} = useAppContext() 

    useEffect(() => {
        getProducts()
        .then(result => setProducts(result))
        .catch(error => console.log(error))
    }, [])
    
    return(
        <Container>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {
                    products.map((item) => (
                        <Item key={item.id} {...item}/>
                    ))
                }
            </div>
        </Container>
    )
}

export default Items;