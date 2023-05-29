import React, { useState } from "react";

function NodeItem(props) {
  const viewTemplate = (
    <div className="stack-small">
      <div className="NodeList-Item">
        <input id={props.id} type="checkbox" />
        <label className="node-label" htmlFor={props.id}>
          {props.id}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => {
            props.setSelectedNode(props.id);
          }}
        >
          Select <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteNode(props.id)}
        >
          Delete <span className="visually-hidden">{props.id}</span>
        </button>
      </div>
    </div>
  );

  return viewTemplate;
}

export default NodeItem;
