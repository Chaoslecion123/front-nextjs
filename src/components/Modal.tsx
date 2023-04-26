import React from "react";

export default function Modal(props: any) {
  const { children, showModal, setShowModal, name } = props;
  //   const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-slate-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {name}
      </button>
      {showModal ? <>{children}</> : null}
    </>
  );
}
