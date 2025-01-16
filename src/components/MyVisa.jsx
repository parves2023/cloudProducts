import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { BallTriangle } from "react-loader-spinner";
import Swal from "sweetalert2";

const MyVisa = () => {
  const { user, dataFetching, setDataFetching } = useContext(AuthContext);
  const [myVisas, setMyVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [userEmail] = useState(user.email);

  // Fetch user visas
  useEffect(() => {
    const fetchVisas = async () => {
      setDataFetching(true);
      try {
        const response = await fetch(
          `http://localhost:5000/my-visas?email=${userEmail}`
        );
        const data = await response.json();
        setMyVisas(data);
        setDataFetching(false);
      } catch (error) {
        console.error("Error fetching visas:", error);
        setDataFetching(false);
      }
    };

    fetchVisas();
  }, [userEmail]);

  // Handle delete visa
  const handleDelete = async (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/visas/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setMyVisas(myVisas.filter((visa) => visa._id !== id));
            Swal.fire("Deleted!", "Your visa has been deleted.", "success");
          } else {
            Swal.fire(
              "Error!",
              "There was an issue deleting the visa.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error deleting visa:", error);
          Swal.fire("Error!", "An unexpected error occurred.", "error");
        }
      }
    });
  };

  console.log(selectedVisa);

  // Handle update visa
  const handleUpdate = async (updatedVisa) => {
    try {
      const response = await fetch(
        `http://localhost:5000/visas/${selectedVisa._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVisa),
        }
      );

      if (response.ok) {
        const updatedVisaWithId = { ...updatedVisa, _id: selectedVisa._id };
        setMyVisas(
          myVisas.map((visa) =>
            visa._id === selectedVisa._id ? updatedVisaWithId : visa
          )
        );
        setSelectedVisa(null);
        Swal.fire({
          title: "Visa Updated Successfully!",
          text: "Your visa details have been successfully updated.",
          icon: "success",
          background: "#f9f9f9",
          color: "#333",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error updating visa:", error);
    }
  };

  if (dataFetching) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">My Added Visas</h1>
        <div className="flex justify-center  h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Added Visas</h1>
      {myVisas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myVisas.map((visa) => (
            <div
              key={visa._id}
              className="border p-4 rounded shadow hover:shadow-lg"
            >
              <img
                src={visa.countryImage}
                alt={visa.country}
                className="w-full h-60 md:h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold">{visa.country}</h2>
              <p className="text-sm text-gray-600">
                Visa Type: {visa.visaType}
              </p>
              <p className="text-sm text-gray-600">
                Processing Time: {visa.processingTime}
              </p>
              <p className="text-sm text-gray-600">Fee: ${visa.fee}</p>
              <p className="text-sm text-gray-600">Validity: {visa.validity}</p>
              <p className="text-sm text-gray-600">
                Method: {visa.applicationMethod}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => setSelectedVisa(visa)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(visa._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No visas added yet.</p>
      )}

      {/* Update Modal */}
      {selectedVisa && (
        <div className="fixed overflow-scroll mt-24 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Update Visa</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedVisa = {
                  country: e.target.country.value,
                  countryImage: e.target.countryImage.value,
                  visaType: e.target.visaType.value,
                  processingTime: e.target.processingTime.value,
                  fee: parseInt(e.target.fee.value),
                  validity: e.target.validity.value,
                  applicationMethod: e.target.applicationMethod.value,
                };
                handleUpdate(updatedVisa);
              }}
            >
              <div className="mb-1">
                <label className="block font-medium mb-1">Country</label>
                <input
                  name="country"
                  defaultValue={selectedVisa.country}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-1">
                <label className="block font-medium mb-1">
                  Country Image URL
                </label>
                <input
                  name="countryImage"
                  defaultValue={selectedVisa.countryImage}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-1">
                <label className="block font-medium mb-1">Visa Type</label>
                <input
                  name="visaType"
                  defaultValue={selectedVisa.visaType}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-1">
                <label className="block font-medium mb-1">
                  Processing Time
                </label>
                <input
                  name="processingTime"
                  defaultValue={selectedVisa.processingTime}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-1">
                <label className="block font-medium mb-1">Fee</label>
                <input
                  name="fee"
                  type="number"
                  defaultValue={selectedVisa.fee}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-1">
                <label className="block font-medium mb-1">Validity</label>
                <input
                  name="validity"
                  defaultValue={selectedVisa.validity}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-1">
                  Application Method
                </label>
                <input
                  name="applicationMethod"
                  defaultValue={selectedVisa.applicationMethod}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedVisa(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVisa;
