import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/loginSlice";
import {} from "../actions/adminActions";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);
  const { loading, vehicles, error } = useSelector(
    (state) => state.fetchVehicles
  );
  const [foundObject, setFoundObject] = useState({});
  useEffect(() => {
    if (vehicles !== null) {
      const foundObject = vehicles.find((object) => object._id === id);
      setFoundObject(foundObject);
      setFormData(foundObject);
      console.log(formData);
    }
  }, [vehicles]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (userInfo == null) {
      navigate("/login");
    }
  }, [userInfo]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(loginSuccess(null));
    navigate("/login");
  };

  // Handle image file uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      recfile: files,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.manufacturer ||
      !formData.model ||
      !formData.price ||
      !formData.quantity
    ) {
      window.alert("Please include all fields");
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("manufacturer", formData.manufacturer);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);
      formData.recfile.forEach((image) => {
        formDataToSend.append("recfile", image);
      });
      // dispatch(addVehicle(formDataToSend));
      setFormData("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  return (
    <div class="bg-yellow-400 min-h-screen flex items-center justify-center">
      <div class="bg-black flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
        <div class="bg-stone-300 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
          <nav class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
            <Link
              class="text-black p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
              to="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>

            <Link
              onClick={handleLogout}
              class="text-black p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
        {/* <!-- Content --> */}
        <div class="flex-1 px-2 sm:px-0">
          <div class="flex justify-between items-center">
            <h3 class="text-3xl font-extralight text-white">View Vehicles</h3>
          </div>
          {/* form start*/}
          <div className="max-w-lg mx-auto p-6">
            <div>
              <div class="prod-img">
                {formData?.secondaryImages?.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={`http://localhost:6001/assets/images/${image}`}
                      alt="currently unavailable"
                      class="w-full object-cover object-center rounded-md"
                    />
                  );
                })}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vehicleName">Vehicle Name</label>
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  placeholder="Vehicle Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="vehicleName">Vehicle Name</label>
                <input
                  type="text"
                  id="Vehicle Description"
                  name="Vehicle Description"
                  placeholder="Vehicle Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="vehicleName">Vehicle Name</label>
                <input
                  type="text"
                  id="Vehicle price"
                  name="Vehicle price"
                  placeholder="Vehicle price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="vehicleName">Vehicle Name</label>
                <input
                  type="text"
                  id="Vehicle quantity"
                  name="Vehicle quantity"
                  placeholder="Vehicle quantity"
                  value={formData.availableQuantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableQuantity: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              {/* Add similar fields for description, price, and quantity */}

              <div>
                <label htmlFor="images">Images (Max 4)</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full border rounded px-3 py-2"
                  accept="image/*"
                  required
                />
              </div>

              <div>
                <label htmlFor="manufacturer">Manufacturer</label>
                <select
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) =>
                    setFormData({ ...formData, manufacturer: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  {/* Add options for manufacturers */}
                  <option value="manufacturer1">Honda</option>
                  <option value="manufacturer2">Yamaha</option>
                  <option value="manufacturer2">BMW</option>
                  <option value="manufacturer2">Ford</option>
                  <option value="manufacturer2">Nissan</option>
                  <option value="manufacturer2">Toyota</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div>
                <label htmlFor="model">Model</label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  {/* Add options for models */}
                  <option value="model1">2022</option>
                  <option value="model2">2021</option>
                  <option value="model2">2020</option>
                  <option value="model2">2019</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* form end*/}
        </div>
      </div>
    </div>
  );
}

export default Detail;
