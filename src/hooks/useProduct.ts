import { useContext } from "react"
import { ProductContext } from "../providers/ProductProvider"

function useProduct() {
    return useContext(ProductContext)
}

export default useProduct