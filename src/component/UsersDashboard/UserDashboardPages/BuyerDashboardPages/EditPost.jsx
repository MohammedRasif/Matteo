"use client";

import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { GrSearch } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../Shared/baseUrls";

function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location?.state;

  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    hourlyRate: false,
    fixedPrice: false,
    category: "",
    currency: "USD",
    title: "",
    numPersons: "",
    description: "",
    skills: "",
    locationField: "",
    searchLocation: "",
    duration: "",
    amount: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || !id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${BaseUrl}/api/v1/order-post/details/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setInitialData(data);
        setFormData({
          hourlyRate: data.payment_type === "hourly",
          fixedPrice: data.payment_type === "fixed",
          category: data.categories?.join(", ") || "",
          currency: data.currency || "USD",
          title: data.title || "",
          numPersons: data.required_person?.toString() || "",
          description: data.details || "",
          skills: data.skills?.join(", ") || "",
          locationField: data.address || "",
          searchLocation: "",
          duration: data.duration?.toString() || "",
          amount: data.price?.toString() || "",
        });
      } catch (err) {
        console.error("❌ Error loading post:", err);
        alert("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  const getChangedFields = () => {
    const changed = {};
    if (formData.title !== initialData.title) changed.title = formData.title;
    if (formData.category !== (initialData.categories?.join(", ") || ""))
      changed.categories = formData.category
        .split(",")
        .map((cat) => cat.trim())
        .filter(Boolean);
    if (
      formData.numPersons &&
      Number(formData.numPersons) !== initialData.required_person
    )
      changed.required_person = Number(formData.numPersons);
    if (formData.description !== initialData.details)
      changed.details = formData.description;
    if (formData.skills !== (initialData.skills?.join(", ") || ""))
      changed.skills = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    if (formData.locationField !== initialData.address)
      changed.address = formData.locationField;
    if (formData.duration && Number(formData.duration) !== initialData.duration)
      changed.duration = Number(formData.duration);
    if (formData.hourlyRate && initialData.payment_type !== "hourly")
      changed.payment_type = "hourly";
    if (formData.fixedPrice && initialData.payment_type !== "fixed")
      changed.payment_type = "fixed";
    if (formData.amount && Number(formData.amount) !== initialData.price)
      changed.price = Number(formData.amount);
    if (formData.currency !== initialData.currency)
      changed.currency = formData.currency;
    return changed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) return alert("No token found.");
    const updates = getChangedFields();
    if (Object.keys(updates).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      const res = await fetch(`${BaseUrl}/api/v1/order-post/update/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("❌ Update failed:", error);
        alert("Failed to update post.");
        return;
      }

      //   alert("Post updated successfully!");
      navigate("/dashboard/buyer_order_create");
    } catch (err) {
      console.error("❌ Error submitting update:", err);
      alert("Error updating post.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/dashboard/buyer_order_create">
          <button className="flex items-center text-[#154153] gap-1">
            <GoArrowLeft />
            <span>Back</span>
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-center text-[#154153] mb-8">
          Edit Post
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-[#154153]"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-[#154153]"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
            />
          </div>

          <div>
            <label
              htmlFor="numPersons"
              className="block mb-1 text-sm font-medium text-[#154153]"
            >
              Number of Persons <span className="text-red-500">*</span>
            </label>
            <input
              id="numPersons"
              type="number"
              min="1"
              value={formData.numPersons}
              onChange={(e) =>
                setFormData({ ...formData, numPersons: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-[#154153]"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={5}
            required
            style={{ maxHeight: "12rem", overflowY: "auto" }}
            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block mb-1 text-sm font-medium text-[#154153]"
          >
            Skills (comma separated) <span className="text-red-500">*</span>
          </label>
          <input
            id="skills"
            type="text"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block mb-1 text-sm font-medium text-[#154153]"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.locationField}
            onChange={(e) =>
              setFormData({ ...formData, locationField: e.target.value })
            }
            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="duration"
              className="block mb-1 text-sm font-medium text-[#154153]"
            >
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              id="duration"
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block mb-1 text-sm font-medium text-[#154153]"
            >
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
            />
          </div>

          <div>
            <label
              htmlFor="currency"
              className="block mb-1 text-sm font-medium text-[#154153]"
            >
              Currency <span className="text-red-500">*</span>
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4 pt-2">
          <label className="flex items-center space-x-2 text-[#154153]">
            <input
              type="checkbox"
              checked={formData.hourlyRate}
              onChange={(e) =>
                setFormData({ ...formData, hourlyRate: e.target.checked })
              }
            />
            <span>Hourly Rate</span>
          </label>

          <label className="flex items-center space-x-2 text-[#154153]">
            <input
              type="checkbox"
              checked={formData.fixedPrice}
              onChange={(e) =>
                setFormData({ ...formData, fixedPrice: e.target.checked })
              }
            />
            <span>Fixed Price</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-[231px] bg-[#2E9DE0] hover:cursor-pointer text-[#F8FCFF] text-[20px] py-2 rounded mt-10"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
