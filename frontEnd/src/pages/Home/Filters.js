import React from "react";
import Divider from "../../components/Divider";
import { Input } from "antd";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Properties",
    value: "properties",
  },
  {
    name: "Furniture",
    value: "furniture",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years old",
    value: "13-20",
  },
];


function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-72 bg-white flex flex-col p-4">
      <div className="flex justify-between">
        <h1 className="text-secondary text-2xl">Filters</h1>
        <i
          className="ri-close-circle-fill text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-500 text-xl">Categories</h1>
        {categories.map((category) => {
          return (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="category"
                style={{ maxWidth: "max-content" }}
                checked={filters.category.includes(category.value)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setFilters({
                      ...filters,
                      category: [...filters.category, category.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      category: filters.category.filter(
                        (item) => item !== category.value
                      ),
                    });
                  }
                }}
              />
              <label htmlFor="category">{category.name}</label>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-500 text-xl">Ages</h1>
        {ages.map((age) => {
          return (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="age"
                style={{ maxWidth: "max-content" }}
                checked={filters.age.includes(age.value)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setFilters({
                      ...filters,
                      age: [...filters.age, age.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      age: filters.age.filter((item) => item !== age.value),
                    });
                  }
                }}
              />
              <label htmlFor="age">{age.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filters;


