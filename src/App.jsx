import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { addItem, deleteItem, deleteAll } from "./redux/actions";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import Button from "react-bootstrap/Button";

function Header() {
  return (
    <header className="text-center">
      <h1>My Wishlist</h1>
    </header>
  );
}

function InputBox() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishList); //accesses state from the store
  const [wish, setWish] = useState("");

  const handleInputChange = (e) => {
    return setWish(e.target.value);
  };

  const handleSubmit = () => {
    //checks if empty string
    if (!wish) {
      alert("Please add a wish");
      return;
    }

    //checks if wish is duplicated by comparing it to wishlist in state
    for (let i = 0; i <= wishlist.length - 1; i++) {
      if (wish === wishlist[i].value) {
        alert("You already have that wish!");
        return;
      }
    }
    dispatch(addItem(wish));
    setWish("");
  };

  const clearList = () => {
    if (wishlist.length === 0) {
      alert("add a wish first");
    } else {
      alert("Your wish was sent to Santa!");
    }

    dispatch(deleteAll());
  };

  return (
    <div>
      <div>
        <input
          style={{
            borderRadius: "5px",
            border: "2px solid black",
            width: "540px",
          }}
          type="text"
          placeholder="Add a wish"
          value={wish}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="row justify-content-center">
        <Button
          className="row justify-content-center"
          style={{
            fontWeight: "bold",
            color: "#000",
          }}
          variant="success"
          onClick={handleSubmit}
        >
          Add Wish
        </Button>
      </div>
      <br />

      <div className="row justify-content-center btn-add">
        <Button
          style={{
            width: "540px",
            fontWeight: "bold",
            color: "#000",
          }}
          variant="success"
          block
          onClick={() => clearList()}
        >
          Submit
        </Button>
      </div>
      <br />
    </div>
  );
}

function WishList() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishList);
  const removeItem = (index) => {
    dispatch(deleteItem(index));
  };

  return (
    <div>
      {wishlist.map((wish, index) => (
        <h3 key={index} onClick={() => removeItem(index)}>
          {wish.value}
        </h3>
      ))}
    </div>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: "grey" }}>
      <div
        className="container-sm mt-5"
        style={{
          backgroundColor: "#FCC0CB",
          borderRadius: "25px",
          border: "2px solid #000",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-6">
            <Header />
            <div
              style={{
                border: "2px solid black",
                height: "400px",
                width: "540px",
                backgroundColor: "#FFF",
              }}
            >
              <WishList />
            </div>
            <br />
            <InputBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
