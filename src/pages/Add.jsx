import { useState, useEffect } from "react";
import { assets } from "../assets/assets"; // Ensure you have the correct path to assets
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const Add = ({ token: propToken }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log("Stored Token:", storedToken);
    setToken(storedToken || propToken);
  }, [propToken]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [giftImage1, setGiftImage1] = useState(null);
  const [giftImage2, setGiftImage2] = useState(null);
  const [giftImage3, setGiftImage3] = useState(null);
  const [giftImage4, setGiftImage4] = useState(null);

  const [giftPrice1, setGiftPrice1] = useState("");
  const [giftPrice2, setGiftPrice2] = useState("");
  const [giftPrice3, setGiftPrice3] = useState("");
  const [giftPrice4, setGiftPrice4] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Bracelets");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [offers, setOffers] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [discount, setDiscount] = useState("");

  const subCategories = {
    BENGALS_HOUSE: {
      categories: [
        "Tarakasi jewellery",
        "Dokra jewellery",
        "Terracotta jewellery",
        "Fabric jewellery",
      ],
      collections: {}, // No collections for BENGALS_HOUSE
    },
    EARINGS: {
      items: [
        {
          category: "Studs",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Jhumka",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Chandballiyaan",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Drops",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Hoops",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Sui Dhaga",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Ear cuffs",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
      ],
    },
    NECKLACE: {
      items: [
        {
          category: "Chokers",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
        {
          category: "Pendants",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
      ],
    },
    RINGS: {
      items: [
        {
          category: "Couple Rings",
          collections: {
            Raajwari: ["Kundan", "Meenakari", "Polki", "Pearls"],
            Fascinating_West: ["AD jewellery", "Anti Tarnish"],
            Oxidised_Jewellery: [],
          },
          occasions: [
            "Daily wear",
            "Office time",
            "Party",
            "Casually casual",
            "Sun rise",
            "Moon rise",
            "Evening tea",
            "Cocktail night",
          ],
        },
      ],
    },
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Bracelets");
    setSubCategory("");
    setSubSubCategory("");
    setBestseller(false);
    setOffers(false);
    setGiftPackaging(false);
    setSizes([]);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setGiftImage1(null);
    setGiftImage2(null);
    setGiftImage3(null);
    setGiftImage4(null);
    setGiftPrice1("");
    setGiftPrice2("");
    setGiftPrice3("");
    setGiftPrice4("");
    setDiscount("");
  };
  const isTokenExpired = (token) => {
    if (!token) return true; // Token is missing
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime;
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isTokenExpired(token)) {
      toast.error("Your session has expired. Please log in again.");
      console.error("Token has expired. Redirecting to login.");
      // Optionally redirect to the login page
      window.location.href = "/login"; // Adjust this to your login route
      return;
    }
    const giftPrices = [giftPrice1, giftPrice2, giftPrice3, giftPrice4];
    console.log("Form submitted:", {
      name,
      description,
      price,
      giftPrices, // This can still contain empty strings
      category,
      subCategory,
      offers,
      sizes,
      bestseller,
      discount,
      giftPackaging,
    });
    console.log("Authorization Token:", token);

    if (!token) {
      toast.error("Authorization token is missing.");
      console.error("Authorization token is missing.");
      return;
    }

    // Validate required fields
    if (!name || !price || !category || sizes.length === 0) {
      toast.error("Please fill in all required fields.");
      console.error("Validation failed: Required fields are missing.");
      return;
    }

    // Prepare gift prices as an array

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("giftPrices", JSON.stringify(giftPrices)); // Keep it as is
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("subSubCategory", subSubCategory);
    formData.append("bestseller", String(bestseller));
    formData.append("offers", String(offers));
    formData.append("giftPackaging", String(giftPackaging));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("discount", String(discount));

    // Append images
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    // Append gift packaging images
    if (giftImage1) formData.append("giftImage1", giftImage1);
    if (giftImage2) formData.append("giftImage2", giftImage2);
    if (giftImage3) formData.append("giftImage3", giftImage3);
    if (giftImage4) formData.append("giftImage4", giftImage4);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      console.log("Authorization Token:", token);
      console.log("FormData:", Array.from(formData.entries()));
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        resetForm(); // Reset the form after successful submission
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };
  const handleSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOccasions(selectedOptions);
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Product Image Upload */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <label htmlFor={`image${index + 1}`} key={index}>
              <img
                className="w-20"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log(`Image ${index + 1} selected:`, file);
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
            console.log("Product name:", e.target.value);
          }}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
            console.log("Product description:", e.target.value);
          }}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category and Subcategory Selection */}
      {/* Category and Subcategory Selection */}
      {/* Category, Subcategory, and Collection Selection */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {/* Category Selection */}
        <div>
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => {
              const selectedCategory = e.target.value;
              setCategory(selectedCategory);
              setSubCategory(""); // Reset subcategory when category changes
              setSubSubCategory(""); // Reset collection when category changes
              console.log("Selected category:", selectedCategory);
            }}
            value={category}
            className="w-full max-w-[500px] px-3 py-2"
          >
            {Object.keys(subCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        <div>
          <p className="mb-2">Subcategory</p>
          <select
            onChange={(e) => {
              const selectedSubCategory = e.target.value;
              setSubCategory(selectedSubCategory);
              setSubSubCategory(""); // Reset collection when subcategory changes
              console.log("Selected subcategory:", selectedSubCategory);
            }}
            value={subCategory}
            className="w-full max-w-[500px] px-3 py-2"
          >
            <option value="">Select Subcategory</option>
            {subCategories[category]?.categories?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Collection Selection */}
        <div>
          <p className="mb-2">Collection</p>
          <select
            onChange={(e) => {
              const selectedCollection = e.target.value;
              setSubSubCategory(selectedCollection);
              console.log("Selected collection:", selectedCollection);
            }}
            value={subSubCategory}
            className="w-full max-w-[500px] px-3 py-2"
          >
            <option value="">Select Collection</option>
            {(subCategories[category]?.collections?.[subCategory] || []).map(
              (collection) => (
                <option key={collection} value={collection}>
                  {collection}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <p className="mb-2">Collection</p>
          <select
            onChange={(e) => {
              const selectedCollection = e.target.value;
              setSubSubCategory(selectedCollection);
              console.log("Selected collection:", selectedCollection);
            }}
            value={subSubCategory}
            className="w-full max-w-[500px] px-3 py-2"
          >
            <option value="">Select Product</option>
            {(subCategories[category]?.collections?.[subCategory] || []).map(
              (collection) => (
                <option key={collection} value={collection}>
                  {collection}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="occasion" className="block mb-2 font-bold">
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            multiple
            value={selectedOccasions}
            onChange={handleSelection}
            className="border px-3 py-2 rounded w-full max-w-md"
          >
            {/* Dropdown options */}
            <option value="Wedding">Wedding</option>
            <option value="Party">Party</option>
            <option value="Casual">Casual</option>
            <option value="Festival">Festival</option>
            <option value="Anniversary">Anniversary</option>
          </select>

          {/* Display selected items */}
          <div className="mt-4">
            <p className="font-semibold">Selected Occasions:</p>
            {selectedOccasions.length > 0 ? (
              <ul className="list-disc ml-4">
                {selectedOccasions.map((occasion, index) => (
                  <li key={index}>{occasion}</li>
                ))}
              </ul>
            ) : (
              <p>No occasion selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Price Input */}
      <div className="w-full">
        <p className="mb-2">Product price</p>
        <input
          onChange={(e) => {
            setPrice(e.target.value);
            console.log("Product price:", e.target.value);
          }}
          value={price}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Type price here"
          required
        />
      </div>

      {/* Size Selection */}
      <div className="w-full">
        <p className="mb-2">Available Colors</p>
        <div className="flex gap-2">
          {["Red", "Blue", "Green", "Black", "Silver", "Golden"].map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                onChange={(e) => {
                  const newSizes = e.target.checked
                    ? [...sizes, size]
                    : sizes.filter((s) => s !== size);
                  setSizes(newSizes);
                  console.log("Selected sizes:", newSizes);
                }}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Bestseller and Offers */}
      <div className="flex gap-4">
        <div>
          <label>
            <input
              type="checkbox"
              checked={bestseller}
              onChange={() => {
                setBestseller(!bestseller);
                console.log("Bestseller:", !bestseller);
              }}
            />
            Bestseller
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={offers}
              onChange={() => {
                setOffers(!offers);
                console.log("Offers:", !offers);
              }}
            />
            Offers
          </label>
        </div>
      </div>

      {/* Discount Input */}
      {offers && (
        <div className="w-full">
          <p className="mb-2">Discount</p>
          <input
            onChange={(e) => {
              setDiscount(e.target.value);
              console.log("Discount:", e.target.value);
            }}
            value={discount}
            className="w-full max-w-[500px] px-3 py-2"
            type="number"
            placeholder="Type discount here"
          />
        </div>
      )}

      {/* Gift Packaging */}
      <div className="flex gap-2">
        <label>
          <input
            type="checkbox"
            checked={giftPackaging}
            onChange={() => {
              setGiftPackaging(!giftPackaging);
              console.log("Gift Packaging:", !giftPackaging);
            }}
          />
          Gift Packaging
        </label>
      </div>

      {/* Gift Package Image Upload */}
      {giftPackaging && (
        <div>
          <p className="mb-2">Upload Gift Package Image</p>
          <div className="flex gap-2">
            {[giftImage1, giftImage2, giftImage3, giftImage4].map(
              (image, index) => (
                <div key={index}>
                  <label htmlFor={`giftImage${index + 1}`}>
                    <img
                      className="w-20"
                      src={
                        !image ? assets.upload_area : URL.createObjectURL(image)
                      }
                      alt=""
                    />
                    <input
                      onChange={(e) => {
                        const file = e.target.files[0];
                        console.log(`Gift Image ${index + 1} selected:`, file);
                        if (index === 0) setGiftImage1(file);
                        if (index === 1) setGiftImage2(file);
                        if (index === 2) setGiftImage3(file);
                        if (index === 3) setGiftImage4(file);
                      }}
                      type="file"
                      id={`giftImage${index + 1}`}
                      hidden
                    />
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    className="mt-2 w-full border rounded p-1"
                    onChange={(e) => {
                      const price = e.target.value;
                      console.log(`Gift Package ${index + 1} Price:`, price);
                      if (index === 0) setGiftPrice1(price);
                      if (index === 1) setGiftPrice2(price);
                      if (index === 2) setGiftPrice3(price);
                      if (index === 3) setGiftPrice4(price);
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
