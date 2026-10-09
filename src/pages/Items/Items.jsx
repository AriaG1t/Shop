import {useMemo, useState } from "react";
import Container from "../../components/Container/Container";
import Item from "../../components/Item/Item";
import { useAppContext } from "../../context/AppContext";
import ItemSkeleton from "../../components/Item/ItemSkeleton";
import { useSearchParams } from "react-router-dom";

function Items() {

    const [searchParams] = useSearchParams()

    const {products, isLoad} = useAppContext()

    // Filter

    const categories = [...new Set(products.map(item => item.category))]
    const [tempfilter, setTempFilter] = useState({
        categories: [],
        sort: searchParams.get("sort") || "",
        highOrLow: "high",
        searchText: ""
    })
    const [filter, setFilter] = useState({
        categories: [],
        sort: searchParams.get("sort") || "",
        highOrLow: "high",
        searchText: ""
    })

    const handleSelect = (e) => {
        if (e.target.id === "category") {
            if (e.target.value !== "") {
                if (!tempfilter.categories.includes(e.target.value)) {
                    setTempFilter((prev) => (
                        {...prev, categories:[...prev.categories, e.target.value]}
                    ))
                }
            }
        }
        else{
            setTempFilter((prev) => (
                {...prev, sort:e.target.value}
            ))
        }
    }

    const handleRemove = (e) => {
        if (tempfilter.categories.includes(e.target.name)) {
            setTempFilter((prev) => (
                {...prev,
                    categories: prev.categories.filter(item => item !== e.target.name)
                }
            ))
        }
    }

    const handleFilter = () => {
        setFilter((prev) => ({...prev, ...tempfilter}))
        setCurrentPage(1)
    }

    const handleHighLowClick = (e) => {
        if (e.target.name !== filter.highOrLow) {
            setFilter(prev => ({...prev, highOrLow: e.target.name}))
            setCurrentPage(1)
        }
    }

    // Filter Confirm

    const finalData = useMemo(() => {
        let result = [...products]

        // Category

        if (filter.categories.length > 0) {
            result = result.filter(item => 
                filter.categories.includes(item.category)
            ) 
        }

        // Search

        if (filter.searchText !== "") {
            const text = filter.searchText
            if (filter.categories.length > 0) {
                result = result.filter(product =>
                    product.title.toLowerCase().includes(text)
                )
            }
            else{
                result = result.filter(product =>
                    product.title.toLowerCase().includes(text) || product.category.toLowerCase().includes(text)
                )
            }
        }

        // Sort

        if (filter.sort !== "") {
            switch (filter.sort) {
                case "price":
                    result.sort((a, b) => {
                        const priceA = a.price * (1 - a.discount / 100);
                        const priceB = b.price * (1 - b.discount / 100);

                        return priceB - priceA;
                    });
                    break;
                case "discount":
                    result.sort((a, b) => b.discount - a.discount)
                    break;
                case "rating":
                    result.sort((a, b) => b.rating - a.rating)
                    break;
                case "a-z":
                    result.sort((a, b) => a.title.localeCompare(b.title))
                    break;
            }
        }

        // High or Low

        if (filter.highOrLow === "low") {
            result.reverse()
        }

        return result

    }, [filter, products])

    // Filter Clear

    const filterClear = () => {
        setFilter({
        categories: [],
        sort: "",
        highOrLow: "high",
        searchText: ""
    })
    setTempFilter({
        categories: [],
        sort: "",
        highOrLow: "high",
        searchText: ""
    })
    setCurrentPage(1)
    }

    // Searching

    const [showSuggestions, setShowSuggests] = useState(false)

    const [searchInput, setSearchInput] = useState("")

    const handelSearchInput = (e) => {
        setShowSuggests(true)
        setSearchInput(e.target.value)
    }

    const searchSuggestions = useMemo(() => {
        if (searchInput === "") {
            return []
        }

        let data = [...products]

        if (filter.categories.length > 0) {
            data = data.filter(item =>
                filter.categories.includes(item.category)
            )
        }

        const text = searchInput.toLowerCase()

        return data
            .filter(item => {
                const title = item.title.toLowerCase()

                if (filter.categories.length > 0) {
                    return title.includes(text)
                }

                const category = item.category.toLowerCase()

                return (
                    title.includes(text) ||
                    category.includes(text)
                )
            })
            .map(item => item.title)
        
    }, [searchInput, products, filter.categories])

    const suggestionClick = (e) => {
        setSearchInput(e.target.innerText)
        setFilter(prev => ({...prev, searchText: e.target.innerText.toLowerCase()}))
        setShowSuggests(false)
    }

    const searchBtn = (e) => {
        e.preventDefault()
        setFilter(prev => ({...prev, searchText: searchInput.toLowerCase()}))
        setCurrentPage(1)
        setShowSuggests(false)
    }

    // Pagination

    const limit = 20
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(finalData.length / limit)

    const lastIndex = currentPage * limit
    const startIndex = lastIndex - limit

    const data = finalData.slice(startIndex, lastIndex)

    return(
        <Container>
            <div className="font-mono border flex justify-evenly items-center xl:w-4/6 lg:justify-between rounded flex-wrap gap-4 p-3 mt-5 border-mist-500 shadow-md">
                <form onSubmit={searchBtn} action="" className="flex relative sm:w-auto w-full">
                    <input
                    className="border sm:w-70 w-full border-mist-500 text-sm outline-0 rounded-l px-2 py-1" 
                    type="search" value={searchInput} onChange={handelSearchInput} name="search" placeholder="Search..."/>
                    <button type="submit" className="text-mist-700 font-bold rounded-r cursor-pointer px-2 bg-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.4733 17.8875C14.8415 19.2086 12.7631 20 10.5 20C5.25329 20 1 15.7467 1 10.5C1 5.25329 5.25329 1 10.5 1C15.7467 1 20 5.25329 20 10.5C20 12.7631 19.2086 14.8415 17.8875 16.4733L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L16.4733 17.8875ZM3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.5129 17.207 14.3407 15.9163 15.6878C15.8731 15.719 15.8318 15.754 15.7929 15.7929C15.754 15.8318 15.719 15.8731 15.6878 15.9163C14.3407 17.207 12.5129 18 10.5 18C6.35786 18 3 14.6421 3 10.5Z" fill="currentColor"></path>
                        </svg>
                    </button>
                    {
                        showSuggestions  ? 
                            <div className="absolute px-2 text-mist-400 text-sm rounded-lg bg-neutral-800 sm:w-70 w-full top-full max-h-70 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-auto">
                                {
                                    searchSuggestions.map(item => (
                                        <p
                                        onClick={suggestionClick} 
                                        className="border my-1.5 hover:ring-2 ring-mist-400 cursor-pointer border-mist-700 rounded-full w-fit py-0.5 shadow shadow-neutral-700 px-2">{item}</p>
                                    ))
                                }
                            </div> : null
                    }
                </form>
                <div className="">
                    <label htmlFor="category" className="mr-2">Category:</label>
                    <select 
                    value={
                                tempfilter.categories.length > 0
                                ? tempfilter.categories[tempfilter.categories.length - 1]
                                : ""
                            }
                    onChange={handleSelect} id="category" className="cursor-pointer open:rounded-b-none bg-mist-700 font-bold shadow-md border outline-0 border-mist-500 px-1 rounded-lg py-0.5">
                        <option value="">None</option>
                        {
                            categories.map(item => (
                                <option key={item} value={item}>{item.charAt(0).toUpperCase()}{item.slice(1)}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select 
                    value={
                        tempfilter.sort === "" ? "" : tempfilter.sort
                    }
                    onChange={handleSelect} id="sort" className="cursor-pointer open:rounded-b-none bg-mist-700 font-bold shadow-md border outline-0 border-mist-500 px-1 rounded-lg py-0.5">
                        <option value="">None</option>
                        <option value="discount">Discount</option>
                        <option value="price">Price</option>
                        <option value="a-z">a-z</option>
                        <option value="rating">Rating</option>
                    </select>
                    {
                        filter.sort === "" ? null : 
                        <div>
                            <button name="high" onClick={handleHighLowClick} className={`${filter.highOrLow === "high" ? "text-gray-200" : "text-gray-400" } cursor-pointer ml-2 text-2xl hover:scale-135 hover:text-gray-200`}>&#8639;</button>
                            <button name="low" onClick={handleHighLowClick} className={`${filter.highOrLow === "low" ? "text-gray-200" : "text-gray-400"} cursor-pointer text-2xl hover:scale-135 hover:text-gray-200`}>&#8642;</button>
                        </div>
                    }
                </div>
                <button onClick={handleFilter} className="cursor-pointer sm:m-0 m-auto font-black text-mist-700 bg-green-400 px-2 rounded">
                    Comfirm
                </button>
                {
                    tempfilter.categories.length > 0 || tempfilter.sort !== "" ?
                    <button onClick={filterClear} className="cursor-pointer sm:m-0 m-auto font-black text-mist-700 bg-red-400 px-2 rounded">
                        Clear
                    </button> : null
                }
            </div>
            {
                tempfilter.categories.length > 0 ?  
                <div className="flex flex-wrap gap-4 mt-2 font-mono">
                    {
                        tempfilter.categories.map((item) => (
                            <div className="text-sm flex items-center bg-mist-700 border border-gray-400 rounded-full px-2 py-1">
                                <p key={`${item}P`}>{item}</p>
                                <button onClick={handleRemove} name={item} key={item} className="text-lg flex justify-center pb-0.25 items-center cursor-pointer hover:ring-2 ring-gray-400 bg-red-800 size-6 rounded-full ml-1">x</button>
                            </div>
                        ))
                    }
                </div>
                : null 
            }
                {
                    isLoad ? 
                        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                            <ItemSkeleton /><ItemSkeleton /><ItemSkeleton /><ItemSkeleton /><ItemSkeleton />
                        </div> : 
                        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                            {data.map((item) => (
                                <Item key={item.id} {...item}/>
                            ))}
                        </div>
                }    
            <div className="grid grid-cols-12 md:grid-cols-3 items-center-safe text-xl font-mono mt-7">
                {
                    currentPage === 1 ? null : <button onClick={() => setCurrentPage(prev => prev - 1)} 
                    className="hover:ring-2 ring-gray-500 flex justify-self-end justify-center cursor-pointer font-black bg-mist-800 size-8 rounded-full">&lt;</button>
                }
                <div className="flex col-span-10 md:col-span-1 md:col-start-2 col-start-2 mx-3 flex-wrap justify-center items-center">
                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                className={`
                                ${currentPage === index + 1 ? "bg-gray-600 ring-gray-400" : "bg-mist-800 ring-gray-500"}
                                cursor-pointer m-1 px-2 rounded-lg hover:ring-2 `}
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                </div>
                {
                    currentPage === totalPages ? null : <button onClick={() => setCurrentPage(prev => prev + 1)} 
                    className="hover:ring-2 ring-gray-500 flex justify-self-start justify-center cursor-pointer font-black bg-mist-800 size-8 rounded-full">&gt;</button>
                }
            </div>
        </Container>
    )
}

export default Items;