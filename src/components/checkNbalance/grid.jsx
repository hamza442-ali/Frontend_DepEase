import React from "react";

export const Grid = () => {
  return (
		<>
		<div className="flex  bg-neutral-100 mr-16 ml-24  rounded-3xl shadow-lg">
		<div className="mb-4">
      <div className="grid grid-rows-3 grid-flow-col ml-4 gap-4 p-8 bg-white rounded shadow-lg max-w-5xl  mt-4 ">
        <div className=" text-white row-span-3 bg-red-500 h-57 w-50   p-8  rounded shadow-lg max-w-3xl">
          01 Hamza Azam Mangat Mangat Mangat Mangat 
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
        </div>
        <div className="col-span-2 bg-red-500 h-12 w-50 text-white  p-8  rounded shadow-lg max-w-1xl">
          02 Hamza Azam Mangat Mangat Mangat Mangat 
         
        </div>
        <div className="row-span-2 col-span-2 bg-red-500 h-38 w-50 text-white  p-8  rounded shadow-lg max-w-1xl">
          03
          01 Hamza Azam Mangat Mangat Mangat Mangat 
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
          01 Hamza Azam Mangat Mangat Mangat Mangat
        </div>
      </div>

      {/* grid 3 */}
      <div className="grid grid-rows-3 grid-flow-col gap-4 ml-4 mt-10  max-w-5xl mx-auto mt-4 p-8 bg-white rounded shadow-lg">
        <div className="row-span-3 bg-primary h-56 w-50 text-white rounded shadow-lg">
          04
        </div>
        <div className="row-span-3 bg-primary h-56 w-50 text-white rounded shadow-lg">
          05
        </div>
        <div className="row-span-3 bg-primary h-56 w-50 text-white rounded shadow-lg">
          06
        </div>
      </div>
	  </div>
	  
    {/* third grid  */}
         <div className="grid grid-rows-3 grid-flow-col gap-4 p-8 bg-white rounded shadow-lg w-64 ml-8 mt-4 mb-4">
       <div className="row-span-3 bg-red-500 max-w-2xl text-white    rounded shadow-lg">
         01
       </div>
     
     </div>

	  </div>

    </>

	);

};

// return (
//   <>
//     <div className="grid grid-rows-3 grid-flow-col gap-4 p-8 bg-white rounded shadow-lg max-w-4xl ml-32">
//       <div className="row-span-3 bg-red-500 h-57 w-50  mt-8 p-8  rounded shadow-lg">
//         01
//       </div>
//       <div className="col-span-2 bg-red-500 h-12 w-50  mt-8 p-8  rounded shadow-lg">
//         02
//       </div>
//       <div className="row-span-2 col-span-2 bg-red-500 h-38 w-50  mt-8 p-8  rounded shadow-lg">
//         03
//       </div>
//     </div>

//     {/* grid 3 */}
//     <div className="grid grid-rows-3 grid-flow-col gap-4 ml-32 mt-10  max-w-4xl mx-auto mt-8 p-8 bg-white rounded shadow-lg">
//       <div className="row-span-3 bg-primary h-56 w-50  rounded shadow-lg">
//         04
//       </div>
//       <div className="row-span-3 bg-primary h-56 w-50  rounded shadow-lg">
//         05
//       </div>
//       <div className="row-span-3 bg-primary h-56 w-50  rounded shadow-lg">
//         06
//       </div>
//     </div>
//   </>
// );
