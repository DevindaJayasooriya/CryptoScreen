import { createContext, useState, useEffect } from 'react'
export const CryptoContext = createContext();

const CryptoContextProvider = (props) =>{

    const [cryptoList, setCryptoList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [currentCurrency, setCurrentCurrency] = useState({
        name: "USD",
        symbol: "$",
        
    });
    

    // Fetching data from the API - CG-BsVNHBdXgLw7Um9CDQyVwjyy 
    const fetchCryptoData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BsVNHBdXgLw7Um9CDQyVwjyy'}
        };
        try{
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,
                options 
            );
            const data = await res.json();
            setCryptoList(data);
        } catch (error) {
            console.error("Error fetching crypto data:", error);
        }
    };

    //Re fetching data when the current currency changes
    useEffect(() => {
        fetchCryptoData();
    }, [currentCurrency]);

    //Refetching data when the search term changes
    useEffect(()=>{
        if ( searchTerm.trim() === " ") {
            setFilteredCoins(cryptoList);
        }
        else {
            setFilteredCoins(cryptoList.filter((coin) =>
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }}, [searchTerm, cryptoList]);
    
     
    const contextValue = {
        cryptoList,
        filteredCoins,
        currentCurrency,
        setCurrentCurrency,
        searchTerm,
        setSearchTerm,
    }

    return(
        <CryptoContext.Provider value={contextValue}>
            {props.children}
        </CryptoContext.Provider>
    )
}

export default CryptoContextProvider;