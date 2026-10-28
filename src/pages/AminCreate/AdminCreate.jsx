import { useState } from "react";
import Container from "../../components/Container/Container";
import { useAppContext } from "../../context/AppContext";
import ProductSkeleton from "../Product/ProductSkeleton";
import { postProduct } from "../../services/api";

function AdminCreate() {

    const { isLoad, setIsLoad, products } = useAppContext()

    const categories = [...new Set(products.map(item => item.category))]

    const [draft, setDraft] = useState({
        id: "301",
        title: "",
        features: [],
        specifications: {},
        "shipping": {
            "free": null,
            "estimatedDays": null
        },
        warranty: "",
        "price": "",
        "discount": "",
        "stock": "",
        "availability": "",
        "description": "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMpbl_Wl6mCecVNJBe3K_nkGz7Q6DFDK0Y5ZOp7Q-V-KG4aIMu6EDgUbT&s=10",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMpbl_Wl6mCecVNJBe3K_nkGz7Q6DFDK0Y5ZOp7Q-V-KG4aIMu6EDgUbT&s=10"
        ],
        rating: 0,
        category: ""
    })

    const initialProduct = {
        id: "301",
        title: "",
        features: [],
        specifications: {},
        "shipping": {
            "free": null,
            "estimatedDays": null
        },
        warranty: "",
        "price": "",
        "discount": "",
        "stock": "",
        "availability": "",
        "description": "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMpbl_Wl6mCecVNJBe3K_nkGz7Q6DFDK0Y5ZOp7Q-V-KG4aIMu6EDgUbT&s=10",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMpbl_Wl6mCecVNJBe3K_nkGz7Q6DFDK0Y5ZOp7Q-V-KG4aIMu6EDgUbT&s=10"
        ],
        rating: 0,
        category: ""
    }

    const [product, setProduct] = useState(initialProduct)

    const [newSpec, setNewSpec] = useState({
        key: "",
        value: ""
    })

    const [editError, setEditError] = useState(null)

    const [isNewSpec, setIsNewSpec] = useState(false)

    const [editSection, setEditSection] = useState(null)

    const startEdit = (section) => {
        setEditSection(section)
    }

    const saveEdit = () => {
        setProduct({ ...draft }),
            setEditSection(null)
    }

    const cancelEdit = () => {
        setDraft({ ...product }),
            setEditSection(null)
    }

    const updateFeild = (feild, value) => {
        setDraft(prev => ({
            ...prev,
            [feild]: value
        }))
    }

    const handleCreate = async () => {
        try {
            setIsLoad(true)

            const createdProduct = await postProduct(product)

            setProduct(createdProduct)
            setDraft(structuredClone(createdProduct))

        } catch (error) {
            console.error("Failed to create product:", error)
        } finally {
            setIsLoad(false)
        }
    }

    return (
        <Container>
            {
                isLoad ? <ProductSkeleton /> :
                    <>
                        <div className="flex justify-center flex-wrap gap-5 font-mono mt-10">
                            {
                                draft.images?.map((img, index) => (
                                    <img key={index} className="size-40 rounded" src={img} alt="" />
                                ))
                            }
                            <input type="file" className="size-40 bg-mist-800 rounded p-5 text-wrap" />
                        </div>
                        <div className="mt-6 mx-auto max-w-250 bg-mist-800 p-3 rounded-lg border border-mist-500 font-mono">
                            <div className="mb-4">
                                {
                                    editSection === "title" ?
                                        <div className="flex gap-4">
                                            <input
                                                autoFocus
                                                onChange={(e) => updateFeild("title", e.target.value)}
                                                placeholder="Title..."
                                                className="text-lg field-sizing-content border border-mist-500 outline-0 rounded px-3" type="text" value={draft.title} />
                                            <button onClick={saveEdit} className="cursor-pointer bg-green-700 px-4 rounded-lg ">Save</button>
                                            <button onClick={cancelEdit} className="cursor-pointer bg-red-700 px-4 rounded-lg ">Cancel</button>
                                        </div>
                                        : draft.title === "" ?
                                            <input
                                                onChange={(e) => { editSection !== "title" && startEdit("title"), updateFeild("title", e.target.value) }}
                                                placeholder="Title..."
                                                className="text-lg field-sizing-content border border-mist-500 outline-0 rounded px-3" type="text" value={draft.title} />
                                            :
                                            <>
                                                <h1 className="text-lg">{draft.title}</h1>
                                                <button onClick={() => startEdit("title")} className="cursor-pointer bg-gray-700 text-sm px-4 rounded-lg border border-mist-400">Edit</button>
                                            </>
                                }
                            </div>
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="flex items-baseline flex-wrap gap-4">
                                    <h3>Features:</h3>
                                    {
                                        editSection === "features" ?
                                            <>
                                                {draft.features?.map((item, index) => (
                                                    <label className="flex border border-mist-500 rounded" htmlFor={index} key={index}>
                                                        <input
                                                            onChange={e => {
                                                                const features = [...draft.features]
                                                                features[index] = e.target.value
                                                                updateFeild("features", features)
                                                            }}
                                                            id={index}
                                                            className="field-sizing-content text-sm py-1 text-mist-300 px-2 outline-0"
                                                            type="text" value={item} />
                                                        <button
                                                            onClick={() => updateFeild("features",
                                                                draft.features.filter((_, i) => i !== index)
                                                            )}
                                                            className="bg-red-600 px-2 rounded-r cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z" /><path d="M9 10h2v8H9zM13 10h2v8h-2z" /></svg>
                                                        </button>
                                                    </label>
                                                ))}
                                                <button onClick={() => updateFeild("features", [...draft.features, ""])} className="cursor-pointer bg-gray-700 font-bold text-sm px-4 rounded-lg border border-mist-400">+</button>
                                                <button onClick={saveEdit} className="cursor-pointer bg-green-700 px-4 rounded-lg ">Save</button>
                                                <button onClick={cancelEdit} className="cursor-pointer bg-red-700 px-4 rounded-lg ">Cancel</button>
                                            </>
                                            :
                                            <>
                                                {draft.features?.map(item => (
                                                    <p
                                                        key={item}
                                                        className="bg-mist-700 border text-sm py-1 text-mist-300 shadow shadow-mist-700 border-mist-500 rounded-xl px-2">{item}</p>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (draft.features.length === 0) {
                                                            updateFeild("features", [""]);
                                                        }

                                                        startEdit("features");
                                                    }}
                                                    className="bg-gray-700 cursor-pointer font-bold text-sm px-4 rounded-lg border border-mist-400"
                                                >
                                                    {draft.features.length === 0 ? "+" : "Edit"}
                                                </button>
                                            </>
                                    }
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    Category:
                                    {
                                        editSection === "category" ?
                                            <>
                                                <select
                                                    value={draft.category}
                                                    onChange={(e) => {
                                                        updateFeild("category", e.target.value)
                                                    }}
                                                    className="cursor-pointer shadow rounded bg-mist-700 border border-mist-500">
                                                    {
                                                        categories.map(category => (
                                                            <option key={category} value={category}>{category.charAt(0).toUpperCase()}{category.slice(1)}</option>
                                                        ))
                                                    }
                                                </select>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={saveEdit}
                                                        className="cursor-pointer bg-green-700 px-1 rounded-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z" /></svg>
                                                    </button>
                                                    <button onClick={cancelEdit} className="cursor-pointer bg-red-700 px-2 rounded-lg ">x</button>
                                                </div>
                                            </>
                                            : draft.category === "" ?
                                                <>
                                                    <select
                                                        value={draft.category ?? ""}
                                                        onChange={(e) => {
                                                            updateFeild("category", e.target.value)
                                                            if (editSection !== "category") {
                                                                startEdit("category")
                                                            }
                                                        }}
                                                        className="cursor-pointer shadow rounded bg-mist-700 border border-mist-500">
                                                        <option value="" disabled>Choose...</option>
                                                        {
                                                            categories.map(category => (
                                                                <option key={category} value={category}>{category.charAt(0).toUpperCase()}{category.slice(1)}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    {
                                                        editSection === "category" &&
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={saveEdit}
                                                                className="cursor-pointer bg-green-700 px-1 rounded-lg">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z" /></svg>
                                                            </button>
                                                            <button onClick={cancelEdit} className="cursor-pointer bg-red-700 px-2 rounded-lg ">x</button>
                                                        </div>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <p className="text-nowrap">{draft.category?.charAt(0).toUpperCase()}{draft.category?.slice(1)}</p>
                                                    <button onClick={() => startEdit("category")} className="cursor-pointer bg-gray-700 text-sm px-4 rounded-lg border border-mist-400">Edit</button>
                                                </>
                                    }
                                </div>
                            </div>
                            <div className="flex my-8 lg:w-fit mx-auto flex-wrap gap-6">
                                <div className="h-min border mx-auto text-sm sm:text-base p-3 rounded-lg border-mist-600 shadow">
                                    <h3>Specifications</h3>
                                    <div className="mt-1 sm:ml-4 flex flex-col gap-2">
                                        {
                                            editSection === "specifications" ?
                                                <>
                                                    {Object.entries(draft.specifications ?? {}).map(([key, value]) => (
                                                        <div className="flex flex-col sm:flex-row" key={key}>
                                                            <span>{key}:</span>
                                                            <div className="flex items-center">
                                                                <input
                                                                    onChange={(e) => {
                                                                        updateFeild("specifications", {
                                                                            ...draft.specifications,
                                                                            [key]: e.target.value
                                                                        })
                                                                    }}
                                                                    className="sm:ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                                    type="text" value={String(value)} />
                                                                <button
                                                                    onClick={() => {
                                                                        const specs = { ...draft.specifications }

                                                                        delete specs[key]

                                                                        updateFeild("specifications", specs)
                                                                    }}
                                                                    className="ml-4 bg-red-600 justify-self-end px-2 rounded cursor-pointer">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z" /><path d="M9 10h2v8H9zM13 10h2v8h-2z" /></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {
                                                        isNewSpec ?
                                                            <div className="flex flex-col sm:flex-row gap-y-1">
                                                                <div className="flex items-baseline">
                                                                    <input
                                                                        onChange={e => {
                                                                            setNewSpec(prev => ({
                                                                                ...prev,
                                                                                key: e.target.value
                                                                            }))
                                                                        }}
                                                                        className="sm:ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                                        type="text" value={newSpec.key} />:
                                                                    <input
                                                                        onChange={e => {
                                                                            setNewSpec(prev => ({
                                                                                ...prev,
                                                                                value: e.target.value
                                                                            }))
                                                                        }}
                                                                        className="ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                                        type="text" value={newSpec.value} />
                                                                </div>
                                                                <div className="flex">
                                                                    <button
                                                                        onClick={() => {
                                                                            updateFeild("specifications", {
                                                                                ...draft.specifications,
                                                                                [newSpec.key.trim()]: newSpec.value.trim()
                                                                            })
                                                                            setNewSpec({ key: "", value: "" })
                                                                            setIsNewSpec(false)
                                                                        }}
                                                                        className="cursor-pointer bg-green-700 px-1 rounded-lg mx-4">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z" /></svg>
                                                                    </button>
                                                                    <button onClick={() => { setNewSpec({ key: "", value: "" }), setIsNewSpec(false) }} className="cursor-pointer bg-red-700 px-2 rounded-lg ">x</button>
                                                                </div>
                                                            </div>
                                                            :
                                                            <button onClick={() => { setIsNewSpec(true) }} className="cursor-pointer bg-gray-700 text-sm px-4 rounded-lg border border-mist-400 w-fit">+</button>
                                                    }
                                                    <div className="flex gap-4 mt-2">
                                                        <button onClick={() => { saveEdit(), setNewSpec({ key: "", value: "" }), setIsNewSpec(false) }} className="cursor-pointer bg-green-700 px-4 rounded-lg ">Save</button>
                                                        <button onClick={() => { cancelEdit(), setNewSpec({ key: "", value: "" }), setIsNewSpec(false) }} className="cursor-pointer bg-red-700 px-4 rounded-lg ">Cancel</button>
                                                    </div>
                                                </>
                                                :
                                                Object.keys(draft.specifications ?? {}).length === 0 ?
                                                    <button onClick={() => { setIsNewSpec(true), startEdit("specifications") }} className="cursor-pointer bg-gray-700 text-sm px-4 rounded-lg border border-mist-400 w-fit">+</button> :
                                                    <>
                                                        {Object.entries(draft.specifications ?? {}).map(([key, value]) => (
                                                            <p key={key}>
                                                                <span className="text-lg  text-neutral-400">{key}</span>:<span className="ml-1 border-b border-neutral-400 pb-0.5">{value}</span>
                                                            </p>
                                                        ))}
                                                        <button onClick={() => startEdit("specifications")} className="cursor-pointer w-fit bg-gray-700 text-sm px-4 rounded-lg border border-mist-400 mt-2">Edit</button>
                                                    </>
                                        }
                                    </div>
                                </div>
                                <div className="border mx-auto h-min gap-3 grid grid-cols-[max-content_max-content] p-3 rounded-lg border-mist-600 shadow">
                                    <div className="h-min col-span-2 sm:col-span-1">
                                        <h3>Shipping details</h3>
                                        <div className="mt-1 flex flex-col gap-1 ml-4">
                                            <div>Free Shipping:
                                                {editSection === "details" || draft.shipping.free === null ? (
                                                    <select
                                                        value={
                                                            draft.shipping?.free === true
                                                                ? "yes"
                                                                : draft.shipping?.free === false
                                                                    ? "no"
                                                                    : ""
                                                        }
                                                        onChange={(e) => {
                                                            const value =
                                                                e.target.value === "yes"
                                                                    ? true
                                                                    : e.target.value === "no"
                                                                        ? false
                                                                        : null;

                                                            updateFeild("shipping", {
                                                                ...draft.shipping,
                                                                free: value
                                                            });

                                                            if (editSection !== "details") {
                                                                startEdit("details");
                                                            }
                                                        }}
                                                        className="cursor-pointer shadow ml-2 rounded bg-mist-700 border border-mist-500"
                                                    >
                                                        <option value="" disabled>Yes or No</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                ) : (
                                                    <span>{draft.shipping.free ? " Yes" : " No"}</span>
                                                )}
                                            </div>
                                            {
                                                editSection === "details" ?
                                                    <label htmlFor="days">
                                                        Days to deliver:
                                                        <input id="days"
                                                            onChange={e => {
                                                                if (e.target.value === "") {
                                                                    setEditError("days")
                                                                } else {
                                                                    setEditError(null)
                                                                }
                                                                updateFeild("shipping", {
                                                                    ...draft.shipping,
                                                                    estimatedDays: e.target.value === "" ? "" : Number(e.target.value)
                                                                })
                                                            }}
                                                            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                            type="number" value={draft.shipping.estimatedDays ?? ""} />
                                                        &#32;Days
                                                    </label>
                                                    : draft.shipping.estimatedDays === null ?
                                                        <label htmlFor="days">
                                                            Days to deliver:
                                                            <input id="days"
                                                                onChange={e => {
                                                                    if (e.target.value === "") {
                                                                        setEditError("days")
                                                                    } else {
                                                                        setEditError(null)
                                                                    }
                                                                    updateFeild("shipping", {
                                                                        ...draft.shipping,
                                                                        estimatedDays: e.target.value === "" ? "" : Number(e.target.value)
                                                                    })
                                                                    startEdit("details")
                                                                }}
                                                                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                                type="number" value={draft.shipping.estimatedDays ?? ""} />
                                                            &#32;Days
                                                        </label>
                                                        : <p>Days to deliver: {draft.shipping?.estimatedDays} Days</p>
                                            }
                                            {
                                                editError === "days" && <p className="text-xs text-red-600 font-bold">please fill in "dayas to deliver"</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="h-min col-span-2 sm:col-span-1">
                                        <p>Warranty</p>
                                        {
                                            editSection === "details" || draft.warranty === "" ?
                                                <input id="days"
                                                    onChange={e => {
                                                        updateFeild("warranty", e.target.value)
                                                        if (draft.warranty === "") {
                                                            startEdit("details")
                                                        }
                                                    }}
                                                    className="ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                    type="text" value={draft.warranty} />
                                                :
                                                <p className="mt-1 ml-4">{draft.warranty}</p>
                                        }
                                    </div>
                                    <div className="col-span-2">
                                        <h3>Price and stock</h3>
                                        <div className="flex sm:flex-row flex-col-reverse gap-5 mt-1 ml-4">
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                {
                                                    editSection === "details" || draft.price === "" ?
                                                        <>
                                                            <label className="sm:col-span-1 col-span-2" htmlFor="days">
                                                                Price:
                                                                <input id="days"
                                                                    onChange={e => {
                                                                        updateFeild("price", e.target.value === "" ? "" : Number(e.target.value))
                                                                        if (draft.price === "") {
                                                                            startEdit("details")
                                                                        }
                                                                    }}
                                                                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                                    type="number" value={draft.price} />
                                                                &#32;$
                                                            </label>
                                                            <label className="sm:col-span-1 col-span-2" htmlFor="days">
                                                                Discount:
                                                                <input id="days"
                                                                    onChange={e => {
                                                                        updateFeild("discount", e.target.value === "" ? "" : Number(e.target.value))
                                                                        if (draft.discount === "") {
                                                                            startEdit("details")
                                                                        }
                                                                    }}
                                                                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                                    type="number" value={draft.discount} />
                                                                &#32;%
                                                            </label>
                                                        </>
                                                        :
                                                        <>
                                                            <p className="sm:col-span-1 col-span-2">Price: {draft.price}$</p>
                                                            <p className="sm:col-span-1 col-span-2">Discount: {draft.discount}%</p>
                                                        </>
                                                }
                                                {draft.discount !== 0 && <p className="col-span-2 sm:m-auto">Final price: {(draft.price * (1 - (draft.discount / 100))).toFixed(2)}$</p>}
                                            </div>
                                            {
                                                editSection === "details" || draft.stock === "" ?
                                                    <label htmlFor="days">
                                                        Stock:
                                                        <input id="days"
                                                            onChange={e => {
                                                                updateFeild("stock", e.target.value === "" ? "" : Number(e.target.value))
                                                                updateFeild("availability", e.target.value !== 0 ? "in_stock" : "out_of_stock")
                                                                if (draft.stock === "") {
                                                                    startEdit("details")
                                                                }
                                                            }}
                                                            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-2 field-sizing-content border border-mist-500 outline-0 rounded px-3"
                                                            type="number" value={draft.stock} />
                                                    </label>
                                                    : <p>Stock: {draft.stock}</p>
                                            }
                                        </div>
                                    </div>
                                    {
                                        editSection === "details" ?
                                            <div className="col-span-2 mx-auto">
                                                <button onClick={() => { saveEdit(), draft.shipping.estimatedDays !== "" && setEditError(null) }} className="w-fit mr-3 cursor-pointer bg-green-700 px-4 rounded-lg ">Save</button>
                                                <button onClick={() => { cancelEdit(), product.shipping.estimatedDays !== "" && setEditError(null) }} className="w-fit cursor-pointer bg-red-700 px-4 rounded-lg ">Cancel</button>
                                            </div>
                                            : draft.price === "" && draft.discount === "" && draft.stock === "" && draft.shipping.free === null && draft.shipping.estimatedDays === null ? null :
                                                <button onClick={() => startEdit("details")} className="cursor-pointer bg-gray-700 text-sm px-4 rounded-lg border border-mist-400 w-fit col-span-2 m-auto">Edit</button>
                                    }
                                </div>
                            </div>
                            <div className="border border-mist-500 rounded p-3">
                                <h3 className="text-lg">Description</h3>
                                {
                                    editSection === "description" || draft.description === "" ?
                                        <>
                                            <textarea
                                                onChange={e => {
                                                    updateFeild("description", e.target.value)
                                                    if (draft.description === "") {
                                                        startEdit("description")
                                                    }
                                                }}
                                                className="w-full field-sizing-content outline-0 border border-mist-500 rounded resize-none p-2" value={draft.description}></textarea>
                                            {
                                                draft.description !== "" &&
                                                <>
                                                    <button onClick={saveEdit} className="mr-3 cursor-pointer bg-green-700 px-4 rounded-lg ">Save</button>
                                                    <button onClick={cancelEdit} className="cursor-pointer bg-red-700 px-4 rounded-lg ">Cancel</button>
                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            <p className="mt-3">{draft.description}</p>
                                            <button onClick={() => startEdit("description")} className="cursor-pointer bg-gray-700 text-sm px-4 rounded-lg border border-mist-400 mt-2">Edit</button>
                                        </>
                                }
                            </div>
                            {
                                JSON.stringify(product) !== JSON.stringify(initialProduct) &&
                                <div className="mt-6">
                                    <button onClick={handleCreate} className="m-3 ml-0 cursor-pointer bg-green-700 px-4 rounded-lg ">Create product</button>
                                    <button onClick={() => { setDraft(initialProduct), setProduct(initialProduct) }} className="cursor-pointer bg-red-700 px-4 rounded-lg ">Discard changes</button>
                                </div>
                            }
                        </div>
                    </>
            }
        </Container>
    )
}

export default AdminCreate;