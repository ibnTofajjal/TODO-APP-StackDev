import React, { useEffect, useState } from "react";
import "./Styles.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //   Add the items function
  const addItem = () => {
    if (!inputData) {
      alert("PLEASE SIR/MADAM FILL THE DATA");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      // Trying something uniqe for getting a new if
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // Edit Items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // Delete Single Item Fucntion
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // Delete All Fucntion
  const removeAll = () => {
    setItems([]);
  };

  // Adding LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <h1 style={{ fontSize: "90px" }}>📄</h1>
            <figcaption>Add Your List Here ✌🏻</figcaption>
          </figure>

          {/*Input Area */}
          <div className="addItems">
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              type="text"
              placeholder="✍🏻 Add Item"
              className="form-control"
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/*Show our Items*/}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/*remove all button*/}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
