import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchVehicles, deleteVehicle } from "../actions/adminActions";
import { loginSuccess } from "../features/loginSlice";
function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchVehicle, setSearchVehicle] = useState("");
  const { loading, vehicles, error } = useSelector(
    (state) => state.fetchVehicles
  );
  const { userInfo } = useSelector((state) => state.login);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchVehicle.toLowerCase()) ||
      vehicle.manufacturer
        .toLowerCase()
        .includes(searchVehicle.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchVehicle.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

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
  const handleDelete = async (vehicleId) => {
    await dispatch(deleteVehicle(vehicleId));
    dispatch(fetchVehicles());
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
            <h3 class="text-3xl font-extralight text-white">Vehicles</h3>
            <div class="inline-flex items-center space-x-2">
              <div class="pt-2 relative mx-auto flex gap-2 text-gray-600">
                <input
                  class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  onChange={(e) => {
                    setSearchVehicle(e.target.value);
                  }}
                  name="search"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div class="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div class="group bg-white py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-200 hover:smooth-hover">
              <Link to="/add">
                {" "}
                <Link
                  class="bg-white text-black group-hover:text-black group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
                  to="/add"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </Link>
              </Link>
              <Link
                class="text-black group-hover:text-black group-hover:smooth-hover text-center"
                to="/add"
              >
                Add New
              </Link>
            </div>
            {/* Vehicle list */}
            {filteredVehicles.map((vehicle, index) => (
              <div
                key={index}
                class="card flex flex-col justify-center p-5 bg-white rounded-lg shadow-2xl"
              >
                <div class="prod-title flex justify-between p-1">
                  <p class="text-2xl uppercase text-gray-900 font-bold">
                    {vehicle.name}
                  </p>
                  <button
                    onClick={() => {
                      handleDelete(filteredVehicles[index]._id);
                    }}
                    class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
                <div className=" flex justify-between p-1">
                  <p class="uppercase text-sm text-gray-400">
                    {vehicle.manufacturer}
                  </p>
                  <p class="uppercase text-sm text-gray-400">{vehicle.model}</p>
                </div>
                <div class="prod-img">
                  <img
                    src={`http://localhost:6001/assets/images/${vehicle.primaryImage}`}
                    alt="Image is currently unavailable"
                    class="w-full object-cover object-center rounded-md"
                  />
                </div>
                <div class="prod-info grid gap-10">
                  <div class="flex flex-col md:flex-row justify-between items-center text-gray-900">
                    <p class="font-medium text-xl">Price : ₹{vehicle.price}</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigate(`/details/${vehicle._id}`);
                  }}
                  class="mt-3 space-y-20"
                >
                  <div class="flex-1 h-full mx-auto">
                    <div class="flex bg-white shadow rounded-lg py-2 px-16 hover:bg-gray-200 hover:smooth-hover cursor-pointer">
                      <p class="m-auto inset-0 text-xl font-semibold leading-7 text-center text-gray-800">
                        Details
                      </p>
                      <div class="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
